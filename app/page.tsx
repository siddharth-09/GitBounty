// src/App.tsx
import AnimatedText from '@/components/AnimatedText';
import CursorBlob from '@/components/CursorBlob';
import RiveComponent from '@/components/RiveComponent';
import React from 'react';


const App: React.FC = () => {
  return (
    <div className="min-h-[500vh] w-full font-sans bg-[#010313] text-white overflow-x-hidden">


      <CursorBlob />

      <section className="w-full h-screen flex items-center justify-center">
        <div className="relative flex justify-between items-center w-full h-full p-8 overflow-hidden">
          <div className="-translate-y-20 z-30">
            <AnimatedText />
          </div>
          <div className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-[40%] w-[110rem] h-[110rem] pointer-events-none z-10">
            <RiveComponent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
