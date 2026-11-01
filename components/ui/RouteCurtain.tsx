'use client';

import React, { useEffect, useState } from 'react';
import { PAW_PATH_D } from './PawTrailCanvas';

const PAW_PRINTS: Array<[number, number, number]> = [
  [18, 6, -76],
  [27, -4, -84],
  [36, 7, -72],
  [45, -3, -86],
  [54, 6, -74],
];

export function RouteCurtain() {
  const [state, setState] = useState<'intro' | 'lifting' | 'idle'>('intro');

  useEffect(() => {
    // Lift curtain after intro duration
    const liftTimer = setTimeout(() => {
      setState('lifting');
    }, 1500);

    const idleTimer = setTimeout(() => {
      setState('idle');
    }, 2100);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  if (state === 'idle') {
    return null;
  }

  return (
    <div
      className={`tp-curtain fixed inset-0 z-[95] overflow-hidden pointer-events-none transition-transform duration-700 ${
        state === 'lifting'
          ? '-translate-y-full ease-[cubic-bezier(0.77,0,0.175,1)]'
          : 'translate-y-0'
      }`}
      data-state={state}
      aria-hidden="true"
    >
      <div className="tp-curtain__blanket absolute inset-0 grid place-items-center bg-[#fdf8f0]">
        {/* Top Scalloped Border Edge */}
        <svg
          className="tp-curtain__edge tp-curtain__edge--top absolute left-0 -top-[39px] w-full h-10"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="tp-curtain-scallop-intro"
              width="76"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
              <path
                d="M0 27A38 25 0 0 1 76 27"
                fill="none"
                stroke="#2a170e"
                strokeWidth="3"
              />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2a170e"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.42"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-intro)" />
        </svg>

        {/* Center Animation Stage */}
        <div className="tp-curtain__stage relative w-[min(44rem,86vw)] h-[clamp(9rem,24vw,12rem)] flex flex-col items-center justify-center">
          {/* Paw prints track */}
          <div className="tp-curtain__prints absolute inset-x-0 bottom-6 h-9">
            {PAW_PRINTS.map(([left, top, rot], i) => (
              <svg
                key={i}
                viewBox="0 0 64 64"
                className="tp-curtain__print absolute w-5 h-5 fill-[#c2622b]"
                style={{
                  left: `${left}%`,
                  top: `${top}px`,
                  transform: `rotate(${rot + 90}deg)`,
                  animation: `tp-print-step 1s ease-out ${0.16 + 0.12 * i}s both`,
                }}
              >
                <path d={PAW_PATH_D} />
              </svg>
            ))}
          </div>

          {/* Running Cartoon Mascot Sprite */}
          <div
            className="tp-curtain__runner absolute bottom-6 left-0 w-28"
            style={{
              animation: 'tp-runner-x 1.25s cubic-bezier(0.32, 0.1, 0.4, 1) both',
            }}
          >
            <svg
              viewBox="0 0 300 240"
              className="tp-runner w-full h-auto overflow-visible select-none"
              aria-hidden="true"
            >
              <ellipse
                cx="150"
                cy="232"
                rx="86"
                ry="7"
                fill="#2a170e"
                opacity="0.12"
                className="tp-runner__shadow"
              />
              <g
                className="tp-runner__body"
                style={{ animation: 'tp-runner-bob 0.16s ease-in-out infinite alternate' }}
              >
                {/* Back legs */}
                <g
                  className="tp-runner__leg tp-runner__leg--bf"
                  style={{
                    transformOrigin: '94px 192px',
                    animation: 'tp-runner-leg-a 0.32s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M80 178 C80 196 82 210 82 219 C82 226 87 228 94 228 C103 228 107 225 107 219 C107 210 108 196 108 178 Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>
                <g
                  className="tp-runner__leg tp-runner__leg--ff"
                  style={{
                    transformOrigin: '168px 192px',
                    animation: 'tp-runner-leg-b 0.32s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M157 178 C157 196 156 210 156 219 C156 226 161 228 168 228 C177 228 179 225 179 219 C179 210 179 196 179 178 Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>

                {/* Wagging Tail */}
                <g
                  className="tp-runner__tail"
                  style={{
                    transformOrigin: '84px 150px',
                    animation: 'tp-runner-wag 0.22s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M86 152 C80 146 76 140 74 136"
                    stroke="#2a170e"
                    strokeWidth="9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M86 152 C80 146 76 140 74 136"
                    stroke="#f2be6b"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="126" r="14" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                </g>

                {/* Near back leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--bn"
                  style={{
                    transformOrigin: '110px 194px',
                    animation: 'tp-runner-leg-b 0.32s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M95 180 C95 198 98 212 98 221 C98 228 103 230 110 230 C119 230 123 227 123 221 C123 212 125 198 125 180 Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>

                {/* Body & Chest puffs */}
                <path
                  d="M140 134 Q155 130 170 140 Q185 145 195 160 Q205 180 190 195 Q170 205 145 200 Q120 195 110 180 Q105 160 120 145 Z"
                  fill="#f2be6b"
                  stroke="#2a170e"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                />

                {/* Near front leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--fn"
                  style={{
                    transformOrigin: '186px 194px',
                    animation: 'tp-runner-leg-a 0.32s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M174 180 C174 198 174 212 174 221 C174 228 179 230 186 230 C195 230 199 227 199 221 C199 212 198 198 198 180 Z"
                    fill="#f2be6b"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>

                {/* Head, ears, face */}
                <g className="tp-runner__head">
                  <path
                    d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                    fill="#a24a1a"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  <path
                    d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                    fill="#fbe3b4"
                    stroke="#2a170e"
                    strokeWidth="2.4"
                  />
                  {/* Left ear */}
                  <path
                    d="M155 85 Q170 80 185 95 Q190 120 175 140 Q155 135 150 110 Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    style={{
                      transformOrigin: '174px 82px',
                      animation: 'tp-runner-ear 0.16s ease-in-out infinite alternate',
                    }}
                  />
                  {/* Right ear */}
                  <path
                    d="M240 85 Q255 80 270 95 Q275 120 260 140 Q240 135 235 110 Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    style={{
                      transformOrigin: '250px 82px',
                      animation: 'tp-runner-ear 0.16s ease-in-out infinite alternate',
                    }}
                  />
                  {/* Head puff */}
                  <circle cx="212" cy="100" r="44" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
                  <circle cx="212" cy="56" r="14" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  {/* Muzzle */}
                  <ellipse cx="212" cy="116" rx="20" ry="16" fill="#fbe3b4" />
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  {/* Happy eyes */}
                  <path
                    d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                    fill="#2a170e"
                  />
                  <path
                    d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                    fill="#e98c8c"
                    stroke="#2a170e"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Staggered Serif Tagline */}
          <p className="tp-curtain__note font-scrawl text-[#4A2619] font-bold text-xl md:text-2xl mt-8">
            every puppy is family
          </p>
        </div>

        {/* Bottom Scalloped Border Edge */}
        <svg
          className="tp-curtain__edge tp-curtain__edge--bottom absolute left-0 -bottom-[39px] w-full h-10 scale-y-[-1]"
          preserveAspectRatio="none"
        >
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-intro)" />
        </svg>
      </div>
    </div>
  );
}

