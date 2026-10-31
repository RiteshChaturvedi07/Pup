'use client';

import React from 'react';
import { PupStop } from '@/components/pup/PupStop';

export function PassportScene() {
  const trustPoints = [
    {
      id: 1,
      title: 'Vet-checked & healthy',
      description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate from licensed veterinary surgeons.',
      badge: 'VERIFIED HEALTH',
      icon: '🩺',
    },
    {
      id: 2,
      title: 'Korea to Dubai, safely',
      description: 'Trusted ethical breeders, safe climate-controlled flight travel, and premium care from start to finish.',
      badge: 'VIP TRAVEL CARE',
      icon: '✈️',
    },
    {
      id: 3,
      title: 'Support 24/7',
      description: 'Always here to help, from choosing your puppy to post-delivery nutrition, training, and veterinary support.',
      badge: '24/7 CONCIERGE',
      icon: '💬',
    },
    {
      id: 4,
      title: 'Trusted by families worldwide',
      description: 'Puppies delivered to loving celebrity and royal homes all around the UAE and worldwide with impeccable pedigree.',
      badge: 'GLOBAL TRUST',
      icon: '🌍',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport py-24 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#f0b866',
        ['--sky-bottom' as string]: '#a65a30',
      }}
      aria-labelledby="trust-title"
    >
      <div className="gutter mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-milk text-lg font-medium block mb-1">
            puppy passport 🛂
          </span>
          <h2
            id="trust-title"
            className="font-plush text-huge font-bold text-milk"
          >
            Why families trust TeddyPups
          </h2>
          <p className="mt-3 text-milk/85 text-base md:text-lg">
            Our gold standard guarantees complete peace of mind with verifiable health documentation and ongoing family care.
          </p>
        </div>

        {/* Passport Booklet Card */}
        <div className="max-w-5xl mx-auto rounded-[3rem] border-4 border-cocoa bg-[#fff9ef] p-6 sm:p-12 shadow-2xl relative">
          <PupStop
            id="passport"
            pose="sit"
            facing="right"
            act="book"
            className="tp-book__teddy"
          />
          {/* Passport Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b-2 border-dashed border-cocoa/20 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cocoa text-honey text-2xl font-bold">
                🐾
              </div>
              <div>
                <span className="font-plush text-xl font-bold text-cocoa block">
                  Official Puppy Passport & Quality Guarantee
                </span>
                <span className="font-scrawl text-xs text-toffee">
                  Issued by TeddyPups U.A.E. • Downtown Dubai
                </span>
              </div>
            </div>

            <div className="rounded-full border-2 border-toffee bg-milk px-4 py-1 text-xs font-bold text-toffee uppercase tracking-wider">
              Dubai Showroom Certified
            </div>
          </div>

          {/* 4 Stamped Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-8">
            {trustPoints.map((point) => (
              <div
                key={point.id}
                className="relative rounded-3xl border-2 border-cocoa/20 bg-milk p-6 shadow-sm transition-all hover:border-toffee hover:shadow-md"
              >
                {/* Golden Stamp Seal in Corner */}
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-honey bg-honey/20 text-honey-deep text-xs font-bold">
                  ✓
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{point.icon}</span>
                  <span className="rounded-md bg-honey-soft/50 px-2 py-0.5 text-[0.65rem] font-bold text-cocoa uppercase tracking-wider">
                    {point.badge}
                  </span>
                </div>

                <h3 className="font-plush text-xl font-bold text-cocoa">
                  {point.title}
                </h3>

                <p className="mt-2 text-cocoa/80 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
