import React from 'react';

export const BasketBack: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 300 240"
    className={`tp-basket__back ${className}`}
  >
    <ellipse cx="212" cy="145" rx="96" ry="12" fill="#4d2b19" className="tp-basket__hollow" />
    <path
      d="M116 145 A96 12 0 0 1 308 145"
      fill="none"
      stroke="#2a170e"
      strokeWidth="5"
      className="tp-basket__rim-line"
    />
    <path
      d="M116 145 A96 12 0 0 1 308 145"
      fill="none"
      stroke="#a65a30"
      strokeWidth="3.5"
      className="tp-basket__rim"
    />
  </svg>
);

export const BasketFront: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 300 240"
    className={`tp-basket__front ${className}`}
  >
    <path
      d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z"
      fill="#e4a352"
      stroke="#2a170e"
      strokeWidth="3.5"
      className="tp-basket__body"
    />
    <path
      d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206"
      fill="none"
      stroke="#a24a1a"
      strokeWidth="2.5"
      className="tp-basket__weave"
    />
    <path
      d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230"
      fill="none"
      stroke="#a24a1a"
      strokeWidth="2.5"
      className="tp-basket__weave tp-basket__weave--stakes"
    />
    <path
      d="M116 145 A96 12 0 0 0 308 145"
      fill="none"
      stroke="#2a170e"
      strokeWidth="5"
      className="tp-basket__rim-line"
    />
    <path
      d="M116 145 A96 12 0 0 0 308 145"
      fill="none"
      stroke="#a65a30"
      strokeWidth="3.5"
      className="tp-basket__rim"
    />
  </svg>
);
