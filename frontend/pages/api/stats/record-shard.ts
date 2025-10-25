import type { NextApiRequest, NextApiResponse } from "next";
import { inc } from "@/lib/stats";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS (dev only; tighten for prod)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-caelum-secret");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const secret = req.headers["x-caelum-secret"];
  if (process.env.STATS_WEBHOOK_SECRET && secret !== process.env.STATS_WEBHOOK_SECRET) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  inc("shards");
  return res.status(200).json({ ok: true });
}
