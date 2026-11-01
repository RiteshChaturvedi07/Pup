import fs from 'fs';
import path from 'path';

const filesDir = 'reference/files';
const files = fs.readdirSync(filesDir);
for (const file of files) {
  if (file.endsWith('.css')) {
    const content = fs.readFileSync(path.join(filesDir, file), 'utf8');
    const classes = ['tp-hero', 'tp-lineup', 'tp-quilt', 'pup-bubble', 'tp-hero__stage', 'tp-lineup__seat', 'tp-lineup__pup', 'tp-lineup__photo', 'tp-hero__teddy'];
    console.log(`Checking ${file}:`);
    for (const cls of classes) {
      let idx = 0;
      while ((idx = content.indexOf('.' + cls, idx)) !== -1) {
        console.log(`\n=== MATCH .${cls} ===`);
        console.log(content.substring(idx, idx + 500));
        idx += cls.length + 1;
        break;
      }
    }
  }
}
