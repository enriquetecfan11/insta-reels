import type { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import type { ReelContent } from "../../utils/types";
import { validateReelContent } from "../../utils/validateReel";
import { addJob, getJob } from "../jobs/queue";

const contentDir = path.resolve(process.cwd(), "content");
const outDir = path.resolve(process.cwd(), "out");

function isContentIdBody(
  body: unknown
): body is { contentId: string } {
  return (
    typeof body === "object" &&
    body !== null &&
    "contentId" in body &&
    typeof (body as { contentId: unknown }).contentId === "string"
  );
}

function resolveContent(body: unknown): ReelContent | { error: string } {
  if (isContentIdBody(body)) {
    const contentPath = path.join(contentDir, `${body.contentId}.json`);
    if (!fs.existsSync(contentPath)) {
      return { error: `Content not found: ${body.contentId}` };
    }
    const raw = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
    return validateReelContent(raw) as ReelContent;
  }

  if (typeof body === "object" && body !== null && "id" in body && "slides" in body) {
    return validateReelContent(body) as ReelContent;
  }

  return { error: "Body must be { contentId: string } or ReelContent (id + slides)" };
}

export function postRender(req: Request, res: Response): void {
  const resolved = resolveContent(req.body);
  if ("error" in resolved) {
    res.status(400).json({ success: false, error: resolved.error });
    return;
  }

  const jobId = addJob(resolved);
  res.status(202).json({ success: true, data: { jobId } });
}

export function getJobStatus(req: Request, res: Response): void {
  const job = getJob(req.params.jobId);
  if (!job) {
    res.status(404).json({ success: false, error: "Job not found" });
    return;
  }

  const data: {
    status: string;
    progress?: number;
    error?: string;
    outputId?: string;
  } = { status: job.status };
  if (job.progress !== undefined) data.progress = job.progress;
  if (job.error !== undefined) data.error = job.error;
  if (job.outputId !== undefined) data.outputId = job.outputId;

  res.json({ success: true, data });
}

const SAFE_ID = /^[a-zA-Z0-9_-]+$/;

export function getOutput(req: Request, res: Response): void {
  const id = req.params.id;
  if (!id || !SAFE_ID.test(id)) {
    res.status(400).json({ success: false, error: "Invalid or missing output id" });
    return;
  }

  const filePath = path.join(outDir, `${id}.mp4`);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ success: false, error: "Output not found" });
    return;
  }

  res.sendFile(filePath, (err) => {
    if (err && !res.headersSent) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
}
