import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedEmoji } from "@remotion/animated-emoji";
import { DESIGN } from "../../utils/constants";
import { getAnimatedEmojiName } from "../../utils/animatedEmojiMap";
import { MOTION, SHADOWS } from "../../utils/tokens";

/** ~2.5s cycle for subtle zoom (Ken Burns style). */
const SUBTLE_ZOOM_AMPLITUDE = 0.03;
const SUBTLE_ZOOM_SPEED = 0.04;

interface SlideImageProps {
  emoji?: string;
  image?: string; // path relativo a public/
  size?: number;
  /** Envuelve emoji/imagen en un círculo con anillo sutil (estilo sketch). */
  circle?: boolean;
  /** Gentle continuous zoom so the icon is never fully static. Default true. */
  subtleZoom?: boolean;
}

const circleStyle = (size: number, scale: number) => ({
  transform: `scale(${scale})`,
  width: size,
  height: size,
  borderRadius: "50%" as const,
  overflow: "hidden" as const,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid rgba(255,255,255,0.15)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  filter: `drop-shadow(${SHADOWS.ICON_DROP_SHADOW})`,
});

/** Fallback to static emoji if AnimatedEmoji fails (e.g. missing assets or browser preview). */
class AnimatedEmojiFallback extends Component<
  { emojiName: string; size: number; fallbackEmoji: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Already captured in state
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <span style={{ fontSize: this.props.size * 0.55, lineHeight: 1 }}>
          {this.props.fallbackEmoji}
        </span>
      );
    }
    return (
      <AnimatedEmoji
        emoji={this.props.emojiName as Parameters<typeof AnimatedEmoji>[0]["emoji"]}
        style={{ width: this.props.size, height: this.props.size }}
      />
    );
  }
}

export const SlideImage: React.FC<SlideImageProps> = ({
  emoji,
  image,
  size = 180,
  circle = true,
  subtleZoom = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { stiffness: MOTION.BOUNCE_STIFFNESS, damping: MOTION.BOUNCE_DAMPING },
  });
  const zoomFactor = subtleZoom
    ? 1 + SUBTLE_ZOOM_AMPLITUDE * Math.sin(frame * SUBTLE_ZOOM_SPEED)
    : 1;
  const totalScale = scale * zoomFactor;

  if (image) {
    return (
      <div
        style={{
          transform: `scale(${totalScale})`,
          width: size,
          height: size,
          borderRadius: circle ? "50%" : 24,
          overflow: "hidden",
          flexShrink: 0,
          border: circle ? "3px solid rgba(255,255,255,0.15)" : undefined,
          boxShadow: circle ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : undefined,
          filter: `drop-shadow(${SHADOWS.ICON_DROP_SHADOW})`,
        }}
      >
        <Img
          src={staticFile(image)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  const useAnimated = DESIGN.USE_ANIMATED_EMOJI && emoji && getAnimatedEmojiName(emoji);

  if (emoji) {
    return (
      <div style={circleStyle(size, totalScale)}>
        {useAnimated ? (
          <AnimatedEmojiFallback
            emojiName={useAnimated}
            size={size}
            fallbackEmoji={emoji}
          />
        ) : (
          <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>{emoji}</span>
        )}
      </div>
    );
  }

  return null;
};
