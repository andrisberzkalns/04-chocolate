import Head from "next/head";

import Canvas from "~/components/Canvas";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chocolate Challenge</title>
        <meta name="description" content="Chocolate bar challenge website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-teal-700">
        <Canvas />
      </main>
    </>
  );
}
