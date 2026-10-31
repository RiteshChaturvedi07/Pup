# TeddyPups U.A.E. Clone — Reconnaissance & Ground Truth Report

## 1. Overview & Architecture
- **Target Site**: TeddyPups U.A.E. (https://puppy.instabizweb.com/)
- **Brand Title**: TeddyPups U.A.E. — Premium teacup puppies in Dubai
- **Theme Color**: `#fffdf8`
- **Location**: Downtown Dubai, UAE
- **Phone**: `+971 54 167 6733`
- **Email**: `teddypupsadmin@gmail.com`
- **WhatsApp**: `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.`
- **Target Stack**: Next.js 15 (App Router, Turbopack) + TypeScript + Tailwind CSS / CSS Variables + GSAP ScrollTrigger & Framer Motion.

---

## 2. Typography & Fonts
Inspection of `@font-face` rules in `reference/files/2gh-2btcjgkih.css` and `.woff2` preloads in `reference/home.html` identifies the exact 3 fonts:

| Role | Font Family | CSS Variable / Utility Class | Google Fonts Match | .woff2 Hash Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Chunky Display Serif** | **Fraunces** | `--font-display`, `font-plush` | `Fraunces:opsz,wght@9..144,100..900` | `54fc36028e2bb174-s.p.20jfceqj9zyw9.woff2` |
| **Body Sans** | **Figtree** | `--font-sans`, default body | `Figtree:wght@300..900` | `f7aa21714c1c53f8-s.p.0-95eo-012xnf.woff2` |
| **Handwritten Script** | **Shantell Sans** | `--font-hand`, `font-scrawl` | `Shantell Sans:wght@300..800` | `c25c3c50e24471d2-s.p.1-0ft7iz2f4p6.woff2` |

---

## 3. Routes & Site Structure
Extracted from navigation, footer links, and Next.js flight data streams:

1. `/` — Home page with 8 continuous scroll scenes and animated mascot
2. `/puppies` — Available puppies directory with query filters:
   - `?breed=maltipoo` | `?breed=pomeranian` | `?breed=poodle` | `?breed=cavapoo` | `?breed=shih-tzu`
   - `?origin=local` (Dubai showroom) | `?origin=imported` (Korea)
3. `/puppies/[slug]` — Dynamic puppy profile pages for each of the 15 puppies
4. `/happy-families` — Full gallery of customer photos, reviews, and Sarah M.'s story
5. `/how-it-works` — Concierge adoption guide with anchor `#delivery` for delivery & collection
6. `/faq` — Comprehensive FAQ directory with category accordions
7. `/contact` — Showroom visiting details, map location, WhatsApp & contact forms
8. `/gone-home` — Archive of adopted puppies
9. `404` — Custom error page matching the storybook cream-to-chocolate tone

---

## 4. Design Tokens & Color Palette
Exact CSS variables confirmed from `10jf32vdx50lp.css`:

```css
:root {
  --color-cocoa: #2a170e;
  --color-cocoa-soft: #5a3a28;
  --color-honey: #f2be6b;
  --color-honey-soft: #fbe3b4;
  --color-milk: #fffdf8;
  --color-toffee: #c2622b;
  --color-toffee-deep: #a24a1a;
  --color-toffee-ink: #8e3f15;
  --color-blush: #f9cdbf;
  --color-sky: #bfddf5;
  --color-sky-deep: #2f6e9e;
  
  /* Additional sky gradient tones */
  --sky-cream: #fffdf8;
  --sky-warm: #fff1d8;
  --sky-honey: #fbe3b4;
  --sky-gold: #f7d18d;
  --sky-amber: #f0b866;
  --sky-dusk: #a65a30;
  --sky-night: #4d2b19;
  --sky-deep: #2f1a10;
  --sky-midnight: #24130b;

  /* Layout and component sizing */
  --header-h: 4.75rem; /* 4rem on mobile */
  --bar-h: calc(4rem + env(safe-area-inset-bottom));
  --gutter: clamp(1rem, 4vw, 3.5rem);
  --door-open: 78deg;
  --ease-pounce: cubic-bezier(.34, 1.56, .64, 1);
  --ease-silk: cubic-bezier(.22, 1, .36, 1);
  --ease-snap: cubic-bezier(.7, 0, .2, 1);
  --ease-spring: cubic-bezier(.3, 1.2, .4, 1);
}
```

---

## 5. Homepage 8 Scenes Breakdown
Each scene features custom `--sky-top` and `--sky-bottom` properties transitioning daylight into twilight:

1. **Scene 1: Hero (`tp-hero`)**
   - *Gradient*: `#fffdf8` → `#fff1d8` (Light tone)
   - *Components*: Intro curtain (`tp-curtain`), 6 arch windows (`tp-arch`) with puppy previews, central mascot peekaboo greeting, breed pill bubbles, hero headline & CTA buttons.
2. **Scene 2: Meet the Pups (`tp-meet`)**
   - *Gradient*: `#fff1d8` → `#fbe3b4` (Light tone)
   - *Components*: Horizontal pinned treadmill door corridor (`tp-doors`, `tp-lane`), 15 puppy doors with peepholes, badges ("Available"), and a 16th "Meet them all" door leading to `/puppies`. Runner puppy trots along corridor floor.
3. **Scene 3: Two Ways (`tp-paths`)**
   - *Gradient*: `#fbe3b4` → `#f7d18d` (Light tone)
   - *Components*: Interactive wooden signpost (`tp-fork`) pointing to "Puppies in Dubai" (Downtown showroom) and "Imported for you" (flying plane route from Seoul, Korea).
4. **Scene 4: Journey & Concierge (`tp-chat`)**
   - *Gradient*: `#f7d18d` → `#f0b866` (Light tone)
   - *Components*: 3 numbered journey steps synced to a realistic mobile phone WhatsApp chat simulator.
5. **Scene 5: Passport & Trust (`tp-passport`)**
   - *Gradient*: `#f0b866` → `#a65a30` (Light tone)
   - *Components*: Interactive open passport booklet (`tp-book`) with 4 stamped quality commitments (Vet-checked, Korea-to-Dubai safety, 24/7 Support, Trusted worldwide).
6. **Scene 6: Happy Families (`tp-dusk`)**
   - *Gradient*: `#a65a30` → `#4d2b19` (Dark tone)
   - *Components*: Warm sunset backdrop, featured client review (Sarah M., Dubai), and 8 tilted polaroids (`tp-polaroid`) taped with custom pastel washi tape + photo lightbox.
7. **Scene 7: FAQ (`tp-night`)**
   - *Gradient*: `#4d2b19` → `#2f1a10` (Dark tone)
   - *Components*: Night sky with 11 twinkling stars (`tp-twinkle`), curious mascot pondering with a "?" mark, and 3 accordion questions with plush titles.
8. **Scene 8: Closing CTA & Footer (`tp-home`)**
   - *Gradient*: `#2f1a10` → `#24130b` (Dark tone)
   - *Components*: Cozy closing house facade with glowing doorway, "welcome home" scrawl, and full footer with moon, rolling hill, sleeping puppy in wicker basket (`tp-basket`), links, and copyright.

---

## 6. Keyframes & Animation Inventory
46 keyframe animations extracted from production CSS including:
- `tp-curtain-lift`, `tp-runner-x`, `tp-print-step`, `tp-runner-leg-a`, `tp-runner-leg-b`, `tp-runner-bob`, `tp-runner-wag`, `tp-runner-ear`
- `tp-door-open`, `tp-tag-swing`, `tp-tag-nudge`
- `tp-stamp-thump`, `tp-stamp-in`, `tp-plane-bob`
- `tp-breathe`, `tp-blink-open`, `tp-blink-shut`, `tp-ear-twitch`
- `tp-twinkle`, `tp-float`, `tp-sun-set`, `tp-msg-in`, `tp-house-open`
Full animation spec detailed in `ANIMATION_SPEC.md`.
