import fs from 'fs';
import path from 'path';

const filesDir = 'reference/files';
const files = fs.readdirSync(filesDir);
for (const file of files) {
  if (file.endsWith('.js.download')) {
    const content = fs.readFileSync(path.join(filesDir, file), 'utf8');
    if (content.includes('eyes') || content.includes('data-p="eyes"') || content.includes('pup-buddy')) {
      console.log(`Found in ${file}`);
      // find index of 'eyes' or 'pup-buddy'
      let idx = content.indexOf('eyes');
      if (idx !== -1) {
        console.log('Snippet around eyes:');
        console.log(content.substring(Math.max(0, idx - 200), idx + 300));
      }
      idx = content.indexOf('pup-buddy');
      if (idx !== -1) {
        console.log('Snippet around pup-buddy:');
        console.log(content.substring(Math.max(0, idx - 200), idx + 300));
      }
    }
  }
}
