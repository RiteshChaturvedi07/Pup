import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const nightStart = html.indexOf('tp-night');
const nextSection = html.indexOf('tp-home');
console.log('tp-night section length:', nextSection - nightStart);
const sectionContent = html.slice(nightStart, nextSection);

// Find all text inside this section that is not in the svg
const noSvg = sectionContent.replace(/<svg[\s\S]*?<\/svg>/g, '[SVG]');
console.log(noSvg);
