'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  maxDistance = 80,
  strength = 8,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.25, ease: 'power2.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.25, ease: 'power2.out' });
    const textXTo = text ? gsap.quickTo(text, 'x', { duration: 0.25, ease: 'power2.out' }) : null;
    const textYTo = text ? gsap.quickTo(text, 'y', { duration: 0.25, ease: 'power2.out' }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < maxDistance + rect.width / 2) {
        const pullX = ((e.clientX - centerX) / (maxDistance + rect.width / 2)) * strength;
        const pullY = ((e.clientY - centerY) / (maxDistance + rect.height / 2)) * strength;

        xTo(pullX);
        yTo(pullY);
        textXTo?.(pullX * 0.4);
        textYTo?.(pullY * 0.4);
      } else {
        xTo(0);
        yTo(0);
        textXTo?.(0);
        textYTo?.(0);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      if (text) {
        gsap.to(text, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxDistance, strength]);

  return (
    <button ref={btnRef} className={className} {...props}>
      <span ref={textRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
export default MagneticButton;
