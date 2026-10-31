import fs from 'fs';

// Read the original css
const origCss = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

// Build clean globals.css
let globals = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: var(--font-figtree), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-hand: var(--font-shantell), ui-rounded, "Comic Sans MS", cursive;

  --color-toffee: #c2622b;
  --color-toffee-deep: #a24a1a;
  --color-toffee-ink: #8e3f15;
  --color-honey: #f2be6b;
  --color-honey-soft: #fbe3b4;
  --color-cocoa: #2a170e;
  --color-cocoa-soft: #5a3a28;
  --color-milk: #fffdf8;
  --color-sky: #bfddf5;
  --color-sky-deep: #2f6e9e;
  --color-blush: #f9cdbf;

  --ease-pounce: cubic-bezier(.34, 1.56, .64, 1);
  --ease-silk: cubic-bezier(.22, 1, .36, 1);
  --ease-snap: cubic-bezier(.7, 0, .2, 1);

  --gutter: clamp(1rem, 4vw, 3.5rem);
  --header-h: 4.75rem;
  --bar-h: 0px;
}

@media (max-width: 1023px) {
  :root {
    --header-h: 4rem;
    --bar-h: calc(4rem + env(safe-area-inset-bottom));
  }
}

/* Base custom styles & classes */
.gutter {
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.text-huge {
  font-size: clamp(2.2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.font-plush {
  font-family: var(--font-fraunces), ui-serif, Georgia, serif;
}

.font-scrawl {
  font-family: var(--font-shantell), ui-rounded, "Comic Sans MS", cursive;
}

/* Scene transitions */
.tp-scene {
  position: relative;
  background: linear-gradient(180deg, var(--sky-top) 0%, var(--sky-bottom) 100%);
  transition: background 0.6s ease;
}

/* Appended original animations & tp component styles */
`;

// Extract all @keyframes from original CSS
const keyframeMatches = origCss.match(/@keyframes[^{]+{(?:[^{}]+|{[^{}]+})*}/g) || [];
console.log(`Found ${keyframeMatches.length} keyframes to include`);
globals += '\n/* Keyframes */\n' + keyframeMatches.join('\n\n') + '\n';

// Extract all .tp- rules from original CSS
const tpRules = origCss.match(/\.tp-[^{]+{(?:[^{}]+|{[^{}]+})*}/g) || [];
console.log(`Found ${tpRules.length} tp- rules to include`);
globals += '\n/* TP Rules */\n' + tpRules.join('\n') + '\n';

fs.writeFileSync('app/globals.css', globals);
console.log('Successfully generated app/globals.css, total size:', globals.length);
