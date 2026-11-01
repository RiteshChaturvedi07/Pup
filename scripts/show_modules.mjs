import fs from 'fs';

const c = fs.readFileSync('scripts/mascot_extracted.js', 'utf8');

function showModule(modId) {
  const marker = `,${modId},`;
  const idx = c.indexOf(marker);
  if (idx === -1) {
    console.log('Not found:', modId);
    return;
  }
  console.log(`=== Module ${modId} ===`);
  console.log(c.substring(idx, idx + 3500));
}

showModule(1063);
showModule(8478);

