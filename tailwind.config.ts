import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          DEFAULT: '#2a170e',
          soft: '#5a3a28',
          deep: '#1a0d07',
        },
        honey: {
          DEFAULT: '#f2be6b',
          soft: '#fbe3b4',
          deep: '#e4a352',
          light: '#f7d18d',
        },
        milk: {
          DEFAULT: '#fffdf8',
          warm: '#fff1d8',
        },
        toffee: {
          DEFAULT: '#c2622b',
          deep: '#a24a1a',
          ink: '#8e3f15',
        },
        blush: '#f9cdbf',
        rose: '#e98c8c',
        rust: '#a24a1a',
        dusk: '#a65a30',
        night: '#4d2b19',
        midnight: '#24130b',
      },
      fontFamily: {
        plush: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'sans-serif'],
        scrawl: ['var(--font-shantell)', 'Comic Sans MS', 'cursive'],
      },
      fontSize: {
        huge: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1' }],
      },
      transitionTimingFunction: {
        pounce: 'cubic-bezier(.34, 1.56, .64, 1)',
        silk: 'cubic-bezier(.22, 1, .36, 1)',
        snap: 'cubic-bezier(.7, 0, .2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
