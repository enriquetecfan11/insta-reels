import path from "node:path";
const ROOT_DIR = process.env.PROJECT_ROOT ?? process.cwd();
export function getContentDir() {
    const dir = process.env.CONTENT_DIR ?? "content";
    return path.resolve(ROOT_DIR, dir);
}
export function getOutDir() {
    const dir = process.env.OUT_DIR ?? "out";
    return path.resolve(ROOT_DIR, dir);
}
export function resolveContentFile(filename) {
    return path.join(getContentDir(), filename);
}
export function resolveOutFile(id) {
    return path.join(getOutDir(), `${id}.mp4`);
}
//# sourceMappingURL=paths.js.map