/**
 * Reveals text with staggered bounce (word / line / phrase) for dynamic hierarchy.
 * Uses same spring as rest of template (stiffness 200, damping 15).
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolateStyles } from "@remotion/animation-utils";
import { MOTION } from "../../utils/tokens";
import type { AnimateTextMode } from "../../utils/types";

function splitSegments(text: string, mode: AnimateTextMode): string[] {
  const trimmed = text.trim();
  if (mode === "letter") return Array.from(trimmed);
  if (mode === "word") return trimmed.split(/\s+/).filter(Boolean);
  if (mode === "line") return trimmed.split("\n").filter(Boolean);
  if (mode === "phrase") {
    return trimmed
      .split(/(?<=\n)|(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [trimmed];
}

export interface AnimatedTextRevealProps {
  text: string;
  durationSeconds: number;
  mode: AnimateTextMode;
  staggerFrames?: number;
  style?: React.CSSProperties;
  /** Typography: fontSize, fontFamily, fontWeight, etc. */
  textStyle?: React.CSSProperties;
}

const DEFAULT_STAGGER_FRAMES = 5;
/** Letter mode: 1 frame per character for a smooth typewriter feel. */
const LETTER_STAGGER_FRAMES = 1;

export const AnimatedTextReveal: React.FC<AnimatedTextRevealProps> = ({
  text,
  durationSeconds,
  mode,
  staggerFrames,
  style: containerStyle,
  textStyle = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segments = splitSegments(text, mode);
  const springConfig = { stiffness: MOTION.BOUNCE_STIFFNESS, damping: MOTION.BOUNCE_DAMPING };

  const effectiveStagger = staggerFrames ?? (mode === "letter" ? LETTER_STAGGER_FRAMES : DEFAULT_STAGGER_FRAMES);

  if (segments.length === 0) return null;

  const isLine = mode === "line";
  const isLetter = mode === "letter";
  // Por palabra/letra/frase: contenedor con textAlign center para que cada línea
  // que hace wrap quede centrada automáticamente.
  const layoutStyle = isLine
    ? { display: "flex" as const, flexDirection: "column" as const, alignItems: "center" }
    : { display: "block" as const, textAlign: "center" as const };

  return (
    <div style={{ ...layoutStyle, ...containerStyle }}>
      {segments.map((segment, i) => {
        const delayFrames = i * effectiveStagger;
        const t = Math.max(0, frame - delayFrames);
        const progress = spring({
          frame: t,
          fps,
          config: springConfig,
          durationInFrames: isLetter ? 6 : MOTION.ENTRANCE_DURATION,
        });
        const segmentStyle = interpolateStyles(
          progress,
          [0, 1],
          [
            { opacity: 0, transform: isLetter ? "translateY(4px)" : "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { extrapolateRight: "clamp" }
        );
        return (
          <span
            key={i}
            style={{
              ...segmentStyle,
              display: "inline-block",
              whiteSpace: isLine ? "pre-wrap" : isLetter ? "pre" : "normal",
              marginRight: isLetter ? 0 : "0.25em",
              ...textStyle,
            }}
          >
            {segment}
            {isLine ? "" : isLetter ? "" : " "}
          </span>
        );
      })}
    </div>
  );
};
