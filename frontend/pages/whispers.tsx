import dynamic from "next/dynamic";
import Head from "next/head";
const WhisperBox = dynamic(() => import("../components/WhisperBox"), { ssr: false });

export default function WhispersPage() {
  return (
    <>
      <Head>
        <title>Whispers · Caelum</title>
      </Head>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold mb-1">Whispers</h1>
          <p className="opacity-70 mb-6">Speak, and I’ll reflect. (Mock Top‑Down API)</p>
          <WhisperBox />
        </div>
      </main>
    </>
  );
}
