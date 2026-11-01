import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const idx = html.indexOf('tp-hero__stage');
const teddyIdx = html.indexOf('tp-hero__teddy', idx);
console.log(html.substring(teddyIdx - 50, teddyIdx + 3000));
