'use client';

import React from 'react';
import { PupBuddy } from './PupBuddy';
import { TEDDY_POSES } from './TeddyModel';

export type PupPose = keyof typeof TEDDY_POSES | 'idle' | 'run' | 'wake';
export type PupFacing = 'left' | 'right';

export interface PupStopProps {
  id: string;
  pose: PupPose;
  facing?: PupFacing;
  act?: string;
  behind?: boolean;
  lane?: boolean;
  offset?: { x?: number | string; y?: number | string };
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const PupStop: React.FC<PupStopProps> = ({
  id,
  pose,
  facing = 'right',
  act,
  behind = false,
  lane = false,
  offset,
  className = '',
  style,
  children,
}) => {
  const normalizedPose = pose === 'idle' ? 'sit' : pose === 'run' ? 'walk' : pose === 'wake' ? 'settle' : pose;

  return (
    <div
      id={`pup-stop-${id}`}
      data-pup-stop="true"
      data-pose={normalizedPose}
      data-facing={facing}
      data-act={act}
      data-behind={behind ? 'true' : undefined}
      data-lane={lane ? 'true' : undefined}
      className={`pup-stop ${className}`}
      style={{
        ...style,
        ...(offset?.x !== undefined ? { left: offset.x } : {}),
        ...(offset?.y !== undefined ? { bottom: offset.y } : {}),
      }}
      aria-hidden="true"
    >
      {children || (
        <PupBuddy
          pose={normalizedPose}
          facing={facing}
          act={act}
          size={160}
          label={`Teddy in ${id}`}
        />
      )}
    </div>
  );
};
