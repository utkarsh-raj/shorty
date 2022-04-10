export interface DbServiceInterface {
    connect(): Promise<void>;
    saveRow(originalUrl: string, shortUrl: string, createdAt: Date): Promise<void>;
}