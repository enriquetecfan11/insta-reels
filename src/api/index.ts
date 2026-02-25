import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { startWorker } from "./jobs/worker";
import { listContent } from "./routes/content";
import { health } from "./routes/health";
import { getJobStatus, getOutput, postRender } from "./routes/render";

const PORT = Number(process.env.PORT) || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const JSON_LIMIT = process.env.JSON_LIMIT ?? "1mb";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);
app.use(express.json({ limit: JSON_LIMIT }));
app.use(
  rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", health);
app.get("/content", listContent);
app.post("/render", postRender);
app.get("/jobs/:jobId", getJobStatus);
app.get("/output/:id", getOutput);

startWorker();

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
