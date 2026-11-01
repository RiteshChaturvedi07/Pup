import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

function getSection(startStr, endStr, name) {
  const start = html.indexOf(startStr);
  if (start === -1) {
    console.log('Not found:', startStr);
    return;
  }
  const end = endStr ? html.indexOf(endStr, start) : start + 3000;
  console.log(`=== ${name} (len: ${end - start}) ===`);
  const content = html.substring(start, end !== -1 ? end : start + 3000);
  fs.writeFileSync(`scripts/${name}.html`, content);
  console.log(`Saved scripts/${name}.html`);
}

// 1. Hero
getSection('<section data-pup-scene="true" data-tone="light" class="tp-scene tp-hero', '</section>', 'hero_exact');

// 2. Meet the pups
getSection('<section class="tp-scene tp-meet', '</section>', 'meet_exact');

// 3. Two ways / paths
getSection('<section data-pup-scene="true" data-tone="light" class="tp-scene tp-paths', '</section>', 'paths_exact');

// 4. Journey / phone
getSection('<section data-pup-scene="true" data-tone="light" class="tp-scene tp-chat', '</section>', 'journey_exact');

