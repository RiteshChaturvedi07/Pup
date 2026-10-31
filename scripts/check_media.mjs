import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Find all /media/... paths
const regex = /\/media\/[a-zA-Z0-9_\-\/.]+/g;
const matches = html.match(regex) || [];

// Also check for encoded ones: %2Fmedia%2F...
const encodedRegex = /%2Fmedia%2F[a-zA-Z0-9_\-\%]+/g;
const encodedMatches = (html.match(encodedRegex) || []).map(m => decodeURIComponent(m));

const allMedia = [...new Set([...matches, ...encodedMatches])].filter(p => p.includes('.'));
console.log('Found', allMedia.length, 'unique media files referenced:');
allMedia.forEach(m => console.log('  ', m));

// Also find any brand or icon images
const brandMatches = html.match(/\/brand\/[a-zA-Z0-9_\-\/.]+/g) || [];
console.log('Brand matches:', [...new Set(brandMatches)]);

// Check what local files exist in reference/files
const localFiles = fs.readdirSync('reference/files');
console.log(`\nFound ${localFiles.length} files in reference/files`);
