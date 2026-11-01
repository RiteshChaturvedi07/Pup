import fs from 'fs';

const c = fs.readFileSync('reference/files/177ya708_1zuj.js.download', 'utf8');
const i2 = c.indexOf('"F",0,');
if (i2 !== -1) {
  console.log(c.substring(i2, i2 + 2500));
}

