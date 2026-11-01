import fs from 'fs';
const html = fs.readFileSync('reference/home.html', 'utf8');
const files = fs.readdirSync('reference/files');
console.log('Files with cursor in name:', files.filter(f => f.includes('cursor') || f.includes('paw')));
const cursorMatches = html.match(/[^\s"']*cursor[^\s"']*/gi);
console.log('cursor matches in html:', cursorMatches);
