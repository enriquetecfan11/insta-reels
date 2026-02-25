import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import { SPACING, TYPOGRAPHY, SIZES } from "../../utils/tokens";
import type { SlideVersusProps } from "../../utils/types";
import { SlideShell } from "./SlideShell";
import { AnimatedEntranceExit } from "../ui/AnimatedEntranceExit";

const VERSUS_EMOJI_SIZE = 140;

export const SlideVersus: React.FC<SlideVersusProps> = ({
  leftLabel,
  leftEmoji,
  leftSubtext,
  rightLabel,
  rightEmoji,
  rightSubtext,
  duration,
  background = "default",
  videoBackground,
}) => {
  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: SPACING.GAP_HEADER,
    flex: 1,
    minWidth: 0,
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: TYPOGRAPHY.HEADLINE.fontSize * 0.7,
    fontWeight: TYPOGRAPHY.HEADLINE.fontWeight,
    lineHeight: 1.15,
    color: THEME.TEXT_PRIMARY,
    textAlign: "center",
  };
  const subtextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: TYPOGRAPHY.BODY.fontSize * 0.85,
    fontWeight: TYPOGRAPHY.BODY.fontWeight,
    lineHeight: 1.2,
    color: THEME.TEXT_SECONDARY,
    textAlign: "center",
  };

  /* Escalonado: izquierda → VS → derecha (en frames, 30 fps) */
  const delayLeft = 0;
  const delayVs = 18;
  const delayRight = 36;

  return (
    <SlideShell variant={background} videoBackground={videoBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: SPACING.MARGIN_H * 2,
          width: "100%",
        }}
      >
        <AnimatedEntranceExit slideDurationSeconds={duration} delay={delayLeft}>
          <div style={columnStyle}>
            <span style={{ fontSize: VERSUS_EMOJI_SIZE, lineHeight: 1 }}>{leftEmoji}</span>
            <div style={labelStyle}>{leftLabel}</div>
            <div style={subtextStyle}>{leftSubtext}</div>
          </div>
        </AnimatedEntranceExit>

        <AnimatedEntranceExit slideDurationSeconds={duration} delay={delayVs}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 800,
              color: THEME.ACCENT[0],
              opacity: 0.9,
              flexShrink: 0,
            }}
          >
            VS
          </div>
        </AnimatedEntranceExit>

        <AnimatedEntranceExit slideDurationSeconds={duration} delay={delayRight}>
          <div style={columnStyle}>
            <span style={{ fontSize: VERSUS_EMOJI_SIZE, lineHeight: 1 }}>{rightEmoji}</span>
            <div style={labelStyle}>{rightLabel}</div>
            <div style={subtextStyle}>{rightSubtext}</div>
          </div>
        </AnimatedEntranceExit>
      </div>
    </SlideShell>
  );
};
