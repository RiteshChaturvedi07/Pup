const fs = require('fs');

const css1 = fs.readFileSync('app/globals.css', 'utf8');
const css2 = fs.readFileSync('app/authentic-scenes.css', 'utf8');
const allCss = css1 + '\n' + css2;

const rules = allCss.split('}');
for (const r of rules) {
  const parts = r.split('{');
  if (parts.length === 2) {
    const sel = parts[0].trim();
    const body = parts[1].trim();
    if (sel.includes('html') || sel.includes('body') || sel.includes('#main') || sel.includes('main') || sel.includes('tp-scene') || sel.includes('tp-meet')) {
      if (body.includes('overflow') || body.includes('position') || body.includes('height') || body.includes('transform') || body.includes('filter')) {
        console.log('--- ' + sel + ' ---');
        console.log(body);
      }
    }
  }
}

