import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const nightStart = html.indexOf('questions-title');
console.log(html.slice(nightStart, nightStart + 5000));
