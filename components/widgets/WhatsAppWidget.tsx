'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/data/siteConfig';

export function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3"
      aria-label="Instant WhatsApp Help"
    >
      {/* Tooltip speech bubble */}
      <div
        className={`rounded-2xl border border-honey/30 bg-milk px-4 py-2 text-xs font-semibold text-cocoa shadow-lg transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="font-scrawl text-toffee block text-[0.7rem] -mb-0.5">Puppy Concierge</span>
        Chat with our Dubai team 🐾
      </div>

      {/* Floating button */}
      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp Chat"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 group-hover:opacity-100" />
        
        <svg className="size-7 relative z-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
        </svg>
      </a>
    </aside>
  );
}
