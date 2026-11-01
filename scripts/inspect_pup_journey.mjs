import fs from 'fs';

const c = fs.readFileSync('reference/files/1wa3jfz4v5w2v.js.download', 'utf8');
const idx = c.indexOf('"PupJourney"');
if (idx !== -1) {
  console.log(c.substring(idx - 100, idx + 4000));
}

