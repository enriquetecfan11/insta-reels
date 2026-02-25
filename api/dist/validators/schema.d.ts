import { z } from "zod";
export declare const VideoDefinitionSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    slides: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        transition: z.ZodOptional<z.ZodEnum<["crossfade", "wipe", "push"]>>;
        background: z.ZodOptional<z.ZodEnum<["default", "deep", "glow"]>>;
        videoBackground: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"intro">;
        title: z.ZodString;
        duration: z.ZodNumber;
        emoji: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        animateText: z.ZodOptional<z.ZodEnum<["letter", "word", "line", "phrase", "block"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }, {
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }>, z.ZodObject<{
        transition: z.ZodOptional<z.ZodEnum<["crossfade", "wipe", "push"]>>;
        background: z.ZodOptional<z.ZodEnum<["default", "deep", "glow"]>>;
        videoBackground: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"concept">;
        headline: z.ZodString;
        body: z.ZodString;
        duration: z.ZodNumber;
        emoji: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        animateText: z.ZodOptional<z.ZodEnum<["letter", "word", "line", "phrase", "block"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }, {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }>, z.ZodObject<{
        transition: z.ZodOptional<z.ZodEnum<["crossfade", "wipe", "push"]>>;
        background: z.ZodOptional<z.ZodEnum<["default", "deep", "glow"]>>;
        videoBackground: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"highlight">;
        text: z.ZodString;
        duration: z.ZodNumber;
        animateText: z.ZodOptional<z.ZodEnum<["letter", "word", "line", "phrase", "block"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }, {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }>, z.ZodObject<{
        transition: z.ZodOptional<z.ZodEnum<["crossfade", "wipe", "push"]>>;
        background: z.ZodOptional<z.ZodEnum<["default", "deep", "glow"]>>;
        videoBackground: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"versus">;
        leftLabel: z.ZodString;
        leftEmoji: z.ZodString;
        leftSubtext: z.ZodString;
        rightLabel: z.ZodString;
        rightEmoji: z.ZodString;
        rightSubtext: z.ZodString;
        duration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }, {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    }>, z.ZodObject<{
        transition: z.ZodOptional<z.ZodEnum<["crossfade", "wipe", "push"]>>;
        background: z.ZodOptional<z.ZodEnum<["default", "deep", "glow"]>>;
        videoBackground: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"outro">;
        cta: z.ZodString;
        duration: z.ZodNumber;
        ctaCommentKeyword: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    }, {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    slides: ({
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    })[];
}, {
    id: string;
    slides: ({
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    })[];
}>, {
    id: string;
    slides: ({
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    })[];
}, {
    id: string;
    slides: ({
        type: "intro";
        title: string;
        duration: number;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "concept";
        duration: number;
        headline: string;
        body: string;
        emoji?: string | undefined;
        image?: string | undefined;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "highlight";
        duration: number;
        text: string;
        animateText?: "letter" | "word" | "line" | "phrase" | "block" | undefined;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "versus";
        duration: number;
        leftLabel: string;
        leftEmoji: string;
        leftSubtext: string;
        rightLabel: string;
        rightEmoji: string;
        rightSubtext: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
    } | {
        type: "outro";
        duration: number;
        cta: string;
        transition?: "push" | "crossfade" | "wipe" | undefined;
        background?: "default" | "deep" | "glow" | undefined;
        videoBackground?: string | undefined;
        ctaCommentKeyword?: string | undefined;
    })[];
}>;
export declare function validateVideoDefinition(raw: unknown): {
    ok: true;
    data: z.infer<typeof VideoDefinitionSchema>;
} | {
    ok: false;
    errors: z.ZodIssue[];
};
//# sourceMappingURL=schema.d.ts.map