import fs from 'fs';
import path from 'path';

const dir = 'reference/files';
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js.download'))) {
  const code = fs.readFileSync(path.join(dir, file), 'utf8');
  const tokens = code.match(/\.s\(\[["']([A-Za-z0-9_]+)["']/g);
  if (tokens) {
    console.log(file, tokens.map(t => t.match(/["']([A-Za-z0-9_]+)["']/)[1]));
  }
}

