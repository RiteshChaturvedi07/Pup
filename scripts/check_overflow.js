const fs = require('fs');
['app/globals.css', 'app/authentic-scenes.css'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.match(/(overflow|transform|perspective)/i) && (l.includes('body') || l.includes('html') || l.includes('main') || l.includes('tp-scene') || l.includes('tp-meet'))) {
      console.log(f, i+1, l);
    }
  });
});

