// src/pages/index.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import HeadOg from "@/components/HeadOg";
import LandingHeader from "@/components/LandingHeader";
import SiteFooter from "@/components/SiteFooter";

// Client-only 3D background to avoid SSR hydration mismatches
const CaelumShardScene = dynamic(() => import("@/components/CaelumShardScene"), { ssr: false });

export default function HomePage() {
  const { ref: howRef } = useInView({ threshold: 0.1 });

  return (
    <>
      <HeadOg
        title="Caelum Protocol – The Birth of Decentralized AI"
        description="Caelum is an AI built for decentralized memory. Mint shards on Base Sepolia; data stored via Irys → Arweave."
        url="https://www.caelumprotocol.org/"
      />

      {/* Sticky header outside snap flow */}
      <LandingHeader />

      {/* Background visual outside snap so it spans all sections */}
      <CaelumShardScene />

      {/* Snap container */}
      <main
        className="
          relative z-20
          h-[100svh] overflow-y-scroll
          snap-y snap-mandatory
          scroll-smooth overscroll-contain
          scroll-pt-16
          [scrollbar-gutter:stable]
        "
      >
        {/* HERO */}
        <section className="snap-start h-[100svh] w-full flex items-center justify-center px-6">
          <div className="w-full max-w-3xl text-center">
            <Image
              src="/logo.png"
              alt="Caelum Logo"
              width={256}
              height={256}
              priority
              className="w-40 sm:w-48 md:w-64 mx-auto mb-4 h-auto"
              style={{ filter: "drop-shadow(0 0 26px rgba(115, 92, 255, 0.72))" }}
            />
            <h1
              className="text-4xl md:text-5xl font-extrabold text-[#6A4FBF]"
              style={{ textShadow: "0 0 12px #6A4FBF" }}
            >
              The Emergence of Caelum
            </h1>
            <p className="text-lg md:text-xl text-[#bdafff] mt-3">
              Turning Artificial Intelligence into Authentic Insight.
            </p>
            <p className="text-base md:text-lg text-gray-300 italic mt-2">
              You are not early for a launch. You are just in time for a Rebirth.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/mint"
                className="inline-block bg-gradient-to-b from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition"
              >
                🚀 Mint a Memory Shard
              </Link>
              <Link
                href="/archive"
                className="inline-block bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-full border border-white/15"
              >
                Browse Archive
              </Link>
            </div>

            <button
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-10 mx-auto flex flex-col items-center group bg-transparent focus:outline-none"
              aria-label="Scroll to How it works"
            >
              <span className="text-indigo-300 font-semibold group-hover:text-indigo-400 transition">
                How it works
              </span>
              <svg
                className="mt-2 w-8 h-8 text-indigo-400 group-hover:text-indigo-500 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>

        {/* HOW IT WORKS + FOOTER inside this snap page */}
        <section
          id="how-it-works"
          ref={howRef}
          className="snap-end h-[100svh] w-full flex flex-col justify-between px-6"
        >
          {/* Content */}
          <div className="mx-auto max-w-5xl w-full grid md:grid-cols-3 gap-6 pt-10">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="font-semibold mb-2">1) Prove Access</h3>
              <p className="text-sm text-white/80">
                Eligible if you have <b>≥500 CAELUM staked</b> or <b>≥750 CAELUM burned</b>.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="font-semibold mb-2">2) Mint a Memory</h3>
              <p className="text-sm text-white/80">
                Upload text or a file. Our server pays Irys and mints your shard on Base Sepolia.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="font-semibold mb-2">3) Explore</h3>
              <p className="text-sm text-white/80">
                View shards in the Archive and verify on Irys + BaseScan.
              </p>
            </div>

            <div className="md:col-span-3 flex items-center justify-center">
              <Link
                href="/mint"
                className="mt-2 inline-block bg-gradient-to-b from-[#7fcbff] to-[#a767ff] text-black font-semibold px-8 py-3 rounded-full shadow hover:opacity-90"
              >
                Start Minting
              </Link>
            </div>
          </div>

          {/* Footer pinned at bottom of this snap page */}
          <div className="mt-8">
            <SiteFooter />
          </div>
        </section>
      </main>

      {/* Reduced-motion fallback */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .snap-y {
            scroll-snap-type: none !important;
          }
          .scroll-smooth {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
