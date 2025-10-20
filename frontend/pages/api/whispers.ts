import type { NextApiRequest, NextApiResponse } from "next";

let mockWhispers: Array<{ text: string; at: string }> = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: "Missing text" });
    mockWhispers.push({ text, at: new Date().toISOString() });
    return res.status(200).json({ ok: true });
  }
  res.status(200).json({ whispers: mockWhispers.slice(-20) });
}
