import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

// Find all root/css variables
const rootVars = css.match(/--[a-zA-Z0-9_-]+:[^;{}]+/g) || [];
console.log('Total CSS variables found:', rootVars.length);
const uniqueVars = [...new Set(rootVars.map(v => v.trim()))];
console.log('\n--- CSS VARIABLES ---');
uniqueVars.forEach(v => console.log('  ', v));

// Find keyframes
const keyframes = css.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g) || [];
console.log('\n--- KEYFRAMES ---');
console.log([...new Set(keyframes)]);

// Find all .tp- classes
const tpClasses = css.match(/\.tp-[a-zA-Z0-9_-]+/g) || [];
console.log('\n--- TP CLASSES ---');
const uniqueTp = [...new Set(tpClasses)].sort();
console.log(`Found ${uniqueTp.length} unique tp- classes:`);
console.log(uniqueTp);
