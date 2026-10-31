import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Match all sections with data-pup-scene
const sceneRegex = /<section[^>]*data-pup-scene[\s\S]*?<\/section>/g;
let match;
let count = 0;

while ((match = sceneRegex.exec(html)) !== null) {
  count++;
  const sectionHtml = match[0];
  const tagMatch = sectionHtml.match(/<section[^>]+>/);
  const tag = tagMatch ? tagMatch[0] : '';
  
  // Extract text without SVGs
  const textClean = sectionHtml
    .replace(/<svg[\s\S]*?<\/svg>/g, ' [SVG] ')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log(`\n========================================`);
  console.log(`SCENE #${count}: ${tag}`);
  console.log(`COPY/TEXT:\n${textClean.slice(0, 500)}...`);
}
