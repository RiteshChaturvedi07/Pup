const fs = require('fs');
const code = fs.readFileSync('scripts/module_91360_mascot.js', 'utf8');

const idx = code.indexOf('eb=(e,t)=>{');
console.log(code.slice(idx, idx + 3500));

