import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Consult & Choose Your Puppy',
      subtitle: 'Personality, breed, and lifestyle match',
      description: 'Browse our available showroom puppies in Downtown Dubai or speak with our concierge team on WhatsApp. We take time to understand your lifestyle, living arrangements, and preferences to recommend the ideal puppy.',
    },
    {
      num: '02',
      title: 'Video Bonding & Health Documentation',
      subtitle: '100% transparency before decision',
      description: 'Receive real-time 4K videos, parent information, veterinary microchip certificates, and complete vaccination history. You can also visit our Downtown Dubai showroom to cuddle and interact in person.',
    },
    {
      num: '03',
      title: 'Safe Collection or Doorstep Delivery',
      subtitle: 'Comfortable, temperature-controlled handover',
      description: 'Take your puppy home directly from our Dubai showroom the same day, or schedule luxury climate-controlled delivery directly to your doorstep in Dubai, Abu Dhabi, or across the UAE.',
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            concierge adoption experience 🌿
          </span>
          <h1 className="font-plush text-huge font-bold text-cocoa">
            How it works
          </h1>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            A seamless, ethical, and joyful process designed around the highest standards of animal welfare and client care.
          </p>
        </div>

        {/* 3 Step Process */}
        <div className="space-y-8 mb-24">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-3xl border-3 border-cocoa bg-[#fff9ef] p-8 sm:p-10 shadow-md transition-all hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-cocoa font-plush text-2xl font-bold text-honey shadow-sm">
                  {s.num}
                </div>
                <div>
                  <span className="font-scrawl text-xs font-bold text-toffee uppercase tracking-wider">
                    {s.subtitle}
                  </span>
                  <h2 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-0.5">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-cocoa/80 text-base leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery & Collection Section with anchor #delivery */}
        <div id="delivery" className="scroll-mt-32 rounded-3xl border-3 border-cocoa bg-milk p-8 sm:p-12 shadow-xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-scrawl text-toffee text-base font-bold">
              comfort & care on the road 🚗
            </span>
          </div>
          <h2 className="font-plush text-3xl sm:text-4xl font-bold text-cocoa">
            Delivery & Collection
          </h2>
          <p className="mt-4 text-cocoa/80 leading-relaxed text-base">
            Every puppy journey is treated with utmost delicacy and VIP attention. We ensure your puppy experiences zero stress from our nursery to your home.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="rounded-2xl border-2 border-honey/40 bg-honey-soft/20 p-6">
              <span className="text-3xl mb-3 block">📍</span>
              <h3 className="font-plush text-xl font-bold text-cocoa">Showroom Collection</h3>
              <p className="mt-2 text-sm text-cocoa/80 leading-relaxed">
                Pick up your puppy directly from our Downtown Dubai showroom. We walk you through starter nutrition, grooming basics, and handover your puppy care welcome basket.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-honey/40 bg-honey-soft/20 p-6">
              <span className="text-3xl mb-3 block">🚐</span>
              <h3 className="font-plush text-xl font-bold text-cocoa">UAE-Wide Home Delivery</h3>
              <p className="mt-2 text-sm text-cocoa/80 leading-relaxed">
                Dedicated temperature-controlled luxury pet transit across Dubai, Abu Dhabi, Sharjah, Ajman, and RAK with trained puppy handlers who ensure calm handover.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-honey/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cocoa/70 font-medium text-center sm:text-left">
              Have questions regarding delivery timing or import schedules?
            </p>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
            >
              <span>Ask concierge on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
