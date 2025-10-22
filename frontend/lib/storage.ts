import fs from "fs";
import path from "path";
import { Reflection } from "./types";
import { debug } from "./logger";


const ROOT = process.cwd();
const TEMP_DIR = path.join(ROOT, "memory", "temp");


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

export const listReflections = (): Reflection[] => {
    ensureTempDir();
    const files = fs.readdirSync(TEMP_DIR).filter(f => f.endsWith(".json"));
    return files.map(f => JSON.parse(fs.readFileSync(path.join(TEMP_DIR, f), "utf8")));
};

export const loadReflection = (id: string): Reflection | null => {
    ensureTempDir();
    const p = path.join(TEMP_DIR, `${id}.json`);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf8"));
};

export const updateReflection = (id: string, patch: Partial<Reflection & { queued?: boolean; feedback?: number }>) => {
    const current = loadReflection(id);
    if (!current) throw new Error("not found");
    const next: any = { ...current, ...patch };
    // Preserve meta object if partial
    if (patch?.meta) next.meta = { ...current.meta, ...patch.meta };
    // allow extra fields (queued/feedback) alongside the Reflection type
    const p = path.join(TEMP_DIR, `${id}.json`);
    fs.writeFileSync(p, JSON.stringify(next, null, 2), "utf8");
    return next as Reflection & { queued?: boolean; feedback?: number };
};