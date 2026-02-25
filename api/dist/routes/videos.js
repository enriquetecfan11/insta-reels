import { Router } from "express";
import fs from "node:fs";
import { listVideos, getById } from "../services/contentService.js";
import { validateVideoDefinition } from "../validators/schema.js";
import { resolveOutFile } from "../utils/paths.js";
const router = Router();
router.get("/videos", async (_req, res, next) => {
    try {
        const videos = await listVideos();
        res.json(videos);
    }
    catch (err) {
        next(err);
    }
});
router.get("/videos/:id", async (req, res, next) => {
    try {
        const video = await getById(req.params.id);
        if (!video) {
            res
                .status(404)
                .json({ error: "NotFound", message: `Video '${req.params.id}' not found` });
            return;
        }
        const validation = validateVideoDefinition(video.data);
        res.json({
            ...video.data,
            validation: validation.ok
                ? { ok: true }
                : { ok: false, errors: validation.errors },
        });
    }
    catch (err) {
        next(err);
    }
});
router.get("/videos/:id/file", (req, res) => {
    const filePath = resolveOutFile(req.params.id);
    if (!fs.existsSync(filePath)) {
        res.status(404).json({
            error: "NotFound",
            message: `Rendered file for '${req.params.id}' not found. Render it first with POST /renders.`,
        });
        return;
    }
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="${req.params.id}.mp4"`);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
});
export default router;
//# sourceMappingURL=videos.js.map