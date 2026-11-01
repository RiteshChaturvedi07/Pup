import fs from 'fs';

const html = fs.readFileSync('scripts/hero_exact.html', 'utf8');
const lineupMatch = html.match(/<ul class="tp-lineup"[\s\S]*?<\/ul>/);
if (lineupMatch) {
  const seats = lineupMatch[0].match(/<li class="tp-lineup__seat"[\s\S]*?<\/li>/g) || [];
  console.log('Total seats:', seats.length);
  seats.forEach((seat, idx) => {
    console.log(`\n--- Seat ${idx} ---`);
    const tagMatch = seat.match(/<li class="tp-lineup__seat"[^>]*>/);
    console.log(tagMatch ? tagMatch[0] : '');
    const aMatch = seat.match(/<a [^>]*>/);
    console.log(aMatch ? aMatch[0] : '');
    const imgMatch = seat.match(/<img[^>]*alt="([^"]*)"[^>]*>/);
    if (imgMatch) console.log('Image alt:', imgMatch[1]);
    const buddyMatch = seat.match(/class="pup-buddy[^"]*"/);
    if (buddyMatch) console.log('Has buddy mascot:', buddyMatch[0]);
    const bubbleMatch = seat.match(/<span class="pup-bubble"[^>]*>([\s\S]*?)<\/span>/);
    if (bubbleMatch) console.log('Bubble:', bubbleMatch[1].replace(/<[^>]+>/g, '').trim());
  });
}

const ledgeMatch = html.match(/<div class="tp-hero__ledge"[\s\S]*?<\/div>/);
if (ledgeMatch) {
  console.log('\n--- Hero Ledge ---');
  console.log(ledgeMatch[0].substring(0, 500));
}

