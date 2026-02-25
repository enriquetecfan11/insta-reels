import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import type { SlideConceptProps } from "../../utils/types";
import { fitHeadline, fitBody } from "../../utils/textUtils";
import { SlideShell } from "./SlideShell";
import { SlideHeader } from "./SlideHeader";
import { SlideBody } from "./SlideBody";
import { AnimatedEntranceExit } from "../ui/AnimatedEntranceExit";
import { AnimatedTextReveal } from "../ui/AnimatedTextReveal";
import { useEmphasis } from "../motion/motionPresets";
import { SPACING } from "../../utils/tokens";

export const SlideConcept: React.FC<SlideConceptProps> = ({
  emoji,
  image,
  headline,
  body,
  duration,
  background = "default",
  animateText = "block",
  videoBackground,
}) => {
  const headlineFit = fitHeadline(headline);
  const bodyFit = fitBody(body);
  const { scale } = useEmphasis(10);

  const useStaggeredBody = animateText === "letter" || animateText === "word" || animateText === "line" || animateText === "phrase";

  return (
    <SlideShell variant={background} videoBackground={videoBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: SPACING.GAP_BODY,
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={0}>
          <div style={{ transform: `scale(${scale})`, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SlideHeader
              emoji={emoji}
              image={image}
              headline={headlineFit.displayText}
              center={true}
              fontSize={headlineFit.fontSize}
            />
          </div>
        </AnimatedEntranceExit>
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={10}>
          {useStaggeredBody ? (
            <AnimatedTextReveal
              text={bodyFit.displayText}
              durationSeconds={duration}
              mode={animateText}
              textStyle={{
                fontFamily: FONT_FAMILY,
                fontSize: bodyFit.fontSize,
                lineHeight: 1.2,
                textAlign: "center",
                color: THEME.TEXT_PRIMARY,
              }}
            />
          ) : (
            <SlideBody fontSize={bodyFit.fontSize} center={true}>{bodyFit.displayText}</SlideBody>
          )}
        </AnimatedEntranceExit>
      </div>
    </SlideShell>
  );
};
