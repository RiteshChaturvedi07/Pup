'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TeddySvg } from './TeddySvg';
import {
  TEDDY_POSES,
  TeddyPose,
  TeddyTimeState,
  TEDDY_POINTS,
} from './TeddyModel';

export interface PupBuddyProps {
  pose?: keyof typeof TEDDY_POSES | TeddyPose;
  facing?: 'left' | 'right';
  act?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  size?: number | string;
  isWalking?: boolean;
  walkSpeed?: number;
  onClick?: () => void;
}

export function PupBuddy({
  pose = 'sit',
  facing = 'right',
  act,
  className = '',
  style,
  label = 'Teddy, the TeddyPups mascot',
  size = 200,
  isWalking,
  walkSpeed,
  onClick,
}: PupBuddyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);

  const [activePose, setActivePose] = useState<TeddyPose>(() => {
    return typeof pose === 'string' ? (TEDDY_POSES[pose] || TEDDY_POSES.sit) : pose;
  });

  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  // Animation and physics state ref
  const animState = useRef({
    timeState: {
      phase: 0,
      stride: 0,
      time: 0,
      wag: 0.6,
      gazeX: 0,
      gazeY: 0,
      blink: 0,
      ear: 0,
    } as TeddyTimeState,
    targetPose: typeof pose === 'string' ? (TEDDY_POSES[pose] || TEDDY_POSES.sit) : pose,
    currentPose: typeof pose === 'string' ? (TEDDY_POSES[pose] || TEDDY_POSES.sit) : pose,
    facing: facing === 'left' ? -1 : 1,
    facingTarget: facing === 'left' ? -1 : 1,
    wagTarget: 0.6,
    strideTarget: 0,
    gazeTarget: { x: 0, y: 0 },
    tiltTarget: 0,
    currentTilt: 0,
    earV: 0,
    bounceV: 0,
    nextBlink: 2.5,
    lastTime: performance.now() / 1000,
    actionQueue: [] as Array<[number, (t: number) => void]>,
    pointerPos: null as { x: number; y: number } | null,
    isPlaying: false,
  });

  // Update target pose when prop changes
  useEffect(() => {
    const nextPose = typeof pose === 'string' ? (TEDDY_POSES[pose] || TEDDY_POSES.sit) : pose;
    animState.current.targetPose = nextPose;
    animState.current.facingTarget = facing === 'left' ? -1 : 1;
    const shouldWalk = isWalking !== undefined ? isWalking : pose === 'walk';
    animState.current.strideTarget = shouldWalk ? 1.0 : 0;
  }, [pose, facing, isWalking]);

  const say = useCallback((text: string, durationSec = 1.6) => {
    setBubbleText(text);
    setShowBubble(true);
    setTimeout(() => {
      setShowBubble(false);
    }, durationSec * 1000);
  }, []);

  const spawnHearts = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('span');
      heart.className = 'pup-heart';
      heart.textContent = '♥';
      heart.style.cssText = `
        position: absolute;
        pointer-events: none;
        color: #e53e3e;
        font-size: ${16 + Math.random() * 10}px;
        left: ${el.clientWidth * (animState.current.facing > 0 ? 0.7 : 0.3)}px;
        top: ${el.clientHeight * 0.25}px;
        z-index: 100;
        transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.3, 1), opacity 1.2s;
        opacity: 1;
        transform: translate(-50%, 0) scale(0.6);
      `;
      el.appendChild(heart);

      const dx = (Math.random() - 0.5) * 80;
      const dy = -60 - Math.random() * 50;

      requestAnimationFrame(() => {
        heart.style.transform = `translate(calc(-50% + ${dx}px), ${dy}px) scale(1.2)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => {
        heart.remove();
      }, 1300);
    }
  }, []);

  const triggerAction = useCallback(() => {
    const s = animState.current;
    const now = performance.now() / 1000;
    const isPeek = s.targetPose.front > 0.5;

    const actions = isPeek
      ? ['peekaboo', 'woof', 'tilt']
      : ['woof', 'tilt', 'love', 'sneeze', 'yawn'];

    const pick = actions[Math.floor(Math.random() * actions.length)];

    if (pick === 'peekaboo') {
      s.targetPose = { ...TEDDY_POSES.peek, headY: 60 };
      setTimeout(() => {
        s.targetPose = TEDDY_POSES.peek;
        s.earV += 220;
        say('peekaboo! 🐾');
      }, 350);
    } else if (pick === 'woof') {
      s.wagTarget = 1.0;
      s.bounceV -= 180;
      s.earV += 240;
      s.targetPose = { ...s.targetPose, mouth: 1, happy: 1 };
      say('woof! ❤️');
      setTimeout(() => {
        s.targetPose = { ...s.targetPose, mouth: 0, happy: 0 };
        s.wagTarget = 0.6;
      }, 500);
    } else if (pick === 'love') {
      s.wagTarget = 1.0;
      spawnHearts();
      say('love you! ✨');
      setTimeout(() => {
        s.wagTarget = 0.6;
      }, 1000);
    } else if (pick === 'tilt') {
      s.tiltTarget = s.tiltTarget > 0 ? -12 : 14;
      say('hmm? 🐶');
      setTimeout(() => {
        s.tiltTarget = 0;
      }, 1200);
    } else if (pick === 'sneeze') {
      s.targetPose = { ...s.targetPose, headY: 15, happy: 1 };
      setTimeout(() => {
        s.targetPose = { ...s.targetPose, headY: -10, headRot: -10, mouth: 1 };
        s.earV += 300;
        say('achoo! 🤧');
        setTimeout(() => {
          s.targetPose = s.targetPose;
        }, 400);
      }, 300);
    } else if (pick === 'yawn') {
      s.targetPose = { ...s.targetPose, mouth: 1, eyes: 0 };
      say('*yaaawn* 💤');
      setTimeout(() => {
        s.targetPose = { ...s.targetPose, mouth: 0, eyes: 1 };
      }, 1200);
    }

    if (onClick) onClick();
  }, [say, spawnHearts, onClick]);

  // Main animation RAF loop
  useEffect(() => {
    let animId = 0;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      animState.current.pointerPos = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const tick = () => {
      const s = animState.current;
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - s.lastTime);
      s.lastTime = now;

      const t = s.timeState;
      t.time += dt;

      // Update gaze towards cursor accurately in all directions
      if (s.pointerPos && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const headPivotX = 212;
        const eyeCenterX =
          rect.left + (s.facing > 0 ? headPivotX : (300 - headPivotX)) * (rect.width / 300);
        const eyeCenterY = rect.top + 98 * (rect.height / 240);

        const dx = s.pointerPos.x - eyeCenterX;
        const dy = s.pointerPos.y - eyeCenterY;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 220);

        s.gazeTarget = {
          x: (dx / dist) * reach * s.facing,
          y: (dy / dist) * reach,
        };
        s.tiltTarget = (dx / dist) * reach * 6 * s.facing;
      } else {
        s.gazeTarget = { x: 0, y: 0 };
        s.tiltTarget = 0;
      }

      // Smooth lerp for gaze, wag, and head tilt
      const gazeLerp = 1 - Math.exp(-14 * dt);
      t.gazeX += (s.gazeTarget.x - t.gazeX) * gazeLerp;
      t.gazeY += (s.gazeTarget.y - t.gazeY) * gazeLerp;

      const wagLerp = 1 - Math.exp(-8 * dt);
      t.wag += (s.wagTarget - t.wag) * wagLerp;

      const strideLerp = 1 - Math.exp(-12 * dt);
      t.stride += (s.strideTarget - t.stride) * strideLerp;

      // When walking or trotting, continuously advance leg stride phase!
      if (t.stride > 0.01) {
        const speedMult = walkSpeed ?? 1.0;
        t.phase += dt * (13 + 5 * t.stride) * speedMult;
      }

      // Ears and bounce physics spring
      s.earV += (-150 * t.ear - 10 * s.earV) * dt;
      t.ear = Math.max(-28, Math.min(28, t.ear + s.earV * dt));

      s.bounceV += (-260 * 0 - 16 * s.bounceV) * dt;

      // Blinking cycle
      if (now > s.nextBlink) {
        t.blink = Math.sin((now - s.nextBlink) * Math.PI * 8);
        if (now > s.nextBlink + 0.15) {
          t.blink = 0;
          s.nextBlink = now + 3 + Math.random() * 4;
        }
      }

      // Smooth interpolate currentPose towards targetPose
      const poseLerp = 1 - Math.exp(-10 * dt);
      const curr = s.currentPose;
      const targ = s.targetPose;

      const interpolated: TeddyPose = {
        bodyRot: curr.bodyRot + (targ.bodyRot - curr.bodyRot) * poseLerp,
        bodyX: curr.bodyX + (targ.bodyX - curr.bodyX) * poseLerp,
        bodyY: curr.bodyY + (targ.bodyY - curr.bodyY) * poseLerp,
        stretch: curr.stretch + (targ.stretch - curr.stretch) * poseLerp,
        headX: curr.headX + (targ.headX - curr.headX) * poseLerp,
        headY: curr.headY + (targ.headY - curr.headY) * poseLerp,
        headRot: curr.headRot + (targ.headRot + s.tiltTarget - curr.headRot) * poseLerp,
        earL: curr.earL + (targ.earL - curr.earL) * poseLerp,
        earR: curr.earR + (targ.earR - curr.earR) * poseLerp,
        tail: curr.tail + (targ.tail - curr.tail) * poseLerp,
        fn: curr.fn + (targ.fn - curr.fn) * poseLerp,
        ff: curr.ff + (targ.ff - curr.ff) * poseLerp,
        bn: curr.bn + (targ.bn - curr.bn) * poseLerp,
        bf: curr.bf + (targ.bf - curr.bf) * poseLerp,
        sit: curr.sit + (targ.sit - curr.sit) * poseLerp,
        eyes: curr.eyes + (targ.eyes - curr.eyes) * poseLerp,
        happy: curr.happy + (targ.happy - curr.happy) * poseLerp,
        tongue: curr.tongue + (targ.tongue - curr.tongue) * poseLerp,
        mouth: curr.mouth + (targ.mouth - curr.mouth) * poseLerp,
        front: curr.front + (targ.front - curr.front) * poseLerp,
      };

      s.currentPose = interpolated;
      setActivePose(interpolated);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerEnter = () => {
    animState.current.wagTarget = 1.0;
  };

  const handlePointerLeave = () => {
    animState.current.wagTarget = 0.6;
  };

  const isNumericSize = typeof size === 'number';

  return (
    <div
      ref={containerRef}
      className={`pup-buddy relative select-none cursor-pointer ${className}`}
      data-facing={facing}
      data-live=""
      style={{
        width: isNumericSize ? size : (size || '100%'),
        height: isNumericSize ? (size * 240) / 300 : (size === '100%' ? '100%' : 'auto'),
        aspectRatio: '300 / 240',
        cursor: 'url(/cursor/paw-press.svg) 9 6, pointer',
        ...style,
      }}
      onClick={triggerAction}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <TeddySvg
        pose={activePose}
        facing={facing}
        timeState={animState.current.timeState}
        label={label}
        className="w-full h-full"
      />

      {/* Floating speech bubble */}
      <span
        ref={bubbleRef}
        aria-hidden="true"
        className={`pup-bubble absolute pointer-events-none transition-all duration-300 font-bold text-xs tracking-tight bg-white/95 text-[#2a170e] px-3 py-1.5 rounded-full shadow-md border border-[#e4a352]/40 whitespace-nowrap z-50 ${
          showBubble ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-75 translate-y-2'
        }`}
        style={{
          bottom: '82%',
          left: facing === 'left' ? '24%' : '68%',
        }}
      >
        {bubbleText}
      </span>
    </div>
  );
}

