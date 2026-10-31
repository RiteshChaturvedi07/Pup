'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HOME_FAQS } from '@/data/faqs';
import { Mascot } from '@/components/mascot/Mascot';

export function QuestionsScene() {
  const [openId, setOpenId] = useState<string | null>(HOME_FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // 11 Star positions from original home.html
  const stars = [
    { left: '8%', top: '12%', size: '16px', delay: '0s' },
    { left: '22%', top: '30%', size: '9px', delay: '0.4s' },
    { left: '41%', top: '8%', size: '12px', delay: '0.8s' },
    { left: '57%', top: '22%', size: '8px', delay: '1.2s' },
    { left: '72%', top: '6%', size: '14px', delay: '1.6s' },
    { left: '88%', top: '18%', size: '11px', delay: '2.0s' },
    { left: '95%', top: '42%', size: '9px', delay: '2.4s' },
    { left: '4%', top: '58%', size: '11px', delay: '2.8s' },
    { left: '34%', top: '70%', size: '7px', delay: '3.2s' },
    { left: '63%', top: '84%', size: '10px', delay: '3.6s' },
    { left: '83%', top: '66%', size: '13px', delay: '4.0s' },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-night py-24 relative overflow-hidden text-milk"
      style={{
        ['--sky-top' as string]: '#4d2b19',
        ['--sky-bottom' as string]: '#2f1a10',
      }}
      aria-labelledby="questions-title"
    >
      {/* 11 Twinkling Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s, idx) => (
          <svg
            key={idx}
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-honey animate-pulse"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              animationDelay: s.delay,
              animationDuration: '3s',
            }}
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      <div className="gutter mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Intro (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="font-scrawl text-honey text-lg font-medium block mb-1">
              curious minds 🌙
            </span>
            <h2
              id="questions-title"
              className="font-plush text-huge font-bold text-milk"
            >
              Questions, answered
            </h2>
            <p className="mt-3 text-milk/80 text-base leading-relaxed">
              Everything you need to know about puppy health, showroom visits, and same-day adoption in Dubai.
            </p>

            <div className="mt-6">
              <Link
                href="/faq"
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-honey/60 bg-honey/10 px-6 font-semibold text-honey transition-all hover:bg-honey hover:text-cocoa active:scale-95"
              >
                <span>Read all questions</span>
                <span>→</span>
              </Link>
            </div>

            {/* Inquiring Mascot with Wonder '?' */}
            <div className="relative mt-10">
              <span className="font-plush text-4xl text-honey font-bold absolute -top-4 -right-2 animate-bounce">
                ?
              </span>
              <Mascot
                pose="tilt"
                facing="right"
                size={150}
                showBubble={false}
              />
            </div>
          </div>

          {/* Right Accordion List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {HOME_FAQS.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-3xl border border-honey/20 bg-[#24130b]/70 backdrop-blur-md overflow-hidden transition-all shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:text-honey"
                    aria-expanded={isOpen}
                  >
                    <span className="font-plush text-lg sm:text-xl font-bold text-milk flex items-center gap-3">
                      <span className="text-honey text-base">✦</span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="text-xl text-honey transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-milk/80 leading-relaxed border-t border-honey/10 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
