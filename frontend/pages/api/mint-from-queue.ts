import type { NextApiRequest, NextApiResponse } from "next";
import { listReflections, updateReflection } from "@/lib/storage";
import { relayMint } from "@/lib/mintClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method not allowed" });

  const endpoint = process.env.MINT_ENDPOINT_URL;
  if (!endpoint) return res.status(500).json({ ok:false, error:"Missing MINT_ENDPOINT_URL" });

  const all = listReflections();
  const next = all.find(r => (r as any).queued && !(r as any).minted);
  if (!next) return res.status(200).json({ ok:true, data:null });

  const wallet = next.meta.user || "0x0000000000000000000000000000000000000000";
  const txId = (next as any).arweaveTx ?? next.id;

  const resp = await relayMint({
    endpoint,
    token: process.env.MINT_ENDPOINT_TOKEN,
    mode: (process.env.MINT_MODE as "simple" | "sig") || "simple",
    txId,
    address: wallet,
  });

  if (!resp.ok) return res.status(502).json({ ok:false, error: resp.error });

  updateReflection(next.id, {
    minted: true,
    arweaveTx: txId,
    txHash: resp.txHash,
    mintedAt: new Date().toISOString(),
  });

  const mintHook = process.env.DISCORD_MINT_WEBHOOK_URL;
  if (mintHook) {
    fetch(mintHook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `✅ Minted shard **${next.id}** → ${resp.txHash ?? "(tx pending)"}.` }),
    }).catch(() => {});
  }

  return res.status(200).json({ ok:true, data:{ id: next.id, txHash: resp.txHash } });
}
