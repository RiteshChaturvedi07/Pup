import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

const curtainMatches = css.match(/(\.tp-curtain[^{}]*|\.tp-runner[^{}]*|@keyframes tp-runner[^{}]*|@keyframes tp-curtain[^{}]*)\{[^{}]+\}/g) || [];
console.log('Curtain matches:', curtainMatches.length);
fs.writeFileSync('scripts/curtain_extracted.css', curtainMatches.join('\n'));
console.log('Wrote scripts/curtain_extracted.css');

