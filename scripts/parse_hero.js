const fs = require('fs');
const html = fs.readFileSync('scripts/hero_exact.html', 'utf8');
const seats = html.match(/<li class="tp-lineup__seat"[\s\S]*?<\/li>/g);
console.log('Total seats matched:', seats.length);
seats.forEach((s, i) => {
  console.log('--- SEAT', i, '---');
  console.log(s.substring(0, 300));
});
