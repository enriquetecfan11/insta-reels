import { loadFont } from "@remotion/google-fonts/Inter";
import { SPACING } from "./tokens";

// Load font once; Remotion blocks render until ready.
export const { fontFamily: FONT_FAMILY } = loadFont("normal", {
  weights: ["400", "700", "800"],
  subsets: ["latin"],
});

export const THEME = {
  BG: ["#0a0a0f", "#1a1a2e"] as const,
  BG_DEEP: ["#050508", "#0f0f1a"] as const,
  BG_GLOW: ["#0a0a0f", "#1a1a2e", "#1e1b4b"] as const, // subtle purple hint at bottom
  ACCENT: ["#6366f1", "#8b5cf6"] as const,
  HIGHLIGHT_BG: ["#0d0d1a", "#1a1040"] as const,
  OUTRO_BG: ["#1e1b4b", "#2d1b69", "#0a0a0f"] as const,
  TEXT_PRIMARY: "#ffffff",
  TEXT_SECONDARY: "#e2e8f0",
  TEXT_MUTED: "#94a3b8",
  CONTRAST_MIN: 4.5,
} as const;

export const DESIGN = {
  WIDTH: 1080,
  HEIGHT: 1920,
  FPS: 30,
  PADDING_H: SPACING.MARGIN_H,
  SAFE_TOP: SPACING.SAFE_TOP,
  SAFE_BOTTOM: SPACING.SAFE_BOTTOM,
  CONTENT_OFFSET_TOP: SPACING.CONTENT_OFFSET_TOP,
  TRANSITION_FRAMES: 8,
  ACCENT_BAR_HEIGHT: 8,
  USE_ANIMATED_EMOJI: false,
} as const;
