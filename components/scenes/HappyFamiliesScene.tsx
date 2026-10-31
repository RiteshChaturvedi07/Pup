'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PupStop } from '@/components/pup/PupStop';
import { MAIN_TESTIMONIAL, POLAROIDS } from '@/data/families';

export function HappyFamiliesScene() {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk py-24 relative overflow-hidden text-milk"
      style={{
        ['--sky-top' as string]: '#a65a30',
        ['--sky-bottom' as string]: '#4d2b19',
      }}
      aria-labelledby="dusk-title"
    >
      {/* Decorative setting sun */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-honey to-transparent opacity-25 blur-xl pointer-events-none" />

      <div className="gutter mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-scrawl text-honey text-lg font-medium block mb-1">
            heartwarming moments 🌅
          </span>
          <div className="relative inline-block">
            <h2
              id="dusk-title"
              className="font-plush text-huge font-bold text-milk"
            >
              Happy families & puppies
            </h2>
            <PupStop
              id="dusk"
              pose="sit"
              facing="right"
              className="tp-dusk__teddy absolute -bottom-2 -right-8"
            />
          </div>
          <p className="mt-3 text-milk/80 text-base md:text-lg leading-relaxed">
            We are truly honored to see our puppies become cherished members of loving families. These moments have been shared by our clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>

        {/* Featured Testimonial (Sarah M., Dubai) */}
        <div className="max-w-3xl mx-auto mb-16 rounded-3xl border-2 border-honey/30 bg-[#2f1a10]/60 backdrop-blur-md p-8 sm:p-10 shadow-xl text-center relative">
          <span className="font-plush text-5xl text-honey/40 absolute top-4 left-6 leading-none">
            “
          </span>
          <p className="font-plush text-lg sm:text-xl text-milk font-normal leading-relaxed italic relative z-10">
            {MAIN_TESTIMONIAL.quote}
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="font-plush font-bold text-honey text-base">
              {MAIN_TESTIMONIAL.author}
            </span>
            <span className="font-scrawl text-xs text-milk/70">
              {MAIN_TESTIMONIAL.location} • Maltipoo Family
            </span>
          </div>
        </div>

        {/* 8 Tilted Polaroids Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {POLAROIDS.map((p) => (
            <div
              key={p.id}
              className="group relative transition-transform duration-300 hover:scale-105 hover:z-20"
              style={{ transform: `rotate(${p.tilt})` }}
            >
              {/* Washi Tape Badge */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-14 rounded-sm shadow-sm z-20 opacity-90"
                style={{ backgroundColor: p.tapeColor }}
              />

              {/* Polaroid Frame */}
              <div className="rounded-xl border border-cocoa/20 bg-milk p-3 pb-4 shadow-xl">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-lg"
                  style={{ backgroundColor: p.bgColor }}
                >
                  <Image
                    src={p.image || p.fallbackImage}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="mt-3 text-center">
                  <span className="font-scrawl text-xs sm:text-sm font-semibold text-cocoa block">
                    {p.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Polaroid wall mascot anchor */}
        <div className="flex justify-center -mt-2 mb-8">
          <PupStop
            id="polaroids"
            pose="sit"
            facing="right"
            act="wall"
            className="tp-polaroids__teddy"
          />
        </div>

        {/* CTA to full happy families gallery */}
        <div className="text-center mt-12">
          <Link
            href="/happy-families"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-honey bg-honey/10 px-8 font-semibold text-honey transition-all hover:bg-honey hover:text-cocoa active:scale-95 shadow-sm"
          >
            <span>View all happy families</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
