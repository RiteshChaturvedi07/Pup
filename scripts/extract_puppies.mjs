import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Search for puppy links or cards
const regex = /<a[^>]+href="[^"]*\/puppies\/([a-zA-Z0-9_-]+)"[^>]*>([\s\S]*?)<\/a>/g;
let match;
const puppies = [];

// Also let's search for doors
const doorRegex = /<li[^>]*class="[^"]*tp-door[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let doorMatch;
const doors = [];
while ((doorMatch = doorRegex.exec(html)) !== null) {
  doors.push(doorMatch[0]);
}

console.log(`Found ${doors.length} doors.`);
doors.forEach((door, i) => {
  console.log(`\n--- Door ${i+1} ---`);
  // extract slug from href
  const hrefMatch = door.match(/href="([^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '';
  
  // extract name
  const nameMatch = door.match(/<span[^>]*tp-door__name[^>]*>([\s\S]*?)<\/span>/) || door.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/);
  
  // extract tag (e.g. Available)
  const tagMatch = door.match(/<span[^>]*tp-door__tag[^>]*>([\s\S]*?)<\/span>/);
  
  // extract meta (breed, sex, age, etc.)
  const metaMatch = door.match(/<span[^>]*tp-door__meta[^>]*>([\s\S]*?)<\/span>/g) || door.match(/<p[^>]*>([\s\S]*?)<\/p>/g);
  
  // extract image src & alt
  const imgMatch = door.match(/<img[^>]+>/);
  
  // extract video tag or video flag
  const hasVideo = door.includes('tp-clip') || door.includes('video') || door.includes('mp4') || door.includes('Play video') || door.includes('aria-label="video"');

  console.log({
    href,
    name: nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim() : '',
    tag: tagMatch ? tagMatch[1].replace(/<[^>]+>/g, '').trim() : '',
    meta: metaMatch ? metaMatch.map(m => m.replace(/<[^>]+>/g, '').trim()) : [],
    img: imgMatch ? imgMatch[0] : '',
    hasVideo
  });
});
