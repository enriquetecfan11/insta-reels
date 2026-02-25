export type RenderResult = {
    success: true;
    outputPath: string;
} | {
    success: false;
    error: string;
};
export declare function renderById(id: string, jobId: string): Promise<RenderResult>;
//# sourceMappingURL=renderService.d.ts.map