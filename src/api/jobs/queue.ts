import { randomUUID } from "crypto";
import type { ReelContent } from "../../utils/types";

export type JobStatus = "pending" | "rendering" | "completed" | "failed";

export interface Job {
  id: string;
  status: JobStatus;
  payload: ReelContent;
  progress?: number;
  error?: string;
  outputId?: string;
  createdAt: number;
}

const jobs = new Map<string, Job>();

export function addJob(payload: ReelContent): string {
  const id = randomUUID();
  const job: Job = {
    id,
    status: "pending",
    payload,
    createdAt: Date.now(),
  };
  jobs.set(id, job);
  return id;
}

export function getJob(jobId: string): Job | undefined {
  return jobs.get(jobId);
}

export function getNextPending(): Job | undefined {
  for (const job of jobs.values()) {
    if (job.status === "pending") return job;
  }
  return undefined;
}

export function updateJob(
  jobId: string,
  updates: Partial<Pick<Job, "status" | "progress" | "error" | "outputId">>
): void {
  const job = jobs.get(jobId);
  if (!job) return;
  if (updates.status !== undefined) job.status = updates.status;
  if (updates.progress !== undefined) job.progress = updates.progress;
  if (updates.error !== undefined) job.error = updates.error;
  if (updates.outputId !== undefined) job.outputId = updates.outputId;
}
