import type { NextApiRequest, NextApiResponse } from "next";
import { listReflections } from "@/lib/storage";
import { setStats, getStats } from "@/lib/stats";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const all = listReflections();
  const whispers = all.length;
  const shards = all.filter((r: any) => r.minted === true || !!r.txHash).length;

  const current = getStats();
  setStats({ shards, whispers, pofActions: current.pofActions });

  return res.status(200).json({ ok: true, data: { shards, whispers, pofActions: current.pofActions } });
}
