import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/logger.js";
import { startWorker } from "./jobs/worker.js";
import healthRoutes from "./routes/health.js";
import videosRoutes from "./routes/videos.js";
import rendersRoutes from "./routes/renders.js";
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";
const BODY_LIMIT = process.env.BODY_LIMIT ?? "100kb";
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const app = express();
app.use(cors({
    origin: CORS_ORIGIN === "*" ? "*" : CORS_ORIGIN.split(",").map((o) => o.trim()),
}));
app.use(express.json({ limit: BODY_LIMIT }));
app.use(rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "TooManyRequests",
        message: "Rate limit exceeded. Try again later.",
    },
}));
app.use((req, _res, next) => {
    const start = Date.now();
    _res.on("finish", () => {
        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: _res.statusCode,
            ms: Date.now() - start,
        }, "request");
    });
    next();
});
app.use(healthRoutes);
app.use(videosRoutes);
app.use(rendersRoutes);
app.use((_req, res) => {
    res.status(404).json({ error: "NotFound", message: "Route not found" });
});
app.use((err, _req, res, _next) => {
    logger.error({ err }, "Unhandled error");
    const isProd = process.env.NODE_ENV === "production";
    res.status(500).json({
        error: "InternalServerError",
        message: isProd ? "Something went wrong" : err.message,
    });
});
app.listen(PORT, () => {
    logger.info({ port: PORT }, "API server listening");
    startWorker();
});
//# sourceMappingURL=index.js.map