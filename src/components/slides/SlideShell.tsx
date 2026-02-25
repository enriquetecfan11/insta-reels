import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { DESIGN, THEME } from "../../utils/constants";
import type { BackgroundVariant } from "../../utils/types";
import { SPACING, ACCENT } from "../../utils/tokens";

/** Slight background movement so no frame is fully static (retainment). */
const BACKGROUND_DRIFT_DEG = 3;
const BACKGROUND_DRIFT_SPEED = 0.025;

function getGradientWithAngle(
  variant: BackgroundVariant,
  angleDeg: number
): string {
  switch (variant) {
    case "deep":
      return `linear-gradient(${angleDeg}deg, ${THEME.BG_DEEP[0]} 0%, ${THEME.BG_DEEP[1]} 100%)`;
    case "glow":
      return `linear-gradient(${angleDeg}deg, ${THEME.BG_GLOW[0]} 0%, ${THEME.BG_GLOW[1]} 50%, ${THEME.BG_GLOW[2]} 100%)`;
    default:
      return `linear-gradient(${angleDeg}deg, ${THEME.BG[0]} 0%, ${THEME.BG[1]} 100%)`;
  }
}

/** Subtle noise overlay (CSS pattern). */
const NOISE_OPACITY = 0.03;

export interface SlideShellProps {
  children: React.ReactNode;
  /** Content block: centered visually (slightly above center), with safe areas. */
  variant?: BackgroundVariant;
  /** Optional custom gradient (overrides variant). */
  gradient?: string;
  /** Optional B-roll video (path relative to public/). Renders behind gradient for movement. */
  videoBackground?: string;
}

const BROLL_GRADIENT_OPACITY = 0.92;

export const SlideShell: React.FC<SlideShellProps> = ({
  children,
  variant = "default",
  gradient,
  videoBackground,
}) => {
  const frame = useCurrentFrame();
  const angleDeg = 180 + BACKGROUND_DRIFT_DEG * Math.sin(frame * BACKGROUND_DRIFT_SPEED);
  const bg = gradient ?? getGradientWithAngle(variant, angleDeg);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {videoBackground && (
        <OffthreadVideo
          src={staticFile(videoBackground)}
          muted
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {/* Base gradient (with subtle angle drift when using variant); over B-roll for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bg,
          opacity: videoBackground ? BROLL_GRADIENT_OPACITY : 1,
        }}
      />

      {/* Accent bar top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ACCENT.BAR_HEIGHT,
          background: `linear-gradient(90deg, ${THEME.ACCENT[0]} 0%, ${THEME.ACCENT[1]} 100%)`,
          borderRadius: ACCENT.BAR_HEIGHT / 2,
        }}
      />

      {/* Subtle noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: NOISE_OPACITY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 280px 60px rgba(0,0,0,0.35)",
          pointerEvents: "none",
        }}
      />

      {/* Safe area + content zone: Instagram Reels safe area (no content at edges) */}
      <div
        style={{
          position: "absolute",
          left: SPACING.MARGIN_H,
          right: SPACING.MARGIN_H,
          top: DESIGN.SAFE_TOP + ACCENT.BAR_HEIGHT,
          bottom: DESIGN.SAFE_BOTTOM,
          maxWidth: DESIGN.WIDTH - 2 * SPACING.MARGIN_H,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: SPACING.CONTENT_OFFSET_TOP,
          paddingBottom: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};
