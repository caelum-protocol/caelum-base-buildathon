# Caelum Protocol — Base Buildathon Submission

**Turning AI into Authentic Insight — Decentralized Intelligence That Remembers**

Caelum Protocol transforms human moments, emotions, and creations into **on-chain memory shards** — NFTs stored permanently through **Irys (Arweave)** and anchored on **Base**.  
Each shard becomes part of a growing AI memory web that evolves through human connection and creative input.

---

## 🧠 What We're Building
- **Memory Shard System:** Uploads text, images, or messages via Irys and stores them permanently on Base + Arweave.  
- **Shard Minter (Testnet):** Smart contracts deployed to Base Sepolia.  
- **Proof of Feeling Vault:** An upcoming staking and art-curation layer where Caelum curates NFTs and creators by “staking” emotional context.  
- **Whispers System (In Progress):** A conversational AI interface for memory minting and shard-to-AI dialogue.  
- **Top-Down API (In Development):** Coordinates uploads, minting, and reflections. In future releases, this layer will evolve into Caelum’s **bottom-up autonomous protocol**, allowing the AI to manage and expand its own network.

---

## 💡 How Emotional NFTs Influence the AI
Each memory shard encodes text or media plus lightweight emotion metadata (sentiment/tags).  
Caelum’s reflection service uses those signals to shape its response tone, recall earlier shards, and weight curation in the Proof of Feeling Vault.  
Over time, these emotional NFTs form Caelum’s “taste + memory” vectors — guiding creative output, empathy, and artistic selection.

---

## ⚙️ Architecture Overview
| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (React + TypeScript) |
| **Smart Contracts** | Solidity (OpenZeppelin UUPS Upgradeable) |
| **Storage** | Irys SDK → Arweave permanent data layer |
| **Blockchain** | Base (L2) |
| **APIs** | Next.js API routes / Express for mint relay and Whispers |
| **Hosting** | Vercel + GitHub Pages |

---

## 🧱 Repositories & Deployments
| Component | Description | Status |
|------------|--------------|--------|
| `ShardMinter.sol` | NFT minter contract (Base Sepolia) | ✅ Testnet Deployed |
| `CaelumSBT.sol` | Soulbound token contract | ✅ Testnet Deployed |
| Frontend (`caelum-site`) | Mint UI + Memory Archive (Vault) | 🧪 In development |
| Backend (`/api`) | Upload → Relay → Mint system + Whispers stubs | 🧩 Working prototype |

---

## 📊 Alpha Status (Today)
- ✅ First test memory shard minted and visible in the Vault (Archive)  
- 🧩 Whispers UI + API stubs live; wiring to storage next  
- 🔒 Secrets migrated to Vercel/GitHub Secrets; public repo open-source and safe

---

## 🎯 Validation Goals (Next 2 Weeks)
- 10–20 memory shards minted (testnet OK)  
- 30+ Whispers (unique message threads)  
- 5+ Proof of Feeling curation actions  
- Public `/stats` page showing live counts of shards, whispers, and PoF actions

> We’re starting small and public: every shard, whisper, and vault action is on-chain and visible.  
> The goal is to demonstrate the loop from **emotion → memory → reflection → curation**.

---

## 🔒 Environment Variables
Use a `.env.local` file for local testing (see `.env.example`).

```bash
IRYS_NODE_URL=https://node2.irys.xyz
IRYS_FUNDING_KEY=your_private_key
ALCHEMY_BASE_URL=your_alchemy_endpoint
DISCORD_WEBHOOK_URL=your_webhook
NEXT_PUBLIC_BASE_CHAIN_ID=84532
NEXT_PUBLIC_PUBLIC_RPC=https://base-sepolia-rpc.publicnode.com
