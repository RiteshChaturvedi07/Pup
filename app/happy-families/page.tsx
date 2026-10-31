import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MAIN_TESTIMONIAL, POLAROIDS } from '@/data/families';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function HappyFamiliesPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            our growing teddy community 💕
          </span>
          <h1 className="font-plush text-huge font-bold text-cocoa">
            Happy families & puppies
          </h1>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            Heartwarming moments shared by our wonderful puppy parents across Dubai, Abu Dhabi, and around the world.
          </p>
        </div>

        {/* Featured Testimonial Quote */}
        <div className="max-w-4xl mx-auto mb-20 rounded-3xl border-3 border-cocoa bg-[#fff9ef] p-8 sm:p-12 shadow-xl text-center relative">
          <span className="font-plush text-6xl text-honey absolute top-4 left-6 leading-none">“</span>
          <p className="font-plush text-xl sm:text-2xl text-cocoa font-normal leading-relaxed italic relative z-10">
            {MAIN_TESTIMONIAL.quote}
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="font-plush font-bold text-cocoa text-lg">
              {MAIN_TESTIMONIAL.author}
            </span>
            <span className="font-scrawl text-sm text-toffee font-medium">
              {MAIN_TESTIMONIAL.location} • Maltipoo Family
            </span>
          </div>
        </div>

        {/* Polaroids Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {POLAROIDS.map((p) => (
            <div
              key={p.id}
              className="group relative transition-transform duration-300 hover:scale-105 hover:z-20"
              style={{ transform: `rotate(${p.tilt})` }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-14 rounded-sm shadow-sm z-20 opacity-90"
                style={{ backgroundColor: p.tapeColor }}
              />

              <div className="rounded-2xl border-2 border-cocoa bg-milk p-3 pb-4 shadow-xl">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-xl"
                  style={{ backgroundColor: p.bgColor }}
                >
                  <Image
                    src={p.image || p.fallbackImage}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="font-scrawl text-sm font-semibold text-cocoa block">
                    {p.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share your story CTA */}
        <div className="mt-24 text-center rounded-3xl border-2 border-cocoa/20 bg-honey-soft/30 p-10 max-w-3xl mx-auto">
          <h2 className="font-plush text-2xl font-bold text-cocoa">
            Are you already part of the TeddyPups family?
          </h2>
          <p className="mt-2 text-cocoa/80 text-sm font-medium">
            Tag us @teddypups.worldwide on Instagram to have your puppy featured in our happy families gallery!
          </p>
          <div className="mt-6">
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
            >
              <span>Visit Instagram</span>
              <span>📸</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
