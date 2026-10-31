import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/mascot/Mascot';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-milk flex items-center justify-center">
      <div className="gutter mx-auto max-w-xl text-center">
        <Mascot
          pose="tilt"
          facing="right"
          size={180}
          showBubble={true}
          bubbleText="Where did it go? 🐾"
          className="mx-auto mb-6"
        />

        <span className="font-scrawl text-toffee text-lg font-bold block mb-1">
          page not found • 404
        </span>

        <h1 className="font-plush text-4xl sm:text-5xl font-bold text-cocoa">
          Oops! This pup wandered off...
        </h1>

        <p className="mt-3 text-cocoa/80 text-base leading-relaxed">
          The page you are looking for might have been moved or doesn&apos;t exist. Let&apos;s guide you back to our loving puppy nursery!
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cocoa px-7 font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
          >
            Return to Homepage
          </Link>
          <Link
            href="/puppies"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-cocoa bg-milk px-7 font-semibold text-cocoa shadow-sm transition-all hover:bg-honey-soft/50 active:scale-95"
          >
            Meet Available Puppies
          </Link>
        </div>
      </div>
    </div>
  );
}
