import fs from 'fs';

const css = fs.readFileSync('reference/files/10jf32vdx50lp.css', 'utf8');

function findRules(selector) {
  let idx = 0;
  console.log(`\n=== RULES FOR ${selector} ===`);
  while ((idx = css.indexOf(selector, idx)) !== -1) {
    const end = css.indexOf('}', idx);
    console.log(css.substring(idx, end + 1));
    idx = end + 1;
  }
}

findRules('.tp-hero__teddy');
findRules('.pup-buddy');
findRules('[data-p="ledge"]');
findRules('data-p="ledge"');
findRules('.pup-bubble');
