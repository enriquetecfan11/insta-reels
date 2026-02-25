import { z } from "zod";
const ID_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
const transitionSchema = z.enum(["crossfade", "wipe", "push"]);
const backgroundSchema = z.enum(["default", "deep", "glow"]);
const animateTextSchema = z.enum(["letter", "word", "line", "phrase", "block"]);
const sharedOptionals = {
    transition: transitionSchema.optional(),
    background: backgroundSchema.optional(),
    videoBackground: z.string().optional(),
};
const slideIntroSchema = z.object({
    type: z.literal("intro"),
    title: z.string().min(1, "title is required"),
    duration: z.number().positive("duration must be > 0"),
    emoji: z.string().optional(),
    image: z.string().optional(),
    animateText: animateTextSchema.optional(),
    ...sharedOptionals,
});
const slideConceptSchema = z.object({
    type: z.literal("concept"),
    headline: z.string().min(1, "headline is required"),
    body: z.string().min(1, "body is required"),
    duration: z.number().positive("duration must be > 0"),
    emoji: z.string().optional(),
    image: z.string().optional(),
    animateText: animateTextSchema.optional(),
    ...sharedOptionals,
});
const slideHighlightSchema = z.object({
    type: z.literal("highlight"),
    text: z.string().min(1, "text is required"),
    duration: z.number().positive("duration must be > 0"),
    animateText: animateTextSchema.optional(),
    ...sharedOptionals,
});
const slideVersusSchema = z.object({
    type: z.literal("versus"),
    leftLabel: z.string().min(1, "leftLabel is required"),
    leftEmoji: z.string().min(1, "leftEmoji is required"),
    leftSubtext: z.string().min(1, "leftSubtext is required"),
    rightLabel: z.string().min(1, "rightLabel is required"),
    rightEmoji: z.string().min(1, "rightEmoji is required"),
    rightSubtext: z.string().min(1, "rightSubtext is required"),
    duration: z.number().positive("duration must be > 0"),
    ...sharedOptionals,
});
const slideOutroSchema = z.object({
    type: z.literal("outro"),
    cta: z.string().min(1, "cta is required"),
    duration: z.number().positive("duration must be > 0"),
    ctaCommentKeyword: z.string().optional(),
    ...sharedOptionals,
});
const slideSchema = z.discriminatedUnion("type", [
    slideIntroSchema,
    slideConceptSchema,
    slideHighlightSchema,
    slideVersusSchema,
    slideOutroSchema,
]);
export const VideoDefinitionSchema = z
    .object({
    id: z
        .string()
        .min(1, "id is required")
        .regex(ID_REGEX, "id must be lowercase alphanumeric with hyphens (e.g. 001-my-video)"),
    slides: z.array(slideSchema).min(1, "at least one slide is required"),
})
    .superRefine((data, ctx) => {
    if (data.slides[0]?.type !== "intro") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'First slide must be of type "intro"',
            path: ["slides", 0, "type"],
        });
    }
    const last = data.slides[data.slides.length - 1];
    if (last?.type !== "outro") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Last slide must be of type "outro"',
            path: ["slides", data.slides.length - 1, "type"],
        });
    }
});
export function validateVideoDefinition(raw) {
    const result = VideoDefinitionSchema.safeParse(raw);
    if (result.success) {
        return { ok: true, data: result.data };
    }
    return { ok: false, errors: result.error.issues };
}
//# sourceMappingURL=schema.js.map