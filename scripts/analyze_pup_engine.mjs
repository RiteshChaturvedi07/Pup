import fs from 'fs';

const code = fs.readFileSync('scripts/pup_engine_extracted.js', 'utf8');

// Search for strings and component names
const matches = code.match(/["'][A-Za-z0-9_]+["']/g) || [];
const unique = [...new Set(matches.map(m => m.slice(1, -1)))];

const interesting = unique.filter(s => 
  s.toLowerCase().includes('pup') || 
  s.toLowerCase().includes('mascot') || 
  s.toLowerCase().includes('buddy') || 
  s.toLowerCase().includes('stop') ||
  s.toLowerCase().includes('peek') ||
  s.toLowerCase().includes('walk') ||
  s.toLowerCase().includes('paw') ||
  s.toLowerCase().includes('teddy')
);

console.log('Interesting tokens:', interesting);

