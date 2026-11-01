const fs = require('fs');
const content = fs.readFileSync('scripts/mascot_beautified.js', 'utf8');
const lines = content.split('\n');

console.log('=== LINES 1 to 60 ===');
for (let i = 0; i < 60 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
