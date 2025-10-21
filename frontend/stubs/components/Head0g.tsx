import Head from "next/head";

export default function HeadOg({
  title = "Caelum Protocol",
  description = "Decentralized AI that remembers.",
  url = "https://www.caelumprotocol.org/"
}: { title?: string; description?: string; url?: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Head>
  );
}
