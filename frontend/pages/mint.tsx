// src/pages/mint.tsx
"use client";

import { useState } from "react";
import { useAccount, useChainId, useConnect, usePublicClient, useWalletClient } from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";
import { keccak256, stringToBytes } from "viem";
import { Header } from "@/components/Header";
import { useMintEligibility } from "@/hooks/useMintEligibility";
import useMounted from "@/utils/useMounted";
import { normalizeText } from "@/utils/normalizeText";

// EIP-712 (must match API + contract)
const SHARD_MINTER_ADDR =
  (process.env.NEXT_PUBLIC_SHARD_MINTER_ADDR ||
    process.env.NEXT_PUBLIC_SHARDMINTER_ADDRESS) as `0x${string}`;

const EIP712_DOMAIN = {
  name: "ShardMinter",
  version: "1",
  chainId: 84532,
  verifyingContract: SHARD_MINTER_ADDR,
} as const;

const EIP712_TYPES = {
  MintIntent: [
    { name: "user", type: "address" },
    { name: "uri", type: "string" },
    { name: "txid", type: "string" },
    { name: "contentHash", type: "bytes32" },
    { name: "timestamp", type: "uint64" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint64" },
  ],
} as const;

export default function MintPageInner() {
  const mounted = useMounted();
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const chainId = useChainId();
  const wrongNetwork = !!chainId && chainId !== baseSepolia.id;

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<null | string>(null);
  const [arweaveId, setArweaveId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eligibility = useMintEligibility();

  const handleConnect = async () => {
    try {
      await connectAsync({ connector: injected() });
    } catch (err) {
      console.error(err);
      toast.error("Wallet connection failed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  const handleClear = () => {
    setFile(null);
    setText("");
    setArweaveId(null);
    setTxHash(null);
    setError(null);
  };

  const handleMint = async () => {
    setError(null);

    if (!address) return toast.error("Connect your wallet.");
    if (wrongNetwork) return toast.error("Please switch to Base Sepolia.");
    if (!eligibility?.eligible)
      return toast.error(`Not eligible. Tier: ${eligibility?.tier ?? "Unknown"}`);
    if (!file && !text.trim()) return toast.error("Provide a file or write a memory.");
    if (!walletClient) return toast.error("Wallet not ready.");

    // Phase 1: upload → Irys
    const toastId = toast.loading("Uploading to Irys…");
    setLoading("uploading");

    try {
      const fd = new FormData();
      if (file) fd.append("file", file);
      else fd.append("text", normalizeText(text));
      fd.append("address", address);

      const up = await fetch("/api/upload", { method: "POST", body: fd });
      const upData = await up.json();
      if (!up.ok) throw new Error(upData?.error || "Upload failed");
      setArweaveId(upData.txId);

      // Phase 2: sign EIP-712
      toast.loading("Signing mint intent…", { id: toastId });
      setLoading("signing");

      const now = Math.floor(Date.now() / 1000);
      const deadline = now + 10 * 60; // 10 min
      const nonce = `${Date.now()}`; // per-user unique (string on the wire)
      const txid: string = upData.txId;
      const uri = upData.url as string; // https://gateway.irys.xyz/<txid>
      const contentHash = keccak256(stringToBytes(txid));

      const valueForSig = {
        user: address,
        uri,
        txid,
        contentHash,
        timestamp: BigInt(now),
        nonce: BigInt(nonce),
        deadline: BigInt(deadline),
      } as const;

      const signature = await walletClient.signTypedData({
        account: address,
        domain: EIP712_DOMAIN,
        primaryType: "MintIntent",
        types: EIP712_TYPES,
        message: valueForSig,
      });

      // Phase 3: relay on Base via server
      toast.loading("Relaying on Base…", { id: toastId });
      setLoading("relaying");

      const relayRes = await fetch("/api/mint/intent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          value: {
            user: address,
            uri,
            txid,
            contentHash,
            timestamp: now,
            nonce,
            deadline,
          },
          signature,
        }),
      });
      const relayData = await relayRes.json();
      if (!relayRes.ok || !relayData.txHash) {
        throw new Error(relayData?.error || "Mint relay failed");
      }

      setTxHash(relayData.txHash);
      toast.success("Mint confirmed on Base!", { id: toastId });
    } catch (err: any) {
      const msg = err?.message || "Mint failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] p-6">
        <Header />
        <div className="max-w-xl mx-auto mt-12 space-y-4">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="h-20 w-full bg-white/5 rounded" />
          <div className="h-10 w-40 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  const isDisabled =
    !!loading || !eligibility?.eligible || (!file && !text.trim()) || wrongNetwork;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] p-6">
      <Header />
      <div className="max-w-xl mx-auto mt-12 space-y-6">
        <h1 className="text-2xl font-bold text-[#7fcbff] mb-2">Mint a Memory Shard</h1>
        <p className="text-[#a4a4c4] mb-4">
          Upload a file or write a memory. It will be stored on Arweave (via Irys) and minted to your
          connected address on Base.
        </p>

        {wrongNetwork && (
          <div className="text-xs rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 p-2">
            You’re on chain {chainId}. Please switch to <strong>Base Sepolia</strong>.
          </div>
        )}

        {isConnected ? (
          <div className="text-sm text-[#7fcbff]">
            🔓 Tier: <strong>{eligibility?.tier}</strong>
            <br />
            📊 Stake: <strong>{eligibility?.stake?.toFixed(2) ?? "…"}</strong> CAELUM | Burned:{" "}
            <strong>{eligibility?.burn?.toFixed(2) ?? "…"}</strong> CAELUM
            <br />
            🧠 Eligibility:{" "}
            {eligibility?.eligible ? "✅ Eligible" : `❌ ${eligibility?.reason || "Checking..."}`}
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 rounded font-semibold bg-gradient-to-b from-[#7fcbff] to-[#a767ff] hover:opacity-90 text-black"
          >
            🔌 Connect Wallet
          </button>
        )}

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full bg-[#111] p-2 border border-[#333] rounded"
        />

        {file && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a7f3d0]">Selected: {file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="px-3 py-1 rounded font-semibold text-sm
                         bg-gradient-to-b from-[#ff7f7f] to-[#ff4f4f]
                         hover:from-[#ff9f9f] hover:to-[#ff6f6f]
                         text-black shadow transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        <textarea
          placeholder="Or write your memory…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 bg-[#111] p-3 border border-[#333] rounded resize-none"
        />

        <div className="flex gap-4">
          <button
            onClick={handleMint}
            disabled={isDisabled}
            className={`px-4 py-2 rounded font-semibold shadow ${
              !isDisabled
                ? "bg-gradient-to-b from-[#7fcbff] to-[#a767ff] hover:opacity-90 text-black"
                : "bg-[#333] text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (loading === "uploading" ? "Uploading…" : loading === "signing" ? "Signing…" : "Relaying…") : "✨ Mint Memory"}
          </button>
          <button
            onClick={handleClear}
            className="bg-gradient-to-b from-[#7fcbff] to-[#a767ff] hover:opacity-90 text-black px-4 py-2 rounded font-semibold shadow"
          >
            Clear
          </button>
        </div>

        {txHash && (
          <p className="text-sm text-[#a7f3d0] mt-4">
            ✅ Tx:{" "}
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {txHash}
            </a>
          </p>
        )}
        {arweaveId && (
          <p className="text-sm text-[#7fcbff] mt-2">
            📁 Stored:{" "}
            <a
              href={`https://gateway.irys.xyz/${arweaveId}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {arweaveId}
            </a>
          </p>
        )}
        {error && <p className="text-sm text-[#ff4f4f] mt-4">⚠️ {error}</p>}
      </div>
    </div>
  );
}
