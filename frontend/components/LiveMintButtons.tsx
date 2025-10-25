import { useLiveMint } from "../hooks/useLiveMint";

export default function LiveMintButtons(props: { q?: string; refTag?: string }) {
  const { mintLive, openVault } = useLiveMint();
  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        onClick={() => mintLive({ ref: props.refTag ?? "queue", q: props.q ?? "" })}
      >
        🚀 Mint on Live
      </button>
      <button
        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        onClick={openVault}
      >
        🗄️ View Live Vault
      </button>
    </div>
  );
}
