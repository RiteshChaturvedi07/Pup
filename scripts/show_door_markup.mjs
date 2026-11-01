import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const idx = html.indexOf('tp-door ');
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 2500));
}

