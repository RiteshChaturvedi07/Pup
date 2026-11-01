import Link from 'next/link';
import { PupStop } from '@/components/pup/PupStop';
import { SITE_CONFIG } from '@/data/siteConfig';

export function Footer() {
  // Midnight stars coordinates for footer night sky
  const footerStars = [
    { left: '6%', top: '16%', size: '14px', delay: '0s' },
    { left: '18%', top: '38%', size: '8px', delay: '0.6s' },
    { left: '32%', top: '12%', size: '10px', delay: '1.2s' },
    { left: '48%', top: '28%', size: '7px', delay: '1.8s' },
    { left: '64%', top: '15%', size: '12px', delay: '2.4s' },
    { left: '78%', top: '35%', size: '9px', delay: '0.9s' },
    { left: '88%', top: '10%', size: '13px', delay: '1.5s' },
    { left: '94%', top: '26%', size: '8px', delay: '2.1s' },
  ];

  return (
    <footer className="relative bg-[#2A1208] text-milk/90 overflow-hidden pt-16 pb-24 lg:pb-16 border-t border-honey/20">
      {/* Decorative Night Hill Top Horizon */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full text-honey" fill="currentColor">
          <path d="M0,40 C320,80 480,10 720,40 C960,70 1200,20 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Decorative Starry Sky Background & Blinking Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {footerStars.map((s, idx) => (
          <svg
            key={idx}
            viewBox="0 0 40 40"
            className="absolute text-honey/60 animate-pulse pointer-events-none"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              animationDelay: s.delay,
              animationDuration: '2.4s',
            }}
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}

        {/* Glowing Crescent Moon in Midnight Sky */}
        <div className="absolute top-8 right-10 md:right-28 opacity-85 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-14 h-14 text-honey drop-shadow-[0_0_20px_rgba(242,190,107,0.65)]">
            <path
              d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="gutter mx-auto max-w-7xl relative z-10">
        {/* Top Header Block: Home, at last. & Puppy in Teacup Mug Animation */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-milk/10 gap-8">
          <div>
            <span className="font-scrawl text-honey text-lg tracking-wide block mb-1">
              sweet dreams, little one 🌙✨
            </span>
            <h2 className="font-plush text-huge text-milk font-bold">
              Home, at last.
            </h2>
            <p className="mt-2 text-milk/75 max-w-md text-base leading-relaxed">
              Bringing happiness, warmth, and ethical purebred teacup companions to loving homes across the UAE and worldwide.
            </p>
          </div>

          {/* TEACUP MUG ANIMATION: Cartoon puppy bobbing in warm teacup with floating steam */}
          <div className="relative w-64 h-56 flex items-center justify-center select-none">
            {/* Floating Steam, Bubbles & Stars rising from warm mug */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-3 pointer-events-none z-30">
              <span
                className="text-honey text-sm animate-float"
                style={{ animationDuration: '2.5s', animationDelay: '0s' }}
              >
                ☁️
              </span>
              <div
                className="w-3 h-3 rounded-full bg-honey/40 border border-honey/60 animate-bounce"
                style={{ animationDuration: '2.1s', animationDelay: '0.4s' }}
              />
              <span
                className="text-honey text-sm animate-float"
                style={{ animationDuration: '3s', animationDelay: '0.8s' }}
              >
                ✨
              </span>
            </div>

            {/* Bobbing Puppy Container: translateY(0) to translateY(-6px) */}
            <div
              className="relative w-48 h-44 flex flex-col items-center justify-end"
              style={{
                animation: 'teacupBob 2s ease-in-out infinite alternate',
                willChange: 'transform',
              }}
            >
              {/* Cartoon Puppy Head peeking out of the mug */}
              <div className="relative w-28 h-24 -mb-4 z-10">
                <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
                  {/* Fluffy Ears */}
                  <ellipse cx="40" cy="50" rx="20" ry="32" fill="#e4a352" stroke="#2a170e" strokeWidth="3" transform="rotate(-20 40 50)" />
                  <ellipse cx="160" cy="50" rx="20" ry="32" fill="#e4a352" stroke="#2a170e" strokeWidth="3" transform="rotate(20 160 50)" />
                  {/* Fluffy Head */}
                  <circle cx="100" cy="75" r="50" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" />
                  {/* Eyes with happy sleeping smile / glossy gaze */}
                  <circle cx="78" cy="70" r="5.5" fill="#2a170e" />
                  <circle cx="122" cy="70" r="5.5" fill="#2a170e" />
                  <circle cx="80" cy="68" r="2" fill="#fff" />
                  <circle cx="124" cy="68" r="2" fill="#fff" />
                  {/* Snout & Nose */}
                  <ellipse cx="100" cy="88" rx="18" ry="13" fill="#fbe3b4" />
                  <ellipse cx="100" cy="82" rx="5.5" ry="4" fill="#2a170e" />
                  <path d="M100 86 v3 M96 89 q4 3 8 0" stroke="#2a170e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  {/* Rosy Blush */}
                  <circle cx="68" cy="85" r="5" fill="#f9b9a6" opacity="0.8" />
                  <circle cx="132" cy="85" r="5" fill="#f9b9a6" opacity="0.8" />
                  {/* Paws resting on mug rim */}
                  <ellipse cx="65" cy="120" rx="12" ry="9" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.8" />
                  <ellipse cx="135" cy="120" rx="12" ry="9" fill="#f2be6b" stroke="#2a170e" strokeWidth="2.8" />
                </svg>
              </div>

              {/* Ceramic Mug Body */}
              <div className="relative w-40 h-28 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-[#dfa262] via-[#c48644] to-[#a25e22] border-3 border-cocoa shadow-2xl flex flex-col items-center justify-center p-2 z-20">
                {/* Teacup Handle on Right */}
                <div className="absolute top-4 -right-6 w-8 h-16 rounded-r-2xl border-4 border-l-0 border-cocoa bg-[#c48644] shadow-sm pointer-events-none" />

                {/* Mug Golden Brand Seal */}
                <div className="rounded-full bg-milk/95 px-3 py-1 border border-cocoa/30 shadow-xs flex items-center gap-1.5 mt-2">
                  <span className="text-xs">🐾</span>
                  <span className="font-plush text-xs font-bold text-cocoa">TeddyPups</span>
                </div>
                <span className="font-scrawl text-[0.62rem] text-milk/90 mt-1 font-semibold">
                  pure love & cuddles
                </span>
              </div>
            </div>

            {/* Anchor for mascot stop in footer basket/teacup */}
            <PupStop
              id="basket"
              pose="snug"
              facing="right"
              act="basket"
              behind
              lane
              className="tp-basket__pup absolute -bottom-2 right-4 z-20"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Col 1: Explore */}
          <div>
            <h3 className="font-plush text-lg text-honey font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-milk/80">
              <li>
                <Link href="/puppies" className="hover:text-honey transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link href="/gone-home" className="hover:text-honey transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link href="/happy-families" className="hover:text-honey transition-colors">
                  Happy families
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-honey transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#delivery" className="hover:text-honey transition-colors">
                  Delivery & collection
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-honey transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-honey transition-colors">
                  Contact & visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Breeds */}
          <div>
            <h3 className="font-plush text-lg text-honey font-semibold mb-4">
              Popular Breeds
            </h3>
            <ul className="space-y-2.5 text-sm text-milk/80">
              <li>
                <Link href="/puppies?breed=maltipoo" className="hover:text-honey transition-colors">
                  Maltipoo puppies
                </Link>
              </li>
              <li>
                <Link href="/puppies?breed=pomeranian" className="hover:text-honey transition-colors">
                  Pomeranian puppies
                </Link>
              </li>
              <li>
                <Link href="/puppies?breed=poodle" className="hover:text-honey transition-colors">
                  Poodle puppies
                </Link>
              </li>
              <li>
                <Link href="/puppies?breed=cavapoo" className="hover:text-honey transition-colors">
                  Cavapoo puppies
                </Link>
              </li>
              <li>
                <Link href="/puppies?breed=shih-tzu" className="hover:text-honey transition-colors">
                  Shih Tzu puppies
                </Link>
              </li>
              <li>
                <Link href="/puppies?origin=local" className="hover:text-honey transition-colors font-medium text-honey/90">
                  📍 Available in Dubai showroom
                </Link>
              </li>
              <li>
                <Link href="/puppies?origin=imported" className="hover:text-honey transition-colors font-medium text-honey/90">
                  ✈️ Flown in from Korea
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit & Concierge */}
          <div>
            <h3 className="font-plush text-lg text-honey font-semibold mb-4">
              Showroom & Concierge
            </h3>
            <div className="space-y-3 text-sm text-milk/80">
              <p className="flex items-start gap-2">
                <span className="text-honey">📍</span>
                <span>{SITE_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-honey">📞</span>
                <a href={`tel:${SITE_CONFIG.phoneClean}`} className="hover:text-honey transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-honey">✉️</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-honey transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-honey">🕒</span>
                <span>Daily 10:00 AM – 9:00 PM</span>
              </p>
            </div>
          </div>

          {/* Col 4: Socials & Message */}
          <div>
            <h3 className="font-plush text-lg text-honey font-semibold mb-4">
              Join our Teddy family
            </h3>
            <p className="text-xs text-milk/70 leading-relaxed mb-4">
              Follow our daily puppy play sessions, new arrival stories, and happy adoption moments on social media.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={SITE_CONFIG.socials.instagram} label="Instagram" icon="📸" />
              <SocialLink href={SITE_CONFIG.socials.tiktok} label="TikTok" icon="🎵" />
              <SocialLink href={SITE_CONFIG.socials.facebook} label="Facebook" icon="👍" />
            </div>
            <div className="mt-6">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-5 py-2.5 text-xs font-bold text-cocoa transition-all hover:bg-honey-soft active:scale-95 shadow-md"
              >
                <span>WhatsApp Concierge</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-milk/10 flex flex-col sm:flex-row items-center justify-between text-xs text-milk/50 gap-4">
          <p>© 2026 TeddyPups U.A.E. All rights reserved.</p>
          <p className="font-scrawl text-milk/75">
            Handcrafted with love for puppy families in Dubai 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-milk/20 bg-milk/5 text-lg transition-all hover:border-honey hover:bg-milk/10 active:scale-95 shadow-xs"
    >
      <span>{icon}</span>
    </a>
  );
}
