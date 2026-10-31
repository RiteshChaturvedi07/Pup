'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PUPPIES } from '@/data/puppies';
import { PupStop } from '@/components/pup/PupStop';

export function MeetPupsScene() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-meet py-24 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#fff1d8',
        ['--sky-bottom' as string]: '#fbe3b4',
      }}
      aria-labelledby="meet-title"
    >
      <div className="gutter mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
              knock knock 🚪
            </span>
            <h2
              id="meet-title"
              className="font-plush text-huge font-bold text-cocoa"
            >
              Meet the pups
            </h2>
            <p className="mt-2 text-cocoa/80 text-base md:text-lg max-w-xl">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Scroll navigation arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cocoa bg-milk text-cocoa shadow-sm transition-all hover:bg-honey-soft active:scale-95"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cocoa bg-milk text-cocoa shadow-sm transition-all hover:bg-honey-soft active:scale-95"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>

            <Link
              href="/puppies"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft hover:shadow-lg active:scale-95"
            >
              <span>See all available puppies</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 15 Doors Horizontal Corridor */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PUPPIES.map((pup, idx) => (
            <div
              key={pup.id}
              className="snap-start flex-shrink-0 w-[260px] sm:w-[290px]"
            >
              <Link
                href={`/puppies/${pup.slug}`}
                className="group relative block rounded-t-[7rem] rounded-b-3xl border-3 border-cocoa bg-milk p-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Swinging "Available" tag */}
                <div className="absolute -top-3 right-6 z-20 origin-top rotate-[-6deg] transition-transform group-hover:rotate-[8deg]">
                  <span className="font-scrawl rounded-full bg-honey px-3 py-0.5 text-xs font-bold text-cocoa shadow-sm border border-cocoa/30">
                    {pup.tag || 'Available'}
                  </span>
                </div>

                {/* Door Frame & Puppy Room */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[6rem] rounded-b-2xl border-2 border-cocoa/30"
                  style={{ backgroundColor: pup.bgColor }}
                >
                  {/* Inside Room Image */}
                  <Image
                    src={pup.image || pup.fallbackImage}
                    alt={pup.alt}
                    fill
                    sizes="290px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: pup.objectPosition }}
                  />

                  {/* Video Badge */}
                  {pup.hasVideo && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-cocoa/80 px-2.5 py-1 text-[0.65rem] font-bold text-milk backdrop-blur-sm">
                      <span className="text-honey">▶</span>
                      <span>VIDEO</span>
                    </div>
                  )}

                  {/* Origin Badge */}
                  <div className="absolute bottom-3 left-3 z-10 rounded-full bg-milk/90 px-2.5 py-0.5 text-[0.7rem] font-semibold text-cocoa shadow-sm">
                    {pup.origin === 'imported' ? '✈️ Korea' : '📍 Dubai'}
                  </div>

                  {/* Brass Door Peephole (fades out on hover) */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-honey bg-milk/60 backdrop-blur-sm flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <div className="w-2.5 h-2.5 rounded-full bg-cocoa" />
                  </div>
                </div>

                {/* Door Info Footer */}
                <div className="p-3 text-center">
                  <h3 className="font-plush text-xl font-bold text-cocoa group-hover:text-toffee transition-colors">
                    {pup.name}
                  </h3>
                  <p className="font-scrawl text-xs text-cocoa/75 mt-0.5">
                    {pup.metaText}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {/* 16th Door: "Meet them all" door */}
          <div className="snap-start flex-shrink-0 w-[260px] sm:w-[290px] flex items-stretch">
            <Link
              href="/puppies"
              className="group flex flex-1 flex-col items-center justify-center rounded-t-[7rem] rounded-b-3xl border-3 border-dashed border-cocoa/40 bg-milk/40 p-6 text-center transition-all hover:bg-milk hover:border-solid hover:border-cocoa hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-honey text-3xl shadow-sm transition-transform group-hover:scale-110">
                🐾
              </div>
              <h3 className="mt-5 font-plush text-2xl font-bold text-cocoa">
                Meet them all
              </h3>
              <p className="mt-2 font-scrawl text-sm text-cocoa/70 max-w-[180px]">
                Explore our full family of teacup puppies & find your match!
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-cocoa px-5 py-2 text-xs font-semibold text-milk transition-transform group-hover:translate-x-1">
                <span>View all</span>
                <span>→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Floor with mascot anchor */}
        <div className="relative mt-4">
          <div aria-hidden="true" className="tp-meet__floor h-4 w-full bg-[#f2be6b]/20 border-t-2 border-[#2a170e]/20" />
          <PupStop
            id="meet"
            pose="run"
            facing="right"
            act="treadmill"
            className="tp-meet__teddy"
          />
        </div>
      </div>
    </section>
  );
}
