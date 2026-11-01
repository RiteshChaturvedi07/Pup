const fs = require('fs');
const html = fs.readFileSync('scripts/journey_exact.html', 'utf8');

const regex = /<div class="tp-msg-group"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  console.log(`=== GROUP ${i++} ===`);
  console.log(m[1].slice(0, 500));
}

