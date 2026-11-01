import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const idx = html.indexOf('tp-lineup--tags');
console.log('tags idx:', idx);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 2500));
}
