import { randomUUID } from "node:crypto";
const MAX_LOG_LINES = 500;
const jobs = new Map();
export function createJob(type, payload) {
    const job = {
        jobId: randomUUID(),
        type,
        payload,
        status: "queued",
        logs: [],
        createdAt: new Date().toISOString(),
    };
    if (type === "batch" && "ids" in payload) {
        job.results = payload.ids.map((id) => ({ id, status: "pending" }));
    }
    jobs.set(job.jobId, job);
    return job;
}
export function getJob(jobId) {
    return jobs.get(jobId);
}
export function findJobByVideoId(videoId, statuses = ["queued", "running"]) {
    for (const job of jobs.values()) {
        if (job.type === "single" &&
            job.payload.id === videoId &&
            statuses.includes(job.status)) {
            return job;
        }
    }
    return undefined;
}
export function startJob(jobId) {
    const job = jobs.get(jobId);
    if (job) {
        job.status = "running";
        job.startedAt = new Date().toISOString();
    }
}
export function finishJob(jobId, result) {
    const job = jobs.get(jobId);
    if (!job)
        return;
    job.status = result.error ? "failed" : "success";
    job.finishedAt = new Date().toISOString();
    if (result.output)
        job.output = result.output;
    if (result.error)
        job.error = result.error;
}
export function appendLog(jobId, line) {
    const job = jobs.get(jobId);
    if (!job)
        return;
    job.logs.push(line);
    if (job.logs.length > MAX_LOG_LINES) {
        job.logs.splice(0, job.logs.length - MAX_LOG_LINES);
    }
}
export function updateBatchResult(jobId, videoId, update) {
    const job = jobs.get(jobId);
    if (!job?.results)
        return;
    const entry = job.results.find((r) => r.id === videoId);
    if (entry)
        Object.assign(entry, update);
}
export function getNextQueued() {
    for (const job of jobs.values()) {
        if (job.status === "queued")
            return job;
    }
    return undefined;
}
export function countRunning() {
    let count = 0;
    for (const job of jobs.values()) {
        if (job.status === "running")
            count++;
    }
    return count;
}
//# sourceMappingURL=jobQueue.js.map