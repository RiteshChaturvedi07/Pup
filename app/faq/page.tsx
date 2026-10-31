'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ALL_FAQS } from '@/data/faqs';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function FAQPage() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            questions & answers 💡
          </span>
          <h1 className="font-plush text-huge font-bold text-cocoa">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            Clear, honest answers about adoption, health warranties, breeds, and Korea imports.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-16">
          {ALL_FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-3xl border-2 border-cocoa bg-[#fff9ef] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:text-toffee"
                  aria-expanded={isOpen}
                >
                  <span className="font-plush text-xl font-bold text-cocoa flex items-center gap-3 pr-4">
                    <span className="text-honey text-base">✦</span>
                    <span>{faq.question}</span>
                  </span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-honey text-cocoa font-bold text-lg">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-base text-cocoa/80 leading-relaxed border-t border-cocoa/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="text-center rounded-3xl border-2 border-honey/40 bg-honey-soft/30 p-8">
          <h2 className="font-plush text-2xl font-bold text-cocoa">
            Still have a specific question?
          </h2>
          <p className="mt-2 text-sm text-cocoa/80 max-w-md mx-auto">
            Our concierge team is available 24/7 on WhatsApp to discuss your questions about any puppy.
          </p>
          <div className="mt-6">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
            >
              <span>Chat on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
