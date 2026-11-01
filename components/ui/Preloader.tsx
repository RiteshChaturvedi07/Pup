'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Dismiss after 1.6s
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    const cleanup = setTimeout(() => {
      setShouldRender(false);
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, []);

  if (!shouldRender) return null;

  const sloganWords = ['every', 'puppy', 'is', 'family'];

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDF8F1] select-none overflow-hidden"
          style={{ willChange: 'transform' }}
          aria-label="Loading TeddyPups"
        >
          {/* Top Scalloped SVG Curtain */}
          <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden pointer-events-none z-20">
            <svg
              viewBox="0 0 1440 40"
              preserveAspectRatio="none"
              className="w-full h-full text-[#F5EEDB] rotate-180"
              fill="currentColor"
            >
              <path d="M0 40 Q 60 10, 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40 T 1320 40 T 1440 40 L 1440 40 L 0 40 Z" />
            </svg>
          </div>

          {/* Cream Geometric Diamond Background Pattern */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, #e4a352 12%, transparent 12%, transparent 88%, #e4a352 88%),
                                linear-gradient(135deg, #e4a352 12%, transparent 12%, transparent 88%, #e4a352 88%)`,
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 18px 18px',
              opacity: 0.08,
            }}
          />

          {/* Center Animation Stage */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
            {/* Animated Walking Puppy Moving Across Center */}
            <div className="relative w-72 h-32 flex items-center justify-center overflow-visible">
              <motion.div
                initial={{ x: -60 }}
                animate={{ x: 30 }}
                transition={{ duration: 1.5, ease: 'linear' }}
                className="relative w-36 h-28"
              >
                {/* 2-step bobbing trot */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-md">
                    {/* Shadow */}
                    <ellipse cx="150" cy="225" rx="70" ry="7" fill="#4A2619" opacity="0.18" />

                    {/* Torso & Tail */}
                    <g>
                      <path
                        d="M86 152 C80 146 76 140 74 136"
                        stroke="#4A2619"
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
                      <circle cx="70" cy="120" r="14" fill="#f2be6b" stroke="#4A2619" strokeWidth="2.8" />

                      {/* Legs */}
                      <rect x="110" y="180" width="16" height="38" rx="8" fill="#e4a352" stroke="#4A2619" strokeWidth="3" />
                      <rect x="175" y="180" width="16" height="38" rx="8" fill="#f2be6b" stroke="#4A2619" strokeWidth="3" />

                      {/* Torso */}
                      <ellipse cx="145" cy="170" rx="45" ry="35" fill="#f2be6b" stroke="#4A2619" strokeWidth="3.4" />
                      <ellipse cx="145" cy="172" rx="25" ry="18" fill="#fbe3b4" opacity="0.85" />

                      {/* Fluffy Head */}
                      <circle cx="195" cy="115" r="42" fill="#f2be6b" stroke="#4A2619" strokeWidth="3.4" />

                      {/* Ears */}
                      <ellipse cx="165" cy="88" rx="14" ry="24" fill="#e4a352" stroke="#4A2619" strokeWidth="3" transform="rotate(-15 165 88)" />
                      <ellipse cx="225" cy="88" rx="14" ry="24" fill="#e4a352" stroke="#4A2619" strokeWidth="3" transform="rotate(15 225 88)" />

                      {/* Muzzle */}
                      <ellipse cx="205" cy="126" rx="18" ry="14" fill="#fbe3b4" />
                      <ellipse cx="205" cy="118" rx="5.5" ry="4" fill="#4A2619" />
                      <path d="M205 122 v4 M201 126 q4 4 8 0" stroke="#4A2619" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                      {/* Glossy Eyes */}
                      <ellipse cx="188" cy="110" rx="5.5" ry="6.5" fill="#4A2619" />
                      <ellipse cx="218" cy="110" rx="5.5" ry="6.5" fill="#4A2619" />
                      <circle cx="190" cy="108" r="2" fill="#fff" />
                      <circle cx="220" cy="108" r="2" fill="#fff" />

                      {/* Rosy Blush */}
                      <circle cx="178" cy="124" r="5" fill="#f9b9a6" opacity="0.8" />
                      <circle cx="228" cy="124" r="5" fill="#f9b9a6" opacity="0.8" />

                      {/* Red Collar */}
                      <polygon points="178,148 188,142 188,154" fill="#a24a1a" stroke="#4A2619" strokeWidth="2" />
                      <polygon points="198,148 188,142 188,154" fill="#a24a1a" stroke="#4A2619" strokeWidth="2" />
                      <circle cx="188" cy="148" r="3" fill="#f2be6b" stroke="#4A2619" strokeWidth="1.5" />
                    </g>
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* 4 Staggered Paw Prints: scale [0, 1], opacity [0, 0.7, 0] */}
            <div className="flex items-center justify-center gap-6 mt-1 mb-5 h-6">
              {[0, 1, 2, 3].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1],
                    opacity: [0, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + idx * 0.28,
                    ease: 'easeOut',
                  }}
                  className="text-toffee"
                  style={{
                    transform: idx % 2 === 0 ? 'rotate(-14deg)' : 'rotate(14deg)',
                  }}
                >
                  <svg viewBox="0 0 64 64" className="w-4 h-4" fill="currentColor">
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Brand Title */}
            <h2 className="font-plush text-3xl sm:text-4xl font-bold text-[#4A2619] tracking-tight">
              TeddyPups
            </h2>

            {/* Staggered Serif Typography Entrance: "every puppy is family" (Georgia / Serif, #4A2619) */}
            <p className="mt-1 flex items-center justify-center gap-1.5 overflow-hidden text-lg sm:text-xl font-normal italic text-[#4A2619]" style={{ fontFamily: 'Georgia, serif' }}>
              {sloganWords.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + idx * 0.12,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Subtle loading line */}
            <div className="w-48 h-1 bg-honey/25 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-[#c2622b] rounded-full"
              />
            </div>
          </div>

          {/* Bottom Scalloped SVG Curtain */}
          <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none z-20">
            <svg
              viewBox="0 0 1440 40"
              preserveAspectRatio="none"
              className="w-full h-full text-[#F5EEDB]"
              fill="currentColor"
            >
              <path d="M0 40 Q 60 10, 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40 T 1320 40 T 1440 40 L 1440 40 L 0 40 Z" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
