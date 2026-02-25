/**
 * Configuración central del reel: aquí puedes tocar el tamaño de todo
 * sin buscar en componentes. Cambios aquí afectan a todas las slides.
 *
 * scale: multiplicador global (1 = actual). Ej: 1.1 = todo un 10% más grande.
 */

export const REEL_CONFIG = {
  /** Multiplicador global. Afecta tipografía, tamaños de emoji y espaciados. */
  scale: 1,

  /** Tamaños de fuente (px). */
  typography: {
    title: 128,
    headline: 100,
    body: 70,
    cta: 70,
    highlight: 100,
    /** Número máximo de líneas del body (concept slides). */
    bodyMaxLines: 4,
  },

  /** Tamaños de elementos (px): círculo emoji, comilla decorativa, etc. */
  sizes: {
    emojiIntro: 500,
    emojiConcept: 260,
    outroEmoji: 500,
    quoteMark: 500,
  },

  /** Espaciado y layout (px). contentOffsetTop negativo = contenido más arriba. */
  spacing: {
    marginH: 32,
    safeTop: 120,
    safeBottom: 180,
    contentOffsetTop: -100,
    gapHeader: 44,
    gapBody: 32,
    paddingBlock: 16,
  },

  /** Pesos de fuente (400 = normal, 700 = bold, 800 = extra bold). */
  fontWeight: {
    title: 800,
    headline: 800,
    body: 500,
    cta: 800,
    highlight: 800,
  },

  /** Interlineado (1.1 = muy compacto, 1.5 = más aire). */
  lineHeight: {
    title: 1.08,
    headline: 1.1,
    body: 1.2,
    cta: 1.25,
    highlight: 1.35,
  },
} as const;

function applyScale(value: number, scale: number): number {
  return Math.round(value * scale);
}

/** Valores ya aplicando REEL_CONFIG.scale (para usar en tokens/componentes). */
export function getScaledConfig() {
  const s = REEL_CONFIG.scale;
  return {
    typography: {
      title: applyScale(REEL_CONFIG.typography.title, s),
      headline: applyScale(REEL_CONFIG.typography.headline, s),
      body: applyScale(REEL_CONFIG.typography.body, s),
      cta: applyScale(REEL_CONFIG.typography.cta, s),
      highlight: applyScale(REEL_CONFIG.typography.highlight, s),
      bodyMaxLines: REEL_CONFIG.typography.bodyMaxLines,
    },
    sizes: {
      emojiIntro: applyScale(REEL_CONFIG.sizes.emojiIntro, s),
      emojiConcept: applyScale(REEL_CONFIG.sizes.emojiConcept, s),
      outroEmoji: applyScale(REEL_CONFIG.sizes.outroEmoji, s),
      quoteMark: applyScale(REEL_CONFIG.sizes.quoteMark, s),
    },
    spacing: {
      marginH: applyScale(REEL_CONFIG.spacing.marginH, s),
      safeTop: applyScale(REEL_CONFIG.spacing.safeTop, s),
      safeBottom: applyScale(REEL_CONFIG.spacing.safeBottom, s),
      contentOffsetTop: Math.round(REEL_CONFIG.spacing.contentOffsetTop * s),
      gapHeader: applyScale(REEL_CONFIG.spacing.gapHeader, s),
      gapBody: applyScale(REEL_CONFIG.spacing.gapBody, s),
      paddingBlock: applyScale(REEL_CONFIG.spacing.paddingBlock, s),
    },
    fontWeight: REEL_CONFIG.fontWeight,
    lineHeight: REEL_CONFIG.lineHeight,
  };
}
