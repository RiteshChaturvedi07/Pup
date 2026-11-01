import fs from 'fs';

const svg = fs.readFileSync('reference/hero-mascot-live.svg', 'utf8');

const ledgeIdx = svg.indexOf('data-p="ledge"');
console.log('--- LEDGE MARKUP ---');
console.log(svg.substring(ledgeIdx - 50, ledgeIdx + 500));
