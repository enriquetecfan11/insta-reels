import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../utils/constants";

interface AnimatedEmojiProps {
  emoji: string;
  fontSize?: number;
}

export const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({
  emoji,
  fontSize = 180,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 8 }, // bouncy
  });

  return (
    <div
      style={{
        fontSize,
        lineHeight: 1,
        transform: `scale(${scale})`,
        display: "inline-block",
        fontFamily: FONT_FAMILY,
      }}
    >
      {emoji}
    </div>
  );
};
