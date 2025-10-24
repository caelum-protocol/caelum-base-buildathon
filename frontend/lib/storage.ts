import fs from "fs";
import path from "path";
import { Reflection } from "./types";
import { debug } from "./logger";

const ROOT = process.cwd();
const TEMP_DIR = path.join(ROOT, "memory", "temp");

// Extra, optional fields we add over time
export type ReflectionExtras = {
  queued?: boolean;
  feedback?: number;   // or feedback2 if you used that name earlier
  minted?: boolean;
  arweaveTx?: string;
  txHash?: string;
  mintedAt?: string;
};

// The full record we store on disk
export type ReflectionRecord = Reflection & ReflectionExtras;

export const ensureTempDir = () => {
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
};

export const saveReflection = (r: Reflection) => {
    ensureTempDir();
    const p = path.join(TEMP_DIR, `${r.id}.json`);
    fs.writeFileSync(p, JSON.stringify(r, null, 2), "utf8");
    debug("saved", p);
    return p;
};

export const listReflections = (): ReflectionRecord[] => {
  ensureTempDir();
  const files = fs.readdirSync(TEMP_DIR).filter(f => f.endsWith(".json"));
  return files.map(f => JSON.parse(fs.readFileSync(path.join(TEMP_DIR, f), "utf8")));
};

export const loadReflection = (id: string): ReflectionRecord | null => {
  ensureTempDir();
  const p = path.join(TEMP_DIR, `${id}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
};

export const updateReflection = (
  id: string,
  patch: Partial<ReflectionRecord>
) => {
  const current = loadReflection(id);
  if (!current) throw new Error("not found");
  const next: ReflectionRecord = { ...current, ...patch };
  if (patch?.meta) next.meta = { ...current.meta, ...patch.meta };
  const p = path.join(TEMP_DIR, `${id}.json`);
  fs.writeFileSync(p, JSON.stringify(next, null, 2), "utf8");
  return next;
};