const fs = require('fs');
const code = fs.readFileSync('scripts/module_91360_mascot.js', 'utf8');

const idx = code.indexOf('eb=');
if (idx !== -1) {
  console.log(code.slice(idx - 50, idx + 800));
} else {
  const match = code.match(/function [a-zA-Z0-9_$]*eb/);
  console.log('Match:', match);
}

