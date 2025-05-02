// src/components/CursorBlob.tsx
"use client"
import React, { useEffect, useRef } from 'react';

const CursorBlob: React.FC = () => {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${event.clientX}px`,
            top: `${event.clientY}px`,
          },
          {
            duration: 3000,
            fill: 'forwards',
          }
        );
      }
    };

    document.body.addEventListener('pointermove', handlePointerMove);
    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-[500px] aspect-square bg-gradient-to-r from-aquamarine to-mediumpurple animate-blob filter blur-[200px]"
    ></div>
  );
};

export default CursorBlob;
