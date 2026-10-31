import React from 'react';

export const DubaiSkyline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 300 120"
    className={`tp-way__skyline ${className}`}
    aria-hidden="true"
  >
    <path
      d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FlightPlaneSceneProps {
  className?: string;
  progress?: number; // 0 to 1
  puppyPhotoUrl?: string;
}

export const FlightPlaneScene: React.FC<FlightPlaneSceneProps> = ({
  className = '',
  progress = 1,
  puppyPhotoUrl = '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
}) => {
  // Path curve: M40 250 C 170 40, 470 20, 620 168
  // At progress = 1: translate(620, 168) rotate(44.5deg)
  const x = 40 + (620 - 40) * progress;
  const y = 250 - Math.sin(progress * Math.PI) * 190 + (168 - 250) * progress;
  const angle = (progress - 0.5) * 60;

  return (
    <svg
      viewBox="0 0 660 300"
      role="img"
      aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
      className={`w-full h-auto ${className}`}
    >
      <defs>
        <clipPath id="flight-porthole-clip">
          <circle r="25" />
        </clipPath>
      </defs>

      {/* Dotted Route Curve */}
      <path
        d="M40 250 C 170 40, 470 20, 620 168"
        fill="none"
        stroke="#e4a352"
        strokeWidth="3.5"
        strokeDasharray="6 8"
        strokeLinecap="round"
        className="tp-flight__route"
      />

      {/* Origin & Destination Dots */}
      <circle cx="40" cy="250" r="7" className="tp-flight__dot fill-[#2a170e]" />
      <circle cx="620" cy="168" r="7" className="tp-flight__dot fill-[#2a170e]" />

      {/* Labels */}
      <text
        x="40"
        y="284"
        textAnchor="middle"
        className="tp-flight__label font-scrawl text-sm fill-[#2a170e]"
      >
        Korea
      </text>
      <text
        x="620"
        y="202"
        textAnchor="middle"
        className="tp-flight__label font-scrawl text-sm fill-[#2a170e]"
      >
        Dubai
      </text>

      {/* Airplane */}
      <g
        transform={`translate(${x} ${y}) rotate(${angle})`}
        style={{ transition: 'transform 0.1s linear' }}
      >
        <g transform="translate(-126 -78)">
          <path d="M28 60 L8 26 L34 26 L60 54 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
          <path
            d="M108 112 L142 156 L172 156 L158 112 Z"
            fill="#e4a352"
            stroke="#2a170e"
            strokeWidth="3"
            opacity="0.8"
          />
          <path
            d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
            fill="#fffdf8"
            stroke="#2a170e"
            strokeWidth="3.5"
          />
          <path d="M104 44 L138 2 L168 2 L154 44 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
          <path
            d="M206 64 C215 67 221 73 224 80"
            fill="none"
            stroke="#2a170e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Porthole with Puppy */}
        <g transform="translate(10 2)">
          <image
            href={puppyPhotoUrl}
            x="-25"
            y="-25"
            width="50"
            height="50"
            clipPath="url(#flight-porthole-clip)"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            r="25"
            fill="none"
            stroke="#2a170e"
            strokeWidth="3.5"
            className="tp-flight__porthole"
          />
        </g>
      </g>
    </svg>
  );
};
