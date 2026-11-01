const fs = require('fs');
const code = fs.readFileSync('scripts/module_89681_actor.js', 'utf8');

const idx = code.indexOf('tick(e,t){');
console.log(code.slice(idx, idx + 1800));
