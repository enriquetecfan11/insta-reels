/**
 * Design tokens para Reels. Valores derivados de src/config/reelConfig.ts.
 * Para cambiar tamaños de todo, edita reelConfig.ts.
 */

import { getScaledConfig } from "../config/reelConfig";

const C = getScaledConfig();

export const SPACING = {
  UNIT: 8,
  SAFE_TOP: C.spacing.safeTop,
  SAFE_BOTTOM: C.spacing.safeBottom,
  MARGIN_H: C.spacing.marginH,
  CONTENT_OFFSET_TOP: C.spacing.contentOffsetTop,
  GAP_HEADER: C.spacing.gapHeader,
  GAP_BODY: C.spacing.gapBody,
  PADDING_BLOCK: C.spacing.paddingBlock,
} as const;

export const TYPOGRAPHY = {
  TITLE: {
    fontSize: C.typography.title,
    fontWeight: C.fontWeight.title as 800,
    lineHeight: C.lineHeight.title,
    maxLines: 3,
  },
  HEADLINE: {
    fontSize: C.typography.headline,
    fontWeight: C.fontWeight.headline as 800,
    lineHeight: C.lineHeight.headline,
    maxLines: 2,
  },
  BODY: {
    fontSize: C.typography.body,
    fontWeight: C.fontWeight.body as 500,
    lineHeight: C.lineHeight.body,
    maxWidth: 9999,
    maxLines: C.typography.bodyMaxLines,
  },
  CTA: {
    fontSize: C.typography.cta,
    fontWeight: C.fontWeight.cta as 800,
    lineHeight: C.lineHeight.cta,
    maxLines: 2,
  },
  HIGHLIGHT: {
    fontSize: C.typography.highlight,
    fontWeight: C.fontWeight.highlight as 800,
    lineHeight: C.lineHeight.highlight,
    maxWidth: 9999,
    maxLines: 3,
  },
} as const;

/** Tamaños de emojis e iconos (vienen del config). */
export const SIZES = {
  EMOJI_INTRO: C.sizes.emojiIntro,
  EMOJI_CONCEPT: C.sizes.emojiConcept,
  OUTRO_EMOJI: C.sizes.outroEmoji,
  QUOTE_MARK: C.sizes.quoteMark,
} as const;

export const RADIUS = {
  CARD: 24,
  ACCENT_LINE: 4,
} as const;

export const ACCENT = {
  BAR_HEIGHT: 8,
  GLOW_BLUR: 24,
} as const;

/** Premium aesthetic: drop-shadow for icons (avoids flat look). */
export const SHADOWS = {
  ICON_DROP_SHADOW: "0 4px 12px rgba(0,0,0,0.25)",
} as const;

export const MOTION = {
  ENTRANCE_DURATION: 12,
  EMPHASIS_DELAY: 6,
  EXIT_DURATION: 10,
  DAMPING: 32,
  POP_DAMPING: 15,
  /** Bounce preset for retainment: icons and text pop with visible overshoot. */
  BOUNCE_STIFFNESS: 200,
  BOUNCE_DAMPING: 15,
} as const;
