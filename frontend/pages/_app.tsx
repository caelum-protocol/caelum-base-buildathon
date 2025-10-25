import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { mainnet, base, polygon } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
if (!wcProjectId) {
  throw new Error("Missing NEXT_PUBLIC_WC_PROJECT_ID in .env.local");
}

const config = getDefaultConfig({
  appName: "Caelum Protocol",
  projectId: wcProjectId,
  chains: [base, polygon, mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#00FFF0", borderRadius: "medium" })}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
