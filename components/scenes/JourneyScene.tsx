'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/data/siteConfig';

export function JourneyScene() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: '1',
      title: 'Choose your breed',
      description: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
    },
    {
      num: '2',
      title: 'Get photos & details',
      description: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
    },
    {
      num: '3',
      title: 'Secure & safe delivery',
      description: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you comfortably and safely.',
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat py-24 relative overflow-hidden"
      style={{
        ['--sky-top' as string]: '#f7d18d',
        ['--sky-bottom' as string]: '#f0b866',
      }}
      aria-labelledby="journey-title"
    >
      <div className="gutter mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            concierge adoption ✨
          </span>
          <h2
            id="journey-title"
            className="font-plush text-huge font-bold text-cocoa"
          >
            Your puppy journey
          </h2>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>
        </div>

        {/* 2-Column: Stepper on left, Phone Mockup on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Stepper list (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((s, idx) => {
              const stepNumber = idx + 1;
              const isActive = activeStep === stepNumber;

              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(stepNumber)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-cocoa bg-milk shadow-lg translate-x-2'
                      : 'border-cocoa/10 bg-milk/50 hover:bg-milk/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl font-plush text-xl font-bold transition-colors ${
                        isActive
                          ? 'bg-cocoa text-honey shadow-sm'
                          : 'bg-milk border-2 border-cocoa/20 text-cocoa'
                      }`}
                    >
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-plush text-xl sm:text-2xl font-bold text-cocoa">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-cocoa/80 text-sm sm:text-base leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-cocoa px-7 font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
              >
                <span>Start your journey on WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* iPhone WhatsApp Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] sm:w-[320px] rounded-[3rem] border-8 border-cocoa bg-[#0b141a] p-3 shadow-2xl">
              {/* Dynamic Island notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-cocoa z-30" />

              {/* Chat Container */}
              <div className="relative h-[540px] rounded-[2.3rem] overflow-hidden bg-[#efeae2] flex flex-col justify-between">
                {/* Chat Header */}
                <div className="bg-[#075e54] text-white p-3 pt-6 flex items-center gap-3 shadow-sm">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/40">
                    <Image
                      src="/logo.png"
                      alt="TeddyPups Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      TeddyPups Concierge
                    </h4>
                    <p className="text-[0.65rem] text-white/80">Online • Dubai Showroom</p>
                  </div>
                  <span className="text-lg text-white/80">📞</span>
                </div>

                {/* Messages stream */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1 text-xs">
                  {/* Timestamp */}
                  <div className="text-center my-1">
                    <span className="rounded-md bg-milk/80 px-2 py-0.5 text-[0.65rem] text-cocoa/60 font-medium">
                      TODAY
                    </span>
                  </div>

                  {/* Message 1 (User) */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#d9fdd3] p-2.5 shadow-sm text-cocoa">
                      <p>Hi! We’re looking for an apricot teacup Maltipoo girl in Dubai 🧸</p>
                      <span className="block text-right text-[0.6rem] text-cocoa/50 mt-1">11:42 AM ✓✓</span>
                    </div>
                  </div>

                  {/* Message 2 (TeddyPups) */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white p-2.5 shadow-sm text-cocoa">
                      <p className="font-semibold text-toffee text-[0.7rem] mb-0.5">TeddyPups Concierge</p>
                      <p>Hello! We would love to help you find your new baby. Here is our 2-month-old teacup Maltipoo!</p>
                      <span className="block text-right text-[0.6rem] text-cocoa/50 mt-1">11:43 AM</span>
                    </div>
                  </div>

                  {/* Message 3 (Media Photo Card) */}
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-tl-none bg-white p-1.5 shadow-sm overflow-hidden">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden">
                        <Image
                          src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpeg"
                          alt="Showroom Maltipoo video frame"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-cocoa/20 flex items-center justify-center">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-milk/90 text-cocoa shadow-md text-base">
                            ▶
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <p className="text-[0.7rem] text-cocoa font-medium">Live video: 2 months, 680g, vaccinated & microchipped.</p>
                      </div>
                    </div>
                  </div>

                  {/* Message 4 (Ready for visit) */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white p-2.5 shadow-sm text-cocoa">
                      <p>You can visit our showroom in Downtown Dubai today to cuddle her in person! 🐾</p>
                      <span className="block text-right text-[0.6rem] text-cocoa/50 mt-1">11:45 AM</span>
                    </div>
                  </div>
                </div>

                {/* Chat Input bar */}
                <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-cocoa/10">
                  <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-[0.75rem] text-cocoa/50">
                    Type a message...
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884] text-white text-xs">
                    🎤
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
