import fs from 'fs';

const c = fs.readFileSync('scripts/mascot_extracted.js', 'utf8');

// Find all module boundaries or exports
const modules = c.split(/,\s*(\d{4,5})\s*,\s*e\s*=>\s*\{/);
console.log('Total modules split:', modules.length);

for (let i = 0; i < modules.length; i += 2) {
  const modId = i === 0 ? 'header' : modules[i - 1];
  const modCode = modules[i];
  console.log(`Module ${modId}: length ${modCode?.length}`);
  if (modCode?.includes('lookAt') || modCode?.includes('PupBuddy') || modCode?.includes('Path2D') || modCode?.includes('ellipse')) {
    console.log(`  -> contains key mascot code`);
  }
}

