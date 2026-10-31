import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const duskStart = html.indexOf('tp-dusk');
const nightStart = html.indexOf('tp-night');
const duskHtml = html.slice(duskStart, nightStart);

const classes = duskHtml.match(/class="[^"]+"/g) || [];
console.log('Classes in dusk:');
console.log([...new Set(classes.map(c => c.slice(7, -1).split(' ')).flat())]);

// Let's find img tags in dusk
const imgs = duskHtml.match(/<img[^>]+>/g) || [];
console.log(`Found ${imgs.length} images in dusk:`);
imgs.forEach((img, i) => console.log(`Img ${i+1}:`, img));
