import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const teddyStart = html.indexOf('class="tp-hero__teddy');
console.log('teddyStart:', teddyStart);
const start = html.lastIndexOf('<div', teddyStart);
const end = html.indexOf('</div>', teddyStart + 100);

console.log(html.substring(start, start + 4500));
