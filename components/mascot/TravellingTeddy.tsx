'use client';

import React, { useEffect, useRef } from 'react';
import { frame, cancelFrame } from 'framer-motion';
import { TeddySvg } from '../pup/TeddySvg';
import {
  TEDDY_POSES,
  TeddyPose,
  TeddyTimeState,
  computeTeddyTransforms,
} from '../pup/TeddyModel';
import { PAW_PATH_D } from '../ui/PawTrailCanvas';

// -----------------------------------------------------------------------------
// Core Constants & Math Utilities from authentic Teddy engine
// -----------------------------------------------------------------------------
const PIVOT = { x: 150, y: 228 }; // Paws ground pivot in 300x240 SVG
const DEFAULT_BOX = [48, 30, 288, 236];
const POSE_BOXES: Record<string, number[]> = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
};
const getBox = (pose: string) => POSE_BOXES[pose] ?? DEFAULT_BOX;
const PEEK_SINK = PIVOT.y - 159;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (v: number) => v * v * (3 - 2 * v);
const interpSmooth = (min: number, max: number, v: number) =>
  max === min ? +(v >= max) : smoothstep(clamp01((v - min) / (max - min)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const decay = (dt: number, lambda: number) => 1 - Math.exp(-dt / lambda);

// Soft boundary clamping against screen edges
const softMax = (val: number, bound: number, pad: number) => {
  const diff = (val - bound) / pad;
  return diff > 20 ? val : bound + pad * Math.log1p(Math.exp(diff));
};
const softMin = (val: number, bound: number, pad: number) => -softMax(-val, -bound, pad);

interface SafeRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function clampSafeArea(
  x: number,
  y: number,
  scale: number,
  box: number[],
  safe: SafeRect,
  pad = 8
): { x: number; y: number } {
  const leftOff = (PIVOT.x - box[0]) * scale;
  const rightOff = (box[2] - PIVOT.x) * scale;
  const topOff = (PIVOT.y - box[1]) * scale;
  const bottomOff = (box[3] - PIVOT.y) * scale;

  let outX: number;
  if (safe.right - safe.left > leftOff + rightOff) {
    outX = softMin(softMax(x, safe.left + leftOff, pad), safe.right - rightOff, pad);
  } else {
    outX = (safe.left + safe.right) / 2 - (rightOff - leftOff) / 2;
  }

  let outY: number;
  if (safe.bottom - safe.top > topOff + bottomOff) {
    outY = softMin(softMax(y, safe.top + topOff, pad), safe.bottom - bottomOff, pad);
  } else {
    outY = safe.bottom - bottomOff;
  }

  return { x: outX, y: outY };
}

function lerpBox(b0: number[], b1: number[], t: number): number[] {
  return [
    lerp(b0[0], b1[0], t),
    lerp(b0[1], b1[1], t),
    lerp(b0[2], b1[2], t),
    lerp(b0[3], b1[3], t),
  ];
}

function evalCubicBezier(
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p1: { x: number; y: number },
  t: number
): { x: number; y: number } {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + ttt * p1.x,
    y: uuu * p0.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + ttt * p1.y,
  };
}

function lerpPose(p0: TeddyPose, p1: TeddyPose, t: number): TeddyPose {
  const result = { ...p0 };
  const keys = Object.keys(p0) as (keyof TeddyPose)[];
  for (const k of keys) {
    result[k] = (p0[k] as number) + ((p1[k] as number) - (p0[k] as number)) * t;
  }
  return result;
}

// -----------------------------------------------------------------------------
// MASCOT ACTOR: Direct DOM Mutation Engine for 60 FPS Fluidity
// -----------------------------------------------------------------------------
export class MascotActor {
  svg: SVGSVGElement;
  elements = new Map<string, SVGElement>();
  written = new Map<string, string>();
  pose: TeddyPose;
  target: TeddyPose;
  facing = 1;
  facingTarget = 1;
  turn = 0.07;
  strideTarget = 0;
  wagTarget = 0.35;
  gazeTarget = { x: 0, y: 0 };
  tilt = 0;
  tiltTarget = 0;
  earV = 0;
  bounce = 0;
  bounceV = 0;
  offset = 0;
  offsetTarget = 0;
  pet = 0;
  petTarget = 0;
  lean = 0;

  timeState: TeddyTimeState = {
    phase: 0,
    stride: 0,
    time: 0,
    wag: 0.35,
    gazeX: 0,
    gazeY: 0,
    blink: 0,
    ear: 0,
  };

  nextBlink = 1.2;
  blinkAt = -1;
  woofUntil = -1;

  readonly DOM_MAPPINGS: [string, string, string][] = [
    ['root', 'transform', 'root'],
    ['shadow', 'transform', 'shadow'],
    ['shadow', 'opacity', 'shadowOpacity'],
    ['body', 'transform', 'body'],
    ['body', 'opacity', 'side'],
    ['bf', 'transform', 'bf'],
    ['bf', 'opacity', 'backLegs'],
    ['bn', 'transform', 'bn'],
    ['bn', 'opacity', 'backLegs'],
    ['ff', 'transform', 'ff'],
    ['fn', 'transform', 'fn'],
    ['tail', 'transform', 'tail'],
    ['haunch', 'transform', 'haunch'],
    ['haunch', 'opacity', 'haunchOpacity'],
    ['head', 'transform', 'head'],
    ['earL', 'transform', 'earL'],
    ['earR', 'transform', 'earR'],
    ['eyes', 'transform', 'eyes'],
    ['open', 'opacity', 'openEyes'],
    ['blink', 'transform', 'blink'],
    ['happy', 'opacity', 'happyEyes'],
    ['shut', 'opacity', 'shutEyes'],
    ['tongue', 'opacity', 'tongue'],
    ['mouth', 'opacity', 'mouth'],
    ['ledge', 'opacity', 'ledge'],
  ];

  constructor(svg: SVGSVGElement, initialPoseName = 'peek', initialFacing = 1) {
    this.svg = svg;
    const basePose = TEDDY_POSES[initialPoseName] ?? TEDDY_POSES.sit;
    this.pose = { ...basePose };
    this.target = { ...basePose };
    this.facing = initialFacing;
    this.facingTarget = initialFacing;

    const matched = svg.querySelectorAll('[data-p]');
    matched.forEach((el) => {
      const key = el.getAttribute('data-p');
      if (key && el instanceof SVGElement) {
        this.elements.set(key, el);
      }
    });
  }

  setPose(nameOrPose: string | TeddyPose) {
    this.target = typeof nameOrPose === 'string' ? (TEDDY_POSES[nameOrPose] ?? TEDDY_POSES.sit) : nameOrPose;
  }

  jump(poseName: string, facingDir?: number) {
    this.pose = { ...(TEDDY_POSES[poseName] ?? TEDDY_POSES.sit) };
    this.target = this.pose;
    if (facingDir) {
      this.facing = this.facingTarget = facingDir;
    }
  }

  face(dir: number, turnSpeed = 0.07) {
    this.facingTarget = Math.sign(dir) || 1;
    this.turn = turnSpeed;
  }

  get facingDir() {
    return Math.sign(this.facingTarget) || 1;
  }

  stride(active: number) {
    this.strideTarget = clamp(active, 0, 1);
  }

  advance(dist: number) {
    this.timeState.phase += (dist / 46) * Math.PI;
  }

  walkedTo(totalDist: number) {
    this.timeState.phase = (totalDist / 46) * Math.PI;
  }

  wag(active: number) {
    this.wagTarget = clamp(active, 0, 1);
  }

  cock(deg: number) {
    this.tiltTarget = deg;
  }

  lookAt(coords: { x: number; y: number } | null) {
    if (!coords) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const eyeX = this.facingTarget > 0 ? 212 : 300 - 212;
    const eyeScreenX = rect.left + (eyeX / 300) * rect.width;
    const eyeScreenY = rect.top + (100 / 240) * rect.height;
    const dx = coords.x - eyeScreenX;
    const dy = coords.y - eyeScreenY;
    const dist = Math.hypot(dx, dy) || 1;
    const mag = Math.min(1, dist / 160);
    this.gazeTarget = {
      x: (dx / dist) * mag * this.facingTarget,
      y: (dy / dist) * mag,
    };
  }

  woof(timeSec: number) {
    this.woofUntil = timeSec + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(factor = 1) {
    this.earV += 220 * factor;
  }

  hop(factor = 1) {
    this.bounceV = -230 * factor;
    this.earV += 200 * factor;
  }

  yawn(timeSec: number, durationSec = 0.9) {
    this.woofUntil = timeSec + durationSec;
  }

  dash(offset: number) {
    this.offsetTarget = offset;
  }

  petting(active: boolean) {
    this.petTarget = active ? 1 : 0;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dtRaw: number, time: number) {
    const dt = Math.min(dtRaw, 0.05);
    const ts = this.timeState;
    ts.time = time;

    // Pose and orientation interpolation
    this.pose = lerpPose(this.pose, this.target, decay(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * decay(dt, this.turn);

    // Stride and wag kinematics
    ts.stride += (this.strideTarget - ts.stride) * decay(dt, 0.12);
    if (ts.stride < 0.012 && this.strideTarget === 0) ts.stride = 0;
    ts.wag += (this.wagTarget - ts.wag) * decay(dt, 0.4);

    // Gaze and head tilt
    ts.gazeX += (this.gazeTarget.x - ts.gazeX) * decay(dt, 0.07);
    ts.gazeY += (this.gazeTarget.y - ts.gazeY) * decay(dt, 0.07);
    this.tilt += (this.tiltTarget + 3 * ts.gazeX - this.tilt) * decay(dt, 0.18);

    // Ear spring physics
    this.earV += (-150 * ts.ear - 10 * this.earV) * dt;
    ts.ear = clamp(ts.ear + this.earV * dt, -28, 28);

    // Body bounce spring physics
    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    // Horizontal dash offset
    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * decay(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) this.offset = this.offsetTarget;
    const diffOffset = Math.abs(this.offset - prevOffset);
    if (diffOffset) this.advance(diffOffset);

    const strideOverride = dt > 0 ? Math.min(1, diffOffset / dt / 180) : 0;

    // Petting happiness
    this.pet += (this.petTarget - this.pet) * decay(dt, 0.15);

    // Blinking cycle
    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }
    const blinkProgress = (time - this.blinkAt) / 0.15;
    ts.blink = blinkProgress >= 0 && blinkProgress <= 1 ? Math.sin(blinkProgress * Math.PI) : 0;

    // Composite pose with dynamic secondary physics
    const compositePose: TeddyPose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const computed = computeTeddyTransforms(
      compositePose,
      strideOverride > ts.stride ? { ...ts, stride: strideOverride } : ts
    );

    const safeFacing =
      Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(150 0) scale(${safeFacing.toFixed(3)} 1) translate(-150 0)`;

    // Cached direct DOM writes
    for (const [elKey, attr, propKey] of this.DOM_MAPPINGS) {
      const el = this.elements.get(elKey);
      if (!el) continue;
      const val =
        propKey === 'root'
          ? rootTransform
          : String((computed as Record<string, unknown>)[propKey]);
      const cacheKey = `${elKey}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

// -----------------------------------------------------------------------------
// Interactive Micro-Animations & Cue Handlers
// -----------------------------------------------------------------------------
type MicroAction = (now: number) => void;
type ScheduledAction = [number, MicroAction];

const PUP_ACTIONS: Record<
  string,
  (
    ctx: {
      d: MascotActor;
      rest: TeddyPose;
      facing: number;
      say: (txt: string, dur?: number) => void;
      hearts: () => void;
    },
    now: number
  ) => ScheduledAction[]
> = {
  woof: ({ d, say }, now) => [
    [now, (t) => { d.woof(t); say('woof!'); }],
    [now + 0.42, (t) => { d.woof(t); say('woof woof!'); }],
  ],
  spin: ({ d, rest, facing, say }, now) => [
    [now, () => { d.setPose('stand'); d.hop(0.5); }],
    [now + 0.14, () => d.face(-facing)],
    [now + 0.38, () => d.face(facing)],
    [now + 0.62, () => d.face(-facing)],
    [now + 0.86, () => { d.face(facing); say('wheee!'); }],
    [now + 1.3, () => d.setPose(rest)],
  ],
  beg: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('beg'); d.wag(1); say('treat, please?', 1.7); }],
    [now + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  bow: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('bow'); d.wag(1); say('play with me!'); }],
    [now + 0.55, () => d.hop(0.45)],
    [now + 1.7, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  hop: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('hop'); d.hop(1.1); say('boing!'); }],
    [now + 0.36, () => d.setPose(rest)],
    [now + 0.62, () => { d.setPose('hop'); d.hop(0.8); }],
    [now + 0.98, () => d.setPose(rest)],
  ],
  love: ({ d, rest, say, hearts }, now) => [
    [now, () => { d.setPose({ ...rest, happy: 1, tongue: 1 }); d.wag(1); hearts(); say('I like you!', 1.5); }],
    [now + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  tilt: ({ d, say }, now) => [
    [now, () => { d.cock(-14); say('hm?'); }],
    [now + 0.8, () => d.cock(12)],
    [now + 1.6, () => d.cock(0)],
  ],
  sneeze: ({ d, say }, now) => [
    [now, () => d.cock(-8)],
    [now + 0.32, (t) => { d.cock(10); d.jolt(1.4); d.hop(0.35); d.yawn(t, 0.22); say('achoo!'); }],
    [now + 0.8, () => d.cock(0)],
  ],
  zoomies: ({ d, rest, facing, say }, now) => [
    [now, () => { d.setPose('walk'); d.wag(1); say('zoomies!', 2); }],
    [now + 0.05, () => { d.face(1); d.dash(70); }],
    [now + 0.5, () => { d.face(-1); d.dash(-70); }],
    [now + 0.98, () => { d.face(1); d.dash(50); }],
    [now + 1.4, () => { d.face(-1); d.dash(-30); }],
    [now + 1.78, () => { d.face(1); d.dash(0); }],
    [now + 2.25, () => { d.face(facing); d.setPose(rest); d.wag(0.7); }],
  ],
  peekaboo: ({ d, say }, now) => [
    [now, () => d.setPose({ ...TEDDY_POSES.peek, headY: 120 })],
    [now + 0.55, () => { d.setPose('peek'); d.jolt(1.2); say('peekaboo!'); }],
  ],
};

function spawnHeartsAt(container: HTMLElement, x: number, y: number) {
  for (let r = 0; r < 5; r++) {
    const heart = document.createElement('span');
    heart.className = 'pup-heart';
    heart.textContent = '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    container.appendChild(heart);

    const dx = (Math.random() - 0.5) * 90;
    const dy = -70 - 60 * Math.random();

    heart
      .animate(
        [
          { transform: 'translate(-50%, 0) scale(0.4)', opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: `translate(calc(-50% + ${dx.toFixed(0)}px), ${dy.toFixed(0)}px) scale(1.1)`, opacity: 0 },
        ],
        { duration: 1150 + 110 * r, delay: 80 * r, easing: 'cubic-bezier(.2, .7, .3, 1)', fill: 'backwards' }
      )
      .finished.then(() => heart.remove(), () => heart.remove());
  }
}

// -----------------------------------------------------------------------------
// Measured Stops Data Structures
// -----------------------------------------------------------------------------
interface StopTrack {
  kind: 'page' | 'screen' | 'pin';
  top: number;
  from?: number;
  to?: number;
}

interface MeasuredStop {
  x: number;
  track: StopTrack;
  s: number;
  behind: boolean;
  sink: number;
  box: number[];
}

interface StopMeta {
  scene: HTMLElement | null;
  pose: string;
  facing: number;
  act: string;
  looks: HTMLElement[];
  track: HTMLElement | null;
}

interface MascotLayout {
  lane: boolean;
  stops: MeasuredStop[];
  meta: StopMeta[];
  holds: [number, number][];
  blend: number;
  mainTop: number;
}

function getStopScreenPos(stop: MeasuredStop, scrollY: number): { x: number; y: number } {
  const track = stop.track;
  let top = 0;
  if (track.kind === 'page') {
    top = track.top - scrollY;
  } else if (track.kind === 'screen') {
    top = track.top;
  } else {
    const from = track.from ?? 0;
    const to = track.to ?? 0;
    if (scrollY < from) {
      top = track.top - (scrollY - from);
    } else if (scrollY > to) {
      top = track.top - (scrollY - to);
    } else {
      top = track.top;
    }
  }
  return {
    x: stop.x + PIVOT.x * stop.s,
    y: top + PIVOT.y * stop.s,
  };
}

function findHoldInterval(holds: [number, number][], scrollY: number): { k: number; t: number } {
  if (!holds.length || scrollY <= holds[0][1]) {
    return { k: 0, t: 0 };
  }
  for (let i = 0; i < holds.length - 1; i++) {
    const s = holds[i][1];
    const n = holds[i + 1][0];
    if (scrollY < n) {
      return { k: i, t: clamp01((scrollY - s) / Math.max(1, n - s)) };
    }
    if (scrollY <= holds[i + 1][1]) {
      return { k: i + 1, t: 0 };
    }
  }
  return { k: holds.length - 1, t: 0 };
}

// -----------------------------------------------------------------------------
// Continuous 3D Travelling Mascot Component
// -----------------------------------------------------------------------------
export function TravellingTeddy() {
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const bubbleAtRef = useRef<HTMLSpanElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const actor = actorRef.current;
    const body = bodyRef.current;
    const bubble = bubbleRef.current;
    const bubbleAt = bubbleAtRef.current;
    const prints = printsRef.current;
    const probe = probeRef.current;
    if (!layer || !actor || !body || !bubble || !bubbleAt || !prints || !probe) return;

    const svg = body.querySelector('svg');
    if (!svg) return;

    const docEl = document.documentElement;
    let layout: MascotLayout | null = null;
    let actorEngine: MascotActor | null = null;
    let isRunning = false;

    const pawPool = [...prints.children] as SVGElement[];
    let pawIndex = 0;
    let bubbleHideTime = 0;

    const showBubble = (text: string, nowSec: number, durationSec = 1.4) => {
      bubble.textContent = text;
      bubble.dataset.show = 'true';
      bubbleHideTime = nowSec + durationSec;
    };

    let pointerCoords: { x: number; y: number; t: number } | null = null;
    let lookTarget: { el: HTMLElement; until: number } | null = null;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        pointerCoords = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.matches('a, button, input, textarea, select, summary')) {
        lookTarget = { el: target, until: performance.now() / 1000 + 1.4 };
      }
    };

    const getBottomSafeArea = () => {
      const bar = document.querySelector('[data-whatsapp-bar]');
      const rect = bar?.getClientRects().length ? bar.getBoundingClientRect() : null;
      return rect && rect.height ? rect.top : window.innerHeight - 6;
    };

    // Measure page geometry & stop intervals
    const measureLayout = (): MascotLayout => {
      const isMobile = window.matchMedia(
        '(max-width: 767px), (pointer: coarse) and (max-height: 519px)'
      ).matches;
      const clientW = document.documentElement.clientWidth;
      const stageH = probe.getBoundingClientRect().height || window.innerHeight;
      const headerH = document.getElementById('site-header')?.offsetHeight ?? 76;
      const bar = document.querySelector('[data-whatsapp-bar]');
      const barH = bar?.getClientRects().length ? bar.getBoundingClientRect().height : 0;

      const safeBounds: SafeRect = {
        left: 10,
        top: headerH + 10,
        right: clientW - 10,
        bottom: stageH - 10 - barH,
      };

      const mainEl = document.getElementById('main');
      const measuredStops: MeasuredStop[] = [];
      const metas: StopMeta[] = [];
      const holdBounds: [number, number][] = [];

      const addStop = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const pose = el.dataset.pose || 'sit';
        const act = el.dataset.act ?? '';
        const width = rect.width || 220;
        const baseScale = width / 300;
        const scale = act === 'basket' || isMobile ? baseScale : 1.12 * baseScale;
        const pivotPos = pose === 'peek' ? { x: PIVOT.x, y: 159 } : PIVOT;

        // Check for sticky ancestor
        let stickyEl: HTMLElement | null = null;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (getComputedStyle(p).position === 'sticky') {
            stickyEl = p;
            break;
          }
        }

        let track: StopTrack;
        if (!stickyEl) {
          track = { kind: 'page', top: rect.top + window.scrollY };
        } else {
          const stickyTop = parseFloat(getComputedStyle(stickyEl).top) || 0;
          const stickyRect = stickyEl.getBoundingClientRect();
          const parent = stickyEl.parentElement;
          const parentBottom = parent
            ? parent.getBoundingClientRect().bottom - (parseFloat(getComputedStyle(parent).paddingBottom) || 0)
            : 0;
          const pinFrom = stickyRect.top + window.scrollY - stickyTop;
          const pinTo = parentBottom + window.scrollY - stickyRect.height - stickyTop;
          const offsetInsideSticky = rect.top - stickyRect.top;

          if (pinTo <= pinFrom) {
            track = { kind: 'page', top: stickyRect.top + window.scrollY + offsetInsideSticky };
          } else {
            track = { kind: 'pin', top: stickyTop + offsetInsideSticky, from: pinFrom, to: pinTo };
          }
        }

        if (track.kind !== 'screen') {
          track.top += pivotPos.y * (baseScale - scale);
        }

        const stopObj: MeasuredStop = {
          x: rect.left + pivotPos.x * (baseScale - scale),
          track,
          s: scale,
          behind: el.dataset.behind === 'true',
          sink: 0,
          box: getBox(pose),
        };

        const scene = el.closest('[data-pup-scene]') as HTMLElement | null;
        measuredStops.push(stopObj);
        metas.push({
          scene,
          pose,
          facing: el.dataset.facing === 'left' ? -1 : 1,
          act,
          looks: scene ? ([...scene.querySelectorAll('[data-pup-look]')] as HTMLElement[]) : [],
          track: act === 'treadmill' ? (scene?.querySelector('[data-treadmill]') as HTMLElement | null) : null,
        });

        // Compute hold range
        let holdRange: [number, number];
        if (stopObj.track.kind === 'pin') {
          holdRange = [stopObj.track.from ?? 0, stopObj.track.to ?? 0];
        } else {
          const top = stopObj.track.top;
          const bTop = top + stopObj.box[1] * stopObj.s;
          const bBottom = top + stopObj.box[3] * stopObj.s;
          const center = (bTop + bBottom) / 2;
          const boundsH = safeBounds.bottom - safeBounds.top;
          const band = isMobile ? [0.6, 0.86] : [0.42, 0.78];
          let hFrom = center - (safeBounds.top + band[1] * boundsH);
          let hTo = center - (safeBounds.top + band[0] * boundsH);
          hFrom = Math.max(hFrom, bBottom - safeBounds.bottom);
          if (hFrom > (hTo = Math.min(hTo, bTop - safeBounds.top))) {
            hFrom = hTo = center - (safeBounds.top + boundsH / 2);
          }
          holdRange = [hFrom, hTo];
        }

        if (!isMobile && scene && stopObj.track.kind === 'page' && act !== 'basket' && act !== 'peekaboo') {
          const boundsH = safeBounds.bottom - safeBounds.top;
          const sceneTop = scene.getBoundingClientRect().top + window.scrollY - safeBounds.top + 0.08 * boundsH;
          const stopBottom = stopObj.track.top + stopObj.box[3] * stopObj.s - safeBounds.bottom;
          if (holdRange[1] > sceneTop) {
            const adjustedTo = Math.max(sceneTop, stopBottom + 0.12 * boundsH);
            holdRange = [Math.max(stopBottom, adjustedTo - Math.max(holdRange[1] - holdRange[0], 0.2 * boundsH)), adjustedTo];
          }
        }

        holdBounds.push(holdRange);
      };

      const rawStopEls = ([...document.querySelectorAll('[data-pup-stop="true"]')] as HTMLElement[]).filter(
        (el) => el.getClientRects().length
      );

      rawStopEls.forEach(addStop);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Clean holds
      const holds = holdBounds.map((h) => (h[0] <= h[1] ? h : [(h[0] + h[1]) / 2, (h[0] + h[1]) / 2]));
      if (holds.length) {
        holds[0][0] = -Infinity;
        holds[holds.length - 1][1] = Infinity;
        holds[holds.length - 1][0] = Math.min(holds[holds.length - 1][0], maxScroll - 1);
        for (let i = 0; i < holds.length - 1; i++) {
          const cur = holds[i];
          const next = holds[i + 1];
          if (next[0] < cur[1]) {
            const mid = (cur[1] + next[0]) / 2;
            cur[1] = Math.max(cur[0], mid);
            next[0] = Math.min(next[1], mid);
            if (next[0] < cur[1]) next[0] = cur[1];
          }
        }
      }

      return {
        lane: isMobile,
        stops: measuredStops,
        meta: metas,
        holds: holds as [number, number][],
        blend: 0.12 * stageH,
        mainTop: mainEl ? mainEl.getBoundingClientRect().top + window.scrollY : 0,
      };
    };

    // Evaluate Mascot State along Path
    const evaluatePath = (lay: MascotLayout, scrollY: number) => {
      const { k, t } = findHoldInterval(lay.holds, scrollY);
      const safe = {
        left: 10,
        top: (document.getElementById('site-header')?.offsetHeight ?? 76) + 10,
        right: docEl.clientWidth - 10,
        bottom: getBottomSafeArea() - 10,
      };

      if (t <= 0 || k >= lay.stops.length - 1) {
        const stop = lay.stops[k];
        const screenPos = getStopScreenPos(stop, scrollY);
        const clamped = clampSafeArea(screenPos.x, screenPos.y, stop.s, stop.box, safe);
        return {
          x: clamped.x,
          y: clamped.y,
          s: stop.s,
          front: !stop.behind,
          airborne: false,
          k,
          t: 0,
          walked: 0,
        };
      }

      const s0 = lay.stops[k];
      const s1 = lay.stops[k + 1];
      const holdFrom = lay.holds[k][1];
      const holdTo = lay.holds[k + 1][0];
      const span = Math.max(1, holdTo - holdFrom);
      const v = clamp01((scrollY - holdFrom) / span);

      const p0 = getStopScreenPos(s0, holdFrom);
      const p1 = getStopScreenPos(s1, holdTo);

      // Bezier tangents
      const dx = p1.x - p0.x;
      const spanX = Math.max(0.45 * Math.abs(dx), 0);
      const dirX = dx >= 0 ? 1 : -1;
      let c1 = { x: p0.x + dirX * spanX, y: p0.y };
      let c2 = { x: p1.x - dirX * spanX, y: p1.y };

      const minW = 0.14 * (safe.right - safe.left);
      if (Math.abs(dx) < minW) {
        const offsetSign = (p0.x + p1.x) / 2 < (safe.left + safe.right) / 2 ? 1 : -1;
        const push = offsetSign * (minW - Math.abs(dx)) * 0.9;
        c1 = { x: c1.x + push, y: lerp(p0.y, p1.y, 0.2) };
        c2 = { x: c2.x + push, y: lerp(p0.y, p1.y, 0.8) };
      }

      const easeT = v * v * v * (v * (6 * v - 15) + 10);
      const pt = evalCubicBezier(p0, c1, c2, p1, easeT);
      const scale = lerp(s0.s, s1.s, smoothstep(clamp01(v / 0.65)));

      const blendR = Math.min(0.3, Math.max(0.06, lay.blend / span));
      const blend0 = 1 - interpSmooth(0, blendR, v);
      const blend1 = interpSmooth(1 - blendR, 1, v);

      let targetY = pt.y + blend0 * (getStopScreenPos(s0, scrollY).y - p0.y) + blend1 * (getStopScreenPos(s1, scrollY).y - p1.y);
      let isAirborne = false;

      if (s0.behind && v < 0.36) {
        targetY -= Math.sin((v / 0.36) * Math.PI) * Math.min(64 * s0.s, 72);
        isAirborne = v < 0.32;
      }
      if (s1.behind && v > 0.68) {
        targetY -= Math.sin(((v - 0.68) / 0.32) * Math.PI) * Math.min(56 * s1.s, 60);
        isAirborne = true;
      }

      const isFront = !(s0.behind && v < 0.12 || s1.behind && v > 0.92);
      const interpB = v < 0.5
        ? lerpBox(s0.box, DEFAULT_BOX, interpSmooth(0, s0.behind ? 0.36 : 0.06, v))
        : lerpBox(DEFAULT_BOX, s1.box, interpSmooth(s1.behind ? 0.68 : 0.94, 1, v));

      const clamped = clampSafeArea(pt.x, targetY, scale, interpB, safe);

      // Arc-length estimation
      let walked = 0;
      let prevSample = p0;
      const numSteps = Math.max(1, Math.ceil(32 * clamp01(v)));
      for (let s = 1; s <= numSteps; s++) {
        const sample = evalCubicBezier(p0, c1, c2, p1, (s / numSteps) * clamp01(v));
        walked += Math.hypot(sample.x - prevSample.x, sample.y - prevSample.y);
        prevSample = sample;
      }

      return {
        x: clamped.x,
        y: clamped.y,
        s: scale,
        front: isFront,
        airborne: isAirborne,
        k,
        t: v,
        walked,
      };
    };

    // Tracking state
    let lastTime = performance.now() / 1000;
    let lastScrollY = window.scrollY;
    let prevPoint: { x: number; y: number } | null = null;
    let currentStop = -1;
    let stopEnterTime = 0;
    let lastActivityTime = 0;
    let scheduledActions: ScheduledAction[] = [];
    let lastTreadmillLeft: number | null = null;
    let treadmillIdleTimer = 0;
    let lastPawStep = -1;
    let lastPawIdx = 0;
    let lookIndex = -1;
    let lastLookTime = 0;

    // Handle user clicks on mascot
    const onActorClick = () => {
      if (!actorEngine || !layout) return;
      const now = performance.now() / 1000;
      lastActivityTime = now;

      if (currentStop < 0) {
        // In transit
        const choices = ['jump', 'woof', 'love', 'sneeze'];
        const pick = choices[Math.floor(Math.random() * choices.length)];
        const stopMeta = layout.meta[0];
        const ctx = {
          d: actorEngine,
          rest: TEDDY_POSES[stopMeta.pose] ?? TEDDY_POSES.sit,
          facing: stopMeta.facing,
          say: (txt: string, dur?: number) => showBubble(txt, now, dur),
          hearts: () => spawnHeartsAt(document.body, actor.offsetLeft + 150 * (layout?.stops[0].s ?? 1), actor.offsetTop + 100),
        };
        scheduledActions = PUP_ACTIONS[pick]?.(ctx, now) ?? [];
        return;
      }

      const meta = layout.meta[currentStop];
      let action = 'woof';
      if (meta.track) {
        action = ['woof', 'hop', 'love'][Math.floor(Math.random() * 3)];
      } else if (meta.act === 'basket') {
        action = ['tilt', 'love', 'sneeze', 'woof'][Math.floor(Math.random() * 4)];
      } else if (meta.pose === 'peek') {
        action = ['peekaboo', 'woof', 'tilt', 'sneeze'][Math.floor(Math.random() * 4)];
      } else {
        action = ['woof', 'spin', 'beg', 'bow', 'hop', 'love', 'tilt', 'sneeze', 'zoomies'][
          Math.floor(Math.random() * 9)
        ];
      }

      const ctx = {
        d: actorEngine,
        rest: TEDDY_POSES[meta.pose] ?? TEDDY_POSES.sit,
        facing: meta.facing,
        say: (txt: string, dur?: number) => showBubble(txt, now, dur),
        hearts: () => spawnHeartsAt(document.body, actor.offsetLeft + 150 * (layout?.stops[currentStop].s ?? 1), actor.offsetTop + 100),
      };

      actorEngine.reset();
      scheduledActions = PUP_ACTIONS[action]?.(ctx, now) ?? [];
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && actorEngine && currentStop >= 0) {
        actorEngine.petting(true);
        actorEngine.wag(1);
      }
    };

    const onPointerLeave = () => {
      if (actorEngine) {
        actorEngine.petting(false);
        if (currentStop >= 0) {
          actorEngine.wag(layout?.meta[currentStop]?.act === 'basket' ? 0.3 : 0.7);
        }
      }
    };

    // 60 FPS Engine Tick Loop
    const tick = () => {
      if (!layout || !actorEngine) return;
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      if (Math.abs(scrollDelta) > 0.5) {
        lastActivityTime = now;
      }

      // Execute queued animation keyframes
      while (scheduledActions.length && scheduledActions[0][0] <= now) {
        const item = scheduledActions.shift();
        item?.[1](now);
      }

      const evalResult = evaluatePath(layout, scrollY);
      const isDocked = evalResult.t === 0;
      const stopIdx = evalResult.k;

      if (isDocked) {
        if (currentStop !== stopIdx) {
          const meta = layout.meta[stopIdx];
          scheduledActions = [];
          lookTarget = null;
          currentStop = stopIdx;
          stopEnterTime = now;
          lastActivityTime = now;
          lastTreadmillLeft = null;

          actorEngine.reset();
          actorEngine.setPose(meta.pose);
          actorEngine.face(meta.facing, 0.14);
          actorEngine.stride(0);
          actorEngine.wag(meta.act === 'basket' ? 0.3 : 0.7);
          actorEngine.jolt(0.4);
        }

        const meta = layout.meta[stopIdx];

        // Treadmill walking cycle in "Meet the pups"
        if (meta.track && !scheduledActions.length) {
          const trackLeft = meta.track.getBoundingClientRect().left;
          const diffTrack = lastTreadmillLeft === null ? 0 : trackLeft - lastTreadmillLeft;
          lastTreadmillLeft = trackLeft;

          actorEngine.walkedTo(-trackLeft / evalResult.s);
          if (Math.abs(diffTrack) > 0.15) {
            treadmillIdleTimer = 0;
            actorEngine.setPose('walk');
            actorEngine.stride(1);
            actorEngine.face(diffTrack < 0 ? 1 : -1, 0.16);
          } else {
            treadmillIdleTimer += dt;
            if (treadmillIdleTimer > 0.25) {
              actorEngine.setPose('stand');
              actorEngine.stride(0);
            }
          }
        }

        // Tilt pose head curiosity
        if (meta.act === 'tilt' && !scheduledActions.length && now - stopEnterTime > 1.2) {
          const sinVal = Math.sin(0.9 * now);
          actorEngine.cock(sinVal > 0.35 ? 13 : sinVal < -0.35 ? -10 : 0);
        }

        // Sequential item gazing
        const isLookingAtPointer = pointerCoords && now - pointerCoords.t < 2.5;
        if (meta.looks.length && !isLookingAtPointer && now - stopEnterTime > 0.8 && now - lastLookTime > 1.7) {
          lastLookTime = now;
          lookIndex = (lookIndex + 1) % (meta.looks.length + 1);
          if (lookIndex < meta.looks.length) {
            lookTarget = { el: meta.looks[lookIndex], until: now + 1.4 };
          }
        }

        // Ambient idle cute action
        if (!scheduledActions.length && !meta.track && meta.act !== 'basket' && now - lastActivityTime > 9) {
          lastActivityTime = now;
          if (Math.random() < 0.55) {
            actorEngine.cock(Math.random() < 0.5 ? 12 : -12);
            setTimeout(() => actorEngine?.cock(0), 1400);
          } else {
            actorEngine.wag(1);
            setTimeout(() => actorEngine?.wag(0.7), 2400);
          }
        }
      } else {
        // Moving between stops
        if (currentStop !== -1) {
          currentStop = -1;
          scheduledActions = [];
          actorEngine.reset();
        }

        if (evalResult.airborne) {
          actorEngine.setPose('hop');
          actorEngine.stride(0);
        } else {
          actorEngine.setPose('walk');
          actorEngine.stride(1);
        }

        actorEngine.walkedTo(evalResult.walked / Math.max(0.05, evalResult.s));

        if (prevPoint) {
          const deltaX = evalResult.x - prevPoint.x;
          if (Math.abs(deltaX) > 0.6 && Math.abs(deltaX) > 0.35 * Math.abs(evalResult.y - prevPoint.y)) {
            actorEngine.face(deltaX > 0 ? 1 : -1, 0.16);
          }

          // Dynamic Paw Trail Placement
          const stepCount = Math.floor(evalResult.walked / (34 * evalResult.s));
          if (stopIdx === evalResult.k && stepCount !== lastPawStep && !evalResult.airborne) {
            lastPawStep = stepCount;
            const isOdd = 1 & stepCount;
            const footLateral = isOdd ? 186 : 110;
            const footX = evalResult.x - PIVOT.x * evalResult.s + (actorEngine.facingDir > 0 ? footLateral : 300 - footLateral) * evalResult.s;
            const footY = evalResult.y - PIVOT.y * evalResult.s + 226 * evalResult.s + scrollY - layout.mainTop + (isOdd ? -4 : 4) * evalResult.s;

            const angle = Math.atan2(evalResult.y - prevPoint.y + scrollDelta, evalResult.x - prevPoint.x) + Math.PI / 2;
            const pawSize = 14 * Math.max(0.75, 1.5 * evalResult.s);

            const paw = pawPool[pawIndex++ % pawPool.length];
            if (paw) {
              paw.style.transform = `translate(${(footX - pawSize / 2).toFixed(1)}px, ${(footY - pawSize / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
              paw.style.width = paw.style.height = `${pawSize.toFixed(1)}px`;
              paw.animate(
                [
                  { opacity: 0 },
                  { opacity: 0.45, offset: 0.08 },
                  { opacity: 0.45, offset: 0.5 },
                  { opacity: 0 },
                ],
                { duration: 2600, easing: 'ease-out' }
              );
            }
          }
        }
      }

      prevPoint = { x: evalResult.x, y: evalResult.y };

      // Gaze Tracking
      if (lookTarget && lookTarget.until > now) {
        const r = lookTarget.el.getBoundingClientRect();
        actorEngine.lookAt({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      } else if (pointerCoords && now - pointerCoords.t < 2.5) {
        actorEngine.lookAt(pointerCoords);
      } else {
        actorEngine.lookAt(null);
      }

      // Direct DOM actor translation
      actor.style.transform = `translate3d(${(evalResult.x - PIVOT.x * evalResult.s).toFixed(2)}px, ${(evalResult.y - PIVOT.y * evalResult.s).toFixed(2)}px, 0)`;
      body.style.transform = `scale(${evalResult.s.toFixed(4)})`;

      layer.dataset.front = String(evalResult.front);
      actor.dataset.holding = String(isDocked);

      // Speech bubble placement
      if (bubble.dataset.show === 'true') {
        if (now > bubbleHideTime) {
          bubble.dataset.show = 'false';
        }
        const bubbleX = (actorEngine.facingDir > 0 ? 214 : 300 - 214) * evalResult.s;
        bubbleAt.style.transform = `translate(${bubbleX.toFixed(1)}px, ${(30 * evalResult.s).toFixed(1)}px)`;
      }

      actorEngine.tick(dt, now);
    };

    // Start engine
    const startMascot = () => {
      if (isRunning) return;
      const measured = measureLayout();
      if (measured.stops.length < 2) return;

      layout = measured;
      isRunning = true;
      docEl.dataset.pup = 'live';
      layer.hidden = false;

      const firstStop = layout.meta[0];
      actorEngine = new MascotActor(svg, firstStop.pose, firstStop.facing);
      lastTime = performance.now() / 1000;
      prevPoint = null;

      // Play peekaboo intro in Hero if starting at top
      const initialPos = evaluatePath(layout, window.scrollY);
      if (initialPos.k === 0 && initialPos.t === 0 && firstStop.act === 'peekaboo') {
        currentStop = 0;
        const now = lastTime;
        scheduledActions = [
          [now + 0.1, () => actorEngine?.setPose({ ...TEDDY_POSES.peek, headY: 120 })],
          [now + 0.7, (t) => { actorEngine?.setPose('peek'); actorEngine?.jolt(1.2); showBubble('peekaboo!', t, 1.6); }],
          [now + 1.5, () => { const fr = firstStop.scene?.querySelectorAll('[data-pup-friend]'); if (fr?.[0]) lookTarget = { el: fr[0] as HTMLElement, until: now + 2.3 }; }],
          [now + 3.1, () => { lookTarget = null; actorEngine?.wag(1); }],
        ];
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('focusin', onFocusIn);
      actor.addEventListener('click', onActorClick);
      actor.addEventListener('pointerenter', onPointerEnter);
      actor.addEventListener('pointerleave', onPointerLeave);

      frame.update(tick, true);
    };

    const stopMascot = () => {
      if (!isRunning) return;
      isRunning = false;
      cancelFrame(tick);
      delete docEl.dataset.pup;
      layer.hidden = true;
      layout = null;
      actorEngine = null;

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('focusin', onFocusIn);
      actor.removeEventListener('click', onActorClick);
      actor.removeEventListener('pointerenter', onPointerEnter);
      actor.removeEventListener('pointerleave', onPointerLeave);
    };

    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isRunning) return;
        const fresh = measureLayout();
        if (fresh.stops.length < 2) return stopMascot();
        layout = fresh;
      }, 120);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionPreferenceChange = () => (prefersReduced.matches ? stopMascot() : startMascot());
    prefersReduced.addEventListener('change', onMotionPreferenceChange);

    startMascot();

    return () => {
      stopMascot();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      prefersReduced.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <>
      <div ref={probeRef} aria-hidden={true} className="pup-probe" />
      <div ref={printsRef} aria-hidden={true} className="pup-prints">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH_D} />
          </svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden={true} className="pup-layer" hidden data-front="true">
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <TeddySvg pose="peek" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
