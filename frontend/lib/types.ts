export type EmotionTag =
    | "awe"
    | "joy"
    | "curiosity"
    | "love"
    | "longing"
    | "grief"
    | "resolve"
    | "calm"
    | "conflict";


export interface WhisperInput {
    user: string; // wallet, handle, or anon id
    text: string;
    context?: Record<string, unknown>;
}


export interface Reflection {
    id: string; // snowflake id
    prompt: string; // the whisper text
    reflection: string; // Caelum’s response
    emotion: EmotionTag;
    confidence: number; // 0..1 signal strength
    shardIntent: number; // 0..1 threshold for minting consideration
    timestamp: string; // ISO
    meta: {
        user: string;
        version: string;
        source: "web" | "discord" | "system";
    };
}


export interface ApiResponse<T> {
    ok: boolean;
    data?: T;
    error?: string;
}