'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PupStop } from '@/components/pup/PupStop';
import { PupBuddy } from '@/components/pup/PupBuddy';
import { MAIN_TESTIMONIAL, POLAROIDS } from '@/data/families';

export function HappyFamiliesScene() {
  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk py-24 relative overflow-hidden text-milk"
      style={{
        ['--sky-top' as string]: '#7a3616',
        ['--sky-bottom' as string]: '#4a2311',
      }}
      aria-labelledby="dusk-title"
    >
      {/* Decorative setting sun radiance */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-honey to-transparent opacity-20 blur-2xl pointer-events-none" />

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
          <p className="mt-3 text-milk/85 text-base md:text-lg leading-relaxed">
            We are truly honored to see our puppies become cherished members of loving families. These moments have been shared by our clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>

        {/* Featured Testimonial (Sarah M., Dubai) */}
        <div className="max-w-3xl mx-auto mb-16 rounded-3xl border-2 border-honey/30 bg-[#2f1a10]/75 backdrop-blur-md p-8 sm:p-10 shadow-xl text-center relative group">
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

        {/* Scattered Polaroids with corner tape overlays & hover elevation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {POLAROIDS.map((p) => (
            <div
              key={p.id}
              className="group relative cursor-pointer"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Polaroid Frame: hover elevation scale(1.04), box-shadow: 0 20px 30px rgba(0,0,0,0.18) */}
              <div
                className="relative rounded-xl border border-cocoa/20 bg-milk p-3 pb-5 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.04] group-hover:rotate-0 group-hover:-translate-y-1.5 select-none"
                style={{
                  transform: `rotate(${p.tilt})`,
                  willChange: 'transform, box-shadow',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.14)',
                }}
              >
                {/* Washi Tape Overlay on top edge/corner */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-5 w-16 rounded-xs z-20 opacity-90 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: p.tapeColor,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />

                {/* Corner Sticker Accent */}
                <div className="absolute top-2 right-2 z-10 text-[0.65rem] opacity-75 group-hover:opacity-100 transition-opacity">
                  🤍
                </div>

                {/* Polaroid Photo Aspect Square */}
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-lg"
                  style={{ backgroundColor: p.bgColor }}
                >
                  <Image
                    src={p.image || p.fallbackImage}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Handwritten Caption */}
                <div className="mt-3.5 text-center">
                  <span className="font-scrawl text-xs sm:text-sm font-bold text-cocoa block tracking-tight group-hover:text-toffee transition-colors">
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
        <div className="text-center mt-12 relative">
          <Link
            href="/happy-families"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-honey bg-honey/10 px-8 font-semibold text-honey transition-all hover:bg-honey hover:text-cocoa active:scale-95 shadow-sm"
          >
            <span>View all happy families</span>
            <span>→</span>
          </Link>
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-dusk__teddy"
          >
            <PupBuddy
              pose="sit"
              facing="right"
              size={165}
              label="Teddy sitting in the sunset dusk"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
