import type { NextApiRequest, NextApiResponse } from "next";
import { getStats } from "@/lib/stats";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const s = getStats();
  res.status(200).json(s);
}
