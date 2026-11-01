const fs = require('fs');
const html = fs.readFileSync('reference/home.html', 'utf8');

const stopClasses = [
  'tp-book__teddy',
  'tp-dusk__teddy',
  'tp-night__teddy',
  'tp-house__teddy',
  'tp-basket__pup'
];

for (const sc of stopClasses) {
  const idx = html.indexOf(sc);
  if (idx !== -1) {
    console.log('=== ' + sc + ' ===');
    console.log(html.substring(idx - 150, idx + 250));
  } else {
    console.log('NOT FOUND: ' + sc);
  }
}

