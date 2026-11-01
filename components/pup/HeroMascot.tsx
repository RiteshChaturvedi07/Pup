'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface HeroMascotProps {
  activePupIndex?: number | null;
  className?: string;
  onMascotClick?: () => void;
}

interface Reaction {
  text: string;
  eyeState: 'shut' | 'open' | 'happy';
  tilt: number;
  bounceY: number;
  duration: number;
}

const REACTIONS: Reaction[] = [
  { text: 'achoo!', eyeState: 'shut', bounceY: 4, tilt: -6, duration: 2200 },
  { text: 'hm?', eyeState: 'open', bounceY: -6, tilt: 14, duration: 2200 },
  { text: 'peekaboo!', eyeState: 'happy', bounceY: -14, tilt: 6, duration: 2200 },
  { text: 'woof!', eyeState: 'happy', bounceY: -10, tilt: -4, duration: 2000 },
];

export function HeroMascot({
  activePupIndex = null,
  className = '',
  onMascotClick,
}: HeroMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [currentReaction, setCurrentReaction] = useState<Reaction | null>(null);
  const [reactionIndex, setReactionIndex] = useState<number>(0);
  const [earWiggle, setEarWiggle] = useState<number>(0);
  const [bounceY, setBounceY] = useState<number>(0);

  // Natural periodic blinking when not reacting
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!currentReaction) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
      }
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, [currentReaction]);

  // Pointer movement tracking in ALL 360-degree directions (up, down, left, right, diagonals)
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scaleX = rect.width / 300;
      const scaleY = rect.height / 240;

      // Teddy's eye center in screen coordinates (X=212, Y=98 in SVG)
      const eyeCenterX = rect.left + 212 * scaleX;
      const eyeCenterY = rect.top + 98 * scaleY;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const dist = Math.hypot(dx, dy) || 1;
      const angle = Math.atan2(dy, dx);

      // Max eye pupil travel in SVG units: 6px
      const maxTravel = 6.0;
      const distFactor = Math.min(1, dist / 30);
      const gazeX = Math.cos(angle) * maxTravel * distFactor;
      const gazeY = Math.sin(angle) * maxTravel * distFactor;

      // Subtle inquisitive head tilt following cursor angle (clamped to +/- 8 deg)
      const targetTilt = Math.max(-8, Math.min(8, (dx / (window.innerWidth / 2)) * 10));

      setGaze({ x: gazeX, y: gazeY });
      setHeadTilt(targetTilt);
    },
    []
  );

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [handlePointerMove]);

  // Click on Teddy to trigger reaction & speech bubble matching the live site screenshots
  const handleTeddyClick = (e?: React.MouseEvent | React.PointerEvent) => {
    e?.stopPropagation();
    const reaction = REACTIONS[reactionIndex % REACTIONS.length];
    setReactionIndex((prev) => prev + 1);
    setCurrentReaction(reaction);
    setBounceY(reaction.bounceY);
    setEarWiggle(reaction.tilt > 0 ? 9 : -9);

    // Bounce spring animation
    setTimeout(() => setBounceY(0), 220);
    setTimeout(() => setEarWiggle(0), 400);

    // Clear reaction after duration
    setTimeout(() => {
      setCurrentReaction(null);
    }, reaction.duration);

    onMascotClick?.();
  };

  const effectiveTilt = currentReaction ? currentReaction.tilt : headTilt;
  const eyeMode = currentReaction ? currentReaction.eyeState : isBlinking ? 'blink' : 'open';

  return (
    <div
      ref={containerRef}
      className={`pup-buddy relative select-none cursor-pointer group ${className}`}
      onClick={handleTeddyClick}
      data-live="true"
      title="Click Teddy!"
      style={{
        transform: `translateY(${bounceY}px)`,
        transition: 'transform 0.18s cubic-bezier(.34, 1.56, .64, 1)',
        pointerEvents: 'auto',
      }}
    >
      {/* Speech bubble directly above Teddy matching screenshots ("achoo!", "hm?", "peekaboo!", "woof!") */}
      {currentReaction && (
        <span
          className="mascot-speech-bubble font-scrawl"
          data-show="true"
        >
          {currentReaction.text}
        </span>
      )}

      {/* SVG Mascot with chest, head, 360 eye tracking, and TWO FRONT LEGS AND PAWS RESTING ON QUILT */}
      <svg
        viewBox="0 0 300 240"
        role="img"
        aria-label="Teddy, the TeddyPups mascot, peeking over the quilt"
        focusable="false"
        onClick={handleTeddyClick}
        style={{
          transformOrigin: '212px 100px',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        className="w-full h-auto block overflow-visible"
      >
        <g data-p="root">
          {/* Chest behind collar */}
          <g data-p="body">
            <path
              d="M174 140 Q212 160 250 140 L250 156 Q212 166 174 156 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {/* Animated Head tracking cursor direction */}
          <g
            data-p="head"
            style={{
              transformOrigin: '212px 100px',
              transform: `translate(0px, 4px) rotate(${effectiveTilt}deg)`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            {/* Red bow-tie collar */}
            <path
              d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
              fill="#a24a1a"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
              fill="#fbe3b4"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Left Ear */}
            <path
              data-p="earL"
              d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                transformOrigin: '174px 82px',
                transform: `rotate(${-6 + earWiggle}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            />

            {/* Right Ear */}
            <path
              data-p="earR"
              d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                transformOrigin: '250px 82px',
                transform: `rotate(${6 - earWiggle}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            />

            {/* Cloud-like Curly Fur Head Outline */}
            <path
              d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Forehead Tuft Curls */}
            <path
              d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Cream Snout / Muzzle */}
            <path
              d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
              fill="#fbe3b4"
            />

            {/* Rosy blush cheeks */}
            <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
            <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

            {/* Eyes tracking pointer in 360 degrees */}
            <g
              data-p="eyes"
              style={{
                transform: `translate(${gaze.x}px, ${gaze.y}px)`,
                transition: 'transform 0.08s ease-out',
              }}
            >
              {eyeMode === 'blink' ? (
                /* Blinking eye curve */
                <g data-p="blink">
                  <path
                    d="M186.5 97 Q194 103.5 201.5 97"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M222.5 97 Q230 103.5 237.5 97"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ) : eyeMode === 'happy' ? (
                /* Happy smiling eyes (used in peekaboo! / woof!) */
                <g data-p="happy">
                  <path
                    d="M186.5 101 Q194 91.5 201.5 101"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M222.5 101 Q230 91.5 237.5 101"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ) : eyeMode === 'shut' ? (
                /* Squinting sneeze eyes (used in achoo!) */
                <g data-p="shut">
                  <path
                    d="M186.5 97 Q194 103.5 201.5 97"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M222.5 97 Q230 103.5 237.5 97"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ) : (
                /* Open round button eyes with dual shine highlights tracking cursor */
                <g data-p="open" opacity="1">
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
              )}
            </g>

            {/* Button Nose */}
            <path
              d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
              fill="#2a170e"
            />

            {/* Mouth smile line */}
            <path
              d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />

            {/* Pink puppy tongue */}
            <path
              data-p="tongue"
              d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
              fill="#e98c8c"
              stroke="#2a170e"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>

          {/* TWO PROMINENT FRONT LEGS & PAWS RESTING OVER QUILT SCALLOPS (Rendered on top of head & collar) */}
          <g data-p="legs-and-paws">
            {/* Left front leg shaft & paw */}
            <path
              d="M174 142 L174 156 C174 165 179 168 189 168 C199 168 204 165 204 156 L204 142 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Left paw claw notch lines */}
            <path
              d="M184 156 v7 M194 156 v7"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right front leg shaft & paw */}
            <path
              d="M220 142 L220 156 C220 165 225 168 235 168 C245 168 250 165 250 156 L250 142 Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Right paw claw notch lines */}
            <path
              d="M230 156 v7 M240 156 v7"
              stroke="#2a170e"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
