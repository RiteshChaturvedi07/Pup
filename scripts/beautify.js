const fs = require('fs');

function simpleBeautify(code) {
  let res = '';
  let indent = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '{' || ch === ';') {
      res += ch + '\n' + '  '.repeat(indent + (ch === '{' ? 1 : 0));
      if (ch === '{') indent++;
    } else if (ch === '}') {
      indent = Math.max(0, indent - 1);
      res += '\n' + '  '.repeat(indent) + ch + '\n' + '  '.repeat(indent);
    } else {
      res += ch;
    }
  }
  return res;
}

const mascotCode = fs.readFileSync('scripts/module_91360_mascot.js', 'utf8');
fs.writeFileSync('scripts/mascot_beautified.js', simpleBeautify(mascotCode));

const actorCode = fs.readFileSync('scripts/module_89681_actor.js', 'utf8');
fs.writeFileSync('scripts/actor_beautified.js', simpleBeautify(actorCode));

console.log('Beautified files written successfully');

