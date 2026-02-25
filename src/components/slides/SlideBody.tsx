import React from "react";
import { FONT_FAMILY, THEME } from "../../utils/constants";
import { TYPOGRAPHY } from "../../utils/tokens";

export interface SlideBodyProps {
  children: string;
  /** Override font size (e.g. from fitBody). */
  fontSize?: number;
  center?: boolean;
}

export const SlideBody: React.FC<SlideBodyProps> = ({
  children,
  fontSize = TYPOGRAPHY.BODY.fontSize,
  center = false,
}) => {
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight: TYPOGRAPHY.BODY.fontWeight,
        lineHeight: TYPOGRAPHY.BODY.lineHeight,
        color: THEME.TEXT_SECONDARY,
        maxWidth: "100%",
        textAlign: center ? "center" : "left",
        width: "100%",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </div>
  );
};
