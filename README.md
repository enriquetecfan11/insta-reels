# insta-reels

<div style="display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/version-0.1.0-green.svg" alt="Version">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs">
</div>

> Generate Instagram Reels (1080×1920, 9:16) from JSON. Define slides in `content/`, render to MP4 with Remotion—no code changes needed for new videos.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Authors](#-authors)

## ✨ Features

- **JSON-driven videos** — Each reel is a single JSON file in `content/` (`id` + `slides`). Add new videos without touching code.
- **Instagram-ready layout** — Safe areas for overlays (top/bottom), 1080×1920 px, 30 fps, MP4 output in `out/`.
- **Four slide types** — Intro (title + emoji/image), Concept (headline + body), Highlight (quote), Outro (CTA). Multi-line body text with `\n`.
- **Central config** — Typography, sizes, and spacing in `src/config/reelConfig.ts`; tune once, apply everywhere.
- **Transitions & backgrounds** — Per-slide options: transitions (`crossfade`, `wipe`, `push`) and backgrounds (`default`, `deep`, `glow`).
- **Validation** — Missing fields get defaults and a console warning; renders don’t fail.
- **Remotion Studio** — Preview and tweak before rendering.
- **Batch render** — `npm run render-all` to render every JSON in `content/` to `out/`.
- **Spec-Driven Design** — Project docs in `docs/` with feature specs and conventions (see [AGENTS.md](AGENTS.md)).

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Video:** [Remotion](https://www.remotion.dev/) 4.x — React-based video generation
- **UI:** React 18, TypeScript 5
- **Remotion packages:** `@remotion/animated-emoji`, `animation-utils`, `bundler`, `cli`, `google-fonts`, `mcp`, `renderer`, `transitions`
- **Scripts:** tsx (TypeScript execution)

## 🚀 Quick Start

```bash
npm install
npm run studio    # Preview in browser
npm run render    # Render default video
npm run render-all # Render all JSONs in content/ → out/
```

- **New video:** Add `content/NNN-your-topic.json` (see [CREAR_VIDEOS.md](CREAR_VIDEOS.md) for JSON structure).
- **Single render:** `npx remotion render <id> --props=content/<file>.json` → `out/<id>.mp4`.

## 📚 Documentation

| Doc | Description |
|-----|-------------|
| [CREAR_VIDEOS.md](CREAR_VIDEOS.md) | How to create and edit videos (JSON structure, slide types, commands). |
| [LLM_ESPECIFICACION_VIDEOS.md](LLM_ESPECIFICACION_VIDEOS.md) | JSON spec for LLMs to generate reel content. |
| [docs/index.md](docs/index.md) | Full documentation index (architecture, setup, troubleshooting). |
| [AGENTS.md](AGENTS.md) | Repo conventions and Spec-Driven Design workflow. |

## 🗺️ Roadmap

- Expand slide types and layout options as needed.
- Optional templates and presets for common reel formats.
- See [docs/](docs/) and [CHANGELOG.md](CHANGELOG.md) for updates.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

**Enrique Rodriguez Vela** - *Full-stack Development*
- GitHub: [@enriquetecfan11](https://github.com/enriquetecfan11)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/enriquetecfan11">Enrique Rodriguez Vela</a>
</div>
