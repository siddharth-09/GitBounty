"use client"
import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import Circuit_Riv from "@/components/Circuit_Riv";
import TimTim from "@/components/TimTim";
import Link from "next/link";

export default function SpotlightPreview() {
  return (
    <div className="relative flex h-[100vh] w-full overflow-hidden bg-[linear-gradient(to_bottom,_#262626,_#030a02)] antialiased md:items-center md:justify-center">
  

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#14F195"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 transform-[translateY(23%)]">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          GITBOUNTY <br />
        </h1>

        {/* Two animated buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <Link href="/user">
          <button className="relative h-[50px] w-[200px] rounded-[36px] border border-blue z-90 shadow-[0px_16px_64px_rgba(104,_1,_255,_0.12)] bg-[linear-gradient(85.13deg,_rgba(104,_1,_254,_0.03),_rgba(217,_217,_217,_0.03))] text-white font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_80px_rgba(104,_1,_255,_0.25)] hover:bg-[linear-gradient(85.13deg,_rgba(104,_1,_254,_0.2),_rgba(217,_217,_217,_0.05))]">
            Connect Github
          </button>
          </Link>
          <Link href="/bounty">
          <button className="relative h-[50px] w-[200px] rounded-[36px] border border-blue z-90 shadow-[0px_16px_64px_rgba(104,_1,_255,_0.12)] bg-[linear-gradient(85.13deg,_rgba(104,_1,_254,_0.03),_rgba(217,_217,_217,_0.03))] text-white font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_80px_rgba(104,_1,_255,_0.25)] hover:bg-[linear-gradient(85.13deg,_rgba(104,_1,_254,_0.2),_rgba(217,_217,_217,_0.05))]">
            Explore Bounty
          </button>
          </Link>
        </div>
          <Circuit_Riv/>
      </div>

        <TimTim/>
    </div>
  );
}
