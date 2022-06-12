import Head from "next/head";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Layout({ children, page }) {
  return (
    <div>
      <Head>
        <title>DIS IA3</title>
      </Head>
      <div className="flex flex-row h-20 justify-items-start bg-council_primary items-center">
        <div className="w-20 h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/council-icon_sm.jpeg"
            alt="Noosa Council Logo"
            width={225}
            height={225}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="text-center flex-grow text-4xl text-gray-50 font-head tracking-wider">
          <b>Explore Noosa</b>
        </div>
      </div>
      <Navbar page={page} />
      {children}
    </div>
  );
}
