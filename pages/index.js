import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const states = { port: useState() };
  return (
    <div>
      <Head>
        <title>DIS IA3</title>
      </Head>
      <div className="w-full flex flex-row justify-center mt-5">
        <div className="text-xl font-bold">DIS IA3</div>
      </div>
    </div>
  );
}
