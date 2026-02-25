import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import { SPACING, TYPOGRAPHY, SIZES } from "../../utils/tokens";
import { SlideImage } from "../ui/SlideImage";

export interface SlideHeaderProps {
  emoji?: string;
  image?: string;
  headline: string;
  /** If true, center text; otherwise align start. */
  center?: boolean;
  /** Override font size (e.g. from fitHeadline). */
  fontSize?: number;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  emoji,
  image,
  headline,
  center = false,
  fontSize = TYPOGRAPHY.HEADLINE.fontSize,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: center ? "center" : "flex-start",
        gap: SPACING.GAP_HEADER,
        width: "100%",
      }}
    >
      {(emoji || image) && (
        <SlideImage emoji={emoji} image={image} size={SIZES.EMOJI_CONCEPT} />
      )}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize,
          fontWeight: TYPOGRAPHY.HEADLINE.fontWeight,
          lineHeight: TYPOGRAPHY.HEADLINE.lineHeight,
          color: THEME.TEXT_PRIMARY,
          textAlign: center ? "center" : "left",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          overflowWrap: "normal",
          wordBreak: "normal",
        }}
      >
        {headline}
      </div>
    </div>
  );
};
