'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/siteConfig';
import { PUPPIES } from '@/data/puppies';
import { Mascot } from '@/components/mascot/Mascot';

export function HeroScene() {
  // Use first 6 puppies for the arch windows
  const archPuppies = PUPPIES.slice(0, 6);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-hero min-h-screen pt-28 pb-20 relative overflow-hidden flex flex-col justify-between"
      style={{
        ['--sky-top' as string]: '#fffdf8',
        ['--sky-bottom' as string]: '#fff1d8',
      }}
      aria-labelledby="hero-title"
    >
      {/* Decorative top curtain banner */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-40">
        <div className="flex w-full justify-between overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <svg
              key={i}
              className="w-12 h-8 text-honey-soft flex-shrink-0 -mt-2"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              <path d="M0,0 Q32,48 64,0 Z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="gutter mx-auto max-w-7xl w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-scrawl text-toffee text-lg md:text-xl font-medium tracking-wide">
              every puppy is family
            </span>
            <span className="text-honey">🐾</span>
          </div>

          <h1
            id="hero-title"
            className="font-plush text-huge font-bold text-cocoa tracking-tight"
          >
            Premium teacup puppies in Dubai
          </h1>

          <p className="mt-4 text-base md:text-lg text-cocoa/80 leading-relaxed max-w-2xl mx-auto font-normal">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/puppies"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cocoa px-7 font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft hover:shadow-lg active:scale-95"
            >
              View available puppies
            </Link>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cocoa bg-milk px-7 font-semibold text-cocoa shadow-sm transition-all hover:bg-honey-soft/50 active:scale-95"
            >
              <span>Enquire on WhatsApp</span>
              <svg className="size-4 text-honey-deep" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 6 Arch Windows Showcase with Center Mascot */}
        <div className="mt-14 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {archPuppies.map((pup, index) => (
              <Link
                key={pup.id}
                href={`/puppies/${pup.slug}`}
                className="group relative flex flex-col items-center"
              >
                {/* Arch window shape */}
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden rounded-t-[5rem] rounded-b-2xl border-2 border-honey/40 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:border-toffee/60"
                  style={{ backgroundColor: pup.bgColor }}
                >
                  <Image
                    src={pup.image || pup.fallbackImage}
                    alt={pup.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: pup.objectPosition }}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Video indicator badge if hasVideo */}
                  {pup.hasVideo && (
                    <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-milk/90 text-cocoa shadow-sm text-xs">
                      ▶
                    </span>
                  )}
                </div>

                {/* Puppy label under arch */}
                <span className="mt-2 text-center font-scrawl text-sm font-semibold text-cocoa group-hover:text-toffee transition-colors">
                  {pup.name}
                </span>
                <span className="text-[0.7rem] text-cocoa/60 font-medium">
                  {pup.breedLabel}
                </span>
              </Link>
            ))}
          </div>

          {/* Central mascot playful greeting */}
          <div className="hidden lg:flex justify-center -mt-8 relative z-20">
            <Mascot
              pose="sit"
              facing="right"
              size={140}
              showBubble={true}
              bubbleText="Welcome! Meet our pups 🐶"
            />
          </div>
        </div>

        {/* Breed filter pill bubbles */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          <span className="text-xs font-semibold text-cocoa/70 uppercase tracking-wider mr-1">
            Browse by breed:
          </span>
          <BreedPill href="/puppies?breed=maltipoo" label="Maltipoo" emoji="🧸" />
          <BreedPill href="/puppies?breed=pomeranian" label="Pomeranian" emoji="🦊" />
          <BreedPill href="/puppies?breed=poodle" label="Poodle" emoji="🐩" />
          <BreedPill href="/puppies?breed=cavapoo" label="Cavapoo" emoji="🐶" />
          <BreedPill href="/puppies?breed=shih-tzu" label="Shih Tzu" emoji="🐾" />
          <BreedPill href="/puppies?origin=imported" label="Korean Teacup" emoji="✨" isSpecial />
        </div>
      </div>
    </section>
  );
}

function BreedPill({
  href,
  label,
  emoji,
  isSpecial = false,
}: {
  href: string;
  label: string;
  emoji: string;
  isSpecial?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm ${
        isSpecial
          ? 'bg-toffee text-milk hover:bg-toffee-deep'
          : 'bg-milk text-cocoa border border-honey/50 hover:bg-honey-soft/50 hover:border-honey'
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </Link>
  );
}
