import React from 'react';

export const VetCheckedStamp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={`tp-stamp__icon ${className}`} aria-hidden="true">
    <path
      d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 30h7l3-7 4 13 3-6h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FlightSafeStamp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={`tp-stamp__icon ${className}`} aria-hidden="true">
    <path
      d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 50c10 4 20 4 30 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="2 7"
    />
  </svg>
);

export const SupportStamp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={`tp-stamp__icon ${className}`} aria-hidden="true">
    <path
      d="M10 14h44v28H30l-12 10v-10h-8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 28h0M32 28h0M42 28h0"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WorldwideStamp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={`tp-stamp__icon ${className}`} aria-hidden="true">
    <circle
      cx="32"
      cy="32"
      r="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
