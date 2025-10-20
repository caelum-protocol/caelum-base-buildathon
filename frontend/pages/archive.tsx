// src/pages/archive.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router"; // If using App Router, use: import { useRouter } from "next/navigation";
import type { MemoryEntry } from "@/types/memory";
import formatBytes from "@/utils/formatBytes";
import Thumb from "@/components/Thumb";
import PreviewModal from "@/components/PreviewModal";

type Grouped = Record<string, MemoryEntry[]>;

export default function ArchivePage() {
  const router = useRouter(); // 👈 for back()
  const [grouped, setGrouped] = useState<Grouped>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<MemoryEntry | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/archive");
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        // Accept: MemoryEntry[] or { items } or { grouped }
        const flat: MemoryEntry[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        const groupedFromApi: Grouped | undefined =
          !Array.isArray(data) && data?.grouped ? data.grouped : undefined;

        if (groupedFromApi) {
          setGrouped(groupedFromApi);
          return;
        }

        // Group locally by txId (fallback)
        const g = flat.reduce<Grouped>((acc, entry) => {
          (acc[entry.txId] ||= []).push(entry);
          return acc;
        }, {});
        setGrouped(g);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Unable to load memory archive. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const shardOrder = useMemo(() => {
    // Sort shards by newest entry time
    return Object.entries(grouped)
      .map<[string, MemoryEntry[]]>(([txId, items]) => [
        txId,
        items
          .slice()
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          ),
      ])
      .sort(
        (a, b) =>
          new Date(b[1][0]?.uploadedAt || 0).getTime() -
          new Date(a[1][0]?.uploadedAt || 0).getTime()
      );
  }, [grouped]);

  const onOpen = (entry: MemoryEntry) => {
    setSelected(entry);
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-5 py-10">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-[20px] sm:text-2xl font-semibold text-white/90 flex items-center gap-2">
          <span>🗂️</span>
          <span>Memory Archive</span>
        </h1>

        {/* 🔙 Context-aware back; falls back to /mint if no history */}
        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push("/mint");
            }
          }}
          className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500
                     text-white text-sm font-medium transition"
        >
          ← Back
        </button>
      </header>

      {loading ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-white/5 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <p className="max-w-6xl mx-auto text-red-500">{error}</p>
      ) : shardOrder.length === 0 ? (
        <p className="max-w-6xl mx-auto text-white/60">
          No memory shards found.
        </p>
      ) : (
        <div className="space-y-10 max-w-6xl mx-auto">
          {shardOrder.map(([txId, items]) => {
            const totalSize = items.reduce((n, e) => n + (Number(e.size) || 0), 0);
            return (
              <section key={txId} className="text-left">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    🧩 Shard:{" "}
                    <a
                      href={`/shard/${txId}`}
                      className="underline decoration-white/30 hover:decoration-white text-purple-300 hover:text-purple-200"
                    >
                      {txId.slice(0, 6)}...{txId.slice(-6)}
                    </a>
                  </h2>
                  <p className="text-xs text-white/60">
                    {items.length} file{items.length > 1 ? "s" : ""} •{" "}
                    {formatBytes(totalSize)}
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((entry) => {
                    const mintHash = (entry as any).mintHash as string | undefined;
                    const arweaveUrl =
                      (entry as any).url || `https://gateway.irys.xyz/${(entry as any).txId}`;

                    return (
                      <li
                        key={entry.url}
                        className="rounded-xl bg-gradient-to-br from-[#111317] to-[#0b0c0e] border border-white/10 hover:border-purple-400/40 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] hover:shadow-purple-400/10 transition overflow-hidden"
                      >
                        <button
                          onClick={() => onOpen(entry)}
                          className="block w-full text-left"
                          aria-label="Open preview"
                        >
                          <Thumb
                            url={entry.url}
                            mime={entry.type}
                            className="w-full h-40 md:h-44"
                          />

                          <div className="p-3">
                            <p className="text-[13px] font-medium text-white truncate">
                              {entry.fileName}
                              <span className="text-white/50"> — {entry.type}</span>
                            </p>
                            <p className="text-[11px] text-white/60 mt-0.5">
                              {new Date(entry.uploadedAt).toLocaleString()} •{" "}
                              {entry.size ? formatBytes(Number(entry.size)) : "—"}
                            </p>

                            <div className="mt-1 space-x-3">
                              {mintHash && (
                                <a
                                  href={`https://sepolia.basescan.org/tx/${mintHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-block text-[11px] text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                                >
                                  View mint tx
                                </a>
                              )}

                              {(entry as any)?.txId && (
                                <a
                                  href={arweaveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-block text-[11px] text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                                >
                                  View on Arweave
                                </a>
                              )}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {/* Preview modal */}
      <PreviewModal open={open} onClose={onClose} entry={selected} />
    </main>
  );
}
