import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const idx = html.indexOf('class="pup-buddy');
const end = html.indexOf('</div>', idx + 100);
// Save the mascot SVG to reference/pup-buddy.svg
const svgStart = html.indexOf('<svg', idx);
const svgEnd = html.indexOf('</svg>', svgStart) + 6;

fs.writeFileSync('reference/pup-buddy.svg', html.substring(svgStart, svgEnd));
console.log('Saved reference/pup-buddy.svg, size:', (svgEnd - svgStart));
