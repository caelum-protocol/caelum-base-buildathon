import { useEffect, useState } from "react";

export default function Stats() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(setData);
  }, []);
  if (!data) return <p>Loading...</p>;
  return (
    <div style={{ padding: 20 }}>
      <h1>Network Stats</h1>
      <p>Shards: {data.shards}</p>
      <p>Whispers: {data.whispers}</p>
      <p>Proof of Feeling Actions: {data.pofActions}</p>
      <p>Last Updated: {new Date(data.updatedAt).toLocaleString()}</p>
    </div>
  );
}
