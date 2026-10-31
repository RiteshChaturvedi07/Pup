'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/siteConfig';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      if (currentScrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-milk/95 backdrop-blur-md shadow-sm' : 'bg-milk/80 backdrop-blur-sm'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        data-scrolled={scrolled}
        data-hidden={hidden}
      >
        <div className="gutter mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="TeddyPups U.A.E. Home"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-honey/40 shadow-inner">
              <Image
                src="/logo.png"
                alt="TeddyPups Logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-plush text-xl font-bold tracking-tight text-cocoa sm:text-2xl">
                TeddyPups
              </span>
              <span className="font-scrawl text-xs -mt-1 text-toffee font-medium tracking-wide">
                U.A.E. • Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            <NavLink href="/puppies" label="Available puppies" />
            <NavLink href="/happy-families" label="Happy families" />
            <NavLink href="/how-it-works" label="How it works" />
            <NavLink href="/faq" label="FAQ" />
            <NavLink href="/contact" label="Contact" />
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-5 font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft hover:shadow-lg active:scale-95"
            >
              <span>Enquire on WhatsApp</span>
              <svg className="size-4 text-honey" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-3.5 text-[0.95rem] font-semibold text-cocoa transition-all hover:bg-honey-soft/40 active:scale-95 lg:hidden"
              aria-label="Open menu"
            >
              <span className="font-scrawl text-sm">Menu</span>
              <div className="flex flex-col gap-1 w-4">
                <span className="h-0.5 w-full bg-cocoa rounded-full" />
                <span className="h-0.5 w-3/4 bg-cocoa rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* Scalloped decorative bottom hem */}
        <div className="absolute -bottom-2 left-0 right-0 h-2 overflow-hidden pointer-events-none opacity-90">
          <svg
            viewBox="0 0 1200 12"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full text-milk/90"
          >
            <path
              d="M0 0 Q 15 12 30 0 T 60 0 T 90 0 T 120 0 T 150 0 T 180 0 T 210 0 T 240 0 T 270 0 T 300 0 T 330 0 T 360 0 T 390 0 T 420 0 T 450 0 T 480 0 T 510 0 T 540 0 T 570 0 T 600 0 T 630 0 T 660 0 T 690 0 T 720 0 T 750 0 T 780 0 T 810 0 T 840 0 T 870 0 T 900 0 T 930 0 T 960 0 T 990 0 T 1020 0 T 1050 0 T 1080 0 T 1110 0 T 1140 0 T 1170 0 T 1200 0 L 1200 0 L 0 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1.5 rounded-full px-4 py-2 font-medium text-cocoa transition-colors hover:text-toffee"
    >
      <span>{label}</span>
      <svg
        className="size-3 text-honey opacity-0 transition-opacity group-hover:opacity-100"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <path d="M32 36c-6.6 0-12 5.4-12 12 0 4.4 3.6 8 8 8 2.5 0 4-.8 4-2 0 1.2 1.5 2 4 2 4.4 0 8-3.6 8-8 0-6.6-5.4-12-12-12zm-14-8c-4.4 0-8-4.5-8-10s3.6-10 8-10 8 4.5 8 10-3.6 10-8 10zm28 0c-4.4 0-8-4.5-8-10s3.6-10 8-10 8 4.5 8 10-3.6 10-8 10zm-22-6c-3.3 0-6-3.6-6-8s2.7-8 6-8 6 3.6 6 8-2.7 8-6 8zm16 0c-3.3 0-6-3.6-6-8s2.7-8 6-8 6 3.6 6 8-2.7 8-6 8z" />
      </svg>
    </Link>
  );
}
