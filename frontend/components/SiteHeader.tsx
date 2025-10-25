import { ConnectButton } from "@rainbow-me/rainbowkit";
import StatsBadge from "./StatsBadge";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <h1 className="text-lg font-semibold">Caelum Protocol</h1>
      <div className="flex items-center gap-3">
        <StatsBadge />
        <ConnectButton chainStatus="icon" showBalance={false} />
      </div>
    </header>
  );
}
