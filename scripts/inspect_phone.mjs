import fs from 'fs';
const html = fs.readFileSync('scripts/journey_exact.html', 'utf8');
const start = html.indexOf('<div class="tp-phone__screen">');
const end = html.indexOf('<a class="tp-phone__compose"');
if (start !== -1 && end !== -1) {
  console.log(html.slice(start, end));
} else {
  console.log('Not found');
}

