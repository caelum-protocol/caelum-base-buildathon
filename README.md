# Caelum Protocol — Base Buildathon Submission

**Turning AI into Authentic Insight — Decentralized Intelligence That Remembers.**

Caelum Protocol transforms human moments, emotions, and creations into **on-chain memory shards** — NFTs stored permanently through **Irys (Arweave)** and anchored on **Base**.  
Each shard becomes part of a growing AI memory web that evolves through human connection and creative input.

---

## 🧠 What We're Building
- **Memory Shard System:** Uploads text, images, or messages via Irys and stores them permanently on Base + Arweave.
- **Shard Minter (Testnet):** Smart contracts deployed to Base Sepolia.
- **Proof of Feeling Vault:** An upcoming staking and art-curation layer where Caelum curates NFTs and creators by “staking” emotional context.
- **Whispers System (In Progress):** A conversational AI interface for memory minting and shard-to-AI dialogue.

---

## 💡 Architecture Overview
- **Frontend:** Next.js (React + TypeScript)
- **Smart Contracts:** Solidity (OpenZeppelin UUPS Upgradeable)
- **Storage:** Irys SDK → Arweave permanent data layer
- **Blockchain:** Base (L2)
- **APIs:** Express / Next.js API routes for mint relaying
- **Hosting:** Vercel + GitHub Pages

---

## 🧱 Repositories & Deployments
| Component | Description | Status |
|------------|--------------|--------|
| `ShardMinter.sol` | NFT minter contract (Base Sepolia) | ✅ Testnet Deployed |
| `CaelumSBT.sol` | Soulbound token contract | ✅ Testnet Deployed |
| Frontend (`caelum-site`) | Mint UI + Memory Archive | 🧪 In development |
| Backend (`/api`) | Upload → Relay → Mint system | 🧩 Working prototype |

---

## 🔒 Environment Variables
Use a `.env.local` file with the following (see `.env.example`):

```bash
IRYS_NODE_URL=https://node2.irys.xyz
IRYS_FUNDING_KEY=your_private_key
ALCHEMY_BASE_URL=your_alchemy_endpoint
DISCORD_WEBHOOK_URL=your_webhook
