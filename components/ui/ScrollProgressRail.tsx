'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';

export const ScrollProgressRail: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(bar, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none origin-left"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-[#e4a352] via-[#f2be6b] to-[#a24a1a] shadow-[0_1px_3px_rgba(42,23,14,0.3)] origin-left scale-x-0"
      />
    </div>
  );
};
export default ScrollProgressRail;
