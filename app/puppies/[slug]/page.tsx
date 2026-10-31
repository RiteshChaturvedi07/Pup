import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PUPPIES, getPuppyBySlug } from '@/data/puppies';
import { SITE_CONFIG } from '@/data/siteConfig';

interface PuppyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PUPPIES.map((pup) => ({
    slug: pup.slug,
  }));
}

export default async function PuppyDetailPage({ params }: PuppyPageProps) {
  const { slug } = await params;
  const puppy = getPuppyBySlug(slug);

  if (!puppy) {
    notFound();
  }

  const related = PUPPIES.filter((p) => p.slug !== slug && p.breed === puppy.breed).slice(0, 3);

  const customWhatsAppUrl = `https://wa.me/${SITE_CONFIG.phoneClean}?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breedLabel}, ${puppy.age}). Could you share more details and video?`
  )}`;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-cocoa/60 mb-6">
          <Link href="/" className="hover:text-toffee">Home</Link>
          <span>/</span>
          <Link href="/puppies" className="hover:text-toffee">Puppies</Link>
          <span>/</span>
          <span className="text-toffee">{puppy.name}</span>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start rounded-3xl border-3 border-cocoa bg-milk/80 p-6 sm:p-10 shadow-xl">
          {/* Left Media (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-cocoa/20 shadow-md"
              style={{ backgroundColor: puppy.bgColor }}
            >
              <Image
                src={puppy.image || puppy.fallbackImage}
                alt={puppy.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: puppy.objectPosition }}
              />

              <div className="absolute top-4 left-4 rounded-full bg-honey px-3 py-1 text-xs font-bold text-cocoa shadow-sm">
                {puppy.tag}
              </div>

              <div className="absolute top-4 right-4 rounded-full bg-milk/90 px-3 py-1 text-xs font-bold text-cocoa shadow-sm">
                {puppy.originLabel}
              </div>
            </div>

            {/* Video Player if puppy has video */}
            {puppy.hasVideo && puppy.videoUrl && (
              <div className="rounded-2xl border-2 border-cocoa/20 overflow-hidden bg-black shadow-md">
                <div className="bg-cocoa px-4 py-2 text-xs font-bold text-honey flex items-center justify-between">
                  <span>Showroom Play Video 🧸</span>
                  <span className="text-[0.65rem] text-milk/70">720p HD</span>
                </div>
                <video
                  src={puppy.videoUrl}
                  controls
                  playsInline
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="font-scrawl text-toffee text-base font-semibold">
                  {puppy.breedLabel} • {puppy.originLabel}
                </span>
              </div>
              <h1 className="font-plush text-4xl sm:text-5xl font-bold text-cocoa">
                {puppy.name}
              </h1>
              <p className="mt-1 text-sm font-semibold text-cocoa/70">
                {puppy.metaText}
              </p>
            </div>

            <p className="text-cocoa/85 leading-relaxed text-base">
              {puppy.description}
            </p>

            {/* Health & Passport checklist */}
            <div className="rounded-2xl border border-honey/40 bg-honey-soft/20 p-5 space-y-3">
              <h2 className="font-plush text-lg font-bold text-cocoa flex items-center gap-2">
                <span>🩺</span>
                <span>Verified Health Checklist</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-cocoa/90">
                <div className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span>
                  <span>Microchipped (ISO Standard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span>
                  <span>Vaccinated to age</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span>
                  <span>Dewormed & deflead</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-toffee font-bold">✓</span>
                  <span>Veterinary Health Certificate</span>
                </div>
                {puppy.details.pedigreeCertificate && (
                  <div className="flex items-center gap-2">
                    <span className="text-toffee font-bold">✓</span>
                    <span>Official Pedigree Lineage</span>
                  </div>
                )}
                {puppy.details.estimatedAdultWeight && (
                  <div className="flex items-center gap-2">
                    <span className="text-toffee font-bold">⚖️</span>
                    <span>Adult weight: {puppy.details.estimatedAdultWeight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Showroom location */}
            <div className="flex items-center gap-3 text-xs text-cocoa/80">
              <span className="text-base">📍</span>
              <span>Available to visit at: <strong>{puppy.details.location}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-12 items-center justify-center gap-2 rounded-full bg-cocoa font-bold text-milk shadow-md transition-all hover:bg-cocoa-soft active:scale-95"
              >
                <span>Enquire about {puppy.name}</span>
                <svg className="size-4 text-honey" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-1.996-.481-1.66-.689-2.73-2.386-2.812-2.496-.083-.11-1.077-1.434-1.077-2.736 0-1.302.68-1.944.92-2.208.24-.264.524-.33.699-.33.175 0 .349.002.5.011.16.009.375-.06.586.447.218.524.743 1.815.808 1.947.066.131.11.285.022.46-.087.175-.131.284-.262.437-.131.153-.276.342-.394.459-.131.131-.268.274-.115.537.153.262.68 1.121 1.458 1.814 1.002.894 1.847 1.171 2.109 1.302.262.131.415.11.568-.066.153-.175.655-.765.83-.1.027.175.24.371.743.633 1.246.503.262.11.393.175.459.284.065.11.065.633-.079 1.038z" />
                </svg>
              </a>

              <Link
                href="/contact"
                className="flex h-12 items-center justify-center rounded-full border-2 border-cocoa px-6 font-semibold text-cocoa transition-all hover:bg-honey-soft/50 active:scale-95"
              >
                Book showroom visit
              </Link>
            </div>
          </div>
        </div>

        {/* Related Puppies */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-plush text-2xl font-bold text-cocoa mb-6">
              Other {puppy.breedLabel} puppies you may love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/puppies/${rp.slug}`}
                  className="rounded-2xl border-2 border-cocoa bg-milk p-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block text-center"
                >
                  <div
                    className="relative aspect-square w-full rounded-xl overflow-hidden mb-3"
                    style={{ backgroundColor: rp.bgColor }}
                  >
                    <Image
                      src={rp.image || rp.fallbackImage}
                      alt={rp.alt}
                      fill
                      sizes="300px"
                      className="object-cover"
                      style={{ objectPosition: rp.objectPosition }}
                    />
                  </div>
                  <h3 className="font-plush text-lg font-bold text-cocoa">{rp.name}</h3>
                  <p className="font-scrawl text-xs text-cocoa/70">{rp.metaText}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
