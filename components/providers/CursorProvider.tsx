'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/motion';

type CursorState = 'default' | 'link' | 'button' | 'door' | 'drag' | 'photo' | 'play' | 'text';

interface CursorContextValue {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursorState: 'default',
  setCursorState: () => {},
});

export const useCursor = () => useContext(CursorContext);

interface PawTrailParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  time: number;
}

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isDarkTone, setIsDarkTone] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [pawTrail, setPawTrail] = useState<PawTrailParticle[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const lastTrailTimeRef = useRef(0);
  const trailCounterRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast setters using gsap.quickTo
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!hasMoved) {
        hasMoved = true;
        document.documentElement.classList.add('has-custom-cursor');
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      setDotX(x);
      setDotY(y);
      setRingX(x);
      setRingY(y);

      // Check for paw trail in hero & footer scenes
      const target = e.target as HTMLElement | null;
      const inTrailZone = target?.closest('.tp-hero, .tp-footer, [data-trail]');
      const now = performance.now();

      if (inTrailZone && now - lastTrailTimeRef.current > 120) {
        const dx = x - posRef.current.lastX;
        const dy = y - posRef.current.lastY;
        const dist = Math.hypot(dx, dy);

        if (dist > 8) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          lastTrailTimeRef.current = now;
          posRef.current.lastX = x;
          posRef.current.lastY = y;

          setPawTrail((prev) => {
            const next = [
              ...prev.slice(-11),
              { id: ++trailCounterRef.current, x, y, angle, time: now },
            ];
            return next;
          });
        }
      }

      posRef.current.x = x;
      posRef.current.y = y;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect dark tone scene
      const darkScene = target.closest('[data-tone="dark"]');
      setIsDarkTone(!!darkScene);

      // Check cursor data attribute or interactive types
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor') as CursorState;
        setCursorState(mode);
        if (mode === 'door') setCursorText('Open');
        else if (mode === 'drag') setCursorText('Drag');
        else if (mode === 'photo') setCursorText('View');
        else if (mode === 'play') setCursorText('Play');
        else setCursorText('');
        return;
      }

      if (target.closest('a, button, [role="button"], input[type="submit"]')) {
        setCursorState('button');
        setCursorText('');
      } else if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorState('text');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);

      // Spawn paw ripple at current position
      if (rippleRef.current) {
        const { x, y } = posRef.current;
        gsap.killTweensOf(rippleRef.current);
        gsap.fromTo(
          rippleRef.current,
          { x, y, scale: 0.3, opacity: 0.8 },
          { scale: 1.4, opacity: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      document.documentElement.classList.remove('has-custom-cursor');
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        document.documentElement.classList.add('has-custom-cursor');
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  // Filter expired trail particles
  useEffect(() => {
    if (pawTrail.length === 0) return;
    const timer = setTimeout(() => {
      const now = performance.now();
      setPawTrail((prev) => prev.filter((p) => now - p.time < 900));
    }, 150);
    return () => clearTimeout(timer);
  }, [pawTrail]);

  // Determine sizing & styling according to cursor state
  let ringSize = 40;
  let ringBg = 'transparent';
  let dotSize = 8;

  if (cursorState === 'button' || cursorState === 'link') {
    ringSize = 64;
    ringBg = isDarkTone ? 'rgba(251, 227, 180, 0.3)' : 'rgba(242, 190, 107, 0.35)';
    dotSize = 4;
  } else if (cursorState === 'door') {
    ringSize = 84;
    ringBg = isDarkTone ? 'rgba(251, 227, 180, 0.25)' : 'rgba(228, 163, 82, 0.3)';
    dotSize = 0;
  } else if (cursorState === 'drag') {
    ringSize = 84;
    ringBg = isDarkTone ? 'rgba(251, 227, 180, 0.25)' : 'rgba(242, 190, 107, 0.3)';
    dotSize = 0;
  } else if (cursorState === 'photo') {
    ringSize = 76;
    ringBg = isDarkTone ? 'rgba(251, 227, 180, 0.25)' : 'rgba(242, 190, 107, 0.3)';
    dotSize = 0;
  } else if (cursorState === 'play') {
    ringSize = 72;
    ringBg = isDarkTone ? 'rgba(251, 227, 180, 0.25)' : 'rgba(242, 190, 107, 0.3)';
    dotSize = 0;
  } else if (cursorState === 'text') {
    ringSize = 24;
    dotSize = 2;
  }

  const inkColor = isDarkTone ? '#fff1d8' : '#2a170e';
  const borderColor = isDarkTone ? 'rgba(255, 241, 216, 0.65)' : 'rgba(42, 23, 14, 0.6)';

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}

      {/* Fixed custom cursor container */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      >
        {/* Paw Trail Elements */}
        {pawTrail.map((p) => (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
              animation: 'pawFade 0.9s forwards ease-out',
            }}
          >
            <svg
              viewBox="0 0 64 64"
              className="w-3.5 h-3.5"
              fill={inkColor}
              opacity="0.45"
            >
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>
        ))}

        {/* Paw Ripple on Click */}
        <div
          ref={rippleRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <svg viewBox="0 0 64 64" className="w-6 h-6" fill={inkColor}>
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        </div>

        {/* Outer Ring Follower */}
        <div
          ref={ringRef}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center pointer-events-none transition-[width,height,background-color,border-color,transform] duration-300 ease-out opacity-0"
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            borderColor: borderColor,
            borderWidth: '1.5px',
            borderStyle: 'solid',
            backgroundColor: ringBg,
            transform: isMouseDown ? 'translate(-50%, -50%) scale(0.85)' : 'translate(-50%, -50%) scale(1)',
          }}
        >
          {cursorText && (
            <span
              className="font-scrawl text-xs font-bold tracking-wide select-none"
              style={{ color: inkColor }}
            >
              {cursorText}
            </span>
          )}
        </div>

        {/* Inner Exact Dot */}
        <div
          ref={dotRef}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-[width,height,background-color] duration-150 ease-out opacity-0"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: inkColor,
          }}
        />
      </div>
    </CursorContext.Provider>
  );
};
