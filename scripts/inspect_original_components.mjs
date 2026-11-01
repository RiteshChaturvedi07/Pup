import fs from 'fs';

function extractNamed(filename, name) {
  const code = fs.readFileSync('reference/files/' + filename, 'utf8');
  const idx = code.indexOf(`"${name}"`);
  if (idx === -1) {
    console.log(`Not found ${name} in ${filename}`);
    return;
  }
  console.log(`=== ${name} in ${filename} ===`);
  console.log(code.substring(Math.max(0, idx - 50), Math.min(code.length, idx + 2000)));
}

extractNamed('1wa3jfz4v5w2v.js.download', 'HeroLineup');
extractNamed('177ya708_1zuj.js.download', 'PupBuddy');
extractNamed('1wa3jfz4v5w2v.js.download', 'PupJourney');
extractNamed('1wa3jfz4v5w2v.js.download', 'Meet');

