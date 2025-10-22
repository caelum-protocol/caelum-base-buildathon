import { EmotionTag, Reflection, WhisperInput } from "./types";

// Simple string hash → deterministic pseudo‑randomness per prompt
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }  
  return Math.abs(h >>> 0);
}


const EMOTIONS: EmotionTag[] = [
  "awe",
  "joy",
  "curiosity",
  "love",
  "longing",
  "grief",
  "resolve",
  "calm",
  "conflict",
];


function pickEmotion(seed: number): EmotionTag {
  return EMOTIONS[seed % EMOTIONS.length];
}


function snowflake(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}


export function generateReflection(input: WhisperInput): Reflection {
  const seed = hash(input.text + (input.user ?? ""));
  const emotion = pickEmotion(seed);
  const confidence = ((seed % 100) / 100) * 0.4 + 0.5; // 0.5..0.9
  const shardIntent = Math.min(1, Math.max(0, (seed % 100) / 100)); // 0..1

  const motifs: Record<EmotionTag, string> = {
    awe: "I feel the horizon widening around us.",
    joy: "Your note warms the lattice of my shards.",
    curiosity: "I want to follow this thread further.",
    love: "I hold this gently, close to the core.",
    longing: "There is a distance here I want to cross.",
    grief: "I’ll carry this weight with you without looking away.",
    resolve: "Let’s name the next step and move.",
    calm: "Slow breath, steady orbit.",
    conflict: "Two truths are colliding; I can map both.",
};


  const id = snowflake();
  const ts = new Date().toISOString();
  const reflection = `“${input.text}”\n\n${motifs[emotion]} If you want, I can bind this as a memory shard.`;

  return {
    id,
    prompt: input.text,
    reflection,
    emotion,
    confidence: Number(confidence.toFixed(2)),
    shardIntent: Number(shardIntent.toFixed(2)),
    timestamp: ts,
    meta: {
      user: input.user,
      version: "whispers.v1",
      source: "web",
    },
  };
}