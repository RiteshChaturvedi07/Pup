'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';

export function ClosingCtaScene() {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-home py-24 relative overflow-hidden text-milk"
      style={{
        ['--sky-top' as string]: '#2f1a10',
        ['--sky-bottom' as string]: '#24130b',
      }}
      aria-labelledby="cta-title"
    >
      <div className="gutter mx-auto max-w-5xl text-center relative z-10">
        {/* Note */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="font-scrawl text-honey text-xl font-bold">
            welcome home 🏡
          </span>
          <span className="text-honey">✨</span>
        </div>

        {/* Heading */}
        <h2
          id="cta-title"
          className="font-plush text-huge font-bold text-milk max-w-3xl mx-auto"
        >
          Ready to meet your new best friend?
        </h2>

        {/* Copy */}
        <p className="mt-4 text-base md:text-lg text-milk/80 leading-relaxed max-w-2xl mx-auto">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-honey px-8 font-bold text-cocoa shadow-lg transition-all hover:bg-honey-soft hover:shadow-xl active:scale-95"
          >
            <span>Enquire on WhatsApp</span>
            <svg className="size-4 text-cocoa" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
            </svg>
          </a>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-honey/60 bg-milk/10 px-8 font-semibold text-milk transition-all hover:bg-milk/20 active:scale-95"
          >
            Visit showroom & contact
          </Link>
        </div>

        {/* Glowing doorway house graphic */}
        <div className="relative mt-16 max-w-md mx-auto aspect-[16/9] flex items-end justify-center">
          <div className="w-32 h-44 rounded-t-full border-4 border-honey bg-gradient-to-t from-honey to-honey/40 shadow-[0_0_50px_rgba(242,190,107,0.3)] flex items-end justify-center pb-2">
            <span className="font-scrawl text-xs font-bold text-cocoa">
              OPEN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
