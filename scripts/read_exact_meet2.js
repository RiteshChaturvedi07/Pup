const fs = require('fs');
const c = fs.readFileSync('scripts/pup_engine_extracted.js', 'utf8');
const idx = c.indexOf('--floor-x');
const start = c.lastIndexOf('function', c.lastIndexOf('function', idx) - 1);
const end = idx + 100;
console.log(c.substring(start, end));

