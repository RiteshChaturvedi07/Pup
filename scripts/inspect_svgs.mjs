import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/extracted_svgs.json', 'utf8'));
data.forEach(d => {
  console.log(`#${d.index}: id=${d.id} class=${d.className} viewBox=${d.viewBox} len=${d.length}`);
});
