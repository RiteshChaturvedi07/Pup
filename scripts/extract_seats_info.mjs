import fs from 'fs';

const html = fs.readFileSync('scripts/hero_exact.html', 'utf8');
const seats = html.match(/<li class="tp-lineup__seat"[\s\S]*?<\/li>/g);
seats.slice(0, 6).forEach((s, idx) => {
  const styleMatch = s.match(/style="([^"]*)"/);
  const hrefMatch = s.match(/href="([^"]*)"/);
  const altMatch = s.match(/alt="([^"]*)"/);
  const srcMatch = s.match(/srcset="([^"]*)"/);
  console.log(`Seat ${idx}:`);
  console.log('  style:', styleMatch ? styleMatch[1] : null);
  console.log('  href:', hrefMatch ? hrefMatch[1] : null);
  console.log('  alt:', altMatch ? altMatch[1] : null);
  if (srcMatch) {
    const rawUrl = decodeURIComponent(srcMatch[1].split(' ')[0]);
    console.log('  src:', rawUrl);
  }
});

