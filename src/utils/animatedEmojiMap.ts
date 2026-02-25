/**
 * Map from Unicode emoji (single character) to @remotion/animated-emoji EmojiName.
 * When a slide uses one of these emojis and no image, we render AnimatedEmoji instead of static.
 */
import type { EmojiName } from "@remotion/animated-emoji";

export const EMOJI_TO_ANIMATED_NAME: Record<string, EmojiName> = {
  "🤖": "robot",
  "🛠️": "gear",
  "✨": "sparkles",
  "🚀": "rocket",
  "💡": "light-bulb",
  "🔥": "fire",
  "⭐": "glowing-star",
};

/**
 * Returns the AnimatedEmoji name for a Unicode emoji, or null if not available.
 */
export function getAnimatedEmojiName(emoji: string | undefined): EmojiName | null {
  if (!emoji || emoji.length === 0) return null;
  const key = emoji.trim().split(/\s/)[0];
  if (!key) return null;
  const name = EMOJI_TO_ANIMATED_NAME[key];
  if (name) return name;
  const first = Array.from(emoji)[0];
  const nameFromFirst = first ? EMOJI_TO_ANIMATED_NAME[first] : undefined;
  return nameFromFirst ?? null;
}
