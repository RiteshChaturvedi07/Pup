import fs from 'fs';

const svg = fs.readFileSync('reference/pup-buddy.svg', 'utf8');
const happy = svg.match(/data-p="happy"[^>]*d="([^"]+)"/);
const shut = svg.match(/data-p="shut"[^>]*d="([^"]+)"/);
console.log('happy:', happy ? happy[1] : null);
console.log('shut:', shut ? shut[1] : null);
