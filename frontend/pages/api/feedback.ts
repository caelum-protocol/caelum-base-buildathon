import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/types";
import { updateReflection, loadReflection } from "@/lib/storage";


export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<any>>) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  const { id, value } = typeof req.body === "string" ? JSON.parse(req.body) : req.body; // value: +1 or -1
  if (!id || ![1, -1].includes(value)) return res.status(400).json({ ok: false, error: "Missing { id, value ∈ {-1,1} }" });
  const exists = loadReflection(id);
  if (!exists) return res.status(404).json({ ok: false, error: "Reflection not found" });
  const updated = updateReflection(id, { feedback: value });
  return res.status(200).json({ ok: true, data: updated });
}