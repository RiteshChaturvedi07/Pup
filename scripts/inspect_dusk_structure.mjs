import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const duskStart = html.indexOf('tp-dusk');
const nightStart = html.indexOf('tp-night');
const duskHtml = html.slice(duskStart, nightStart);

// find where the images are placed
const parts = duskHtml.split('<img');
for (let i = 1; i < parts.length; i++) {
  const preceding = parts[i-1].slice(-200);
  const tag = '<img' + parts[i].slice(0, parts[i].indexOf('>'));
  const following = parts[i].slice(parts[i].indexOf('>'), parts[i].indexOf('>') + 250);
  console.log(`\n--- Item ${i} ---`);
  console.log('Preceding:', preceding);
  console.log('Tag:', tag);
  console.log('Following:', following);
}
