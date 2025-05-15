import React from "react";
import { Spotlight } from "@/components/ui/spotlight"; 

export default function SpotlightPreview() {
  return (
    <div className="relative flex h-[100vh] w-full overflow-hidden rounded-md bg-[linear-gradient(to_bottom,_#262626,_#030a02)] antialiased md:items-center md:justify-center">
      <div
      
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#14F195"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
      </div>
    </div>
  );
}
