import React from 'react';

export const HeaderHem: React.FC<{
  className?: string;
  fill?: string;
  stroke?: string;
}> = ({
  className = '',
  fill = '#fffdf8',
  stroke = 'rgba(42, 23, 14, 0.15)',
}) => (
  <svg
    aria-hidden="true"
    className={`tp-header__hem ${className}`}
    width="100%"
    height="14"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 0H44V2A22 11 0 0 1 0 2Z" fill={fill} className="tp-header__hem-fill" />
        <path
          d="M0 2A22 11 0 0 0 44 2"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          className="tp-header__hem-line"
        />
      </pattern>
    </defs>
    <rect width="100%" height="14" fill="url(#tp-hem)" />
  </svg>
);

export const QuiltEdge: React.FC<{ className?: string; colorVar?: string }> = ({
  className = '',
  colorVar = 'var(--quilt, #fbe3b4)',
}) => (
  <svg
    className={`tp-quilt__edge ${className}`}
    width="100%"
    height="40"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: colorVar }} />
        <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
        <path
          d="M11 33A27 19 0 0 1 65 33"
          fill="none"
          stroke="#2a170e"
          strokeWidth="1.6"
          strokeDasharray="3.5 5.5"
          strokeLinecap="round"
          opacity=".42"
        />
      </pattern>
    </defs>
    <rect width="100%" height="40" fill="url(#tp-scallop)" />
  </svg>
);

export const CurtainScallopTop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`tp-curtain__edge tp-curtain__edge--top ${className}`}
    width="100%"
    height="40"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <pattern id="tp-curtain-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
        <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
        <path
          d="M11 33A27 19 0 0 1 65 33"
          fill="none"
          stroke="#2a170e"
          strokeWidth="1.6"
          strokeDasharray="3.5 5.5"
          strokeLinecap="round"
          opacity=".42"
        />
      </pattern>
    </defs>
    <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
  </svg>
);

export const CurtainScallopBottom: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`tp-curtain__edge tp-curtain__edge--bottom ${className}`}
    width="100%"
    height="40"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
  </svg>
);

export const FooterHill: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className={`tp-footer__hill ${className}`}
  >
    <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
  </svg>
);

export const ScallopCloudDivider: React.FC<{
  fill: string;
  className?: string;
  flip?: boolean;
}> = ({ fill, className = '', flip = false }) => (
  <div
    className={`w-full overflow-hidden leading-none pointer-events-none relative z-10 ${className} ${
      flip ? 'rotate-180 -scale-x-100' : ''
    }`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className="w-full h-5 sm:h-8"
      fill={fill}
    >
      <path d="M0 40 Q 60 10, 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40 T 1320 40 T 1440 40 L 1440 40 L 0 40 Z" />
    </svg>
  </div>
);

