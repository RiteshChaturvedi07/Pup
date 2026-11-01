const fs = require('fs');
const html = fs.readFileSync('scripts/journey_exact.html', 'utf8');

const regex = /<div class="tp-msg-group" data-step="1"[^>]*>([\s\S]*?)<\/div>\s*<div class="tp-msg-group" data-step="2"/;
const m = html.match(regex);
if (m) console.log(m[1]);

