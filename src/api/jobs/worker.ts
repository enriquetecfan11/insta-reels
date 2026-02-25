import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import * as fs from "fs";
import * as path from "path";
import type { ReelContent } from "../../utils/types";
import { getNextPending, updateJob } from "./queue";

const contentDir = path.resolve(process.cwd(), "content");
const outDir = path.resolve(process.cwd(), "out");
const entryPoint = path.resolve(process.cwd(), "src", "index.ts");

async function runRender(
  content: ReelContent,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: content.id,
    inputProps: content,
  });

  const outputPath = path.join(outDir, `${content.id}.mp4`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: content,
    pixelFormat: "yuv420p",
    onProgress: onProgress ? ({ progress }) => onProgress(progress) : undefined,
  });

  return content.id;
}

export function startWorker(): void {
  async function processNext(): Promise<void> {
    const job = getNextPending();
    if (!job) {
      setTimeout(processNext, 1000);
      return;
    }

    updateJob(job.id, { status: "rendering", progress: 0 });

    try {
      const outputId = await runRender(job.payload, (progress) => {
        updateJob(job.id, { progress });
      });
      updateJob(job.id, {
        status: "completed",
        progress: 1,
        outputId,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      updateJob(job.id, {
        status: "failed",
        error: message,
      });
    }

    setTimeout(processNext, 0);
  }

  processNext();
}
