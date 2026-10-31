'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function TwoWaysScene() {
  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-paths py-24 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#fbe3b4',
        ['--sky-bottom' as string]: '#f7d18d',
      }}
      aria-labelledby="paths-title"
    >
      <div className="gutter mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            choose your path 🌿
          </span>
          <h2
            id="paths-title"
            className="font-plush text-huge font-bold text-cocoa"
          >
            Two ways to meet your puppy
          </h2>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            Whether you want to visit our Downtown Dubai showroom today or reserve a rare teacup puppy from Korea, we guide you every step.
          </p>
        </div>

        {/* 2 Ways Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Way 1: Local Dubai Showroom */}
          <div className="relative flex flex-col justify-between rounded-3xl border-3 border-cocoa bg-milk/90 p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-honey/40 px-3.5 py-1 text-xs font-bold text-cocoa mb-4">
                <span>📍</span>
                <span>Downtown Dubai</span>
              </div>
              <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa">
                Puppies in Dubai
              </h3>
              <p className="font-scrawl text-sm text-toffee mt-1 font-semibold">
                In our showroom
              </p>
              <p className="mt-4 text-cocoa/80 leading-relaxed text-sm sm:text-base">
                See them, love them, take them home. Come meet our locally available puppies before you decide. Spend quiet bonding time in a stress-free setting.
              </p>

              {/* Visual preview */}
              <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20">
                <Image
                  src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpeg"
                  alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 rounded-full bg-milk/90 px-3 py-1 text-xs font-bold text-cocoa shadow-sm">
                  Ready today
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/puppies?origin=local"
                className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-full bg-cocoa font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
              >
                <span>Meet local puppies</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Way 2: Imported from Korea */}
          <div className="relative flex flex-col justify-between rounded-3xl border-3 border-cocoa bg-milk/90 p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky/50 px-3.5 py-1 text-xs font-bold text-sky-deep mb-4">
                <span>✈️</span>
                <span>Direct from Seoul</span>
              </div>
              <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa">
                Imported for you
              </h3>
              <p className="font-scrawl text-sm text-toffee mt-1 font-semibold">
                Exclusive Korean teacup puppies
              </p>
              <p className="mt-4 text-cocoa/80 leading-relaxed text-sm sm:text-base">
                Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import, permits, and climate-controlled flight.
              </p>

              {/* Visual preview with plane route illustration */}
              <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 bg-[#f9f3ea] p-4 flex flex-col justify-between">
                {/* Flight Route curve */}
                <svg viewBox="0 0 660 300" className="w-full h-full text-toffee" fill="none">
                  {/* Dotted flight line */}
                  <path
                    d="M 50 220 Q 330 30 590 180"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="10 8"
                  />
                  {/* Seoul Origin Point */}
                  <circle cx="50" cy="220" r="10" fill="#2a170e" />
                  <circle cx="50" cy="220" r="4" fill="#f2be6b" />
                  <text x="30" y="260" fill="#2a170e" className="font-plush text-lg font-bold">Seoul, KR</text>

                  {/* Dubai Destination Point */}
                  <circle cx="590" cy="180" r="10" fill="#2a170e" />
                  <circle cx="590" cy="180" r="4" fill="#f2be6b" />
                  <text x="540" y="225" fill="#2a170e" className="font-plush text-lg font-bold">Dubai, UAE</text>

                  {/* Cute Flying Plane icon */}
                  <g transform="translate(320, 95) rotate(-10)">
                    <text x="0" y="0" className="text-3xl">✈️</text>
                  </g>
                </svg>

                <div className="absolute top-3 right-3 rounded-full bg-milk/90 px-3 py-1 text-xs font-bold text-cocoa shadow-sm">
                  VIP Travel Care
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/puppies?origin=imported"
                className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-full bg-toffee font-semibold text-milk shadow-md transition-all hover:bg-toffee-deep active:scale-95"
              >
                <span>See imported puppies</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
