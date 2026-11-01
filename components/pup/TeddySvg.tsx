'use client';

import React from 'react';
import {
  TEDDY_COLORS,
  TEDDY_PATHS,
  TEDDY_POSES,
  computeTeddyTransforms,
  TeddyPose,
  TeddyTimeState,
} from './TeddyModel';

export interface TeddySvgProps {
  pose?: keyof typeof TEDDY_POSES | TeddyPose;
  facing?: 'left' | 'right' | number;
  timeState?: TeddyTimeState;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export function TeddySvg({
  pose = 'sit',
  facing = 'right',
  timeState,
  className = '',
  style,
  label = 'Teddy, the TeddyPups mascot',
}: TeddySvgProps) {
  const currentPose = typeof pose === 'string' ? (TEDDY_POSES[pose] || TEDDY_POSES.sit) : pose;
  const f = computeTeddyTransforms(currentPose, timeState);

  const isFacingLeft = facing === 'left' || facing === -1;
  const rootTransform = isFacingLeft ? 'translate(300 0) scale(-1 1)' : undefined;

  const strokeStyle: React.SVGProps<SVGPathElement> = {
    stroke: TEDDY_COLORS.ink,
    strokeWidth: 3.4,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
  };

  const lineStyle: React.SVGProps<SVGPathElement> = {
    ...strokeStyle,
    fill: 'none',
  };

  return (
    <svg
      viewBox="0 0 300 240"
      className={className}
      style={{ overflow: 'visible', ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label || undefined}
      focusable="false"
    >
      <g data-p="root" transform={rootTransform}>
        {/* Ground shadow */}
        <ellipse
          data-p="shadow"
          cx={TEDDY_PATHS.shadow.cx}
          cy={TEDDY_PATHS.shadow.cy}
          rx={TEDDY_PATHS.shadow.rx}
          ry={TEDDY_PATHS.shadow.ry}
          fill={TEDDY_COLORS.ink}
          opacity={f.shadowOpacity}
          transform={f.shadow}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />

        {/* Body and legs group */}
        <g data-p="body" transform={f.body} opacity={f.side}>
          {/* Back far leg */}
          <g data-p="bf" transform={f.bf} opacity={f.backLegs}>
            <path d={`${TEDDY_PATHS.legs.backFar}Z`} fill={TEDDY_COLORS.furAccent} />
            <path d={TEDDY_PATHS.legs.backFar} {...lineStyle} />
            <path d={TEDDY_PATHS.toes(228 - 192)} {...lineStyle} strokeWidth={2.4} />
          </g>

          {/* Front far leg */}
          <g data-p="ff" transform={f.ff}>
            <path d={`${TEDDY_PATHS.legs.frontFar}Z`} fill={TEDDY_COLORS.furAccent} />
            <path d={TEDDY_PATHS.legs.frontFar} {...lineStyle} />
            <path d={TEDDY_PATHS.toes(228 - 192)} {...lineStyle} strokeWidth={2.4} />
          </g>

          {/* Fluffy tail */}
          <g data-p="tail" transform={f.tail}>
            <path d={TEDDY_PATHS.tailStem} {...lineStyle} strokeWidth={9} />
            <path
              d={TEDDY_PATHS.tailStem}
              stroke={TEDDY_COLORS.fur}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            <path d={TEDDY_PATHS.tail} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          </g>

          {/* Back near leg */}
          <g data-p="bn" transform={f.bn} opacity={f.backLegs}>
            <path d={`${TEDDY_PATHS.legs.back}Z`} fill={TEDDY_COLORS.fur} />
            <path d={TEDDY_PATHS.legs.back} {...lineStyle} />
            <path d={TEDDY_PATHS.toes(228 - 194)} {...lineStyle} strokeWidth={2.4} />
          </g>

          {/* Main body & chest puffs */}
          <path d={TEDDY_PATHS.body} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          <path d={TEDDY_PATHS.chest} fill={TEDDY_COLORS.fur} {...strokeStyle} />

          {/* Front near leg */}
          <g data-p="fn" transform={f.fn}>
            <path d={`${TEDDY_PATHS.legs.front}Z`} fill={TEDDY_COLORS.fur} />
            <path d={TEDDY_PATHS.legs.front} {...lineStyle} />
            <path d={TEDDY_PATHS.toes(228 - 194)} {...lineStyle} strokeWidth={2.4} />
          </g>
        </g>

        {/* Haunch (when sitting) */}
        <g data-p="haunch" opacity={f.haunchOpacity} transform={f.haunch}>
          <path d={TEDDY_PATHS.haunch} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          <path d={TEDDY_PATHS.haunchPaw} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          <path d="M132 222v5M139 222v5" {...lineStyle} strokeWidth={2.4} />
        </g>

        {/* Head, ears, face */}
        <g data-p="head" transform={f.head}>
          {/* Collar & tag */}
          <path d={TEDDY_PATHS.collar} fill={TEDDY_COLORS.collar} {...strokeStyle} strokeWidth={3} />
          <path d={TEDDY_PATHS.tag} fill={TEDDY_COLORS.cream} {...strokeStyle} strokeWidth={2.4} />

          {/* Floppy ears */}
          <path data-p="earL" d={TEDDY_PATHS.earL} fill={TEDDY_COLORS.furAccent} {...strokeStyle} transform={f.earL} />
          <path data-p="earR" d={TEDDY_PATHS.earR} fill={TEDDY_COLORS.furAccent} {...strokeStyle} transform={f.earR} />

          {/* Head & topknot */}
          <path d={TEDDY_PATHS.head} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          <path d={TEDDY_PATHS.topknot} fill={TEDDY_COLORS.fur} {...strokeStyle} strokeWidth={3} />

          {/* Muzzle */}
          <path d={TEDDY_PATHS.muzzle} fill={TEDDY_COLORS.cream} />

          {/* Rosy cheeks */}
          <circle cx="181" cy="116" r="7" fill={TEDDY_COLORS.blush} opacity="0.85" />
          <circle cx="243" cy="116" r="7" fill={TEDDY_COLORS.blush} opacity="0.85" />

          {/* Eyes tracking gaze */}
          <g data-p="eyes" transform={f.eyes}>
            {/* Open eyes with specular dots */}
            <g data-p="open" opacity={f.openEyes}>
              <g data-p="blink" transform={f.blink}>
                <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill={TEDDY_COLORS.ink} />
                <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill={TEDDY_COLORS.ink} />
                <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
              </g>
            </g>
          </g>

          {/* Happy / shut eyes */}
          <path
            data-p="happy"
            d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
            {...lineStyle}
            opacity={f.happyEyes}
          />
          <path
            data-p="shut"
            d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
            {...lineStyle}
            opacity={f.shutEyes}
          />

          {/* Nose, mouth, tongue */}
          <path d={TEDDY_PATHS.nose} fill={TEDDY_COLORS.ink} />
          <path d={TEDDY_PATHS.mouth} {...lineStyle} />
          <path
            data-p="tongue"
            d={TEDDY_PATHS.tongue}
            fill="#e98c8c"
            stroke={TEDDY_COLORS.ink}
            strokeWidth={2.2}
            strokeLinejoin="round"
            opacity={f.tongue}
          />
          <g data-p="mouth" opacity={f.mouth}>
            <path d={TEDDY_PATHS.mouthOpen} fill="#6b2a1c" {...strokeStyle} strokeWidth={2.6} />
            <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" />
          </g>
        </g>

        {/* Ledge paws when peeking over quilt */}
        <g data-p="ledge" opacity={f.ledge}>
          <path d={TEDDY_PATHS.ledgePaws} fill={TEDDY_COLORS.fur} {...strokeStyle} />
          <path d={TEDDY_PATHS.ledgeToes} {...lineStyle} strokeWidth={2.4} />
        </g>
      </g>
    </svg>
  );
}

