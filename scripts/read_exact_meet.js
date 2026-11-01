const fs = require('fs');
const c = fs.readFileSync('scripts/pup_engine_extracted.js', 'utf8');
const idx = c.indexOf('--floor-x');
const start = c.lastIndexOf('function', idx);
const end = c.indexOf('},91360', idx);
console.log(c.substring(start, end));

