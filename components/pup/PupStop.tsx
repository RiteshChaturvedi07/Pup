import React from 'react';

export type PupPose = 'idle' | 'peek' | 'sit' | 'run' | 'walk' | 'snug' | 'bow' | 'tilt' | 'wake';
export type PupFacing = 'left' | 'right' | 'front';

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
  return (
    <div
      id={`pup-stop-${id}`}
      data-pup-stop={id}
      data-pose={pose}
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
      {children}
    </div>
  );
};
export default PupStop;
