import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const start = html.indexOf('<div class="tp-hero__stage">');
const end = html.indexOf('</section>', start);

console.log('--- HERO STAGE ---');
console.log(html.substring(start, end));
