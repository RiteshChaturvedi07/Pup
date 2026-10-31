# Prompts Used

## Initial Prompt (Phase 0 Kickoff)

```markdown
# TeddyPups clone — Antigravity prompt (works in Gemini CLI / Cursor / Copilot too)

You are a senior front-end engineer. Build a faithful clone of https://puppy.instabizweb.com/ (TeddyPups U.A.E., premium teacup puppies in Dubai) as a hiring assignment. I will explain every decision in a video, so keep the code clean, simple and commented. Make design and architecture decisions yourself; do not ask me questions mid-phase. At the end of each phase give a 5-line summary and stop.

### Ground truth you MUST use
`reference/home.html` is the real rendered HTML of the original homepage. Read it in chunks (it is ~450 KB on a single line, so use grep/sed/node scripts to slice it, never open it whole). Reuse its exact copy text, its inline SVG illustrations (mascot, doors, signpost, plane, passport, stars, etc., ~109 SVGs), class naming idea (`tp-*`), data-attributes and image paths. Do not invent copy.
Original stack: Next.js (App Router, Turbopack) with `next/image` and 3 `next/font` variable fonts, plain CSS with CSS variables, custom scroll-driven JS. Use the same: **Next.js + TypeScript + Tailwind (or CSS modules) + GSAP ScrollTrigger or Framer Motion**.

### Facts already extracted from the source
- Routes: `/`, `/puppies` (filters `?breed=maltipoo|pomeranian|poodle|cavapoo|shih-tzu` and `?origin=local|imported`), `/puppies/[slug]`, `/happy-families`, `/how-it-works` (anchor `#delivery`), `/faq`, `/contact`, plus "Gone home" listing (find its URL by reading the footer links in the HTML). Add a styled 404.
- 15 puppy slugs: maltipoo-max-male, korean-teacup-maltipoo-female, korean-teacup-poodle-female, maltipoo-cavapoo-male, toy-poodle-male-female, maltipoo-female-2, maltipoo-female-1, maltipoo-female, pomeranian-female, copper-male, shitzu-male, shitzu-female, korean-teacup-pomeranian, korean-teacup-pomeranian-1, korean-teacup-pomeranian-male. Extract each one's name, breed, sex, age, video flag, image from the HTML into `/data/puppies.ts`.
- WhatsApp: `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.` Phone +971 54 167 6733. Email teddypupsadmin@gmail.com. Downtown Dubai, UAE. Socials: Instagram, TikTok, Facebook. Title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai". theme-color #fffdf8.
- Palette seen in the source (confirm by grepping): ink/brown `#2a170e`, gold `#f2be6b`, `#e4a352`, cream `#fffdf8`, `#fff1d8`, `#fbe3b4`, `#f7d18d`, `#f0b866`, peach `#f9b9a6`, rose `#e98c8c`, rust `#a24a1a`, deep red-brown `#6b2a1c`, `#a65a30`, `#4d2b19`, `#2f1a10`, `#24130b`.
- Page = 8 "scenes" (`<section data-pup-scene data-tone>`), each with a sky gradient (`--sky-top` → `--sky-bottom`) so the background travels from cream to chocolate like day to night:
  1. hero `tp-hero` #fffdf8 → #fff1d8 (light)
  2. meet the pups `tp-meet` #fff1d8 → #fbe3b4 (light)
  3. two ways `tp-paths` #fbe3b4 → #f7d18d (light)
  4. journey/chat `tp-chat` #f7d18d → #f0b866 (light)
  5. passport/trust `tp-passport` #f0b866 → #a65a30 (light)
  6. happy families `tp-dusk` #a65a30 → #4d2b19 (dark)
  7. FAQ `tp-night` #4d2b19 → #2f1a10 (dark)
  8. closing CTA `tp-home` #2f1a10 → #24130b (dark) + footer
- Header: fixed, has states `data-scrolled` and `data-hidden` (hides on scroll down, shows on scroll up). CSS vars `--header-h`, `--bar-h` (mobile bottom WhatsApp/Call bar, `data-whatsapp-bar`).
- A mascot (apricot teddy puppy) has `data-pose` and `data-facing`, walks between `data-pup-stop` points, looks at things (`data-pup-look`), and meets a friend (`data-pup-friend`). Sections use `data-reveal`, `data-pin-range` (pinned scroll ranges), `data-treadmill`, `data-lane` (the door corridor moves horizontally while pinned), `data-step`/`data-act` (journey stepper synced with the phone chat), `data-open` (accordion/menu).
- Home sections in order: hero with 6 arch windows + mascot + breed bubbles; banner photo; "Meet the pups" door corridor (15 doors, "Available" tags, "Meet them all"); "Two ways to meet your puppy" signpost (Dubai showroom / flying plane from Korea); "Your puppy journey" 3 steps + phone WhatsApp mockup; "Why families trust TeddyPups" passport book (4 points); "Happy families & puppies" sun + testimonial (Sarah M., Dubai) + 9 polaroids; "Questions, answered" 3 FAQs; "Ready to meet your new best friend?" CTA; footer "Home, at last." with moon/stars and basket.

### Rules
1. Inspect before building: write `RECON.md` first (routes, tokens, scene list, SVG inventory, fonts — find the 3 `.woff2` font files referenced in the HTML and identify the closest Google Fonts: one chunky display serif, one body sans, one handwritten script).
2. Download images to `/public/media` (the original paths look like `/media/<id>/<hash>/b942a5_...mv2.webp`; fetch from `https://puppy.instabizweb.com` + that path). If network is blocked, use placeholders with the same aspect ratios and tell me which files I must add.
3. Compare your result with the live site using the browser tool at 375, 768, 1440 widths and fix differences. Respect `prefers-reduced-motion`.
4. Keep `PROGRESS.md` and `PROMPTS_USED.md` updated. Small git commits.
5. No hotlinking, no paid services, no secrets.

### Phases (do ONE per message)
- **Phase 0**: RECON.md + extract data files + download assets.
- **Phase 1**: scaffold Next.js, fonts, tokens, header (hide on scroll), mobile menu ("where to, friend?"), footer, bottom bar, WhatsApp chat widget, routing skeleton.
- **Phase 2**: all home sections, static and responsive, using the extracted SVGs.
- **Phase 3**: scroll scenes — sky gradient progression, door corridor, plane path, stepper + phone, passport, polaroids, mascot walking, sun/moon/stars.
- **Phase 4**: `/puppies` with filters, `/puppies/[slug]`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, `/gone-home`, 404, SEO metadata, sitemap.
- **Phase 5**: QA (build, lint, Lighthouse, broken links, no horizontal overflow on mobile).
- **Phase 6**: deploy to Vercel, push to GitHub, README, `LOOM_SCRIPT.md`.

Start with Phase 0 now.
```
