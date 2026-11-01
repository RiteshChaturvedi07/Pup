import fs from 'fs';

const c = fs.readFileSync('scripts/mascot_extracted.js', 'utf8');

function showModuleFull(modId) {
  const marker = `,${modId},`;
  const idx = c.indexOf(marker);
  if (idx === -1) {
    console.log('Not found:', modId);
    return;
  }
  const nextIdx = c.indexOf(',e=>{', idx + marker.length);
  const end = nextIdx !== -1 ? nextIdx : idx + 5000;
  console.log(`=== Module ${modId} (length: ${end - idx}) ===`);
  console.log(c.substring(idx, end));
}

showModuleFull(73459);
showModuleFull(4740);

