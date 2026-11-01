import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const regex = /<li class="tp-lineup__seat" style="([^"]+)">([\s\S]*?)<\/li>/g;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null && i < 6) {
  console.log(`\n=== SEAT ${i} ===`);
  console.log('STYLE:', match[1]);
  // extract pup link & label
  const aMatch = match[2].match(/<a class="tp-lineup__pup"[^>]*aria-label="([^"]+)"[^>]*href="([^"]+)"/);
  if (aMatch) {
    console.log('LABEL:', aMatch[1]);
    console.log('HREF:', aMatch[2]);
  }
  const imgMatch = match[2].match(/<img [^>]*src="([^"]+)"/);
  if (imgMatch) {
    console.log('IMG:', imgMatch[1]);
  }
  i++;
}
