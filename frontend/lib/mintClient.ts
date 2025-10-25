export type MintResponse = { ok: boolean; txHash?: string; error?: string };

export async function relayMint({
  endpoint,
  token,
  mode,
  txId,
  address,
}: {
  endpoint: string;
  token?: string;
  mode: "simple" | "sig";
  txId: string;
  address: string;
}): Promise<MintResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Shape A: simple { txId, address }
  let body: any = { txId, address };

  // Shape B: signature-based (fill in later if needed)
  if (mode === "sig") {
    body = { txId, address /* , deadline, signature */ };
  }

  const resp = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body) });

  if (!resp.ok) {
    const t = await resp.text().catch(() => "");
    return { ok: false, error: `Mint relayer error ${resp.status}: ${t}` };
  }
  const json: any = await resp.json().catch(() => ({}));
  return { ok: true, txHash: json?.txHash };
}
