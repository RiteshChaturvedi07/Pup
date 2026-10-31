import React from 'react';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-lg font-medium block mb-1">
            we&apos;d love to meet you 🐾
          </span>
          <h1 className="font-plush text-huge font-bold text-cocoa">
            Visit & Contact
          </h1>
          <p className="mt-3 text-cocoa/80 text-base md:text-lg">
            Schedule a showroom visit in Downtown Dubai or speak with our concierge team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Showroom Visiting */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#fff9ef] p-8 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cocoa text-honey text-2xl mb-4">
              📍
            </div>
            <h2 className="font-plush text-2xl font-bold text-cocoa">Downtown Dubai Showroom</h2>
            <p className="mt-2 text-cocoa/80 text-sm leading-relaxed">
              Our cozy, private showroom offers a relaxed environment where you and your family can interact and cuddle available puppies.
            </p>
            <div className="mt-6 space-y-2 text-sm text-cocoa font-medium">
              <p><strong>Address:</strong> {SITE_CONFIG.address}</p>
              <p><strong>Hours:</strong> Daily from 10:00 AM – 9:00 PM (By Appointment)</p>
            </div>
            <div className="mt-8">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
              >
                <span>Book visit on WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Contact */}
          <div className="rounded-3xl border-3 border-cocoa bg-[#fff9ef] p-8 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-honey text-cocoa text-2xl mb-4">
              📞
            </div>
            <h2 className="font-plush text-2xl font-bold text-cocoa">Concierge & Inquiries</h2>
            <p className="mt-2 text-cocoa/80 text-sm leading-relaxed">
              Available 24/7 for prospective puppy parents. Ask about breeds, health guarantees, and VIP delivery.
            </p>
            <div className="mt-6 space-y-3 text-sm text-cocoa">
              <p className="flex items-center gap-3">
                <span className="font-bold">Phone:</span>
                <a href={`tel:${SITE_CONFIG.phoneClean}`} className="hover:text-toffee font-semibold">
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <span className="font-bold">WhatsApp:</span>
                <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-toffee font-semibold text-[#075e54]">
                  +971 54 167 6733
                </a>
              </p>
              <p className="flex items-center gap-3">
                <span className="font-bold">Email:</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-toffee font-semibold">
                  {SITE_CONFIG.email}
                </a>
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-cocoa bg-milk px-4 py-2 text-xs font-bold text-cocoa hover:bg-honey-soft"
              >
                Instagram
              </a>
              <a
                href={SITE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-cocoa bg-milk px-4 py-2 text-xs font-bold text-cocoa hover:bg-honey-soft"
              >
                TikTok
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-cocoa bg-milk px-4 py-2 text-xs font-bold text-cocoa hover:bg-honey-soft"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
