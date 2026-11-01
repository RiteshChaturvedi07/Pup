import fs from 'fs';

const svg = fs.readFileSync('reference/hero-mascot-live.svg', 'utf8');

// Print all paths and shapes in svg
const pathMatches = svg.match(/<path[^>]+>/g) || [];
console.log('Total paths:', pathMatches.length);
pathMatches.forEach((p, idx) => {
  console.log(`Path ${idx}:`, p);
});
