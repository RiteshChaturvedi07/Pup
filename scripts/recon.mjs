import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('reference/home.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('HTML Total length:', html.length);

// 1. Check fonts
console.log('\n--- FONTS & CSS LINKS ---');
const fontMatches = html.match(/[^"'\s>]+\.woff2[^"'\s>]*/g) || [];
console.log('Font matches (.woff2):', [...new Set(fontMatches)]);

const linkMatches = html.match(/<link[^>]+>/g) || [];
console.log('Link tags with font/preload/stylesheet:');
linkMatches.filter(l => l.includes('font') || l.includes('stylesheet')).forEach(l => console.log('  ', l));

// 2. Check CSS variables & styles
console.log('\n--- CSS VARIABLES & COLORS ---');
const varMatches = html.match(/--[a-zA-Z0-9_-]+:\s*[^;]+;/g) || [];
console.log('CSS variables found directly in HTML:', [...new Set(varMatches)].slice(0, 30));

// Check in reference/files for css
const filesDir = path.resolve('reference/files');
if (fs.existsSync(filesDir)) {
  const cssFiles = fs.readdirSync(filesDir).filter(f => f.endsWith('.css'));
  console.log('CSS files in reference/files:', cssFiles);
  for (const cf of cssFiles) {
    const cssContent = fs.readFileSync(path.join(filesDir, cf), 'utf8');
    const cssVars = cssContent.match(/--[a-zA-Z0-9_-]+:\s*[^;{}]+;/g) || [];
    console.log(`Variables in ${cf}:`, [...new Set(cssVars)].slice(0, 30));
    const fontFaces = cssContent.match(/@font-face\s*\{[^}]+\}/g) || [];
    console.log(`@font-face in ${cf}:`, fontFaces.length);
    fontFaces.forEach(ff => console.log('   FONT-FACE:', ff));
  }
}

// 3. Check sections and scenes
console.log('\n--- SECTIONS & SCENES ---');
const sectionMatches = html.match(/<section[^>]+>/g) || [];
sectionMatches.forEach((s, i) => console.log(`Section ${i}:`, s));

// 4. Check links & routes (footer, nav, etc.)
console.log('\n--- LINKS & ROUTES ---');
const hrefMatches = html.match(/href="([^"]+)"/g) || [];
const hrefs = [...new Set(hrefMatches.map(h => h.replace(/href="([^"]+)"/, '$1')))];
console.log('All distinct hrefs:');
hrefs.forEach(h => console.log('  ', h));

// 5. Check SVGs
console.log('\n--- SVGS ---');
const svgMatches = html.match(/<svg[\s\S]*?<\/svg>/g) || [];
console.log('Total SVG count:', svgMatches.length);

// 6. Check Images
console.log('\n--- IMAGES ---');
const imgMatches = html.match(/<img[^>]+>/g) || [];
console.log('Total img tags:', imgMatches.length);
const srcMatches = html.match(/src="([^"]+)"/g) || [];
const distinctSrcs = [...new Set(srcMatches.map(s => s.replace(/src="([^"]+)"/, '$1')))];
console.log('Image srcs:');
distinctSrcs.filter(s => s.includes('media') || s.includes('jpeg') || s.includes('webp') || s.includes('png') || s.includes('_next')).forEach(s => console.log('  ', s));

// 7. Check Data Attributes
console.log('\n--- DATA ATTRIBUTES ---');
const dataAttrMatches = html.match(/data-[a-zA-Z0-9_-]+(=["'][^"']*["'])?/g) || [];
const distinctAttrs = [...new Set(dataAttrMatches.map(d => d.split('=')[0]))];
console.log('Distinct data attributes:', distinctAttrs);
