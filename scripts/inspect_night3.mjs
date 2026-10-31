import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const nightStart = html.indexOf('tp-night__teddy');
console.log(html.slice(nightStart + 1500, nightStart + 5500));
