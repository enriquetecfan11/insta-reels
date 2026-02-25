import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { getById, getContentFilePath } from "./contentService.js";
import { validateVideoDefinition } from "../validators/schema.js";
import { resolveOutFile, getOutDir } from "../utils/paths.js";
import { appendLog } from "../jobs/jobQueue.js";
import { logger } from "../utils/logger.js";
async function ensureOutDir() {
    const dir = getOutDir();
    await fs.mkdir(dir, { recursive: true });
}
export async function renderById(id, jobId) {
    const video = await getById(id);
    if (!video) {
        return { success: false, error: `Video definition not found for id: ${id}` };
    }
    const validation = validateVideoDefinition(video.data);
    if (!validation.ok) {
        const summary = validation.errors
            ?.map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
        return {
            success: false,
            error: `Validation failed: ${summary}`,
        };
    }
    await ensureOutDir();
    const propsPath = getContentFilePath(video.filename);
    const outputPath = resolveOutFile(id);
    return new Promise((resolve) => {
        const args = [
            "remotion",
            "render",
            id,
            `--props=${propsPath}`,
            `--output=${outputPath}`,
        ];
        const cwd = process.env.PROJECT_ROOT ?? process.cwd();
        logger.info({ id, jobId, args: ["npx", ...args], cwd }, "Spawning render");
        appendLog(jobId, `[render] npx ${args.join(" ")}`);
        const child = spawn("npx", args, {
            cwd,
            shell: true,
            env: { ...process.env },
        });
        child.stdout?.on("data", (chunk) => {
            const lines = chunk.toString().split("\n").filter(Boolean);
            for (const line of lines)
                appendLog(jobId, `[stdout] ${line}`);
        });
        child.stderr?.on("data", (chunk) => {
            const lines = chunk.toString().split("\n").filter(Boolean);
            for (const line of lines)
                appendLog(jobId, `[stderr] ${line}`);
        });
        child.on("error", (err) => {
            appendLog(jobId, `[error] ${err.message}`);
            resolve({ success: false, error: err.message });
        });
        child.on("close", async (code) => {
            appendLog(jobId, `[render] Process exited with code ${code}`);
            if (code !== 0) {
                resolve({
                    success: false,
                    error: `Render process exited with code ${code}`,
                });
                return;
            }
            try {
                await fs.access(outputPath);
                resolve({ success: true, outputPath });
            }
            catch {
                resolve({
                    success: false,
                    error: "Render process exited successfully but output file not found",
                });
            }
        });
    });
}
//# sourceMappingURL=renderService.js.map