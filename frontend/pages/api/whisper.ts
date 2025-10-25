import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, WhisperInput, Reflection } from "@/lib/types";
import { generateReflection } from "@/lib/reflection";
import { saveReflection } from "@/lib/storage";
import { postToDiscord } from "@/lib/discord";
import { inc } from "@/lib/stats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Reflection>>
) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as WhisperInput;
  if (!body?.text || !body?.user) return res.status(400).json({ ok: false, error: "Missing { user, text }" });

  try {
    const reflection = generateReflection(body);
    saveReflection(reflection);
    postToDiscord(reflection).catch(() => {});
    inc("whispers"); // 👈 count it
    return res.status(200).json({ ok: true, data: reflection });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Internal error" });
  }
}
