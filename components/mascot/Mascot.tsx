'use client';

import React from 'react';

interface MascotProps {
  pose?: 'sit' | 'stand' | 'walk' | 'look' | 'tilt' | 'peek';
  facing?: 'left' | 'right';
  className?: string;
  size?: number;
  showBubble?: boolean;
  bubbleText?: string;
}

export function Mascot({
  pose = 'sit',
  facing = 'right',
  className = '',
  size = 180,
  showBubble = false,
  bubbleText = 'Woof!',
}: MascotProps) {
  const isLeft = facing === 'left';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      data-pose={pose}
      data-facing={facing}
      style={{ width: size, height: (size * 240) / 300 }}
    >
      {/* Speech bubble */}
      {showBubble && (
        <div className="absolute -top-10 z-20 rounded-2xl border-2 border-cocoa bg-milk px-3.5 py-1 text-xs font-scrawl font-bold text-cocoa shadow-md animate-bounce">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r-2 border-b-2 border-cocoa bg-milk" />
        </div>
      )}

      {/* Apricot Mascot SVG illustration */}
      <svg
        viewBox="0 0 300 240"
        className={`w-full h-full transition-transform duration-300 ${
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
            opacity="0.15"
          />

          {/* Body */}
          <g data-p="body" transform="translate(0, -2)">
            {/* Fluffy tail */}
            <g data-p="tail">
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
              {/* Fluffy tail puff */}
              <circle cx="70" cy="120" r="18" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
              <circle cx="82" cy="116" r="14" fill="#fbe3b4" />
            </g>

            {/* Back Legs */}
            <g data-p="back-legs">
              <ellipse cx="106" cy="198" rx="16" ry="22" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
              <ellipse cx="104" cy="220" rx="14" ry="8" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
            </g>

            {/* Main fluffy apricot torso */}
            <path
              d="M90 170 Q 75 140 120 135 Q 165 130 195 150 Q 215 170 195 200 Q 150 215 90 170 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            {/* Soft tummy accent */}
            <ellipse cx="145" cy="175" rx="30" ry="20" fill="#fbe3b4" opacity="0.8" />

            {/* Front legs / paws */}
            <g data-p="front-legs">
              <path
                d="M165 170 L170 218 Q 170 224 178 224 Q 186 224 186 218 L184 175"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
              {/* Toe lines */}
              <path d="M174 218 v5 M180 218 v5" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Head & Face */}
            <g data-p="head" transform={pose === 'tilt' ? 'rotate(-6 210 100)' : 'rotate(0)'}>
              {/* Teddy Ears */}
              {/* Left ear */}
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

              {/* Right ear */}
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

              {/* Main round head */}
              <circle cx="205" cy="100" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
              <ellipse cx="205" cy="115" rx="26" ry="18" fill="#fffdf8" stroke="#2a170e" strokeWidth="2.5" />

              {/* Big glassy teddy eyes */}
              <circle cx="188" cy="95" r="6.5" fill="#2a170e" />
              <circle cx="186" cy="93" r="2.2" fill="#fffdf8" />
              <circle cx="222" cy="95" r="6.5" fill="#2a170e" />
              <circle cx="220" cy="93" r="2.2" fill="#fffdf8" />

              {/* Rosy cheeks */}
              <ellipse cx="178" cy="108" rx="6" ry="4" fill="#f9cdbf" opacity="0.6" />
              <ellipse cx="232" cy="108" rx="6" ry="4" fill="#f9cdbf" opacity="0.6" />

              {/* Chocolate button nose */}
              <ellipse cx="205" cy="108" rx="5" ry="3.8" fill="#2a170e" />
              {/* Cute puppy smile */}
              <path
                d="M201 113 Q 205 116 209 113"
                fill="none"
                stroke="#2a170e"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Red bow-tie / collar */}
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
