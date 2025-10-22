import React from "react";

type R = {
  id: string;
  reflection: string;
  emotion: string;
  shardIntent: number;
  confidence: number;
  timestamp: string;
  queued?: boolean;
};

export default function QueuePage() {
  const [items, setItems] = React.useState<R[]>([]);
  const [filter, setFilter] = React.useState<string>("all");

const load = async () => {
  const res = await fetch("/api/queue/list");
  const json = await res.json();
  setItems(json?.data ?? []);
};

React.useEffect(() => { load(); }, []);

const filtered = items.filter((i) => {
  if (filter === "queued") return i.queued === true;
  if (filter === "candidates") return i.shardIntent >= 0.72 && i.confidence >= 0.6;
  return true;
});

async function setQueued(id: string, queued: boolean) {
  await fetch("/api/queue/enqueue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, queued }),
  });
  load();
}

return (
  <main className="max-w-3xl mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-2">Proof of Feeling — Queue</h1>
    <div className="flex gap-2 mb-4 text-sm">
      <button className={`px-3 py-1 rounded border ${filter==='all'?'font-bold':''}`} onClick={() => setFilter("all")}>All</button>
      <button className={`px-3 py-1 rounded border ${filter==='candidates'?'font-bold':''}`} onClick={() => setFilter("candidates")}>Candidates ≥72%</button>
      <button className={`px-3 py-1 rounded border ${filter==='queued'?'font-bold':''}`} onClick={() => setFilter("queued")}>Queued</button>
    </div>

    <ul className="space-y-3">
      {filtered.map((r) => (
        <li key={r.id} className="rounded-2xl border p-3 shadow">
          <div className="text-xs opacity-70 mb-1">{new Date(r.timestamp).toLocaleString()} • {r.emotion} • intent {Math.round(r.shardIntent*100)}% • conf {Math.round(r.confidence*100)}%</div>
          <div className="mb-2 whitespace-pre-wrap">{r.reflection}</div>
          <div className="flex gap-2 text-sm">
            {r.queued ? (
              <button className="underline" onClick={() => setQueued(r.id, false)}>Remove from queue</button>
            ) : (
              <button className="underline" onClick={() => setQueued(r.id, true)}>⭐ Queue for mint</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  </main>
  );
}