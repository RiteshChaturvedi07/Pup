import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const teddyIdx = html.indexOf('tp-hero__teddy');
const svgStart = html.indexOf('<svg', teddyIdx);
const svgEnd = html.indexOf('</svg>', svgStart) + 6;
const svg = html.substring(svgStart, svgEnd);

fs.writeFileSync('reference/hero-mascot-live.svg', svg);
console.log('Saved hero-mascot-live.svg, length:', svg.length);
