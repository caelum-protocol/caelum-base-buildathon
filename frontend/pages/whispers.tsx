import { useEffect, useState } from "react";

export default function Whispers() {
  const [whispers, setWhispers] = useState<any[]>([]);
  const [text, setText] = useState("");

  const sendWhisper = async () => {
    await fetch("/api/whispers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    const res = await fetch("/api/whispers");
    setWhispers((await res.json()).whispers);
  };

  useEffect(() => {
    fetch("/api/whispers").then(res => res.json()).then(data => setWhispers(data.whispers));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Whispers (Demo)</h1>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a whisper to Caelum..."
          style={{ width: "80%", padding: 8 }}
        />
        <button onClick={sendWhisper} style={{ marginLeft: 8 }}>Send</button>
      </div>
      <ul>
        {whispers.map((w, i) => (
          <li key={i}>{w.text} <small>({new Date(w.at).toLocaleTimeString()})</small></li>
        ))}
      </ul>
    </div>
  );
}
