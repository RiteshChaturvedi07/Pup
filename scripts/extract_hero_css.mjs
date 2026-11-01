import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

// Find all rules starting around .tp-hero
const start = css.indexOf('.tp-hero{');
const end = css.indexOf('.tp-scene--light', start);

console.log('--- HERO CSS RULES ---');
console.log(css.substring(start, start + 3500));
