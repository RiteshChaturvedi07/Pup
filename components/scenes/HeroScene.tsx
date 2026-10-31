'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/siteConfig';
import { HeroMascot } from '@/components/pup/HeroMascot';

interface HeroPupItem {
  index: number;
  name: string;
  breed: string;
  slug: string;
  x: string;
  w: string;
  peek: number;
  tilt: string;
  image: string;
  fallbackImage: string;
  bgColor: string;
  objectPosition: string;
  tagX: string;
  description: string;
  location: string;
  age: string;
  gender: string;
}

const HERO_PUPPIES: HeroPupItem[] = [
  {
    index: 0,
    name: 'Max',
    breed: 'Maltipoo',
    slug: 'maltipoo-max-male',
    x: '9%',
    w: '8.6rem',
    peek: 0.62,
    tilt: '-5deg',
    image: '/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    fallbackImage: '/media/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.jpeg',
    bgColor: '#785838',
    objectPosition: '53.8% 44.3%',
    tagX: '-22%',
    description: 'Playful apricot Maltipoo with a sweet teddy bear face and gentle temperament.',
    location: 'Downtown Dubai Showroom',
    age: '3 months',
    gender: 'Boy',
  },
  {
    index: 1,
    name: 'Korean Teacup Poodle',
    breed: 'Korean Teacup Poodle',
    slug: 'korean-teacup-poodle-female',
    x: '22.5%',
    w: '10.4rem',
    peek: 0.8,
    tilt: '3deg',
    image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    fallbackImage: '/media/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpeg',
    bgColor: '#f8d8b8',
    objectPosition: '54.5% 45.7%',
    tagX: '-30%',
    description: 'Pocket-sized apricot teacup poodle with hypoallergenic coat and bright glassy eyes.',
    location: 'Seoul / VIP Dubai Delivery',
    age: '2 months',
    gender: 'Girl',
  },
  {
    index: 2,
    name: 'Copper',
    breed: 'Cavapoo',
    slug: 'copper-male',
    x: '35%',
    w: '9.2rem',
    peek: 0.7,
    tilt: '-2deg',
    image: '/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
    fallbackImage: '/media/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpeg',
    bgColor: '#e8d8c8',
    objectPosition: '43% 50.5%',
    tagX: '-50%',
    description: 'Irresistible ruby red teacup Cavapoo with affectionate and cuddly nature.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Boy',
  },
  {
    index: 3,
    name: 'Korean Teacup Pomeranian',
    breed: 'Korean Teacup Pomeranian',
    slug: 'korean-teacup-pomeranian',
    x: '65%',
    w: '9.4rem',
    peek: 0.74,
    tilt: '3deg',
    image: '/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg',
    fallbackImage: '/media/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpeg',
    bgColor: '#484848',
    objectPosition: '49.9% 48.6%',
    tagX: '-50%',
    description: 'Ultra fluffy teacup Pomeranian with short bear snout and thick snowy-soft coat.',
    location: 'Seoul / VIP Dubai Delivery',
    age: '2 months',
    gender: 'Girl',
  },
  {
    index: 4,
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    slug: 'toy-poodle-male-female',
    x: '77.5%',
    w: '10.6rem',
    peek: 0.82,
    tilt: '-3deg',
    image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    fallbackImage: '/media/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpeg',
    bgColor: '#c8c8c8',
    objectPosition: '65.4% 44.7%',
    tagX: '-70%',
    description: 'Charming apricot toy poodle pair, joyful and full of playful spirit.',
    location: 'Downtown Dubai Showroom',
    age: '2 months',
    gender: 'Boy & Girl',
  },
  {
    index: 5,
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-female-2',
    x: '91%',
    w: '8.4rem',
    peek: 0.6,
    tilt: '4deg',
    image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
    fallbackImage: '/media/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpeg',
    bgColor: '#080808',
    objectPosition: '64.6% 42.3%',
    tagX: '-78%',
    description: 'Sweet miniature female Maltipoo looking for her loving forever family.',
    location: 'Downtown Dubai Showroom',
    age: '3 months',
    gender: 'Girl',
  },
];

export function HeroScene() {
  const [activePupIndex, setActivePupIndex] = useState<number | null>(3); // start on Korean Teacup Pomeranian
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [selectedPup, setSelectedPup] = useState<HeroPupItem | null>(null);

  // Auto-cycle speech bubble across puppy windows when idle
  useEffect(() => {
    if (isUserInteracting) return;

    const timer = setInterval(() => {
      setActivePupIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % HERO_PUPPIES.length;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [isUserInteracting]);

  // Click on a puppy image to pop it up and show modal with name written
  const handlePupClick = (pup: HeroPupItem) => {
    setIsUserInteracting(true);
    setActivePupIndex(pup.index);
    setSelectedPup(pup);
  };

  const handlePupHover = (index: number | null) => {
    if (index !== null) {
      setIsUserInteracting(true);
      setActivePupIndex(index);
    } else {
      // resume idle cycle after 3.5s
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 3500);
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-hero min-h-screen pt-24 md:pt-28 pb-0 relative overflow-hidden flex flex-col justify-between"
      style={{
        ['--sky-top' as string]: '#fffdf8',
        ['--sky-bottom' as string]: '#fff1d8',
        ['--quilt' as string]: '#fff1d8',
      }}
      aria-labelledby="hero-title"
    >
      {/* Radiant ambient morning sun in the sky */}
      <span aria-hidden="true" className="tp-hero__sun" />

      {/* Main Hero Header & Copy */}
      <div className="tp-hero__copy gutter">
        <p className="tp-hero__note font-scrawl">
          every puppy is family
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-toffee pointer-events-none"
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

        <h1 id="hero-title" className="tp-hero__title font-plush">
          <span className="tp-hero__line">Premium teacup</span>
          <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
        </h1>

        <p className="tp-hero__lede font-normal">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* Action CTAs */}
        <div className="tp-hero__actions">
          <Link href="/puppies" className="btn btn-primary">
            View available puppies
          </Link>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Hero Stage: 6 Arched Puppy Windows + Mascot Peeking Behind Quilt */}
      <div className="tp-hero__stage">
        {/* Puppy Windows Lineup */}
        <ul className="tp-lineup" aria-label="Puppies in our showroom">
          {HERO_PUPPIES.map((pup) => {
            const isActive = activePupIndex === pup.index;
            return (
              <li
                key={pup.slug}
                className="tp-lineup__seat"
                style={{
                  ['--x' as string]: pup.x,
                  ['--w' as string]: pup.w,
                  ['--peek' as string]: pup.peek,
                  ['--tilt' as string]: pup.tilt,
                  ['--i' as string]: pup.index,
                  ['--tag-x' as string]: pup.tagX,
                }}
                data-active={isActive ? 'true' : 'false'}
              >
                {/* Speech Bubble showing puppy's name with tail pointer */}
                <div
                  className={`pup-bubble-tag font-scrawl ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transformOrigin: '50% 100%',
                  }}
                >
                  {pup.name}
                </div>

                {/* Arched Puppy Photo Button */}
                <button
                  type="button"
                  className="tp-lineup__pup w-full text-left focus:outline-none"
                  aria-label={`Meet ${pup.name}, ${pup.breed}`}
                  onClick={() => handlePupClick(pup)}
                  onPointerEnter={() => handlePupHover(pup.index)}
                  onPointerLeave={() => handlePupHover(null)}
                >
                  <span
                    className="tp-lineup__photo"
                    style={{ backgroundColor: pup.bgColor }}
                  >
                    <Image
                      src={pup.fallbackImage || pup.image}
                      alt={pup.name}
                      fill
                      sizes="11rem"
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

        {/* Mascot Teddy in center peeking over the quilt */}
        <div className="tp-hero__teddy">
          <HeroMascot
            activePupIndex={activePupIndex}
            onMascotClick={() => setIsUserInteracting(true)}
          />
        </div>

        {/* Scalloped Cross-Hatch Quilt Edge across the bottom */}
        <div aria-hidden="true" className="tp-quilt">
          <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
            <defs>
              <pattern id="tp-hero-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fff1d8" />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity="0.42"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-hero-scallop)" />
          </svg>
        </div>
      </div>

      {/* Interactive Puppy Popup Modal when an image is clicked */}
      {selectedPup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pup-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPup(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md bg-milk rounded-3xl border-3 border-cocoa p-6 shadow-2xl animate-pop text-cocoa"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 16px 36px rgba(42, 23, 14, 0.28)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedPup(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 size-9 rounded-full bg-honey-soft/80 border-2 border-cocoa text-cocoa font-bold flex items-center justify-center hover:bg-cocoa hover:text-milk transition-colors"
            >
              ✕
            </button>

            {/* Puppy Arch Photo Preview */}
            <div className="flex justify-center -mt-2">
              <div
                className="relative w-44 h-56 rounded-t-full rounded-b-2xl border-3 border-cocoa overflow-hidden shadow-md"
                style={{ backgroundColor: selectedPup.bgColor }}
              >
                <Image
                  src={selectedPup.fallbackImage || selectedPup.image}
                  alt={selectedPup.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: selectedPup.objectPosition }}
                />
              </div>
            </div>

            {/* Details Content */}
            <div className="mt-4 text-center">
              <span className="font-scrawl text-toffee text-base font-semibold">
                meet our puppy
              </span>
              <h2 id="pup-modal-title" className="font-plush text-2xl font-bold text-cocoa mt-0.5">
                {selectedPup.name}
              </h2>
              <p className="text-sm font-semibold text-cocoa/70 mt-1">
                {selectedPup.breed} • {selectedPup.gender} • {selectedPup.age}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-honey-soft border border-honey text-xs font-medium text-cocoa">
                <span>📍</span>
                <span>{selectedPup.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-cocoa/85 mt-3 leading-relaxed">
                {selectedPup.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20interested%20in%20meeting%20${encodeURIComponent(
                    selectedPup.name
                  )}%20(${encodeURIComponent(selectedPup.breed)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-sm py-2 px-5"
                >
                  Enquire on WhatsApp
                </a>
                <Link
                  href={`/puppies/${selectedPup.slug}`}
                  className="btn btn-ghost text-sm py-2 px-5"
                  onClick={() => setSelectedPup(null)}
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
