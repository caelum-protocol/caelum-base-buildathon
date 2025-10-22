import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, WhisperInput, Reflection } from "@/lib/types";
import { generateReflection } from "@/lib/reflection";
import { saveReflection } from "@/lib/storage";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Reflection>>
) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });


  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as Partial<WhisperInput> & { prompt?: string };
  const text = body?.prompt ?? body?.text;
  const user = body?.user ?? "anon";
  if (!text) return res.status(400).json({ ok: false, error: "Missing prompt/text" });


  try {
    const reflection = generateReflection({ text, user, context: body?.context });
    saveReflection(reflection);
    return res.status(200).json({ ok: true, data: reflection });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Internal error" });
  }
}