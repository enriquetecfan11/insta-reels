import { getNextQueued, countRunning, startJob, finishJob, appendLog, updateBatchResult, } from "./jobQueue.js";
import { renderById } from "../services/renderService.js";
import { logger } from "../utils/logger.js";
const CONCURRENCY = Math.max(1, Number(process.env.RENDER_CONCURRENCY) || 1);
const POLL_INTERVAL_MS = 1000;
let running = false;
export function startWorker() {
    if (running)
        return;
    running = true;
    logger.info({ concurrency: CONCURRENCY }, "Render worker started");
    tick();
}
function tick() {
    if (!running)
        return;
    while (countRunning() < CONCURRENCY) {
        const job = getNextQueued();
        if (!job)
            break;
        processJob(job);
    }
    setTimeout(tick, POLL_INTERVAL_MS);
}
async function processJob(job) {
    startJob(job.jobId);
    logger.info({ jobId: job.jobId, type: job.type }, "Job started");
    try {
        if (job.type === "single" && "id" in job.payload && job.payload.id) {
            await processSingleJob(job);
        }
        else if (job.type === "batch" && "ids" in job.payload && job.payload.ids) {
            await processBatchJob(job);
        }
        else {
            finishJob(job.jobId, { error: "Invalid job payload" });
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        appendLog(job.jobId, `[worker] Unhandled error: ${message}`);
        finishJob(job.jobId, { error: message });
    }
    logger.info({ jobId: job.jobId, status: job.status }, "Job finished");
}
async function processSingleJob(job) {
    const id = job.payload.id;
    const result = await renderById(id, job.jobId);
    finishJob(job.jobId, {
        output: result.success ? result.outputPath : undefined,
        error: result.success ? undefined : result.error,
    });
}
async function processBatchJob(job) {
    const ids = job.payload.ids;
    let hasError = false;
    for (const id of ids) {
        appendLog(job.jobId, `[batch] Starting render for ${id}`);
        updateBatchResult(job.jobId, id, { status: "pending" });
        const result = await renderById(id, job.jobId);
        if (result.success) {
            updateBatchResult(job.jobId, id, {
                status: "success",
                output: result.outputPath,
            });
            appendLog(job.jobId, `[batch] ${id} completed successfully`);
        }
        else {
            hasError = true;
            updateBatchResult(job.jobId, id, {
                status: "failed",
                error: result.error,
            });
            appendLog(job.jobId, `[batch] ${id} failed: ${result.error}`);
        }
    }
    const successCount = job.results?.filter((r) => r.status === "success").length ?? 0;
    const failCount = job.results?.filter((r) => r.status === "failed").length ?? 0;
    finishJob(job.jobId, {
        output: `Batch complete: ${successCount} success, ${failCount} failed out of ${ids.length}`,
        error: hasError ? `${failCount} render(s) failed` : undefined,
    });
}
//# sourceMappingURL=worker.js.map