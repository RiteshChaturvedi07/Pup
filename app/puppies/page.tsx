import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PUPPIES, Puppy } from '@/data/puppies';
import { SITE_CONFIG } from '@/data/siteConfig';

interface PuppiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PuppiesPage({ searchParams }: PuppiesPageProps) {
  const resolvedParams = await searchParams;
  const breed = typeof resolvedParams.breed === 'string' ? resolvedParams.breed : undefined;
  const origin = typeof resolvedParams.origin === 'string' ? resolvedParams.origin : undefined;

  const filtered = PUPPIES.filter((p) => {
    if (breed && p.breed !== breed) return false;
    if (origin && p.origin !== origin) return false;
    return true;
  });

  const breeds = [
    { key: '', label: 'All breeds' },
    { key: 'maltipoo', label: 'Maltipoo' },
    { key: 'pomeranian', label: 'Pomeranian' },
    { key: 'poodle', label: 'Poodle' },
    { key: 'cavapoo', label: 'Cavapoo' },
    { key: 'shih-tzu', label: 'Shih Tzu' },
  ];

  const origins = [
    { key: '', label: 'All locations' },
    { key: 'local', label: '📍 Dubai Showroom' },
    { key: 'imported', label: '✈️ Flown from Korea' },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-milk">
      <div className="gutter mx-auto max-w-7xl">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-cocoa/60 mb-2">
            <Link href="/" className="hover:text-toffee">Home</Link>
            <span>/</span>
            <span className="text-toffee">Available Puppies</span>
          </div>

          <h1 className="font-plush text-huge font-bold text-cocoa">
            Available puppies in Dubai
          </h1>
          <p className="mt-2 text-cocoa/80 text-base md:text-lg max-w-2xl">
            Ethical, health-certified teacup puppies looking for their forever families. Filter by breed or showroom availability.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="mb-10 flex flex-wrap gap-3 pb-4 border-b border-honey/30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cocoa/60 mr-1">
              Breed:
            </span>
            {breeds.map((b) => {
              const isActive = (breed || '') === b.key;
              const href = b.key
                ? `/puppies?breed=${b.key}${origin ? `&origin=${origin}` : ''}`
                : `/puppies${origin ? `?origin=${origin}` : ''}`;

              return (
                <Link
                  key={b.key}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cocoa text-milk shadow-sm'
                      : 'bg-honey-soft/40 text-cocoa hover:bg-honey-soft'
                  }`}
                >
                  {b.label}
                </Link>
              );
            })}
          </div>

          <div className="h-6 w-px bg-honey/30 hidden md:block mx-2" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cocoa/60 mr-1">
              Origin:
            </span>
            {origins.map((o) => {
              const isActive = (origin || '') === o.key;
              const href = o.key
                ? `/puppies?origin=${o.key}${breed ? `&breed=${breed}` : ''}`
                : `/puppies${breed ? `?breed=${breed}` : ''}`;

              return (
                <Link
                  key={o.key}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-toffee text-milk shadow-sm'
                      : 'bg-honey-soft/40 text-cocoa hover:bg-honey-soft'
                  }`}
                >
                  {o.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Puppy Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-cocoa/20 bg-honey-soft/20">
            <p className="font-plush text-2xl font-bold text-cocoa">No puppies found matching this filter</p>
            <p className="font-scrawl text-sm text-cocoa/70 mt-1">Try clearing your filters or message us on WhatsApp</p>
            <Link
              href="/puppies"
              className="mt-6 inline-flex rounded-full bg-cocoa px-6 py-2.5 text-xs font-bold text-milk shadow-md"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((pup) => (
              <Link
                key={pup.id}
                href={`/puppies/${pup.slug}`}
                className="group relative flex flex-col rounded-3xl border-2 border-cocoa bg-milk p-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Available tag */}
                <div className="absolute top-2 right-5 z-20">
                  <span className="font-scrawl rounded-full bg-honey px-3 py-0.5 text-xs font-bold text-cocoa shadow-sm border border-cocoa/20">
                    {pup.tag}
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: pup.objectPosition }}
                  />

                  {pup.hasVideo && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cocoa/80 px-2.5 py-0.5 text-[0.65rem] font-bold text-milk backdrop-blur-sm">
                      <span className="text-honey">▶</span>
                      <span>VIDEO</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 rounded-full bg-milk/90 px-2.5 py-0.5 text-[0.65rem] font-bold text-cocoa shadow-sm">
                    {pup.origin === 'imported' ? '✈️ Korea' : '📍 Dubai'}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 text-center">
                  <h3 className="font-plush text-xl font-bold text-cocoa group-hover:text-toffee transition-colors">
                    {pup.name}
                  </h3>
                  <p className="font-scrawl text-xs text-cocoa/75 mt-0.5">
                    {pup.metaText}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-toffee">
                    <span>View profile & video</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
