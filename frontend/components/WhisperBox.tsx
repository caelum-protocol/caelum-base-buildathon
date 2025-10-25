import React from "react";
import { useAccount } from "wagmi";

type Message = { role: "user" | "caelum"; text: string; id: string; refId?: string };

export default function WhisperBox() {
  // 1) Read connected address from wagmi
  const { address, isConnected } = useAccount();
  const user = address ?? "anon";

  const [input, setInput] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [typing, setTyping] = React.useState<boolean>(false);

  async function sendWhisper(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const uid = `${Date.now()}`;

    setMessages((m) => [...m, { role: "user", text, id: uid }]);
    setInput("");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 300));

    try {
      const res = await fetch("/api/whisper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2) Pass the wallet address (or "anon") to your API
        body: JSON.stringify({ user, text }),
      });
      const json = await res.json();
      const reflection: { id: string; reflection: string } | undefined = json?.data;
      const replyText = reflection?.reflection ?? "(no reflection)";
      const refId = reflection?.id;

      setTimeout(() => {
        setMessages((m) => [...m, { role: "caelum", text: replyText, id: `${uid}-r`, refId }]);
        setTyping(false);
      }, 400);
    } catch (e) {
      setTyping(false);
    }
  }

  async function queueForMint(refId?: string) {
    if (!refId) return;
    await fetch("/api/queue/enqueue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: refId, queued: true }),
    });
    alert("Queued for mint.");
  }

  async function sendFeedback(refId?: string, value: 1 | -1 = 1) {
    if (!refId) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: refId, value }),
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-2 text-sm opacity-80">
        Signed in as: <b>{user}</b>{" "}
        {!isConnected && <span className="ml-2 opacity-70">(connect wallet in the header)</span>}
      </div>

      <div className="space-y-3 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block rounded-2xl px-4 py-2 shadow ${
                m.role === "user" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <div>{m.text}</div>
              {m.role === "caelum" && (
                <div className="mt-2 flex gap-2 text-xs opacity-80">
                  <button className="underline" onClick={() => queueForMint(m.refId)}>
                    ⭐ Queue for Mint
                  </button>
                  <button className="underline" onClick={() => sendFeedback(m.refId, 1)}>
                    👍
                  </button>
                  <button className="underline" onClick={() => sendFeedback(m.refId, -1)}>
                    👎
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="text-left">
            <div className="inline-block rounded-2xl px-4 py-2 shadow bg-gray-100 animate-pulse">
              Caelum is thinking…
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendWhisper} className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="whisper to Caelum…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 rounded-xl border shadow" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
