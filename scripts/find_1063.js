const fs = require('fs');
const code = fs.readFileSync('scripts/mascot_extracted.js', 'utf8');

const idx = code.indexOf(',1063,');
console.log(code.slice(idx + 1800, idx + 4000));
