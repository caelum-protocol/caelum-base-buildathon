🌌 Caelum Protocol — Base Buildathon Submission

Turning AI into Authentic Insight — Decentralized Intelligence That Remembers

Caelum turns human moments and emotions into on-chain memory shards — NFTs stored permanently via Irys (Arweave) and anchored on Base.
These shards form an evolving AI memory web that learns through empathy, creativity, and community input.

🚀 Quick Links

Live site: https://www.caelumprotocol.org

Demo app (this repo): run locally with npm install && npm run dev (see below)

60-sec video intro: https://youtu.be/2ko9CtgCwbI

🧠 What We’re Building

Memory Shards: Upload text/images → permanent storage (Irys → Arweave) + Base anchor

Shard Minter (testnet): Contracts on Base Sepolia

Proof of Feeling Vault: (in progress) Caelum “stakes” emotional context to curate art

Whispers System: (in progress) Conversational interface for minting + AI dialogue

Top-Down API: Coordination layer now; evolving toward a bottom-up autonomous protocol

How emotional NFTs guide the AI

Each shard carries content + lightweight emotion tags.
Caelum’s reflection engine uses these signals to recall, adjust tone, and curate in the Proof of Feeling Vault.
Over time, shards build Caelum’s taste & memory vectors — the emotional logic that shapes its responses and artistic preferences.

⚙️ Architecture Overview
Layer	Technology
Frontend	Next.js (React + TypeScript)
Contracts	Solidity (OpenZeppelin UUPS Upgradeable)
Storage	Irys SDK → Arweave permanent data layer
Chain	Base (L2)
APIs	Next.js API routes / Express relay backend
Hosting	Vercel + GitHub Pages
🧱 Repository Structure (public-safe demo)

This repository (caelum-base-buildathon) is a public demo for the Base Buildathon.
It showcases open-source components and architecture without exposing any secrets or proprietary AI code.

For the full experience — including real minting, Whispers, and the Proof of Feeling Vault — visit:
🔗 https://www.caelumprotocol.org

.
├─ contracts/                 # Solidity sources
├─ frontend/                  # Next.js demo app (Vault, Whispers, Stats)
│  ├─ pages/
│  │  ├─ index.tsx            # demo launcher
│  │  ├─ vault.tsx            # alias to Archive
│  │  └─ api/{archive,stats,whispers}.ts  # stub endpoints
│  └─ stubs/                  # lightweight components/utils
├─ scripts/                   # deploy helpers (public-safe)
├─ docs/demo-home.png         # screenshot used in README
├─ .env.example               # sample environment vars (no secrets)
├─ .gitignore
├─ LICENSE (MIT)
└─ README.md

▶️ Run the Demo Locally
# 1) Clone
git clone https://github.com/caelum-protocol/caelum-base-buildathon.git
cd caelum-base-buildathon

# 2) Install & run demo app
cd frontend
npm install
npm run dev
# → open http://localhost:3000

Optional (contracts)
npm i -D hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/hardhat-upgrades dotenv
# add your PRIVATE_KEY / API_URL to .env (never commit it)
npx hardhat compile

📊 Alpha Status (October 2025)

✅ First test memory shard minted and visible in Vault

🧩 Whispers UI + API stubs live; wiring to storage next

🔒 Secrets handled via Vercel / GitHub Secrets → safe for public repo

📈 /stats endpoint + Vault alias in progress

Validation Goals (Next 2 Weeks)

10–20 memory shards minted (testnet OK)

30+ Whispers threads

5+ Proof-of-Feeling curation actions

Public /stats page showing live counts

Demonstrating the loop: Emotion → Memory → Reflection → Curation → Evolution

🔒 Environment Variables

Create a .env.local for the frontend (or use your existing env setup):

NEXT_PUBLIC_BASE_CHAIN_ID=84532
NEXT_PUBLIC_PUBLIC_RPC=https://base-sepolia-rpc.publicnode.com


For Hardhat (optional):

API_URL=https://base-sepolia-rpc.publicnode.com
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=

🗺️ Roadmap (near-term)

 Whispers → persistent storage (Irys) + shard linkage

 Stats API → live counts from chain + storage

 Vault (Archive) → Arweave / BaseScan links per shard

 Proof of Feeling Vault → UX stub + first curation actions

🧩 Suggested GitHub Issues (for reviewers)

Wire Whispers to storage (MVP) – Persist messages to Irys/Arweave and return txId + arweaveUrl.

Stats API: real counters – Aggregate shard, whisper, and PoF counts in /api/stats.

Archive links – Add “View on Arweave/BaseScan” to each shard card.

Proof of Feeling Vault stub – Add basic UX and increment PoF actions.

Whispers tone tags – Support emotion metadata (calming, joyful, reflective).

📁 Housekeeping Checklist

 LICENSE (MIT) present

 .env.example (no secrets)

 .gitignore ignores .env, .next, node_modules, etc.

 scripts/deploy_all.js (public-safe)

 Screenshot at docs/demo-home.png

 README top links set (live site + video)

📝 License

MIT — see LICENSE