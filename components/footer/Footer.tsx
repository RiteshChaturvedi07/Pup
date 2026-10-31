import Link from 'next/link';
import { PupStop } from '@/components/pup/PupStop';
import { BasketBack, BasketFront } from '@/components/svg/Basket';
import { SITE_CONFIG } from '@/data/siteConfig';

export function Footer() {
  return (
    <footer className="relative bg-[#24130b] text-milk/90 overflow-hidden pt-16 pb-24 lg:pb-16 border-t border-honey/20">
      {/* Decorative Night Hill Top Horizon */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full text-honey" fill="currentColor">
          <path d="M0,40 C320,80 480,10 720,40 C960,70 1200,20 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="gutter mx-auto max-w-7xl relative z-10">
        {/* Top Header Block: Home, at last. & Sleeping Puppy in Basket */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-milk/10 gap-8">
          <div>
            <span className="font-scrawl text-honey text-lg tracking-wide block mb-1">
              sweet dreams, little one ✨
            </span>
            <h2 className="font-plush text-huge text-milk font-bold">
              Home, at last.
            </h2>
            <p className="mt-2 text-milk/70 max-w-md">
              Bringing happiness, warmth, and ethical purebred teacup companions to loving homes across the UAE.
            </p>
          </div>

          {/* Authentic Wicker Basket with sleeping puppy PupStop */}
          <div className="relative w-56 h-44 flex items-center justify-center tp-basket">
            <BasketBack className="absolute inset-0 w-full h-full z-[1]" />
            <PupStop
              id="footer"
              pose="snug"
              facing="right"
              act="basket"
              behind
              lane
              className="tp-basket__pup relative z-[10] w-full"
            />
            <BasketFront className="absolute inset-0 w-full h-full z-[25] pointer-events-none" />
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
                className="inline-flex items-center gap-2 rounded-full bg-honey px-4 py-2 text-xs font-bold text-cocoa transition-all hover:bg-honey-soft active:scale-95 shadow-sm"
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
          <p className="font-scrawl text-milk/70">
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-milk/20 bg-milk/5 text-lg transition-all hover:border-honey hover:bg-milk/10 active:scale-95"
    >
      <span>{icon}</span>
    </a>
  );
}
