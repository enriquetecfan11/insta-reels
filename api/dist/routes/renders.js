import { Router } from "express";
import { z } from "zod";
import { createJob, getJob, findJobByVideoId, } from "../jobs/jobQueue.js";
import { getById, listVideos } from "../services/contentService.js";
import { validateVideoDefinition } from "../validators/schema.js";
const router = Router();
const renderBodySchema = z.object({
    id: z.string().min(1, "id is required"),
});
router.post("/renders", async (req, res, next) => {
    try {
        const parsed = renderBodySchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                error: "BadRequest",
                details: parsed.error.issues,
            });
            return;
        }
        const { id } = parsed.data;
        const force = req.query.force === "true";
        const video = await getById(id);
        if (!video) {
            res.status(404).json({
                error: "NotFound",
                message: `Video definition '${id}' not found in content directory`,
            });
            return;
        }
        const validation = validateVideoDefinition(video.data);
        if (!validation.ok) {
            res.status(422).json({
                error: "ValidationFailed",
                message: "Video definition has validation errors. Fix them before rendering.",
                details: validation.errors,
            });
            return;
        }
        if (!force) {
            const existing = findJobByVideoId(id);
            if (existing) {
                res.status(200).json({
                    jobId: existing.jobId,
                    status: existing.status,
                    message: "A render job for this video already exists. Use ?force=true to create a new one.",
                });
                return;
            }
        }
        const job = createJob("single", { id });
        res.status(201).json({ jobId: job.jobId, status: job.status });
    }
    catch (err) {
        next(err);
    }
});
router.get("/renders/:jobId", (req, res) => {
    const job = getJob(req.params.jobId);
    if (!job) {
        res.status(404).json({
            error: "NotFound",
            message: `Job '${req.params.jobId}' not found`,
        });
        return;
    }
    res.json(job);
});
router.post("/renders/all", async (_req, res, next) => {
    try {
        const videos = await listVideos();
        if (videos.length === 0) {
            res.status(404).json({
                error: "NotFound",
                message: "No video definitions found in content directory",
            });
            return;
        }
        const ids = videos.map((v) => v.id);
        const job = createJob("batch", { ids });
        res
            .status(201)
            .json({ jobId: job.jobId, status: job.status, videoCount: ids.length });
    }
    catch (err) {
        next(err);
    }
});
router.get("/renders/all/:jobId", (req, res) => {
    const job = getJob(req.params.jobId);
    if (!job) {
        res.status(404).json({
            error: "NotFound",
            message: `Batch job '${req.params.jobId}' not found`,
        });
        return;
    }
    res.json(job);
});
export default router;
//# sourceMappingURL=renders.js.map