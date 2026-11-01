import fs from 'fs';

const svg = fs.readFileSync('reference/pup-buddy.svg', 'utf8');

// Print all elements with data-p
const regex = /<(\w+)[^>]*data-p="([^"]+)"[^>]*>/g;
let match;
while ((match = regex.exec(svg)) !== null) {
  console.log('Element:', match[1], 'data-p:', match[2]);
}
