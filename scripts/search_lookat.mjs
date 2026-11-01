import fs from 'fs';

const content = fs.readFileSync('reference/files/177ya708_1zuj.js.download', 'utf8');
const idx = content.indexOf('lookAt:');
if (idx !== -1) {
  console.log(content.substring(idx - 100, idx + 600));
} else {
  const idx2 = content.indexOf('lookAt(');
  console.log('lookAt(:', idx2);
  const idx3 = content.indexOf('lookAt =');
  console.log('lookAt =:', idx3);
}
