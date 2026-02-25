import type { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import type { ReelContent, Slide } from "../../utils/types";
import { validateReelContent } from "../../utils/validateReel";

const contentDir = path.resolve(process.cwd(), "content");

function getLabel(slides: Slide[]): string | undefined {
  const first = slides[0];
  if (!first) return undefined;
  if (first.type === "intro" && "title" in first) return first.title;
  if (first.type === "concept" && "headline" in first) return first.headline;
  if (first.type === "highlight" && "text" in first) return first.text;
  return undefined;
}

export function listContent(_req: Request, res: Response): void {
  try {
    if (!fs.existsSync(contentDir)) {
      res.json({ success: true, data: [] });
      return;
    }

    const files = fs
      .readdirSync(contentDir)
      .filter((f) => f.endsWith(".json"))
      .sort();

    const items: { id: string; label?: string }[] = files.map((file) => {
      const filePath = path.join(contentDir, file);
      const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const content = validateReelContent(raw) as ReelContent;
      return {
        id: content.id,
        label: getLabel(content.slides),
      };
    });

    res.json({ success: true, data: items });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: message });
  }
}
