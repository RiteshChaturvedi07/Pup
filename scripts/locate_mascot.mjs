import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const idx = html.indexOf('data-p="ledge"');
console.log('ledge idx:', idx);
if (idx !== -1) {
  const svgStart = html.lastIndexOf('<svg', idx);
  const divStart = html.lastIndexOf('<div', svgStart);
  const divEnd = html.indexOf('</div>', idx + 500);
  console.log('CONTAINER:');
  console.log(html.substring(divStart, svgStart));
  console.log('SVG LENGTH:', divEnd - svgStart);
}
