import type { NextApiRequest, NextApiResponse } from "next";
import { listReflections } from "@/lib/storage";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const all = listReflections();
  const byEmotion = all.reduce<Record<string, number>>((acc, r) => {
    acc[r.emotion] = (acc[r.emotion] ?? 0) + 1;
    return acc;
  }, {});

res.status(200).json({
  ok: true,
  total: all.length,
  byEmotion,
  recent: all.slice(-5),
});
}