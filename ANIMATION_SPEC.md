# TeddyPups U.A.E. — Complete Animation & Interaction Specification

## 1. Overview & Architecture
This document details the exact animation mechanics, scroll-driven behaviors, keyframes, easings, timings, and mouse/pointer micro-interactions for the TeddyPups clone, extracted from `reference/home.html`, live CSS (`10jf32vdx50lp.css`), and browser observation.

All animations strictly use hardware-accelerated CSS properties (`transform`, `opacity`, `clip-path`) targeting 60fps across mobile and desktop, with full support for `prefers-reduced-motion`.

---

## 2. Design Tokens & Easings
```css
:root {
  --ease-pounce: cubic-bezier(.34, 1.56, .64, 1);  /* Spring / bounce */
  --ease-silk: cubic-bezier(.22, 1, .36, 1);       /* Smooth decelerate */
  --ease-snap: cubic-bezier(.7, 0, .2, 1);         /* Quick snappy cut */
  --ease-spring: cubic-bezier(.3, 1.2, .4, 1);     /* 3D door swing spring */
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);
  --door-open: 78deg;                              /* Maximum door swing angle */
}
```

---

## 3. Global Interactive Systems

### 3.1 Intro Curtain (`tp-curtain`, `data-state="intro"`)
- **Trigger**: First page visit of session (`sessionStorage` flag).
- **Duration**: ~2.2s total, skippable on click or keypress.
- **Sequence**:
  1. Blanket (`tp-curtain__blanket`) covers the screen (`translateY(0)`).
  2. Running puppy (`tp-curtain__runner`) animates across screen (`@keyframes tp-runner-x`: `-40%` → `min(44rem, 86vw) / 1.5625`).
  3. Running cycle:
     - Legs: `tp-runner-leg-a` (`24deg` → `-22deg`), `tp-runner-leg-b` (`-22deg` → `24deg`) duration `240ms` infinite alternate.
     - Body: `tp-runner-bob` (`0` → `-6px`) duration `240ms` infinite alternate.
     - Tail: `tp-runner-wag` (`-16deg` → `14deg`) duration `180ms` infinite alternate.
     - Ears: `tp-runner-ear` (`0deg` → `8deg`) duration `300ms` infinite alternate.
  4. Staggered paw prints drop behind runner (`@keyframes tp-print-step`: `opacity: 0, scale: 0.4` → `opacity: 0.7, scale: 1.08` → `opacity: 0`).
  5. Curtain peels away (`@keyframes tp-curtain-lift`: `translateY(calc(-100% - 44px))` easing `var(--ease-silk)`, duration `750ms`).
  6. Hero section reveals underneath with staggered word and element lift.

### 3.2 Sky Gradient Daytime-to-Night Progression
The viewport background smoothly transitions across 8 scenes:
1. `tp-hero`: `#fffdf8` → `#fff1d8` (Morning cream)
2. `tp-meet`: `#fff1d8` → `#fbe3b4` (Warm morning)
3. `tp-paths`: `#fbe3b4` → `#f7d18d` (Golden midday)
4. `tp-chat`: `#f7d18d` → `#f0b866` (Warm afternoon)
5. `tp-passport`: `#f0b866` → `#a65a30` (Amber sunset)
6. `tp-dusk`: `#a65a30` → `#4d2b19` (Evening twilight — Dark tone)
7. `tp-night`: `#4d2b19` → `#2f1a10` (Deep starry night — Dark tone)
8. `tp-home`: `#2f1a10` → `#24130b` (Midnight bedtime — Dark tone)

*Joining Borders*: Scalloped SVG cutouts (`#tp-hem`, `#tp-scallop`, `#tp-curtain-scallop`) create seamless organic transitions.

### 3.3 Scroll Reveal System (`data-reveal`)
- **Trigger**: IntersectionObserver / ScrollTrigger at `20%` viewport entry.
- **Initial State**: `opacity: 0; transform: translateY(24px) scale(0.96)`.
- **Target State**: `opacity: 1; transform: translateY(0) scale(1)`.
- **Easing**: `cubic-bezier(.22, 1, .36, 1)`.
- **Duration**: `650ms`.
- **Stagger**: Controlled via CSS variable `--d` (0ms, 110ms, 220ms, 330ms, 440ms, 550ms, 660ms, 770ms).

---

## 4. Mouse & Pointer Interactions

| Interaction | Trigger | Target Element | Transform / Effect | Duration & Easing |
| :--- | :--- | :--- | :--- | :--- |
| **Teddy Cursor Follow** | Pointer move within section | Mascot head & eyes (`[data-pup-look]`) | Head tilts ±6°; pupils translate ±3.5px clamped | 120ms smooth lerp |
| **Meeting Friends** | Hover on hero window (`tp-lineup__pup`) | Arch window + Mascot + Bubble | Window pops `translateY(-8px) scale(1.04)`; Teddy turns to face pup; speech bubble pops with spring | 300ms `var(--ease-pounce)` |
| **3D Door Swing** | Hover / keyboard focus on door | Door leaf (`tp-door__leaf`) | 3D hinge swing `transform: perspective(1000px) rotateY(-78deg)`; interior lights up; knob turns | 450ms `cubic-bezier(.3, 1.2, .4, 1)` |
| **Swinging Tag** | Door hover / reveal | Hanging tag (`tp-door__tag`) | Pendulum swing: `-7° → 4° → -2.2° → 1° → 0°` | 3.5s damped decay |
| **Magnetic Button** | Hover within 30px of primary CTA | Button element | Moves up to 6px toward pointer vector; soft shadow blooms | 200ms `ease-out` |
| **Polaroid Tilt & Lift** | Hover on polaroid card | Polaroid (`tp-polaroid`) | Straightens from random `±3°` to `rotate(0deg) scale(1.05)`; washi tape softens | 300ms `var(--ease-pounce)` |
| **Phone Mockup 3D Tilt** | Pointer move over journey scene | Phone frame (`tp-phone`) | Dynamic 3D tilt `perspective(1000px) rotateX(±4deg) rotateY(±5deg)` | rAF throttled |
| **Twinkling Stars** | Continuous loop | Celestial SVGs (`tp-twinkle`) | Scale `0.8 → 1.15`, rotate `0° → 20°`, opacity `0.35 → 1.0` | 3.0s staggered |
| **Paw Click Ripple** | Button click | Target CTA | Tiny paw print mark scales up `0.4 → 1.2` and fades out in 400ms | 400ms |

---

## 5. Section-by-Section Animation Breakdown

### 5.1 Hero Scene (`tp-hero`)
- **Headline Entrance**: Title text rises line by line (`tp-hero__line`) with `transform: translateY(100%)` → `translateY(0)`.
- **Arch Windows**: 6 arch windows reveal with staggered spring bounce (`0ms, 80ms, 160ms, 240ms, 320ms, 400ms`).
- **Breed Bubbles Auto-cycle**: If unhovered, a speech bubble pops above one arch window every `2.5s` cycling through Max, Korean Teacup Maltipoo, etc.
- **Mascot Peekaboo**: Mascot behind quilt periodically pops up (`tp-pop-up`), looks around, and peeks over edge.

### 5.2 Meet the Pups (`tp-meet`, Pinned Treadmill)
- **Pinning**: Section pins for `200vh` scroll distance.
- **Treadmill Scroll**: Scroll progress `--pinned` (0 → 1) translates the horizontal corridor track `translateX(0% → -75%)`.
- **Center Door Auto-Open**: Doors passing through the center `40%–60%` viewport band open their leaf automatically, revealing the puppy inside.
- **Runner Puppy**: Runner mascot trots along the corridor floor in the direction of scroll; halts and sits when scrolling stops (>350ms idle).

### 5.3 Two Ways (`tp-paths`)
- **Signpost Entrance**: Wooden post drops down from top with a gentle spring settle.
- **Arrow Boards Hover**: Left arrow ("Puppies in Dubai") and right arrow ("Imported for you") sway on their hinges (`rotate: ±4deg`) when hovered.
- **Flight Path Draw**: Dotted route line (`tp-flight__route`) stroke-dashoffset animates from `100%` to `0%` as user scrolls into view.
- **Cartoon Airplane**: Plane moves along the path curve, rotating tangentially, with gentle engine bob (`@keyframes tp-plane-bob`).

### 5.4 Your Puppy Journey (`tp-chat`, Pinned)
- **Sync Stepper**: Scroll progress advances Step 1 → Step 2 → Step 3.
- **Phone Chat Sequencer**:
  - Step 1: User bubble "Hi TeddyPups..." pops in → Concierge typing dots animate.
  - Step 2: Live puppy photo card and video badge appear in chat stream.
  - Step 3: Verified delivery message with double blue checkmarks (✓✓) appears.
- **Mascot Reaction**: Mascot sitting beside phone tilts head at each incoming message.

### 5.5 Passport & Trust (`tp-passport`)
- **Book Open Animation**: Left and right pages open outwards in 3D (`rotateY(-15deg)` / `rotateY(15deg)`).
- **Stamp Thump**: 4 golden stamps slam into their boxes sequentially (`scale: 1.7 → 0.93 → 1.0`, `rotate: var(--tilt)`).

### 5.6 Happy Families (`tp-dusk`)
- **Sunset Parallax**: Sun sinking behind Dubai skyline (`translateY: -60% → +40%`) as dusk falls.
- **Polaroid Wall Drops**: Polaroids drop in with damped pendulum swing (`rotate: ±8° → rest tilt`).
- **Lightbox Dialog**: Clicking any polaroid opens the full-screen photo viewer with smooth zoom and sepia-to-color transition.

### 5.7 Questions, Answered (`tp-night`)
- **Night Sky Twinkle**: 11 stars twinkle with staggered 400ms phase offsets.
- **Curious Mascot**: Mascot sits with floating "?" wonder mark, tilting head when accordions toggle.
- **Accordion Smooth Expand**: Questions expand using CSS Grid `grid-template-rows: 0fr → 1fr` with spinning star icon.

### 5.8 Closing CTA & Footer (`tp-home`)
- **Glowing Door**: House door swings open (`rotateY(-102deg)`), shedding warm gold light onto welcome mat.
- **Sleeping Puppy Basket**: Puppy inside wicker basket gently breathes (`scale: 1 → 1.015`), tail twitching occasionally.
- **Interactive Yawn**: Clicking the basket pup plays a mini yawn wiggle with "zzz... woof!" speech bubble before sleeping again.

---

## 6. Accessibility & Reduced Motion
- When `prefers-reduced-motion: reduce` is detected:
  - All continuous keyframe animations (twinkle, bob, breathe, tag-swing) are frozen.
  - Pinned ranges convert to natural unpinned stacked scrolling.
  - Transitions fall back to instantaneous `opacity` fades without scale/rotate.
  - Cursor tracking and 3D tilts are disabled.
