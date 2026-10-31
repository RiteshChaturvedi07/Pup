import React from 'react';

export const TwinkleStar: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 40 40"
    className={`tp-twinkle fill-current ${className}`}
    style={style}
    aria-hidden="true"
  >
    <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" />
  </svg>
);

export const QAStar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 40"
    className={`tp-qa__star fill-current ${className}`}
    aria-hidden="true"
  >
    <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" />
  </svg>
);

export const HorizonCity: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 160"
    preserveAspectRatio="none"
    className={`tp-horizon__city fill-current ${className}`}
    aria-hidden="true"
  >
    <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
  </svg>
);

export const CrescentMoon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`tp-moon relative w-20 h-20 ${className}`}>
    <div className="absolute inset-0 rounded-full bg-[#fbe3b4] shadow-[0_0_40px_rgba(251,227,180,0.6)]" />
    <div className="absolute -inset-1 rounded-full bg-[#fbe3b4] blur-lg opacity-40 animate-pulse" />
    <div className="absolute -top-1 -right-1 w-18 h-18 rounded-full bg-inherit" />
  </div>
);
