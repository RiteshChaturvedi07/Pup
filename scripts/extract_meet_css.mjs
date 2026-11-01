import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

// Find all rules starting with .tp-meet or .tp-door
const matches = css.match(/(\.tp-meet[^{}]*|\.tp-door[^{}]*)\{[^{}]+\}/g) || [];
console.log('Total rules found:', matches.length);
fs.writeFileSync('scripts/meet_doors_extracted.css', matches.join('\n'));
console.log('Wrote scripts/meet_doors_extracted.css');

