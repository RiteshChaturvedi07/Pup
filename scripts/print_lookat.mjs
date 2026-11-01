import fs from 'fs';

const content = fs.readFileSync('reference/files/177ya708_1zuj.js.download', 'utf8');
console.log(content.substring(22000, 24000));
