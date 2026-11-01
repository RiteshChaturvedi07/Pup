import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');
const start = css.indexOf('.tp-lineup__name');
console.log(css.substring(start, start + 2000));
