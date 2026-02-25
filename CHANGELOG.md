# Changelog

Todos los cambios notables del proyecto se documentan en este archivo. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased]

- (Ver [0.2.0] para las últimas novedades.)

---

## [0.2.0] - 2025-02

### Added

- **Slide tipo `versus`** para comparaciones lado a lado (ej: Chatbot vs Agente). Campos: `leftLabel`, `leftEmoji`, `leftSubtext`, `rightLabel`, `rightEmoji`, `rightSubtext`. Animación escalonada: entra izquierda → "VS" → derecha.
- **Revelado de texto animado** (`animateText`): en intro, concept y highlight se puede usar `"letter"` (letra a letra), `"word"`, `"line"`, `"phrase"` o `"block"`. Mismo spring (stiffness 200, damping 15) por segmento.
- **B-roll opcional** (`videoBackground`): en cualquier slide, ruta a un clip en `public/`; se reproduce detrás del gradiente para dar movimiento.
- **CTA con palabra clave** (`ctaCommentKeyword`): en outro, resalta la palabra que el usuario debe comentar (pill + color accent).
- **Animaciones con rebote**: preset `BOUNCE_STIFFNESS: 200`, `BOUNCE_DAMPING: 15` en iconos y textos; salida espejo de la entrada para loop perfecto.
- **Fondo con movimiento**: gradiente con ángulo animado (sin/cos) para que no haya frames estáticos.
- **Estética premium**: drop-shadow en iconos (`SHADOWS.ICON_DROP_SHADOW`), safe area con `maxWidth` en `SlideShell`; zoom sutil en iconos (`subtleZoom` en `SlideImage`).
- Estructura **Spec-Driven Design (SDD):**
  - `docs/` con índice principal (`docs/index.md`) y subdirectorios.
  - `AGENTS.md` con convenciones y flujo SDD.
  - `CHANGELOG.md` (este archivo).

### Changed

- **Tipografía por defecto** más pequeña en `reelConfig.ts`: title 100 px (antes 128), headline 78 (100), body 56 (70), cta 56 (70), highlight 78 (100).
- Validación: tipos de slide incluyen `versus`; se aceptan `animateText`, `videoBackground`, `ctaCommentKeyword` donde aplica.

### Deprecated

- Ninguno.

### Removed

- Ninguno.

### Fixed

- Ninguno.

### Security

- Ninguno.

---

*Las entradas anteriores al SDD pueden documentarse aquí si se desea mantener historial de versiones.*
