import React from 'react';
import { SITE_CONFIG } from '@/data/siteConfig';

export function MobileBottomBar() {
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 flex h-[var(--bar-h)] items-center justify-between border-t border-honey/20 bg-milk/95 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden shadow-[0_-4px_12px_rgba(42,23,14,0.08)]"
      data-whatsapp-bar="true"
      aria-label="Mobile Contact Bar"
    >
      {/* Call button */}
      <a
        href={`tel:${SITE_CONFIG.phoneClean}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-cocoa py-2.5 text-xs font-bold text-cocoa transition-transform active:scale-95"
      >
        <span className="text-base">📞</span>
        <span>Call</span>
      </a>

      {/* Spacing */}
      <div className="w-3" />

      {/* WhatsApp button */}
      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-cocoa py-2.5 text-xs font-bold text-milk shadow-md transition-transform active:scale-95"
      >
        <svg className="size-4 text-honey" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
        </svg>
        <span>Enquire on WhatsApp</span>
      </a>
    </aside>
  );
}
