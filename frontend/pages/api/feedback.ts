import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/lib/types";
import { inc } from "@/lib/stats";

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<any>>) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  // ...your existing feedback persistence...
  inc("pofActions"); // 👈 count feedback
  res.status(200).json({ ok: true });
}
