import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    shards: 1,
    whispers: 0,
    pofActions: 0,
    updatedAt: new Date().toISOString(),
  });
}
