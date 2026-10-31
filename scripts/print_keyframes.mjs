import fs from 'fs';

const kfs = JSON.parse(fs.readFileSync('scripts/analyzed_keyframes.json', 'utf8'));
for (const [name, body] of Object.entries(kfs)) {
  console.log(`\n=== @keyframes ${name} ===`);
  console.log(body);
}
