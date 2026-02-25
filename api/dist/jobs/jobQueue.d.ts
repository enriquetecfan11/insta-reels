export type JobStatus = "queued" | "running" | "success" | "failed";
export type JobType = "single" | "batch";
export type SinglePayload = {
    id: string;
};
export type BatchPayload = {
    ids: string[];
};
export type Job = {
    jobId: string;
    type: JobType;
    payload: SinglePayload | BatchPayload;
    status: JobStatus;
    logs: string[];
    createdAt: string;
    startedAt?: string;
    finishedAt?: string;
    output?: string;
    error?: string;
    results?: {
        id: string;
        status: string;
        output?: string;
        error?: string;
    }[];
};
export declare function createJob(type: "single", payload: SinglePayload): Job;
export declare function createJob(type: "batch", payload: BatchPayload): Job;
export declare function getJob(jobId: string): Job | undefined;
export declare function findJobByVideoId(videoId: string, statuses?: JobStatus[]): Job | undefined;
export declare function startJob(jobId: string): void;
export declare function finishJob(jobId: string, result: {
    output?: string;
    error?: string;
}): void;
export declare function appendLog(jobId: string, line: string): void;
export declare function updateBatchResult(jobId: string, videoId: string, update: {
    status?: string;
    output?: string;
    error?: string;
}): void;
export declare function getNextQueued(): Job | undefined;
export declare function countRunning(): number;
//# sourceMappingURL=jobQueue.d.ts.map