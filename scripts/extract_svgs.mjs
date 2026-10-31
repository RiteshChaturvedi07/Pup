import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('reference/home.html', 'utf8');

const svgRegex = /<svg[\s\S]*?<\/svg>/g;
let match;
const svgs = [];

while ((match = svgRegex.exec(html)) !== null) {
  const fullSvg = match[0];
  const index = svgs.length + 1;
  
  // Extract id, class, aria-hidden, role, viewBox, etc.
  const idMatch = fullSvg.match(/id="([^"]+)"/);
  const classMatch = fullSvg.match(/class="([^"]+)"/);
  const viewBoxMatch = fullSvg.match(/viewBox="([^"]+)"/);
  const ariaLabelMatch = fullSvg.match(/aria-label="([^"]+)"/);

  // Check nearby text/context in html
  const snippet = html.slice(Math.max(0, match.index - 200), Math.min(html.length, match.index + fullSvg.length + 200));

  let category = 'other';
  if (snippet.includes('tp-mascot') || fullSvg.includes('mascot') || snippet.includes('tp-pup') || fullSvg.includes('tp-pup')) {
    category = 'mascot';
  } else if (snippet.includes('tp-door') || snippet.includes('tp-doors')) {
    category = 'door';
  } else if (snippet.includes('tp-header') || snippet.includes('tp-logo') || snippet.includes('tp-menu')) {
    category = 'header-nav';
  } else if (snippet.includes('tp-fork') || snippet.includes('tp-sign') || snippet.includes('tp-paths')) {
    category = 'signpost';
  } else if (snippet.includes('tp-flight') || snippet.includes('tp-plane')) {
    category = 'plane';
  } else if (snippet.includes('tp-book') || snippet.includes('tp-passport') || snippet.includes('stamp')) {
    category = 'passport';
  } else if (snippet.includes('tp-basket') || snippet.includes('tp-footer')) {
    category = 'footer';
  } else if (snippet.includes('star') || snippet.includes('tp-star') || fullSvg.includes('star')) {
    category = 'star';
  } else if (snippet.includes('tp-sun') || snippet.includes('tp-moon') || snippet.includes('tp-dusk')) {
    category = 'celestial';
  } else if (snippet.includes('tp-chat') || snippet.includes('phone') || snippet.includes('msg')) {
    category = 'chat';
  } else if (snippet.includes('polaroid') || snippet.includes('pin')) {
    category = 'polaroid';
  }

  svgs.push({
    index,
    id: idMatch ? idMatch[1] : null,
    className: classMatch ? classMatch[1] : null,
    viewBox: viewBoxMatch ? viewBoxMatch[1] : null,
    ariaLabel: ariaLabelMatch ? ariaLabelMatch[1] : null,
    category,
    length: fullSvg.length,
    svg: fullSvg
  });
}

console.log(`Extracted ${svgs.length} SVGs.`);
const counts = {};
svgs.forEach(s => {
  counts[s.category] = (counts[s.category] || 0) + 1;
});
console.log('Category breakdown:', counts);

// Save svgs manifest and individual svg files to reference/svgs/
const svgsDir = path.resolve('reference/svgs');
if (!fs.existsSync(svgsDir)) {
  fs.mkdirSync(svgsDir, { recursive: true });
}

svgs.forEach(s => {
  const name = s.id ? `${s.index.toString().padStart(3, '0')}_${s.id}.svg` :
               s.className ? `${s.index.toString().padStart(3, '0')}_${s.className.split(' ')[0].replace(/[^a-zA-Z0-9_-]/g, '')}.svg` :
               `${s.index.toString().padStart(3, '0')}_${s.category}.svg`;
  fs.writeFileSync(path.join(svgsDir, name), s.svg);
});

fs.writeFileSync('scripts/extracted_svgs.json', JSON.stringify(svgs.map(({ svg, ...rest }) => rest), null, 2));
console.log(`Saved all ${svgs.length} SVGs to reference/svgs/`);
