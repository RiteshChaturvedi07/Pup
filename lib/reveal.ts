import { gsap, ScrollTrigger, EASINGS, prefersReducedMotion } from '@/lib/motion';

/**
 * Initializes GSAP ScrollTrigger for elements with [data-reveal].
 * Respects CSS custom property --d for delay.
 */
export function initScrollReveals(container?: HTMLElement | null): () => void {
  if (typeof window === 'undefined') return () => {};
  if (prefersReducedMotion()) {
    // If reduced motion is requested, immediately ensure all are visible
    const elements = (container || document).querySelectorAll<HTMLElement>('[data-reveal]');
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return () => {};
  }

  const elements = (container || document).querySelectorAll<HTMLElement>('[data-reveal]');
  const triggers: ScrollTrigger[] = [];

  elements.forEach((el) => {
    // Extract stagger delay from style or --d property (e.g. 110ms or 0.11s)
    const rawDelay = el.style.getPropertyValue('--d') || '0';
    let delaySec = 0;
    if (rawDelay.endsWith('ms')) {
      delaySec = parseFloat(rawDelay) / 1000;
    } else if (rawDelay.endsWith('s')) {
      delaySec = parseFloat(rawDelay);
    } else {
      delaySec = parseFloat(rawDelay) || 0;
    }

    gsap.set(el, {
      opacity: 0,
      y: 28,
      scale: 0.98,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delaySec,
          ease: EASINGS.soft,
        });
      },
    });

    triggers.push(trigger);
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
}

/**
 * Helper to split headline text into words for staggered word reveal
 */
export function splitHeadlineIntoWords(text: string): string[] {
  return text.trim().split(/\s+/);
}
