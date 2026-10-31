import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('reference/home.html', 'utf8');
const woffs = html.match(/https?:\/\/[^\s"'<>]+\.woff2[^\s"'<>]*/g) || [];
console.log('Woff2 links in HTML:', woffs);

// Also look for font family definitions in CSS files
const cssFiles = fs.readdirSync('reference/files').filter(f => f.endsWith('.css'));
for (const file of cssFiles) {
  const content = fs.readFileSync(path.join('reference/files', file), 'utf8');
  console.log(`\n=== File: ${file} ===`);
  const fontFaces = content.match(/@font-face\s*\{[^}]+\}/gi) || [];
  console.log(`Found ${fontFaces.length} @font-face rules`);
  fontFaces.forEach((ff, i) => {
    console.log(`--- Font Face #${i+1} ---`);
    console.log(ff);
  });
  
  // Look for font-family properties
  const fontFamilies = content.match(/font-family:[^;]+;/gi) || [];
  const uniqueFamilies = [...new Set(fontFamilies)];
  console.log('Unique font families used:');
  uniqueFamilies.forEach(f => console.log('  ', f));
}

// Let's also check html style tags or font classes
const fontClasses = html.match(/class="[^"]*font[^"]*"/gi) || [];
console.log('\nFont classes in HTML:', [...new Set(fontClasses)].slice(0, 20));
