import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree, Shantell_Sans } from 'next/font/google';
import './globals.css';
import './authentic.css';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { MobileBottomBar } from '@/components/widgets/MobileBottomBar';
import { WhatsAppWidget } from '@/components/widgets/WhatsAppWidget';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ScrollProgressRail } from '@/components/ui/ScrollProgressRail';
import { RouteCurtain } from '@/components/ui/RouteCurtain';
import { PawTrailCanvas } from '@/components/ui/PawTrailCanvas';
import { TravellingTeddy } from '@/components/mascot/TravellingTeddy';
import { SITE_CONFIG } from '@/data/siteConfig';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const shantell = Shantell_Sans({
  subsets: ['latin'],
  variable: '--font-shantell',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fffdf8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: 'TeddyPups U.A.E.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}
    >
      <body className="bg-milk font-sans text-cocoa antialiased selection:bg-honey/30">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-2.5 focus:font-semibold focus:text-milk"
        >
          Skip to content
        </a>

        {/* 1. Opening Route Curtain Sequence */}
        <RouteCurtain />

        {/* 2. Interactive Mouse Paw Trail Canvas */}
        <PawTrailCanvas />

        <SmoothScrollProvider>
          {/* 3. Top Progress Rail */}
          <ScrollProgressRail />

          {/* 4. Single Continuous Travelling Mascot */}
          <TravellingTeddy />

          {/* 5. Header */}
          <Header />

          {/* 6. Main Content */}
          <main id="main" className="relative w-full">{children}</main>

          {/* 7. Footer */}
          <Footer />

          {/* 8. Widgets */}
          <MobileBottomBar />
          <WhatsAppWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
