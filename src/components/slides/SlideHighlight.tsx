import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import type { SlideHighlightProps } from "../../utils/types";
import { fitHighlight } from "../../utils/textUtils";
import { SlideShell } from "./SlideShell";
import { AnimatedEntranceExit } from "../ui/AnimatedEntranceExit";
import { AnimatedTextReveal } from "../ui/AnimatedTextReveal";
import { useCurrentFrame } from "remotion";
import { interpolate, spring } from "remotion";
import { MOTION, SPACING, SIZES } from "../../utils/tokens";

export const SlideHighlight: React.FC<SlideHighlightProps> = ({
  text,
  duration,
  background = "default",
  animateText = "block",
  videoBackground,
}) => {
  const { displayText, fontSize } = fitHighlight(text);
  const frame = useCurrentFrame();
  const quoteProgress = spring({
    frame,
    fps: 30,
    config: { damping: MOTION.DAMPING },
  });
  const quoteOpacity = interpolate(quoteProgress, [0, 1], [0, 0.2], {
    extrapolateRight: "clamp",
  });

  const useStaggeredText = animateText === "letter" || animateText === "word" || animateText === "line" || animateText === "phrase";
  const highlightTextStyle = {
    fontFamily: FONT_FAMILY,
    fontSize,
    fontWeight: 700,
    fontStyle: "italic" as const,
    color: THEME.TEXT_PRIMARY,
    lineHeight: 1.45,
    textAlign: "center" as const,
    wordBreak: "normal" as const,
    overflowWrap: "normal" as const,
  };

  const highlightGradient = `linear-gradient(160deg, ${THEME.HIGHLIGHT_BG[0]} 0%, ${THEME.HIGHLIGHT_BG[1]} 100%)`;
  return (
    <SlideShell variant={background} gradient={highlightGradient} videoBackground={videoBackground}>
      {/* Decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: SPACING.MARGIN_H - 8,
          fontFamily: FONT_FAMILY,
          fontSize: SIZES.QUOTE_MARK,
          fontWeight: 800,
          color: THEME.ACCENT[0],
          opacity: quoteOpacity,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        "
      </div>

      <AnimatedEntranceExit slideDurationSeconds={duration} delay={4}>
        {useStaggeredText ? (
          <div style={{ width: "100%", minWidth: 0, maxWidth: "100%", paddingLeft: 24, paddingRight: 24, boxSizing: "border-box" }}>
            <AnimatedTextReveal
              text={displayText}
              durationSeconds={duration}
              mode={animateText}
              textStyle={highlightTextStyle}
            />
          </div>
        ) : (
          <div
            style={{
              ...highlightTextStyle,
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              paddingLeft: 24,
              paddingRight: 24,
              boxSizing: "border-box",
            }}
          >
            {displayText}
          </div>
        )}
      </AnimatedEntranceExit>
    </SlideShell>
  );
};
