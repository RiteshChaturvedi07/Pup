'use client';

import React from 'react';

export interface TeddyMascotProps {
  pose?: 'sit' | 'stand' | 'peek' | 'tilt' | 'snug' | 'run';
  facing?: 'left' | 'right';
  pupilOffset?: { x: number; y: number };
  headTilt?: number;
  isBlinking?: boolean;
  className?: string;
  size?: number;
}

export function TeddyMascot({
  pose = 'sit',
  facing = 'right',
  pupilOffset = { x: 0, y: 0 },
  headTilt = 0,
  isBlinking = false,
  className = '',
  size = 200,
}: TeddyMascotProps) {
  const isLeft = facing === 'left';
  const clampedX = Math.max(-3.5, Math.min(3.5, pupilOffset.x));
  const clampedY = Math.max(-3.5, Math.min(3.5, pupilOffset.y));
  const totalTilt = (pose === 'tilt' ? -8 : 0) + Math.max(-6, Math.min(6, headTilt));

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      data-pose={pose}
      data-facing={facing}
      style={{ width: size, height: (size * 240) / 300 }}
    >
      <svg
        viewBox="0 0 300 240"
        className={`w-full h-full transition-transform duration-200 ${
          isLeft ? 'scale-x-[-1]' : 'scale-x-100'
        }`}
        aria-hidden="true"
        focusable="false"
      >
        <g data-p="root">
          {/* Ground shadow */}
          <ellipse
            cx="150"
            cy="230"
            rx="92"
            ry="7"
            fill="#2a170e"
            opacity="0.14"
          />

          {/* Main animated body */}
          <g
            data-p="body"
            className="transition-transform duration-300"
            transform={pose === 'peek' ? 'translate(0, 40)' : 'translate(0, -2)'}
          >
            {/* Fluffy tail */}
            <g data-p="tail" className="origin-[84px_150px] transition-transform duration-300 hover:rotate-12">
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#2a170e"
                strokeWidth="9"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M86 152 C80 146 76 140 74 136"
                stroke="#f2be6b"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="70" cy="120" r="18" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
              <circle cx="82" cy="116" r="14" fill="#fbe3b4" />
            </g>

            {/* Back Legs / haunch */}
            <g data-p="back-legs">
              <ellipse cx="106" cy="198" rx="16" ry="22" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
              <ellipse cx="104" cy="220" rx="14" ry="8" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
            </g>

            {/* Main torso */}
            <path
              d="M90 170 Q 75 140 120 135 Q 165 130 195 150 Q 215 170 195 200 Q 150 215 90 170 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <ellipse cx="145" cy="175" rx="30" ry="20" fill="#fbe3b4" opacity="0.85" />

            {/* Front paws */}
            <g data-p="front-legs">
              <path
                d="M165 170 L170 218 Q 170 224 178 224 Q 186 224 186 218 L184 175"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
              <path d="M174 218 v5 M180 218 v5" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Head group tracking cursor */}
            <g
              data-p="head"
              transform={`rotate(${totalTilt} 205 100)`}
              className="transition-transform duration-150"
            >
              {/* Left ear */}
              <g data-p="earL" className="origin-[165px_75px] transition-transform duration-200">
                <ellipse
                  cx="165"
                  cy="75"
                  rx="20"
                  ry="28"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.2"
                  transform="rotate(-20 165 75)"
                />
                <ellipse
                  cx="165"
                  cy="75"
                  rx="12"
                  ry="18"
                  fill="#fbe3b4"
                  transform="rotate(-20 165 75)"
                />
              </g>

              {/* Right ear */}
              <g data-p="earR" className="origin-[245px_75px] transition-transform duration-200">
                <ellipse
                  cx="245"
                  cy="75"
                  rx="20"
                  ry="28"
                  fill="#e4a352"
                  stroke="#2a170e"
                  strokeWidth="3.2"
                  transform="rotate(20 245 75)"
                />
                <ellipse
                  cx="245"
                  cy="75"
                  rx="12"
                  ry="18"
                  fill="#fbe3b4"
                  transform="rotate(20 245 75)"
                />
              </g>

              {/* Head face circle */}
              <circle cx="205" cy="100" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
              <ellipse cx="205" cy="115" rx="26" ry="18" fill="#fffdf8" stroke="#2a170e" strokeWidth="2.5" />

              {/* Eyes with pupil cursor tracking */}
              {isBlinking ? (
                /* Blinking closed eyes */
                <g>
                  <path d="M182 96 Q 188 100 194 96" stroke="#2a170e" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M216 96 Q 222 100 228 96" stroke="#2a170e" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              ) : (
                /* Open eyes with pupils translating towards mouse */
                <g>
                  {/* Left Eye */}
                  <circle cx="188" cy="95" r="7" fill="#2a170e" />
                  <circle
                    cx={188 + clampedX}
                    cy={95 + clampedY}
                    r="2.5"
                    fill="#fffdf8"
                  />
                  {/* Right Eye */}
                  <circle cx="222" cy="95" r="7" fill="#2a170e" />
                  <circle
                    cx={222 + clampedX}
                    cy={95 + clampedY}
                    r="2.5"
                    fill="#fffdf8"
                  />
                </g>
              )}

              {/* Rosy cheeks */}
              <ellipse cx="177" cy="108" rx="6" ry="4" fill="#f9cdbf" opacity="0.65" />
              <ellipse cx="233" cy="108" rx="6" ry="4" fill="#f9cdbf" opacity="0.65" />

              {/* Button Nose */}
              <ellipse cx="205" cy="108" rx="5" ry="3.8" fill="#2a170e" />
              {/* Mouth smile */}
              <path
                d="M201 113 Q 205 116 209 113"
                fill="none"
                stroke="#2a170e"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Red bow-tie collar */}
              <path
                d="M190 142 Q 205 146 220 142 Q 205 138 190 142 Z"
                fill="#a24a1a"
                stroke="#2a170e"
                strokeWidth="2.5"
              />
              <circle cx="205" cy="142" r="4" fill="#f2be6b" stroke="#2a170e" strokeWidth="1.5" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
