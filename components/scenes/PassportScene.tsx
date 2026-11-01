'use client';

import React from 'react';
import { PupStop } from '@/components/pup/PupStop';
import { PupBuddy } from '@/components/pup/PupBuddy';

export function PassportScene() {
  const trustPoints = [
    {
      id: 1,
      title: 'Vet-checked',
      subtitle: 'Vaccinated & microchipped',
      visaNumber: 'DXB-VET-9821',
      icon: '🩺',
      sealColor: 'border-[#a24a1a] text-[#8e3f15] bg-[#f9cdbf]/30',
      tilt: '-2deg',
    },
    {
      id: 2,
      title: 'Korea to Dubai Safely',
      subtitle: 'VIP climate flight care',
      visaNumber: 'ICN-DXB-7742',
      icon: '✈️',
      sealColor: 'border-[#c2622b] text-[#a24a1a] bg-[#fbe3b4]/40',
      tilt: '3deg',
    },
    {
      id: 3,
      title: 'Support 24/7',
      subtitle: 'Lifetime concierge care',
      visaNumber: 'CON-VIP-2407',
      icon: '💬',
      sealColor: 'border-[#c2622b] text-[#a24a1a] bg-[#fbe3b4]/40',
      tilt: '2deg',
    },
    {
      id: 4,
      title: 'Trusted worldwide',
      subtitle: 'Royal & VIP pedigrees',
      visaNumber: 'UAE-ROY-5501',
      icon: '🌍',
      sealColor: 'border-[#a24a1a] text-[#8e3f15] bg-[#f9cdbf]/30',
      tilt: '-3deg',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-passport py-24 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#e89a4b',
        ['--sky-bottom' as string]: '#7a3616',
      }}
      aria-labelledby="trust-title"
    >
      <div className="gutter mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-milk text-lg font-medium block mb-1">
            official passport 🛂
          </span>
          <h2
            id="trust-title"
            className="font-plush text-huge font-bold text-milk"
          >
            Why families trust TeddyPups
          </h2>
          <p className="mt-3 text-milk/90 text-base md:text-lg">
            Our gold standard guarantees complete peace of mind with verifiable health documentation, ethical breeding, and lifetime family care.
          </p>
        </div>

        {/* REALISTIC DUAL-PAGE VINTAGE OPEN PASSPORT BOOKLET */}
        <div className="max-w-5xl mx-auto relative select-none">
          {/* Teddy sitting beside the passport booklet */}
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-book__teddy"
          >
            <PupBuddy
              pose="sit"
              facing="right"
              size={170}
              label="Teddy sitting beside the passport"
            />
          </div>
          {/* Leather Outer Trim with Gold Stitching Detail */}
          <div className="rounded-[3rem] border-4 border-[#24130b] bg-[#3a1d10] p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(36,19,11,0.6)] relative overflow-hidden">
            {/* Gold foil perimeter stitching */}
            <div className="absolute inset-2 sm:inset-3 rounded-[2.6rem] border-2 border-dashed border-[#e4a352]/40 pointer-events-none" />

            {/* Gold Corner Embossments */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#e4a352] rounded-tl-xl pointer-events-none opacity-80" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#e4a352] rounded-tr-xl pointer-events-none opacity-80" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#e4a352] rounded-bl-xl pointer-events-none opacity-80" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#e4a352] rounded-br-xl pointer-events-none opacity-80" />

            {/* DUAL-PAGE BOOKLET INTERIOR */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-[2.3rem] overflow-hidden bg-[#fdfbf6] shadow-inner border border-[#2a170e]/20">
              {/* Security Paper Guilloche / Watermark Pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#2a170e 1.5px, transparent 1.5px), radial-gradient(#2a170e 1.5px, #fdfbf6 1.5px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              />

              {/* Center Book Spine Shadow & Stitched Crease */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-30">
                <div className="w-full h-full bg-gradient-to-r from-black/15 via-black/5 to-black/15" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-r border-dashed border-[#8b4e18]/40" />
              </div>

              {/* LEFT PAGE: "Puppy Passport" Headline, Official Badge, and Cartoon Stamp */}
              <div className="relative p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cocoa/15">
                <div>
                  {/* Headline */}
                  <div className="pb-4 border-b-2 border-dashed border-cocoa/20">
                    <span className="font-scrawl text-xs text-toffee font-bold tracking-widest uppercase block">
                      UNITED ARAB EMIRATES
                    </span>
                    <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa leading-tight mt-1">
                      Puppy Passport
                    </h3>
                    <p className="font-scrawl text-xs text-cocoa/70 mt-1">
                      Certified Official Companion Identity Document
                    </p>
                  </div>

                  {/* Official Metallic Gold Badge */}
                  <div className="my-6 p-4 rounded-2xl border-2 border-amber-800/20 bg-amber-50/80 relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#d49444] via-[#f9e099] to-[#d49444] p-1 shadow-md flex items-center justify-center flex-shrink-0 animate-pulse">
                        <div className="w-full h-full rounded-full bg-milk flex flex-col items-center justify-center border border-amber-800/40 text-center">
                          <span className="text-xl">🐾</span>
                          <span className="font-scrawl text-[0.55rem] font-bold text-amber-900 leading-none">OFFICIAL</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-plush text-base font-bold text-cocoa">
                          Dubai Showroom Certified
                        </h4>
                        <p className="font-scrawl text-xs text-cocoa/75 mt-0.5">
                          Authorized pedigree & ethical import guarantee registered in Dubai, UAE.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Playful Cartoon Rubber Stamp: "APPROVED FOR UAE CUDDLES" */}
                  <div className="my-4 p-3 rounded-2xl border-3 border-dashed border-[#a24a1a] bg-[#f9cdbf]/20 rotate-[-4deg] text-center shadow-xs">
                    <span className="font-scrawl text-xs font-bold text-[#a24a1a] uppercase tracking-widest block">
                      ★ APPROVED FOR UAE CUDDLES ★
                    </span>
                    <span className="text-[0.65rem] font-mono text-[#a24a1a]/80 block mt-0.5">
                      STAMP VALID FOR UNLIMITED HEAD PATS & BELLY RUBS
                    </span>
                  </div>
                </div>

                {/* Bottom Optical Machine Readable Zone */}
                <div className="pt-3 border-t-2 border-dashed border-cocoa/20 font-mono text-[0.6rem] text-cocoa/50 tracking-widest uppercase">
                  P&lt;UAETEDDYPUPS&lt;&lt;ROYAL&lt;TEACUP&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
                  2026982184UAE9803154M2811018&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
                </div>
              </div>

              {/* RIGHT PAGE: 2x2 Grid of Circular Embossed Gold/Terracotta Stamp Seals */}
              <div className="relative p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-cocoa/15">
                    <span className="font-scrawl text-xs font-bold text-toffee uppercase tracking-wider">
                      OFFICIAL EMBOSSED STAMP SEALS
                    </span>
                    <span className="text-xs text-cocoa/50 font-mono">Page 3 of 12</span>
                  </div>

                  {/* 2x2 Circular Stamp Seals Grid */}
                  <div className="grid grid-cols-2 gap-4 place-items-center py-2">
                    {trustPoints.map((point) => (
                      <div
                        key={point.id}
                        className={`group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border-3 border-dashed ${point.sealColor} p-2 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer select-none`}
                        style={{
                          transform: `rotate(${point.tilt})`,
                          boxShadow: '0 4px 14px rgba(42,23,14,0.08), inset 0 0 10px rgba(0,0,0,0.04)',
                        }}
                      >
                        {/* Inner Double Ring */}
                        <div className="absolute inset-1.5 rounded-full border border-current opacity-40 pointer-events-none" />

                        {/* Seal Icon */}
                        <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-xs transition-transform group-hover:scale-110">
                          {point.icon}
                        </span>

                        {/* Seal Title */}
                        <h4 className="font-plush text-xs sm:text-sm font-bold leading-tight px-1 text-cocoa">
                          {point.title}
                        </h4>

                        {/* Seal Subtitle */}
                        <p className="font-scrawl text-[0.6rem] sm:text-[0.65rem] text-cocoa/75 mt-0.5 leading-none px-2">
                          {point.subtitle}
                        </p>

                        {/* Official Stamp Number */}
                        <span className="mt-1 font-mono text-[0.55rem] opacity-60">
                          {point.visaNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passport Footer Seal Note */}
                <div className="mt-4 flex items-center justify-between text-xs text-cocoa/60 pt-3 border-t border-cocoa/10">
                  <span className="font-scrawl text-toffee font-semibold">
                    ★ Gold Quality Seal Verified
                  </span>
                  <span>Downtown Dubai Showroom</span>
                </div>
              </div>
            </div>

            {/* Mascot Buddy sitting at bottom center spine of passport booklet */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 z-30">
              <PupStop
                id="book"
                pose="sit"
                facing="right"
                act="book"
                className="tp-book__teddy"
              />
            </div>
          </div>

          {/* Glowing sunset and Dubai skyline silhouette below passport */}
          <div className="relative mt-12 flex justify-center items-center pointer-events-none">
            {/* Setting Sun */}
            <div className="absolute w-32 h-32 rounded-full bg-[#f2be6b]/80 blur-xl -top-6" />
            <div className="w-24 h-24 rounded-full bg-[#fbe3b4] shadow-[0_0_40px_#f2be6b]" />
          </div>
        </div>
      </div>
    </section>
  );
}
