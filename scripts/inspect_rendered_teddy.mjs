import fs from 'fs';

const res = await fetch('http://localhost:3000/');
const html = await res.text();
const idx = html.indexOf('tp-hero__teddy');
console.log(html.substring(idx - 50, idx + 2000));
