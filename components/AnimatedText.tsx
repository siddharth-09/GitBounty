"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedText: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const original = 'Git Bounty';
  const hover = 'Lets Hunt It';

  useEffect(() => {
    const container = titleRef.current;
    if (!container) return;

    container.innerHTML = '';

    const maxLength = Math.max(original.length, hover.length);

    const spans = Array.from({ length: maxLength }).map((_, i) => {
      const span = document.createElement('span');
      span.dataset.original = original[i] || '';
      span.dataset.hover = hover[i] || '';
      span.textContent = original[i] || '';
      span.className = 'inline-block opacity-100';
      container.appendChild(span);
      return span;
    });

    const animateTo = (type: 'original' | 'hover') => {
      spans.forEach((span, i) => {
        gsap.to(span, {
          opacity: 0,
          duration: 0.25,
          delay: i * 0.03,
          ease: 'power1.out',
          onComplete: () => {
            span.textContent = span.dataset[type]!;
            gsap.to(span, {
              opacity: 1,
              duration: 0.25,
              delay: 0.03,
              ease: 'power1.inOut',
            });
          },
        });
      });
    };

    const handleMouseEnter = () => animateTo('hover');
    const handleMouseLeave = () => animateTo('original');

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <h1
      ref={titleRef}
      className="relative z-30 font-orbitron text-[10rem] font-bold text-cyan-400 whitespace-nowrap flex gap-1 leading-none transition-colors"
    ></h1>
  );
};

export default AnimatedText;
