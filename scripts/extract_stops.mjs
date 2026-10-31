import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Match pup-stop elements and their attributes
const stopRegex = /<([a-z0-9]+)\s+([^>]*class="[^"]*pup-stop[^"]*"[^>]*)>/gi;
let match;
let count = 0;

while ((match = stopRegex.exec(html)) !== null) {
  count++;
  const tag = match[1];
  const attrs = match[2];
  
  // Extract key data attributes
  const dataStop = /data-pup-stop(?:="([^"]*)")?/.test(attrs);
  const pose = attrs.match(/data-pose="([^"]*)"/)?.[1];
  const facing = attrs.match(/data-facing="([^"]*)"/)?.[1];
  const act = attrs.match(/data-act="([^"]*)"/)?.[1];
  const behind = /data-behind/.test(attrs);
  const lane = /data-lane/.test(attrs);
  const className = attrs.match(/class="([^"]*)"/)?.[1];
  const style = attrs.match(/style="([^"]*)"/)?.[1];
  
  // Get surrounding HTML snippet for context (300 chars before)
  const startIdx = Math.max(0, match.index - 250);
  const context = html.slice(startIdx, match.index).replace(/<svg[\s\S]*?<\/svg>/gi, '[SVG]');

  console.log(`\n--- STOP #${count} ---`);
  console.log(`Tag: <${tag}>`);
  console.log(`Class: ${className}`);
  console.log(`Pose: ${pose}, Facing: ${facing}, Act: ${act}, Behind: ${behind}, Lane: ${lane}`);
  console.log(`Style: ${style}`);
  console.log(`Context: ${context.slice(-180).trim()}`);
}
