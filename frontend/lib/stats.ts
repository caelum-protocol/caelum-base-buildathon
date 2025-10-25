import fs from "fs";
import path from "path";

const STATS_PATH = path.join(process.cwd(), "memory", "stats.json");

export type Stats = {
  shards: number;
  whispers: number;
  pofActions: number;
  updatedAt: string;
};

function readStats(): Stats {
  try {
    const raw = fs.readFileSync(STATS_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { shards: 0, whispers: 0, pofActions: 0, updatedAt: new Date().toISOString() };
  }
}

function writeStats(s: Stats) {
  fs.mkdirSync(path.dirname(STATS_PATH), { recursive: true });
  fs.writeFileSync(STATS_PATH, JSON.stringify(s, null, 2), "utf8");
}

export function inc(field: keyof Omit<Stats, "updatedAt">) {
  const s = readStats();
  // @ts-ignore
  s[field] = (s[field] ?? 0) + 1;
  s.updatedAt = new Date().toISOString();
  writeStats(s);
}

export function getStats(): Stats {
  return readStats();
}

// 🔽 NEW: overwrite the stats (used by rebuild)
export function setStats(next: Omit<Stats, "updatedAt">) {
  writeStats({ ...next, updatedAt: new Date().toISOString() });
}
