import React from "react";
import { useEntranceAndExit } from "../motion/motionPresets";

interface AnimatedEntranceExitProps {
  children: React.ReactNode;
  /** Slide duration in seconds (from slide props). */
  slideDurationSeconds: number;
  delay?: number;
  blur?: boolean;
  style?: React.CSSProperties;
}

/**
 * Wraps content with entrance (fade + slide up) and exit (fade + slide up) animation.
 * Exit runs automatically at the end of the slide.
 */
export const AnimatedEntranceExit: React.FC<AnimatedEntranceExitProps> = ({
  children,
  slideDurationSeconds,
  delay = 0,
  blur: enableBlur = false,
  style: styleOverride,
}) => {
  const { style } = useEntranceAndExit(slideDurationSeconds, delay, {
    blur: enableBlur,
  });

  return <div style={{ ...style, ...styleOverride }}>{children}</div>;
};
