const fs = require('fs');
const html = fs.readFileSync('scripts/journey_exact.html', 'utf8');

const regex = /<div class="tp-msg[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('--- MSG ---');
  console.log(text);
}

const meRegex = /<p class="tp-msg tp-msg--me">([\s\S]*?)<\/p>/g;
while ((match = meRegex.exec(html)) !== null) {
  console.log('--- ME MSG ---', match[1].trim());
}

