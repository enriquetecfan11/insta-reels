# Convenciones del repositorio (insta-reels)

Este documento define convenciones y flujos de trabajo para agentes y desarrolladores que trabajen en el proyecto.

## Descripción del proyecto

- **insta-reels** genera reels para Instagram (1080×1920, 9:16) con [Remotion](https://www.remotion.dev/).
- Cada vídeo se define en un **JSON** en `content/` (`id` + array `slides`). No es obligatorio tocar código para añadir un vídeo nuevo: solo crear el JSON y renderizar.
- Salida: MP4 en `out/`, listos para subir a Instagram.

## Estructura relevante

| Ruta | Uso |
|------|-----|
| `content/*.json` | Definición de cada reel (id, slides con type, duration, textos). |
| `out/` | Vídeos MP4 generados. |
| `src/` | Código Remotion: composiciones, UI, config (`reelConfig.ts`), tipos y validación. |
| `scripts/` | Scripts de automatización (p. ej. `render-all.ts`). |
| `docs/` | Documentación (índice en `docs/index.md`, features en `docs/features/`). |

## Documentación de referencia

- **Crear/editar vídeos:** [CREAR_VIDEOS.md](docs/setup/CREAR_VIDEOS.md) — Estructura JSON, tipos de slide (intro, concept, highlight, versus, outro), opciones `animateText`, `videoBackground`, `ctaCommentKeyword`, comandos.
- **Especificación para LLMs:** [LLM_ESPECIFICACION_VIDEOS.md](docs/setup/LLM_ESPECIFICACION_VIDEOS.md) — Formato JSON que debe producir un LLM al generar un reel.
- **Índice general:** [docs/index.md](docs/index.md) — Entrada a toda la documentación.
- **Features (SDD):** [docs/features/index.md](docs/features/index.md) — Índice de funcionalidades especificadas.

## Spec-Driven Design (SDD)

El proyecto sigue un flujo **spec-driven**:

1. **Antes de implementar:** Validar con `/validate` que las specs estén completas.
2. **Nueva funcionalidad:** Usar `/new-feature <nombre>` para crear la plantilla en `docs/features/`, rellenar las 4 secciones (Descripción, Requisitos, Criterios de Aceptación, Implementación).
3. **Revisiones:** Comprobar que la implementación cumple la spec; mantener el CHANGELOG actualizado.
4. **Estado de documentación:** Usar `/check-docs` para un resumen rápido.

Las features se nombran en **PascalCase** en los archivos (ej: `docs/features/UserAuthentication.md`), excepto `README.md` y `AGENTS.md`.

## Comandos del proyecto

- `npm run studio` — Abrir Remotion Studio (previsualizar y probar).
- `npm run render` — Renderizar el vídeo por defecto.
- `npm run render-all` — Renderizar todos los JSON de `content/` a `out/`.

Para renderizar un vídeo concreto:  
`npx remotion render <id> --props=content/<archivo>.json`  
donde `<id>` es el `id` del JSON.

## Convenciones de código

- **TypeScript** en `src/` y `scripts/`.
- Configuración central de tipografía y tamaños en `src/config/reelConfig.ts`; evitar hardcodear tamaños en componentes cuando sea posible.
- Validación del contenido en `src/utils/validateReel.ts`; los JSON se validan al cargar (Studio y render) con valores por defecto y warnings si falta algo.

## Changelog

Mantener [CHANGELOG.md](CHANGELOG.md) actualizado con los cambios relevantes (nuevas features, cambios de formato JSON, scripts, documentación).
