'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/siteConfig';
import { PupBuddy } from '@/components/pup/PupBuddy';

interface HeroPupItem {
  index: number;
  name: string;
  breed: string;
  slug: string;
  image: string;
  fallbackImage: string;
  bgColor: string;
  objectPosition: string;
  description: string;
  location: string;
  age: string;
  gender: string;
}

const SEAT_GEOMETRY = [
  { x: '9%', w: '8.6rem', peek: 0.62, tilt: '-5deg', tagX: '-12%' },
  { x: '22.5%', w: '10.4rem', peek: 0.8, tilt: '3deg', tagX: '-30%' },
  { x: '35%', w: '9.2rem', peek: 0.7, tilt: '-2deg', tagX: '-50%' },
  { x: '65%', w: '9.4rem', peek: 0.74, tilt: '3deg', tagX: '-50%' },
  { x: '77.5%', w: '10.6rem', peek: 0.82, tilt: '-3deg', tagX: '-70%' },
  { x: '91%', w: '8.4rem', peek: 0.6, tilt: '4deg', tagX: '-88%' },
];

const HERO_PUPPIES: HeroPupItem[] = [
  {
    index: 0,
    name: 'Max',
    breed: 'Maltipoo',
    slug: 'maltipoo-max-male',
    image: '/media/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.jpeg',
    fallbackImage: '/media/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.jpeg',
    bgColor: '#785838',
    objectPosition: '53.8% 44.3%',
    description: 'Playful apricot Maltipoo with a sweet teddy bear face and gentle temperament.',
    location: 'Downtown Dubai Showroom',
    age: '3 months',
    gender: 'Boy',
  },
  {
    index: 1,
    name: 'Korean Teacup Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    image: '/media/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpeg',
    fallbackImage: '/media/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpeg',
    bgColor: '#080808',
    objectPosition: '40.3% 44.3%',
    description: 'Striking black and white miniature puppy with playful sparkling eyes.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Girl',
  },
  {
    index: 2,
    name: 'Korean Teacup Poodle',
    breed: 'Korean Teacup Poodle',
    slug: 'korean-teacup-poodle-female',
    image: '/media/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpeg',
    fallbackImage: '/media/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpeg',
    bgColor: '#e8e8e8',
    objectPosition: '52.5% 42.6%',
    description: 'Pocket-sized apricot teacup companion sitting on a park bench with a sky blue bow.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Girl',
  },
  {
    index: 3,
    name: 'Copper & Charlie',
    breed: 'Maltipoo & Cavapoo',
    slug: 'maltipoo-cavapoo-male',
    image: '/media/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpeg',
    fallbackImage: '/media/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpeg',
    bgColor: '#b8a8a8',
    objectPosition: '44.7% 29.5%',
    description: 'Irresistible ruby red teacup companions with affectionate and cuddly nature.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Boys',
  },
  {
    index: 4,
    name: 'Snowy',
    breed: 'Pomeranian',
    slug: 'pomeranian-female',
    image: '/media/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpeg',
    fallbackImage: '/media/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpeg',
    bgColor: '#f8d8b8',
    objectPosition: '50% 50%',
    description: 'Charming pure white teacup puppy, joyful and full of playful spirit.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Girl',
  },
  {
    index: 5,
    name: 'Bella',
    breed: 'Maltipoo',
    slug: 'maltipoo-female-2',
    image: '/media/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpeg',
    fallbackImage: '/media/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpeg',
    bgColor: '#785838',
    objectPosition: '54.5% 45.7%',
    description: 'Sweet miniature puppy held gently in hands with green leaves background.',
    location: 'Seoul / VIP Dubai Delivery',
    age: '3 months',
    gender: 'Girl',
  },
];

export function HeroScene() {
  const [selectedPup, setSelectedPup] = useState<HeroPupItem | null>(null);
  const [duckStates, setDuckStates] = useState<Record<number, 'duck' | 'pop' | 'normal'>>({});

  // Autonomous duck & pop animation cycle across the arches matching original HeroLineup
  useEffect(() => {
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * HERO_PUPPIES.length);

      // Duck down
      setDuckStates((prev) => ({ ...prev, [targetIdx]: 'duck' }));

      // Pop back up
      setTimeout(() => {
        setDuckStates((prev) => ({ ...prev, [targetIdx]: 'pop' }));

        setTimeout(() => {
          setDuckStates((prev) => ({ ...prev, [targetIdx]: 'normal' }));
        }, 600);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-hero min-h-screen pt-24 md:pt-28 pb-0 relative overflow-hidden flex flex-col justify-between"
      style={{
        ['--sky-top' as string]: '#FFFDF9',
        ['--sky-bottom' as string]: '#FAF5EE',
        ['--quilt' as string]: '#FAF5EE',
      }}
      aria-labelledby="hero-title"
    >
      {/* Radiant ambient morning sun in the sky */}
      <span aria-hidden="true" className="tp-hero__sun" />

      {/* Main Hero Header & Copy */}
      <div className="tp-hero__copy gutter relative z-20 text-center mx-auto max-w-4xl px-4">
        <p className="tp-hero__note font-scrawl text-2xl md:text-3xl text-[#4A2619] font-bold mb-2 relative inline-block">
          every puppy is family
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-[#c2622b] pointer-events-none"
            aria-hidden="true"
          >
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>

        <h1 id="hero-title" className="tp-hero__title font-plush text-5xl sm:text-6xl md:text-7xl font-bold text-[#2a170e] leading-[1.08] mt-4 mb-4 tracking-tight">
          <span className="block">Premium teacup</span>
          <span className="block">puppies in Dubai</span>
        </h1>

        <p className="tp-hero__lede text-[#4a2619]/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* Action CTAs */}
        <div className="tp-hero__actions flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/puppies"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#8b4513] px-8 text-base font-semibold text-white shadow-lg transition-transform hover:bg-[#70360f] hover:scale-105 active:scale-95"
          >
            View available puppies
          </Link>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#2a170e] bg-white px-7 text-base font-semibold text-[#2a170e] shadow-sm transition-transform hover:bg-[#FAF5EE] hover:scale-105 active:scale-95"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* 7 Arched Hero Peepholes: 3 on left, Center Teddy peeking over quilt, 3 on right */}
      <div className="tp-hero__stage">
        <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
          {HERO_PUPPIES.map((pup) => {
            const duckState = duckStates[pup.index] || 'normal';

            return (
              <li
                key={pup.slug}
                className="tp-lineup__seat"
                style={{
                  ['--x' as string]: SEAT_GEOMETRY[pup.index].x,
                  ['--w' as string]: SEAT_GEOMETRY[pup.index].w,
                  ['--peek' as string]: SEAT_GEOMETRY[pup.index].peek,
                  ['--tilt' as string]: SEAT_GEOMETRY[pup.index].tilt,
                  ['--tag-x' as string]: SEAT_GEOMETRY[pup.index].tagX,
                  ['--i' as string]: pup.index,
                }}
              >
                {/* Floating breed badge pill when hovered */}
                <span className="tp-lineup__name font-scrawl">
                  {pup.breed}
                </span>

                <button
                  type="button"
                  className="tp-lineup__pup w-full border-none bg-transparent p-0 outline-none text-left cursor-pointer"
                  onClick={() => setSelectedPup(pup)}
                  aria-label={`Meet ${pup.name}, ${pup.breed}`}
                >
                  <span
                    className={`tp-lineup__photo transition-all duration-300 ${
                      duckState === 'duck'
                        ? 'translate-y-[110%] opacity-40'
                        : duckState === 'pop'
                        ? '-translate-y-2 scale-105 opacity-100'
                        : ''
                    }`}
                    style={{ backgroundColor: pup.bgColor }}
                  >
                    <Image
                      src={pup.fallbackImage || pup.image}
                      alt={pup.name}
                      fill
                      sizes="14rem"
                      priority
                      className="object-cover"
                      style={{ objectPosition: pup.objectPosition }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Center 4th Arch: TEDDY PEEKING OVER THE SCALLOPED QUILT */}
        <div
          data-pup-stop="true"
          data-pose="peek"
          data-facing="right"
          data-act="peekaboo"
          data-behind="true"
          data-lane="true"
          className="pup-stop tp-hero__teddy"
        >
          <PupBuddy
            pose="peek"
            facing="right"
            size="100%"
            label="Teddy, the TeddyPups puppy, peeking over the quilt"
          />
        </div>

        {/* Scalloped Cross-Hatch Quilt Edge across the bottom */}
        <div aria-hidden="true" className="tp-quilt">
          <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#FAF5EE" />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>

      {/* Interactive Puppy Popup Modal when an image is clicked */}
      {selectedPup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pup-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPup(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md bg-[#FAF5EE] rounded-3xl border-3 border-[#2a170e] p-6 shadow-2xl animate-pop text-[#2a170e]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedPup(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2a170e] text-[#FAF5EE] flex items-center justify-center font-bold text-sm shadow-md hover:bg-[#70360f] transition-colors"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {/* Puppy Arched Photo Container */}
            <div className="relative w-full aspect-[4/4.8] rounded-t-full border-3 border-[#2a170e] overflow-hidden mb-4 shadow-inner" style={{ backgroundColor: selectedPup.bgColor }}>
              <Image
                src={selectedPup.fallbackImage || selectedPup.image}
                alt={selectedPup.name}
                fill
                sizes="380px"
                priority
                className="object-cover"
                style={{ objectPosition: selectedPup.objectPosition }}
              />
            </div>

            {/* Info */}
            <div className="text-center">
              <span className="font-scrawl text-sm text-[#8b4513] font-semibold block mb-0.5">
                {selectedPup.gender} • {selectedPup.age}
              </span>
              <h3 id="pup-modal-title" className="font-plush text-3xl font-bold text-[#2a170e]">
                {selectedPup.name}
              </h3>
              <p className="font-scrawl text-base text-[#c2622b] font-bold mt-0.5 mb-2">
                {selectedPup.breed}
              </p>
              <p className="text-sm text-[#4a2619]/80 leading-relaxed mb-4">
                {selectedPup.description}
              </p>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#4a2619]/70 mb-5 font-medium">
                <span>📍</span>
                <span>{selectedPup.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20meet%20${encodeURIComponent(selectedPup.name)}%20(${encodeURIComponent(selectedPup.breed)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1f7a4d] px-5 text-sm font-bold text-white shadow-md hover:bg-[#18603c] transition-colors active:scale-95"
                >
                  <span>Chat on WhatsApp</span>
                  <span>🐾</span>
                </a>
                <Link
                  href={`/puppies/${selectedPup.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-[#2a170e] px-5 text-sm font-bold text-[#2a170e] hover:bg-white transition-colors active:scale-95"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
