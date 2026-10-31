import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Easing vocabulary as specified
export const EASINGS = {
  soft: 'power3.out',
  pop: 'back.out(1.7)',
  popStrong: 'back.out(2.4)',
  spring: 'elastic.out(1, 0.6)',
  swing: 'power2.inOut',
  doorCSS: 'cubic-bezier(.3, 1.2, .4, 1)',
  silk: 'cubic-bezier(.22, 1, .36, 1)',
  pounce: 'cubic-bezier(.34, 1.56, .64, 1)',
} as const;

// Standard durations (seconds)
export const DURATIONS = {
  micro: 0.22,
  ui: 0.45,
  scene: 0.95,
  stamp: 0.6,
  door: 0.55,
} as const;

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check if device has fine pointer and hover capability
export function isFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export { gsap, ScrollTrigger };
