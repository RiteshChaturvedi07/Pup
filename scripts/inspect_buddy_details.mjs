import fs from 'fs';

const svg = fs.readFileSync('reference/pup-buddy.svg', 'utf8');
console.log('--- SVG LENGTH ---', svg.length);
// print from data-p="head" to end
const headIdx = svg.indexOf('data-p="head"');
console.log(svg.substring(headIdx));
