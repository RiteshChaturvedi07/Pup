const fs = require('fs');
const css = fs.readFileSync('app/authentic-scenes.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, i) => {
  if (line.includes('tp-lineup') || line.includes('tp-hero__stage') || line.includes('tp-hero__teddy') || line.includes('--x')) {
    console.log(i, line);
  }
});

