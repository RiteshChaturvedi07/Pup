'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-milk/95 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Header bar */}
      <div className="gutter flex h-[var(--header-h)] items-center justify-between border-b border-honey/20">
        <span className="font-scrawl text-xl font-bold text-toffee">
          where to, friend? 🐾
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa bg-milk text-cocoa transition-transform active:scale-90"
          aria-label="Close menu"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Menu Links */}
      <nav className="gutter flex flex-1 flex-col justify-center gap-4 py-8">
        <MenuItem href="/puppies" label="Available puppies" onClick={onClose} />
        <MenuItem href="/happy-families" label="Happy families" onClick={onClose} />
        <MenuItem href="/how-it-works" label="How it works" onClick={onClose} />
        <MenuItem href="/faq" label="FAQ" onClick={onClose} />
        <MenuItem href="/contact" label="Contact & Visit" onClick={onClose} />
        <MenuItem href="/gone-home" label="Gone home" onClick={onClose} isMuted />
      </nav>

      {/* Footer Actions */}
      <div className="gutter border-t border-honey/20 pb-8 pt-4 space-y-3">
        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa font-semibold text-milk shadow-md transition-all active:scale-95"
        >
          <span>Chat on WhatsApp</span>
          <svg className="size-4 text-honey" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
          </svg>
        </a>
        <a
          href={`tel:${SITE_CONFIG.phoneClean}`}
          className="flex h-11 w-full items-center justify-center rounded-full border-2 border-cocoa font-semibold text-cocoa transition-all active:scale-95"
        >
          <span>Call Showroom ({SITE_CONFIG.phone})</span>
        </a>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  label,
  onClick,
  isMuted = false,
}: {
  href: string;
  label: string;
  onClick: () => void;
  isMuted?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-plush text-[clamp(2rem,8vw,3.2rem)] font-bold tracking-tight transition-transform active:translate-x-2 ${
        isMuted ? 'text-cocoa/50 text-2xl font-normal' : 'text-cocoa hover:text-toffee'
      }`}
    >
      {label}
    </Link>
  );
}
