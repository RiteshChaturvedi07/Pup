'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ScrollPaw {
  id: number;
  xOffset: number;
  yOffset: number;
  angle: number;
}

export function PersistentScrollMascot() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const [paws, setPaws] = useState<ScrollPaw[]>([]);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  const lastScrollYRef = useRef(0);
  const lastSpawnYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pawCounterRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollYRef.current;

          if (Math.abs(diff) > 2) {
            const dir = diff > 0 ? 'down' : 'up';
            setScrollDir(dir);
            setIsScrolling(true);

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 200);

            // Track vertical scroll delta: every 75px traveled
            if (Math.abs(currentY - lastSpawnYRef.current) >= 75) {
              lastSpawnYRef.current = currentY;
              const count = ++pawCounterRef.current;
              // Alternating lateral offsets: -12px and +12px
              const isEven = count % 2 === 0;
              const xOffset = isEven ? 12 : -12;
              const angle = isEven ? 14 : -14;
              const yOffset = dir === 'down' ? -22 : 22;

              setPaws((prev) => [
                ...prev.slice(-10),
                {
                  id: count,
                  xOffset,
                  yOffset,
                  angle,
                },
              ]);
            }
          }

          lastScrollYRef.current = currentY;
          setScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Gentle 2-step walking bob cycle: translateY: [-3px, 3px] synced to scroll
  const bounceY = isScrolling ? Math.sin(scrollY * 0.12) * 3 : 0;
  const isFacingRight = scrollDir === 'down';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sounds = [
      'Follow me! 🐾',
      'Woof! Let’s find a puppy!',
      'Ready to cuddle? ✨',
      'Look at these doors! 🚪',
      'Almost there! 💕',
    ];
    const text = sounds[Math.floor(Math.random() * sounds.length)];
    setBubbleText(text);
    setTimeout(() => setBubbleText(null), 2200);
  };

  // Only show after user scrolls past hero section (> 260px)
  if (scrollY < 260) return null;

  return (
    <div
      className="fixed right-3 md:right-7 bottom-20 md:bottom-24 z-40 flex flex-col items-center pointer-events-none transition-opacity duration-300"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* Floating Mascot speech bubble on click */}
      {bubbleText && (
        <div
          className="absolute -top-12 right-0 rounded-2xl border-2 border-cocoa bg-milk px-3.5 py-1 text-xs font-scrawl font-bold text-cocoa shadow-lg animate-pop whitespace-nowrap pointer-events-none"
        >
          {bubbleText}
          <div className="absolute -bottom-1 right-5 w-2.5 h-2.5 rotate-45 border-r-2 border-b-2 border-cocoa bg-milk" />
        </div>
      )}

      {/* Dynamic Paw Trail: pinned to floor path with opacity 0.65 and alternating lateral offsets */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {paws.map((p) => (
          <div
            key={p.id}
            className="absolute transition-all duration-700 ease-out animate-fade-out"
            style={{
              right: `${24 + p.xOffset}px`,
              top: `${scrollDir === 'down' ? -18 + p.yOffset : 60 + p.yOffset}px`,
              opacity: 0.65,
              transform: `rotate(${p.angle}deg)`,
              willChange: 'transform, opacity',
            }}
          >
            <svg
              viewBox="0 0 64 64"
              className="w-3.5 h-3.5 text-toffee"
              fill="currentColor"
            >
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Walking Cartoon Mascot: Flips horizontally (scaleX(1) vs scaleX(-1)) and bobs translateY: [-3px, 3px] */}
      <div
        onClick={handleClick}
        className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer pointer-events-auto filter drop-shadow-lg select-none transition-transform duration-100 active:scale-90 hover:scale-110"
        style={{
          transform: `translateY(${bounceY}px)`,
          willChange: 'transform',
        }}
        title="I'm your Teddy buddy! Click me!"
      >
        <svg
          viewBox="0 0 300 240"
          className={`w-full h-full transition-transform duration-250 ease-out ${
            isFacingRight ? 'scale-x-100' : 'scale-x-[-1]'
          }`}
          focusable="false"
        >
          {/* Shadow */}
          <ellipse cx="150" cy="225" rx="70" ry="7" fill="#2a170e" opacity="0.22" />

          {/* Torso & Tail */}
          <g data-p="body">
            {/* Tail wagging when moving */}
            <g
              transform={isScrolling ? 'rotate(15 86 152)' : 'rotate(0 86 152)'}
              className="transition-transform duration-150"
            >
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#2a170e"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#f2be6b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="70" cy="120" r="14" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.8" />
            </g>

            {/* Walking legs */}
            <rect
              x="110"
              y="180"
              width="15"
              height="36"
              rx="7.5"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3"
              style={{
                transform: isScrolling ? `translateY(${bounceY}px)` : 'none',
              }}
            />
            <rect
              x="175"
              y="180"
              width="15"
              height="36"
              rx="7.5"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3"
              style={{
                transform: isScrolling ? `translateY(${-bounceY}px)` : 'none',
              }}
            />

            {/* Torso */}
            <ellipse cx="145" cy="170" rx="45" ry="35" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
            <ellipse cx="145" cy="172" rx="25" ry="18" fill="#fbe3b4" opacity="0.85" />

            {/* Head */}
            <circle cx="195" cy="115" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />

            {/* Ears */}
            <ellipse
              cx="165"
              cy="88"
              rx="14"
              ry="24"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3"
              transform={isScrolling ? 'rotate(-24 165 88)' : 'rotate(-15 165 88)'}
            />
            <ellipse
              cx="225"
              cy="88"
              rx="14"
              ry="24"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3"
              transform={isScrolling ? 'rotate(24 225 88)' : 'rotate(15 225 88)'}
            />

            {/* Muzzle */}
            <ellipse cx="205" cy="126" rx="18" ry="14" fill="#fbe3b4" />
            <ellipse cx="205" cy="118" rx="5.5" ry="4" fill="#2a170e" />
            <path d="M205 122 v4 M201 126 q4 4 8 0" stroke="#2a170e" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <ellipse cx="188" cy="110" rx="5.5" ry="6.5" fill="#2a170e" />
            <ellipse cx="218" cy="110" rx="5.5" ry="6.5" fill="#2a170e" />
            <circle cx="190" cy="108" r="2" fill="#fff" />
            <circle cx="220" cy="108" r="2" fill="#fff" />

            {/* Red bow-tie collar */}
            <polygon points="175,152 186,146 186,158" fill="#a24a1a" stroke="#2a170e" strokeWidth="2" />
            <polygon points="197,152 186,146 186,158" fill="#a24a1a" stroke="#2a170e" strokeWidth="2" />
            <circle cx="186" cy="152" r="3.5" fill="#f2be6b" stroke="#2a170e" strokeWidth="1.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
