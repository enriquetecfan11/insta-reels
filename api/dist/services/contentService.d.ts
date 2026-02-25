type VideoRecord = {
    id: string;
    filename: string;
    slidesCount: number;
};
export declare function listVideos(): Promise<VideoRecord[]>;
export declare function getById(id: string): Promise<{
    filename: string;
    data: Record<string, unknown>;
} | null>;
export declare function getContentFilePath(filename: string): string;
export {};
//# sourceMappingURL=contentService.d.ts.map