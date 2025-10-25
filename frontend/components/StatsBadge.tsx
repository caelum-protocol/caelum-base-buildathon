import React from "react";

type Stats = { shards: number; whispers: number; pofActions: number; updatedAt: string };

export default function StatsBadge() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const load = async () => {
    try {
      const r = await fetch("/api/stats");
      const j = await r.json();
      setStats(j.ok ? j.data : j); // supports both shapes
    } catch {}
  };
  React.useEffect(() => { load(); const t = setInterval(load, 15000); return () => clearInterval(t); }, []);
  if (!stats) return null;
  return (
    <div className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
      🧱 {stats.shards} • 💬 {stats.whispers} • 🎚️ {stats.pofActions}
    </div>
  );
}
