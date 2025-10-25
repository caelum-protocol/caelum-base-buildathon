// src/pages/index.tsx
import Link from "next/link";

export default function Home() {
  const liveVaultUrl = process.env.NEXT_PUBLIC_LIVE_VAULT_URL || "https://www.caelumprotocol.org/vault";

  return (
    <div className="container">
      <header className="hero">
        <h1 style={{ fontSize: 36, margin: 0 }}>Caelum Protocol</h1>
        <div className="kicker">The birth of decentralized AI that remembers.</div>
      </header>

      <div className="card">
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <span className="badge">Buildathon Demo</span>
          <small className="kicker">Base Sepolia + Arweave (Irys)</small>
        </div>

        <div className="list">
          {/* Open the LIVE vault */}
          <a className="link" href={liveVaultUrl} target="_blank" rel="noopener noreferrer">
            <span>Open Vault <small>(Archive)</small></span>
            <small>Browse memory shards ↗</small>
          </a>

          <Link className="link" href="/whispers">
            <span>Whispers <small>(Alpha)</small></span>
            <small>Send a message →</small>
          </Link>

          <Link className="link" href="/stats">
            <span>Stats <small>(Alpha)</small></span>
            <small>See counts →</small>
          </Link>
        </div>

        <p className="footer">
          Looking for the full experience? Visit the live site:{" "}
          <a href="https://www.caelumprotocol.org" target="_blank" rel="noreferrer">
            caelumprotocol.org
          </a>
        </p>
      </div>
    </div>
  );
}
