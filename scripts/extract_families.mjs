import fs from 'fs';

const flight = fs.readFileSync('scripts/flight_data.txt', 'utf8');

// Find all polaroids in flight data or html
const html = fs.readFileSync('reference/home.html', 'utf8');

// Search for polaroid elements in home.html
// tp-polaroid or tp-dusk
const duskStart = html.indexOf('tp-dusk');
const nightStart = html.indexOf('tp-night');
const duskHtml = html.slice(duskStart, nightStart);

console.log('tp-dusk length:', duskHtml.length);

// Extract polaroid images and captions/names
const polaroidRegex = /<li[^>]*class="[^"]*tp-polaroid[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let match;
const polaroids = [];

while ((match = polaroidRegex.exec(duskHtml)) !== null) {
  const item = match[0];
  const imgMatch = item.match(/<img[^>]+>/);
  const captionMatch = item.match(/<span[^>]*tp-polaroid__caption[^>]*>([\s\S]*?)<\/span>/) || item.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/) || item.match(/<span[^>]*font-scrawl[^>]*>([\s\S]*?)<\/span>/);
  
  polaroids.push({
    index: polaroids.length + 1,
    img: imgMatch ? imgMatch[0] : '',
    caption: captionMatch ? captionMatch[1].replace(/<[^>]+>/g, '').trim() : ''
  });
}

console.log(`Found ${polaroids.length} polaroids in tp-dusk:`);
polaroids.forEach(p => console.log(p));
