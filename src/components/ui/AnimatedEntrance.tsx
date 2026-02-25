import React from "react";
import { useEntrance } from "../motion/motionPresets";

interface AnimatedEntranceProps {
  children: React.ReactNode;
  delay?: number;
  blur?: boolean;
  style?: React.CSSProperties;
}

export const AnimatedEntrance: React.FC<AnimatedEntranceProps> = ({
  children,
  delay = 0,
  blur: enableBlur = false,
  style: styleOverride,
}) => {
  const { style } = useEntrance(delay, { blur: enableBlur });

  return <div style={{ ...style, ...styleOverride }}>{children}</div>;
};
