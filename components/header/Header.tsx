'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '@/data/siteConfig';
import { MobileMenu } from './MobileMenu';
import { HeaderHem } from '@/components/svg/Scallops';
import { PawIcon } from '@/components/svg/Icons';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkTone, setIsDarkTone] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      setScrolled(currentScrollY > 20);

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > 140 && currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Tone detection based on elements under header
      const headerEl = document.querySelector('header');
      if (headerEl) {
        const headerRect = headerEl.getBoundingClientRect();
        const probeY = headerRect.bottom + 10;
        const elementUnder = document.elementFromPoint(window.innerWidth / 2, probeY);
        const scene = elementUnder?.closest('[data-pup-scene], [data-tone]');
        const tone = scene?.getAttribute('data-tone');
        setIsDarkTone(tone === 'dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const textColorClass = isDarkTone ? 'text-[#fff1d8]' : 'text-[#2a170e]';
  const subTextColorClass = isDarkTone ? 'text-[#fbe3b4]' : 'text-[#a24a1a]';
  const bgClass = scrolled
    ? isDarkTone
      ? 'bg-[#2a170e]/95 backdrop-blur-md shadow-md'
      : 'bg-[#fffdf8]/95 backdrop-blur-md shadow-sm'
    : isDarkTone
      ? 'bg-[#2a170e]/75 backdrop-blur-sm'
      : 'bg-[#fffdf8]/80 backdrop-blur-sm';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        data-scrolled={scrolled}
        data-hidden={hidden}
        data-tone={isDarkTone ? 'dark' : 'light'}
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
              <span
                className={`font-plush text-xl font-bold tracking-tight transition-colors duration-300 sm:text-2xl ${textColorClass}`}
              >
                TeddyPups
              </span>
              <span
                className={`font-scrawl text-xs -mt-1 font-medium tracking-wide transition-colors duration-300 ${subTextColorClass}`}
              >
                U.A.E. • Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            <NavLink href="/puppies" label="Available puppies" isDark={isDarkTone} active={pathname === '/puppies'} />
            <NavLink href="/happy-families" label="Happy families" isDark={isDarkTone} active={pathname === '/happy-families'} />
            <NavLink href="/how-it-works" label="How it works" isDark={isDarkTone} active={pathname === '/how-it-works'} />
            <NavLink href="/faq" label="FAQ" isDark={isDarkTone} active={pathname === '/faq'} />
            <NavLink href="/contact" label="Contact" isDark={isDarkTone} active={pathname === '/contact'} />
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group hidden sm:inline-flex h-11 items-center gap-2 rounded-full bg-[#1f7a4d] px-5 font-bold text-white shadow-md transition-all hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px]"
            >
              {/* Attention Pulse Ring */}
              <span className="absolute -inset-1 rounded-full border-2 border-[#1f7a4d] opacity-50 group-hover:hidden animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="relative z-10">Enquire on WhatsApp</span>
              <svg className="relative z-10 size-4 text-[#f2be6b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border-2 px-3.5 text-[0.95rem] font-semibold transition-all active:scale-95 lg:hidden ${
                isDarkTone
                  ? 'border-[#fff1d8] bg-[#2a170e] text-[#fff1d8] hover:bg-[#fff1d8]/10'
                  : 'border-[#2a170e] bg-[#fffdf8] text-[#2a170e] hover:bg-[#fbe3b4]/40'
              }`}
              aria-label="Open menu"
            >
              <span className="font-scrawl text-sm">Menu</span>
              <div className="flex flex-col gap-1 w-4">
                <span className={`h-0.5 w-full rounded-full ${isDarkTone ? 'bg-[#fff1d8]' : 'bg-[#2a170e]'}`} />
                <span className={`h-0.5 w-3/4 rounded-full ${isDarkTone ? 'bg-[#fff1d8]' : 'bg-[#2a170e]'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Scalloped decorative bottom hem */}
        <div className="absolute -bottom-3.5 left-0 right-0 h-3.5 overflow-hidden pointer-events-none transition-opacity duration-300">
          <HeaderHem
            fill={isDarkTone ? '#2a170e' : '#fffdf8'}
            stroke={isDarkTone ? 'rgba(255, 241, 216, 0.2)' : 'rgba(42, 23, 14, 0.15)'}
            className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-80'}`}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavLink({
  href,
  label,
  isDark,
  active,
}: {
  href: string;
  label: string;
  isDark: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
        isDark
          ? active
            ? 'text-[#f2be6b]'
            : 'text-[#fff1d8] hover:text-[#f2be6b]'
          : active
            ? 'text-[#a24a1a]'
            : 'text-[#2a170e] hover:text-[#a24a1a]'
      }`}
    >
      {/* Animated Paw Icon */}
      <span className={`transition-all duration-300 transform ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'}`}>
        <PawIcon className="w-3.5 h-3.5 text-[#f2be6b]" />
      </span>

      <span>{label}</span>

      {/* Underline drawn left to right */}
      <span
        className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[#f2be6b] transition-transform duration-300 origin-left ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}
export default Header;
