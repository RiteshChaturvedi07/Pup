const fs = require('fs');
const c = fs.readFileSync('scripts/pup_engine_extracted.js', 'utf8');
const idx = c.indexOf('meet-title');
const start = c.lastIndexOf('function', c.lastIndexOf('function', c.lastIndexOf('function', idx) - 1) - 1);
console.log(c.substring(start, idx));

