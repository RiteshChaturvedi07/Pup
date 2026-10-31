import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

// Find all keyframes with full body
const keyframeRegex = /@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([\s\S]*?)(?=\}\s*@|\}\s*\.[a-zA-Z]|\}\s*#|\}\s*$)/g;
let match;
const keyframes = {};

while ((match = keyframeRegex.exec(css)) !== null) {
  const name = match[1];
  let body = match[2].trim();
  // Ensure balanced braces
  let open = 1;
  let endIdx = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '{') open++;
    else if (body[i] === '}') {
      open--;
      if (open === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx > 0) {
    body = body.slice(0, endIdx);
  }
  keyframes[name] = body;
}

console.log(`Found ${Object.keys(keyframes).length} keyframes.`);
fs.writeFileSync('scripts/analyzed_keyframes.json', JSON.stringify(keyframes, null, 2));

// Extract all transition and animation usages
const animationRules = css.match(/[a-zA-Z0-9_\-\.\#\:\s\[\]=,]+(?=\{[^{}]*animation:[^{}]+\})/g) || [];
console.log(`Found ${animationRules.length} rules with animation property.`);
