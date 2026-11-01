import fs from 'fs';

const content = fs.readFileSync('reference/files/177ya708_1zuj.js.download', 'utf8');
const idx = content.indexOf('removeEventListener("pointermove"');
console.log(content.substring(Math.max(0, idx - 1500), idx + 800));
