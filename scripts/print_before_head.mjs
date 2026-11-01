import fs from 'fs';

const svg = fs.readFileSync('reference/pup-buddy.svg', 'utf8');
const headIdx = svg.indexOf('data-p="head"');
console.log(svg.substring(0, headIdx));
