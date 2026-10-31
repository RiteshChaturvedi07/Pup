# Teddy's Complete Path & Stop Specification (`TEDDY_PATH.md`)

This document defines the 11 key scene stops and intermediate anchor points for Teddy, the mascot travelling buddy of TeddyPups U.A.E., reverse-engineered from:
1. `reference/original-screen-recording.mp4` & contact sheets (`dog-path-1.jpg`, `dog-path-2.jpg`, `dog-path-3.jpg`)
2. `reference/home.html` (DOM `.pup-stop` elements, `data-pose`, `data-facing`, `data-act`, `data-behind`, `data-lane`)
3. `reference/files/10jf32vdx50lp.css` (stop position definitions & responsive clamp rules)

---

## 1. Mascot Architecture Overview

- **Single Travelling Layer**: `<PupBuddy />` is a fixed-position viewport layer (`position: fixed; inset: 0; z-index: 40; pointer-events: none`).
- **Scene Anchors**: Each section renders one or more `<PupStop id="..." ... />` anchor elements. These are invisible layout targets that mark the exact `(x, y)` coordinate where Teddy's feet should settle.
- **Engine Coordination**:
  - `candidate = last stop whose rect.top + rect.height/2 < trigger` (trigger ≈ `vh * 0.68`).
  - When candidate changes with scroll hysteresis (>60px), Teddy initiates travel (`state = 'run'`).
  - Critically-damped spring physics chases the target viewport coordinates:
    - `target.x = clamp(rect.left + rect.width / 2, 24, vw - 24)`
    - `target.y = clamp(rect.bottom, 80, vh - 12)`
  - When velocity drops below 40px/s for 120ms, Teddy settles into the target stop's defined `pose` (`sit`, `peek`, `bow`, `snug`, `tilt`) with a gentle settle hop.
  - While running, Teddy spawns alternating paw prints into `<PawLayer />`.

---

## 2. The 11 Stops — Exact Coordinates & Behaviors

| # | Stop ID | Scene / Section | Target Element Context | Position (% X / Offset Y) | Pose | Facing | Act | Speech Bubble & Reactions |
|---|---|---|---|---|---|---|---|---|
| **1** | `hero-peek` | Hero (`tp-hero`) | Center of the 6 arch windows, behind the quilt edge (`data-behind`, `data-lane`) | `left: 50%`, `bottom: calc(var(--quilt-h) + 24px)` | `peek` | `front` / `right` | `peekaboo` | **Peekaboo Loop**: Pops up above quilt, blinks, looks at cursor, ducks down every 5s. Hovering any hero puppy makes Teddy face it and show its breed bubble. |
| **2** | `meet-treadmill` | Meet the Pups (`tp-meet`) | Wooden floor line in the hall at ≈18%–20% viewport width | `left: clamp(14vw, 18%, 22%)`, `bottom: calc(var(--floor-h) * 0.42)` | `run` (while scrolling) / `sit` (idle) | `right` (reverses to `left` when scrolling up) | `treadmill` | **Door Wave**: The door closest to Teddy's X position automatically opens in 3D (`rotateY(-74deg)`), lighting up the puppy photo inside. When scrolling halts >400ms, he settles into `sit` and wags his tail. |
| **3** | `paths-heading` | Two Ways (`tp-paths`) | Bottom-left of heading "Two ways to meet your puppy", overlapping the letters | `left: clamp(20px, 8vw, 60px)`, `bottom: 0px` (relative to heading) | `sit` | `right` | — | Released from hall, runs down screen leaving a paw trail, landing with a settle hop at the title. |
| **4** | `fork-signpost` | Two Ways (`tp-paths`) | Base of the wooden signpost post | `left: 50%`, `bottom: 0px` (translate -50%) | `sit` | `right` | `signpost` | Sits at post base; head rotates to look up at whichever board ("Puppies in Dubai" vs "Imported for you") is hovered. |
| **5** | `journey-heading` | Your Puppy Journey (`tp-chat`) | Right end of heading "Your puppy journey" | `left: calc(100% + 12px)`, `top: -8px` of heading | `sit` | `left` | — | Greets visitor at the journey entrance before descending to the phone simulator. |
| **6** | `journey-phone` | Your Puppy Journey (`tp-chat`) | Bottom-left outside edge of the phone mockup frame | `left: -7.5rem` (`left: -120px`), `bottom: -1.6rem` | `sit` | `right` | `phone` | **"ooh, photos!"**: Stays beside phone through all 3 pinned steps. Tilts head at incoming messages. In Step 2 (photo/video), speech bubble pops for 2.5s. |
| **7** | `passport-book` | Passport (`tp-passport`) | Lower-left corner of the open passport book page | `left: 22%`, `bottom: 1.2rem` of book left page | `sit` | `right` | `book` | Sits on passport page as gold seals stamp into place; later trots along bottom edge of book. |
| **8** | `dusk-heading` | Happy Families (`tp-dusk`) | Right end of heading "Happy families & puppies", overlapping "s" | `left: calc(50% + clamp(0.5rem, 5vw, 5rem))`, `bottom: -0.4rem` | `sit` | `right` | — | Sits against sunset horizon skyline before polaroid wall. |
| **9** | `dusk-polaroids` | Happy Families (`tp-dusk`) | Under the 3rd and 6th polaroid cards on the photo wall | `left: 48%`, `bottom: -16px` of polaroid grid row | `sit` | `right` | `wall` | Trots beneath hanging polaroids as they drop in with pendulum swing; wags tail when polaroids are hovered. |
| **10** | `night-faq` | FAQ Night (`tp-night`) | Left column under "Read all questions" CTA, beneath floating "?" | `left: clamp(1rem, 6vw, 3rem)`, `bottom: 0.5rem` | `sit` | `right` | `tilt` | **Head Tilt**: Sits with floating "?" mark above his head; tilts head 14° whenever an accordion question opens. |
| **11** | `cta-house` | CTA Ready (`tp-home`) | Base of the arched house door on the welcome mat | `left: 0px` (or `left: -3.5rem`), `bottom: 0.4rem` of doorway | `bow` / `sit` | `right` | `house` | Door opens in 3D (`rotateY(-78deg)`) revealing warm interior light and puppy silhouette as Teddy arrives. |
| **12** | `footer-basket` | Footer (`tp-footer`) | Inside the wicker basket between back and front layers (`data-behind`, `data-lane`) | `left: 50%`, `bottom: 24px` inside `.tp-basket` (`z-index: 10`) | `snug` | `right` | `basket` | **Bedtime Sleep**: Curls up in basket, eyes shut, slow breathing (`scale 1 ↔ 1.03`), floating "z z z". **Click Reaction**: Yawn stretch + "zzz… woof!" speech bubble, then falls back asleep. |

---

## 3. Paw Trail Specifications
- **Frequency**: Emitted every ~70px of cumulative travel distance while `state === 'run'`.
- **Offset**: Foot alternates left / right perpendicular to travel vector by `±6px`.
- **Rotation**: Aligned with movement angle (`Math.atan2(dy, dx)`).
- **Coordinate Space**: Page-relative coordinates (`targetX, targetY + scrollY`) so paws scroll naturally with the page rather than following viewport.
- **Color & Opacity**:
  - Light scenes (`data-tone="light"`): Cocoa ink (`#2a170e`) at 35% opacity.
  - Dark scenes (`data-tone="dark"`): Gold (`#f2be6b`) at 45% opacity.
- **Duration**: Fades out smoothly over 3.5s and is garbage collected from memory pool.

---

## 4. Speech Bubble Specifications
- **Appearance**: White pill with 2.5px solid cocoa border (`#2a170e`), 2px 3px drop shadow, handwritten script font (`Shantell Sans`).
- **Spring Entrance**: `scale: 0.4 → 1.05 → 1.0` using `back.out(2)`, duration 320ms.
- **Positioning**: Rendered outside the flipped group so text is never reversed when Teddy faces left (`left: 72%` when facing right, `left: 28%` when facing left).
- **Triggers**:
  1. Journey step 2 photo message: `"ooh, photos!"` (2500ms)
  2. Hero puppy hover: Puppy's name (e.g. `"Max!"`, `"Korean Maltipoo"`)
  3. Clicking Teddy: Randomly cycles `["woof!", "hi, friend!", "treats? 🦴"]`
  4. Footer basket click: `"zzz… woof!"` (2200ms)

---

## 5. Reduced-Motion & Mobile Fallbacks
- `@media (prefers-reduced-motion: reduce)`:
  - Spring travel physics is bypassed.
  - Teddy renders as a static pose directly inside the active section's `.pup-stop`.
  - Paw trail generation is disabled.
  - Only subtle idle blinking is preserved.
- **Mobile Viewports (<768px)**:
  - Mascot scale is adjusted to `0.72×`.
  - Stops snap to safe bottom-right content margins.
  - Travel spring stiffness is increased to `k = 90` for rapid settling on mobile scrolling.
