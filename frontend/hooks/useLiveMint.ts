import { useCallback } from "react";

export function useLiveMint() {
  const mintLive = useCallback((params?: Record<string, string>) => {
    const baseUrl = process.env.NEXT_PUBLIC_LIVE_MINTER_URL!;
    const url = params
      ? `${baseUrl}?${new URLSearchParams(params).toString()}`
      : baseUrl;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const openVault = useCallback(() => {
    const url = process.env.NEXT_PUBLIC_LIVE_VAULT_URL!;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return { mintLive, openVault };
}
