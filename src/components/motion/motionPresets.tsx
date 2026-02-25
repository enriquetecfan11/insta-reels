/**
 * Reusable motion presets: entrance (fade + translateY + optional blur),
 * emphasis (subtle headline pop), exit (fade), and accent (line/glow).
 */

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolateStyles } from "@remotion/animation-utils";
import { MOTION } from "../../utils/tokens";

export function useEntrance(delayFrames: number = 0, options?: { blur?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delayFrames);
  const progress = spring({
    frame: t,
    fps,
    config: { damping: MOTION.DAMPING },
    durationInFrames: MOTION.ENTRANCE_DURATION,
  });
  const style = interpolateStyles(
    progress,
    [0, 1],
    [
      {
        opacity: 0,
        transform: "translateY(16px)",
        filter: options?.blur ? "blur(3px)" : "blur(0)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
        filter: "blur(0)",
      },
    ],
    { extrapolateRight: "clamp" }
  );
  return { style, progress };
}

export function useEmphasis(delayFrames: number = MOTION.EMPHASIS_DELAY) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delayFrames);
  const scale = spring({
    frame: t,
    fps,
    config: { stiffness: MOTION.BOUNCE_STIFFNESS, damping: MOTION.BOUNCE_DAMPING },
    durationInFrames: 12,
  });
  const s = 1 + interpolate(scale, [0, 1], [0, 0.04], { extrapolateRight: "clamp" });
  return { scale: s };
}

export function useExit(startFrame: number, durationInFrames: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - startFrame;
  const progress = spring({
    frame: t,
    fps,
    config: { damping: MOTION.DAMPING },
    durationInFrames: MOTION.EXIT_DURATION,
  });
  const opacity = interpolate(progress, [0, 1], [1, 0], { extrapolateRight: "clamp" });
  return { opacity: Math.min(1, Math.max(0, 1 - progress)) };
}

/**
 * Entrance + exit for a single block (e.g. text). Exit runs at the end of the slide (fade out + slide down).
 * Uses bounce spring (stiffness 200, damping 15) so exit mirrors entrance for a perfect loop.
 */
export function useEntranceAndExit(
  slideDurationSeconds: number,
  delayFrames: number = 0,
  options?: { blur?: boolean }
) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = Math.round(slideDurationSeconds * fps);
  const exitStartFrame = Math.max(0, durationInFrames - MOTION.EXIT_DURATION);

  const springConfig = { stiffness: MOTION.BOUNCE_STIFFNESS, damping: MOTION.BOUNCE_DAMPING };

  // Entrance: 0 -> 1 with bounce
  const tEntrance = Math.max(0, frame - delayFrames);
  const entranceProgress = spring({
    frame: tEntrance,
    fps,
    config: springConfig,
    durationInFrames: MOTION.ENTRANCE_DURATION,
  });
  const entranceStyle = interpolateStyles(
    entranceProgress,
    [0, 1],
    [
      {
        opacity: 0,
        transform: "translateY(16px)",
        filter: options?.blur ? "blur(3px)" : "blur(0)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
        filter: "blur(0)",
      },
    ],
    { extrapolateRight: "clamp" }
  );

  // Exit: mirror of entrance (same spring, time inverted) for perfect loop
  const tExit = exitStartFrame + MOTION.EXIT_DURATION - frame;
  const exitProgress = spring({
    frame: Math.max(0, tExit),
    fps,
    config: springConfig,
    durationInFrames: MOTION.EXIT_DURATION,
  });
  // exitProgress goes 1 -> 0; we want style to go visible -> invisible
  const exitStyle = interpolateStyles(
    1 - exitProgress,
    [0, 1],
    [
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
      { opacity: 0, transform: "translateY(-16px)", filter: "blur(0)" },
    ],
    { extrapolateRight: "clamp" }
  );

  const inExitPhase = frame >= exitStartFrame;
  return { style: inExitPhase ? exitStyle : entranceStyle };
}

/** Accent line or glow progress (0 -> 1 over frames). */
export function useAccentLine(delayFrames: number = 4, durationFrames: number = 18) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delayFrames);
  const progress = spring({
    frame: t,
    fps,
    config: { damping: MOTION.DAMPING },
    durationInFrames: durationFrames,
  });
  const scaleX = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(progress, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  return { scaleX, opacity };
}
