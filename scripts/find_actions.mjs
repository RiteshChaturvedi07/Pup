import fs from 'fs';

const c = fs.readFileSync('scripts/mascot_extracted.js', 'utf8');
const i2 = c.indexOf('peekaboo:');
if (i2 !== -1) {
  console.log(c.substring(i2 - 50, i2 + 2500));
} else {
  // search for M=
  const matches = [...c.matchAll(/([a-zA-Z0-9_]+)\s*:\s*function\s*\(/g)];
  console.log(matches.slice(0, 10).map(m => m[0]));
}

