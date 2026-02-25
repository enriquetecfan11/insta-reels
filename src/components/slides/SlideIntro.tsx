import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import { TYPOGRAPHY, SPACING, SIZES } from "../../utils/tokens";
import type { SlideIntroProps } from "../../utils/types";
import { fitTitle } from "../../utils/textUtils";
import { SlideShell } from "./SlideShell";
import { AnimatedEntranceExit } from "../ui/AnimatedEntranceExit";
import { AnimatedTextReveal } from "../ui/AnimatedTextReveal";
import { SlideImage } from "../ui/SlideImage";
import { useEmphasis } from "../motion/motionPresets";

export const SlideIntro: React.FC<SlideIntroProps> = ({
  emoji,
  image,
  title,
  duration,
  background = "default",
  animateText = "block",
  videoBackground,
}) => {
  const { displayText, fontSize } = fitTitle(title);
  const { scale } = useEmphasis(8);

  const titleTextStyle = {
    fontFamily: FONT_FAMILY,
    fontSize,
    fontWeight: TYPOGRAPHY.TITLE.fontWeight,
    lineHeight: TYPOGRAPHY.TITLE.lineHeight,
    color: THEME.TEXT_PRIMARY,
    textAlign: "center" as const,
  };

  const useStaggeredText = animateText === "letter" || animateText === "word" || animateText === "line" || animateText === "phrase";

  return (
    <SlideShell variant={background} videoBackground={videoBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: SPACING.GAP_HEADER,
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={0}>
          <SlideImage emoji={emoji} image={image} size={SIZES.EMOJI_INTRO} />
        </AnimatedEntranceExit>
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={5}>
          <div style={{ transform: `scale(${scale})`, width: "100%", minWidth: 0, maxWidth: "100%", textAlign: "center" }}>
            {useStaggeredText ? (
              <AnimatedTextReveal
                text={displayText}
                durationSeconds={duration}
                mode={animateText}
                textStyle={titleTextStyle}
              />
            ) : (
              <div style={{ ...titleTextStyle, whiteSpace: "pre-line", wordBreak: "normal", overflowWrap: "normal", maxWidth: "100%", minWidth: 0 }}>{displayText}</div>
            )}
          </div>
        </AnimatedEntranceExit>
      </div>
    </SlideShell>
  );
};
