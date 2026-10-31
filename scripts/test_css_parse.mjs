import fs from 'fs';
import postcss from 'postcss';

const css = fs.readFileSync('app/globals.css', 'utf8');

try {
  postcss.parse(css);
  console.log('Postcss parsed successfully!');
} catch (e) {
  console.error('Postcss parse error at line', e.line, 'column', e.column, ':', e.message);
  const lines = css.split('\n');
  console.error('Problematic snippet:');
  console.error(lines.slice(Math.max(0, e.line - 5), Math.min(lines.length, e.line + 5)).join('\n'));
}
