"use client"

import { useRive, UseRiveParameters } from "@rive-app/react-canvas";

export default function CircuitRiv() {
 
  const riveOptions: UseRiveParameters = {
    src: "/ehCircuit.riv", 
    stateMachines: "State Machine 1",
    autoplay: true,
  };

  const { RiveComponent} = useRive(riveOptions);

  // Optional: Add any interaction or state logic


  return (
    <div className="h-[35rem] w-full z-60 transform-[translateY(-15%)]">
      <RiveComponent/>
    </div>
  );
}