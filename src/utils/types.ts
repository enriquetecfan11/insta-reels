/** Transition between this slide and the next. */
export type SlideTransition = "crossfade" | "wipe" | "push";

/** Background variant per slide. */
export type BackgroundVariant = "default" | "deep" | "glow";

/** How to reveal text: block = all at once, letter/word/line/phrase = staggered bounce. */
export type AnimateTextMode = "letter" | "word" | "line" | "phrase" | "block";

export type SlideIntroProps = {
  type: "intro";
  emoji?: string;
  image?: string; // path relativo a public/, ej: "images/robot.png"
  title: string;
  duration: number; // segundos
  transition?: SlideTransition;
  background?: BackgroundVariant;
  animateText?: AnimateTextMode;
  videoBackground?: string;
};

export type SlideConceptProps = {
  type: "concept";
  emoji?: string;
  image?: string;
  headline: string;
  body: string;
  duration: number;
  transition?: SlideTransition;
  background?: BackgroundVariant;
  animateText?: AnimateTextMode;
  videoBackground?: string;
};

export type SlideHighlightProps = {
  type: "highlight";
  text: string;
  duration: number;
  transition?: SlideTransition;
  background?: BackgroundVariant;
  animateText?: AnimateTextMode;
  videoBackground?: string;
};

export type SlideOutroProps = {
  type: "outro";
  cta: string;
  duration: number;
  transition?: SlideTransition;
  background?: BackgroundVariant;
  videoBackground?: string;
  /** If set, the CTA text is rendered with this word highlighted (e.g. "AGENTE"). */
  ctaCommentKeyword?: string;
};

export type SlideVersusProps = {
  type: "versus";
  leftLabel: string;
  leftEmoji: string;
  leftSubtext: string;
  rightLabel: string;
  rightEmoji: string;
  rightSubtext: string;
  duration: number;
  transition?: SlideTransition;
  background?: BackgroundVariant;
  videoBackground?: string;
};

export type Slide =
  | SlideIntroProps
  | SlideConceptProps
  | SlideHighlightProps
  | SlideOutroProps
  | SlideVersusProps;

export interface ReelContent extends Record<string, unknown> {
  id: string; // Nombre del archivo de salida, ej: "001-que-es-ia"
  slides: Slide[];
}
