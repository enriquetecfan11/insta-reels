import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import { TYPOGRAPHY, SIZES } from "../../utils/tokens";
import type { SlideOutroProps } from "../../utils/types";
import { fitCta } from "../../utils/textUtils";
import { SlideShell } from "./SlideShell";
import { AnimatedEntranceExit } from "../ui/AnimatedEntranceExit";

function highlightKeyword(text: string, keyword: string): React.ReactNode {
  if (!keyword.trim()) return text;
  const lower = text.toLowerCase();
  const kwLower = keyword.toLowerCase();
  const i = lower.indexOf(kwLower);
  if (i === -1) return text;
  const before = text.slice(0, i);
  const match = text.slice(i, i + keyword.length);
  const after = text.slice(i + keyword.length);
  return (
    <>
      {before}
      <span
        style={{
          fontWeight: 800,
          color: THEME.ACCENT[0],
          paddingLeft: 4,
          paddingRight: 4,
          borderRadius: 6,
          background: "rgba(99, 102, 241, 0.2)",
        }}
      >
        {match}
      </span>
      {after}
    </>
  );
}

export const SlideOutro: React.FC<SlideOutroProps> = ({
  cta,
  duration,
  background = "default",
  videoBackground,
  ctaCommentKeyword,
}) => {
  const { displayText, fontSize } = fitCta(cta);
  const outroGradient = `linear-gradient(160deg, ${THEME.OUTRO_BG[0]} 0%, ${THEME.OUTRO_BG[1]} 50%, ${THEME.OUTRO_BG[2]} 100%)`;

  const ctaContent =
    ctaCommentKeyword != null
      ? highlightKeyword(displayText, ctaCommentKeyword)
      : displayText;

  return (
    <SlideShell variant={background} gradient={outroGradient} videoBackground={videoBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          width: "100%",
        }}
      >
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={0}>
          <span style={{ fontSize: SIZES.OUTRO_EMOJI, lineHeight: 1 }}>✨</span>
        </AnimatedEntranceExit>
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={6}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize,
              fontWeight: TYPOGRAPHY.CTA.fontWeight,
              color: THEME.TEXT_PRIMARY,
              lineHeight: TYPOGRAPHY.CTA.lineHeight,
              textAlign: "center",
              width: "100%",
            }}
          >
            {ctaContent}
          </div>
        </AnimatedEntranceExit>
      </div>
    </SlideShell>
  );
};
