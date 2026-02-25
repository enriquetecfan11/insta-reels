import fs from "node:fs/promises";
import path from "node:path";
import { getContentDir, resolveContentFile } from "../utils/paths.js";
import { logger } from "../utils/logger.js";
async function readJsonFile(filePath) {
    try {
        const raw = await fs.readFile(filePath, "utf-8");
        return JSON.parse(raw);
    }
    catch (err) {
        logger.warn({ filePath, err }, "Failed to read/parse JSON file");
        return null;
    }
}
export async function listVideos() {
    const dir = getContentDir();
    let entries;
    try {
        entries = await fs.readdir(dir);
    }
    catch {
        logger.warn({ dir }, "Content directory not found");
        return [];
    }
    const jsonFiles = entries.filter((f) => f.endsWith(".json")).sort();
    const items = [];
    for (const filename of jsonFiles) {
        const data = await readJsonFile(path.join(dir, filename));
        if (data && typeof data === "object" && !Array.isArray(data)) {
            const id = typeof data.id === "string" ? data.id : "";
            const slides = Array.isArray(data.slides) ? data.slides : [];
            if (id) {
                items.push({ id, filename, slidesCount: slides.length });
            }
            else {
                logger.warn({ filename }, "JSON file missing 'id' field, skipping");
            }
        }
    }
    return items;
}
export async function getById(id) {
    const dir = getContentDir();
    let entries;
    try {
        entries = await fs.readdir(dir);
    }
    catch {
        return null;
    }
    const jsonFiles = entries.filter((f) => f.endsWith(".json")).sort();
    for (const filename of jsonFiles) {
        const data = await readJsonFile(path.join(dir, filename));
        if (data && typeof data === "object" && !Array.isArray(data) && data.id === id) {
            return { filename, data };
        }
    }
    return null;
}
export function getContentFilePath(filename) {
    return resolveContentFile(filename);
}
//# sourceMappingURL=contentService.js.map