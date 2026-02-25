# insta-reels — Documentación

Proyecto de generación de **reels para Instagram** (1080×1920, 9:16) con [Remotion](https://www.remotion.dev/). Los vídeos se definen en JSON en `content/` y se renderizan a MP4 en `out/`.

## Entrada rápida

| Documento | Descripción |
|-----------|-------------|
| [CREAR_VIDEOS.md](../CREAR_VIDEOS.md) | Cómo crear y editar vídeos (estructura JSON, tipos de slide, comandos). |
| [LLM_ESPECIFICACION_VIDEOS.md](../LLM_ESPECIFICACION_VIDEOS.md) | Especificación para que un LLM genere el JSON de un reel. |
| [features/index.md](features/index.md) | Índice de funcionalidades documentadas (Spec-Driven Design). |

## Estructura del repositorio

- **`content/`** — Archivos JSON que definen cada reel (`id` + `slides`).
- **`out/`** — Vídeos MP4 generados (1080×1920, 30 fps).
- **`src/`** — Código Remotion: composiciones, componentes, config, validación.
- **`scripts/`** — Automatización (p. ej. `render-all.ts` para renderizar todos los JSON).
- **`docs/`** — Documentación del proyecto (este índice, features, arquitectura, etc.).

## Documentación por tema

| Carpeta | Contenido |
|---------|------------|
| [features/](features/) | Especificaciones de funcionalidades (Descripción, Requisitos, Criterios de Aceptación, Implementación). |
| [architecture/](architecture/) | Decisiones de arquitectura y diseño. |
| [setup/](setup/) | Configuración del entorno y dependencias. |
| [reference/](reference/) | Referencia de APIs, config y tipos. |
| [troubleshooting/](troubleshooting/) | Problemas frecuentes y soluciones. |
| [optimization/](optimization/) | Notas de rendimiento y optimización. |
| [audit/](audit/) | Auditoría y seguridad. |
| [migrations/](migrations/) | Cambios de esquema o datos. |
| [mcp/](mcp/) | Configuración MCP si aplica. |

## Comandos principales

- **`npm run studio`** — Abrir Remotion Studio para previsualizar y editar.
- **`npm run render`** — Renderizar el vídeo por defecto (demo).
- **`npm run render-all`** — Renderizar todos los JSON de `content/` a `out/`.

Para más detalle, ver [CREAR_VIDEOS.md](../CREAR_VIDEOS.md).
