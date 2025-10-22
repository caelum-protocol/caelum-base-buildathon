import type { NextApiRequest, NextApiResponse } from "next";
import { listReflections } from "@/lib/storage";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const all = listReflections();
  const sorted = all.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  res.status(200).json({ ok: true, data: sorted });
}