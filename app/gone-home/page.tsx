import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PUPPIES } from '@/data/puppies';

export default function GoneHomePage() {
  // Use a subset of puppies to display past adopted pets
  const adoptedPuppies = PUPPIES.slice(6, 14);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            cherished memories 🐾
          </span>
          <h1 className="font-plush text-huge font-bold text-cocoa">
            Gone home
          </h1>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            These precious teacup puppies have already found their loving families across the UAE. We celebrate every adoption!
          </p>
        </div>

        {/* Adopted Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adoptedPuppies.map((pup) => (
            <div
              key={pup.id}
              className="relative flex flex-col rounded-3xl border-2 border-cocoa/40 bg-milk/70 p-3 shadow-sm grayscale-[25%] hover:grayscale-0 transition-all hover:shadow-md hover:-translate-y-1"
            >
              {/* Gone home badge */}
              <div className="absolute top-2 right-4 z-20">
                <span className="font-scrawl rounded-full bg-cocoa px-3 py-0.5 text-xs font-bold text-milk shadow-sm">
                  Gone Home 🤍
                </span>
              </div>

              {/* Photo */}
              <div
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-cocoa/10"
                style={{ backgroundColor: pup.bgColor }}
              >
                <Image
                  src={pup.image || pup.fallbackImage}
                  alt={pup.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: pup.objectPosition }}
                />
              </div>

              {/* Details */}
              <div className="p-3 text-center">
                <h3 className="font-plush text-xl font-bold text-cocoa">
                  {pup.name}
                </h3>
                <p className="font-scrawl text-xs text-cocoa/70 mt-0.5">
                  {pup.breedLabel} • Happily adopted in Dubai
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View available puppies CTA */}
        <div className="mt-20 text-center rounded-3xl border-2 border-honey/40 bg-honey-soft/20 p-10 max-w-2xl mx-auto">
          <h2 className="font-plush text-2xl font-bold text-cocoa">
            Looking for an available puppy?
          </h2>
          <p className="mt-2 text-sm text-cocoa/80">
            We currently have lovely teacup Maltipoos, Pomeranians, and Poodles waiting for you in our showroom.
          </p>
          <div className="mt-6">
            <Link
              href="/puppies"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-7 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
            >
              <span>Explore available puppies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
