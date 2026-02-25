/**
 * Validates reel JSON schema. Logs warnings for missing/invalid fields and returns
 * safe defaults so render never blocks on invalid data.
 */

import type { ReelContent, Slide } from "./types";

const VALID_TYPES = ["intro", "concept", "highlight", "outro", "versus"] as const;
const VALID_TRANSITIONS = ["crossfade", "wipe", "push"] as const;
const VALID_BACKGROUNDS = ["default", "deep", "glow"] as const;
const VALID_ANIMATE_TEXT = ["letter", "word", "line", "phrase", "block"] as const;

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function safeNumber(x: unknown, fallback: number): number {
  if (typeof x === "number" && Number.isFinite(x) && x > 0) return x;
  return fallback;
}

function safeString(x: unknown, fallback: string): string {
  if (typeof x === "string" && x.trim().length > 0) return x.trim();
  return fallback;
}

export function validateReelContent(data: unknown): ReelContent {
  if (!isRecord(data)) {
    console.warn("[Reel] Invalid content: root is not an object. Using minimal default.");
    return { id: "unknown", slides: [] };
  }

  const id = safeString(data.id, "unknown");
  if (id === "unknown") console.warn("[Reel] Missing or empty 'id'. Using 'unknown'.");

  const rawSlides = Array.isArray(data.slides) ? data.slides : [];
  const slides: Slide[] = rawSlides.map((raw, i) => validateSlide(raw, i));

  if (slides.length === 0 && rawSlides.length > 0) {
    console.warn("[Reel] No valid slides after validation. Reel may be empty.");
  }

  return { id, slides };
}

function validateSlide(raw: unknown, index: number): Slide {
  if (!isRecord(raw)) {
    console.warn(`[Reel] Slide ${index}: not an object. Replacing with placeholder.`);
    return {
      type: "concept",
      headline: "Slide",
      body: "Content missing.",
      duration: 2,
    };
  }

  const type = VALID_TYPES.includes(raw.type as (typeof VALID_TYPES)[number])
    ? (raw.type as Slide["type"])
    : "concept";
  if (raw.type !== type) {
    console.warn(`[Reel] Slide ${index}: invalid type "${raw.type}". Using "concept".`);
  }

  const duration = safeNumber(raw.duration, 2.5);
  if (typeof raw.duration !== "number" || raw.duration <= 0) {
    console.warn(`[Reel] Slide ${index}: invalid duration. Using ${duration}s.`);
  }

  const transition =
    typeof raw.transition === "string" && VALID_TRANSITIONS.includes(raw.transition as (typeof VALID_TRANSITIONS)[number])
      ? (raw.transition as "crossfade" | "wipe" | "push")
      : undefined;
  const background =
    typeof raw.background === "string" && VALID_BACKGROUNDS.includes(raw.background as (typeof VALID_BACKGROUNDS)[number])
      ? (raw.background as "default" | "deep" | "glow")
      : undefined;
  const animateText =
    typeof raw.animateText === "string" && VALID_ANIMATE_TEXT.includes(raw.animateText as (typeof VALID_ANIMATE_TEXT)[number])
      ? (raw.animateText as "letter" | "word" | "line" | "phrase" | "block")
      : undefined;

  switch (type) {
    case "intro": {
      const title = safeString(raw.title, "Título");
      if (!raw.title || (typeof raw.title === "string" && !raw.title.trim())) {
        console.warn(`[Reel] Slide ${index} (intro): missing 'title'. Using default.`);
      }
      return {
        type: "intro",
        title,
        duration,
        emoji: typeof raw.emoji === "string" ? raw.emoji : undefined,
        image: typeof raw.image === "string" ? raw.image : undefined,
        transition,
        background,
        animateText,
        videoBackground: typeof raw.videoBackground === "string" ? raw.videoBackground : undefined,
      };
    }
    case "concept": {
      const headline = safeString(raw.headline, "Concepto");
      const body = safeString(raw.body, "Texto.");
      if (!raw.headline || (typeof raw.headline === "string" && !raw.headline.trim())) {
        console.warn(`[Reel] Slide ${index} (concept): missing 'headline'.`);
      }
      if (!raw.body || (typeof raw.body === "string" && !raw.body.trim())) {
        console.warn(`[Reel] Slide ${index} (concept): missing 'body'.`);
      }
      return {
        type: "concept",
        headline,
        body,
        duration,
        emoji: typeof raw.emoji === "string" ? raw.emoji : undefined,
        image: typeof raw.image === "string" ? raw.image : undefined,
        transition,
        background,
        animateText,
      };
    }
    case "highlight": {
      const text = safeString(raw.text, "Frase destacada.");
      if (!raw.text || (typeof raw.text === "string" && !raw.text.trim())) {
        console.warn(`[Reel] Slide ${index} (highlight): missing 'text'.`);
      }
      return {
        type: "highlight",
        text,
        duration,
        transition,
        background,
        animateText,
        videoBackground: typeof raw.videoBackground === "string" ? raw.videoBackground : undefined,
      };
    }
    case "versus": {
      const leftLabel = safeString(raw.leftLabel, "A");
      const leftEmoji = typeof raw.leftEmoji === "string" ? raw.leftEmoji : "⬅️";
      const leftSubtext = safeString(raw.leftSubtext, "");
      const rightLabel = safeString(raw.rightLabel, "B");
      const rightEmoji = typeof raw.rightEmoji === "string" ? raw.rightEmoji : "➡️";
      const rightSubtext = safeString(raw.rightSubtext, "");
      return {
        type: "versus",
        leftLabel,
        leftEmoji,
        leftSubtext,
        rightLabel,
        rightEmoji,
        rightSubtext,
        duration,
        transition,
        background,
        videoBackground: typeof raw.videoBackground === "string" ? raw.videoBackground : undefined,
      };
    }
    case "outro": {
      const cta = safeString(raw.cta, "Sígueme para más.");
      if (!raw.cta || (typeof raw.cta === "string" && !raw.cta.trim())) {
        console.warn(`[Reel] Slide ${index} (outro): missing 'cta'.`);
      }
      return {
        type: "outro",
        cta,
        duration,
        transition,
        background,
        videoBackground: typeof raw.videoBackground === "string" ? raw.videoBackground : undefined,
        ctaCommentKeyword: typeof raw.ctaCommentKeyword === "string" ? raw.ctaCommentKeyword : undefined,
      };
    }
  }
}
