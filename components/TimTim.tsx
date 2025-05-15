"use client"

import { useRive, UseRiveParameters } from "@rive-app/react-canvas";

export default function TimTim (){

const riveOptions: UseRiveParameters = {
    src: "/tim.riv", 
    stateMachines: "State Machine 1",
    autoplay: true,
  };
  const { RiveComponent} = useRive(riveOptions);
    return (
        <>
        <div className="h-[40rem] w-full z-5 absolute transform-[translateX(-20%)translateY(-15%)] opacity-10">
      <RiveComponent/>
    </div>
        </>
    )
}