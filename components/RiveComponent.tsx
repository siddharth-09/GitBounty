// src/components/RiveComponent.tsx
"use client";
import React from 'react';
import { useRive } from '@rive-app/react-canvas';

const RiveComponent: React.FC = () => {
  const { RiveComponent } = useRive({
    src: 'catCoding.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
    artboard: undefined, // optional if using default artboard
  });

  return (
    <div className="w-[70%] h-[70%] translate-y-[20%]">
      <RiveComponent className="w-full h-full bg-transparent" />
    </div>
  );
};

export default RiveComponent;
