import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import * as fs from "fs";
import * as path from "path";
import type { ReelContent } from "../src/utils/types";
import { validateReelContent } from "../src/utils/validateReel";

async function main() {
  const contentDir = path.resolve(process.cwd(), "content");
  const outDir = path.resolve(process.cwd(), "out");

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.log("No se encontraron archivos JSON en content/");
    return;
  }

  console.log(`\n🎬 Encontrados ${files.length} vídeo(s) para renderizar\n`);

  // Bundlear una sola vez para todos los renders
  console.log("📦 Generando bundle...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "src", "index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("✅ Bundle listo\n");

  let rendered = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const content = validateReelContent(raw) as ReelContent;
    const outputPath = path.join(outDir, `${content.id}.mp4`);

    console.log(
      `[${rendered + failed + 1}/${files.length}] Renderizando: ${content.id}`
    );

    try {
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: content.id,
        inputProps: content,
      });

      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: content,
        pixelFormat: "yuv420p",
        onProgress: ({ progress }) => {
          process.stdout.write(
            `\r  ⏳ Progreso: ${Math.round(progress * 100)}%  `
          );
        },
      });

      console.log(`\n  ✅ Guardado en: ${outputPath}\n`);
      rendered++;
    } catch (err) {
      console.error(`\n  ❌ Error en: ${content.id}`);
      console.error(err);
      failed++;
    }
  }

  console.log(
    `\n🏁 Terminado. ${rendered} renderizado(s), ${failed} error(es).`
  );
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
