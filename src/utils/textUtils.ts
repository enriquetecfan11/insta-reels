/**
 * Text utilities: truncate, max lines, ellipsis.
 * Usa los tamaños base de tokens (que vienen de reelConfig).
 */

import { TYPOGRAPHY } from "./tokens";

const MAX_CHARS_HEADLINE = 28;
const MAX_CHARS_BODY_LINE = 32;
const MAX_CHARS_TITLE_LINE = 14;

export type TextFitResult = {
  displayText: string;
  fontSize: number;
  truncated: boolean;
};

export function clampLines(text: string, maxLines: number): string {
  const lines = text.split("\n").filter(Boolean);
  if (lines.length <= maxLines) return text;
  const kept = lines.slice(0, maxLines).join("\n");
  return kept.length < text.length ? kept.trimEnd() + "…" : kept;
}

/** Truncate at last complete word before maxChars to avoid mid-word breaks. */
function truncateAtWord(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars + 1);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace <= 0) return text.slice(0, maxChars).trim() + "…";
  return slice.slice(0, lastSpace).trim() + "…";
}

export function fitHeadline(headline: string, maxLines: number = 2): TextFitResult {
  const base = TYPOGRAPHY.HEADLINE.fontSize;
  const trimmed = headline.trim();
  const lines = trimmed.split("\n");
  if (lines.length > maxLines) {
    const joined = lines.slice(0, maxLines).join(" ");
    return { displayText: clampLines(joined, maxLines), fontSize: Math.round(base * 0.88), truncated: true };
  }
  const totalChars = trimmed.replace(/\n/g, "").length;
  let displayText = trimmed;
  let fontSize = base;
  if (totalChars > MAX_CHARS_HEADLINE * maxLines) {
    const targetLen = MAX_CHARS_HEADLINE * maxLines + 6;
    displayText = truncateAtWord(trimmed, targetLen);
    fontSize = Math.round(base * 0.83);
    return { displayText, fontSize, truncated: true };
  }
  if (totalChars > MAX_CHARS_HEADLINE) fontSize = Math.round(base * 0.88);
  return { displayText, fontSize, truncated: false };
}

export function fitBody(body: string, maxLines?: number): TextFitResult {
  const base = TYPOGRAPHY.BODY.fontSize;
  const limit = maxLines ?? TYPOGRAPHY.BODY.maxLines;
  const trimmed = body.trim();
  const lines = trimmed.split("\n");
  let displayText = lines.length <= limit ? trimmed : lines.slice(0, limit).join(" ").trim() + "…";
  let fontSize = base;
  const approxChars = displayText.replace(/\n/g, "").length;
  if (approxChars > MAX_CHARS_BODY_LINE * limit) {
    const maxChars = MAX_CHARS_BODY_LINE * limit - 1;
    displayText = truncateAtWord(displayText, maxChars);
    fontSize = Math.round(base * 0.86);
    return { displayText, fontSize, truncated: true };
  }
  if (approxChars > 60 * limit) fontSize = Math.round(base * 0.9);
  return { displayText, fontSize, truncated: displayText !== trimmed };
}

export function fitTitle(title: string, maxLines: number = 3): TextFitResult {
  const base = TYPOGRAPHY.TITLE.fontSize;
  const trimmed = title.trim();
  const lines = trimmed.split("\n");
  if (lines.length > maxLines) {
    const joined = lines.slice(0, maxLines).join("\n");
    return { displayText: joined + "…", fontSize: Math.round(base * 0.78), truncated: true };
  }
  const maxCharsPerLine = MAX_CHARS_TITLE_LINE;
  const totalChars = trimmed.replace(/\n/g, "").length;
  let fontSize = base;
  if (totalChars > maxLines * maxCharsPerLine) fontSize = Math.round(base * 0.75);
  else if (totalChars > maxLines * (maxCharsPerLine - 2)) fontSize = Math.round(base * 0.86);
  return { displayText: clampLines(trimmed, maxLines), fontSize, truncated: false };
}

export function fitHighlight(text: string, maxLines: number = 3): TextFitResult {
  const base = TYPOGRAPHY.HIGHLIGHT.fontSize;
  const trimmed = text.trim();
  const lines = trimmed.split("\n");
  let displayText = lines.length <= maxLines ? trimmed : lines.slice(0, maxLines).join(" ").trim() + "…";
  let fontSize = base;
  if (displayText.length > 90) {
    displayText = truncateAtWord(displayText, 87);
    fontSize = Math.round(base * 0.83);
    return { displayText, fontSize, truncated: true };
  }
  return { displayText, fontSize, truncated: displayText !== trimmed };
}

export function fitCta(cta: string, maxLines: number = 2): TextFitResult {
  const base = TYPOGRAPHY.CTA.fontSize;
  const trimmed = cta.trim();
  const lines = trimmed.split("\n");
  const displayText = lines.length <= maxLines ? trimmed : lines.slice(0, maxLines).join(" ").trim() + "…";
  const fontSize = lines.length > 1 || displayText.length > 45 ? Math.round(base * 0.85) : base;
  return { displayText, fontSize, truncated: displayText !== trimmed };
}
