import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

const doorRegex = /<li[^>]*class="[^"]*tp-door[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let doorMatch;
const doors = [];
while ((doorMatch = doorRegex.exec(html)) !== null) {
  doors.push(doorMatch[0]);
}

const puppies = [];

for (let i = 0; i < 15; i++) {
  const door = doors[i];
  const hrefMatch = door.match(/href="[^"]*\/puppies\/([^"]+)"/);
  const slug = hrefMatch ? hrefMatch[1] : '';
  
  const nameMatch = door.match(/<span[^>]*class="[^"]*tp-door__name[^"]*"[^>]*>([\s\S]*?)<\/span>/);
  const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const metaMatch = door.match(/<span[^>]*class="[^"]*tp-door__meta[^"]*"[^>]*>([\s\S]*?)<\/span>/);
  const metaText = metaMatch ? metaMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  let sex = 'female';
  if (metaText.includes('boy &amp; girl') || metaText.includes('boy & girl') || metaText.includes('male & female')) sex = 'both';
  else if (metaText.includes('boy') || metaText.includes('male')) sex = 'male';
  else if (metaText.includes('girl') || metaText.includes('female')) sex = 'female';

  let age = '2 months';
  const ageMatch = metaText.match(/\d+(?:\.\d+)?\s*(?:months?|weeks?)/i);
  if (ageMatch) age = ageMatch[0];

  let breed = 'maltipoo';
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes('pomeranian')) breed = 'pomeranian';
  else if (lowerSlug.includes('cavapoo')) breed = 'cavapoo';
  else if (lowerSlug.includes('poodle')) breed = 'poodle';
  else if (lowerSlug.includes('shitzu') || lowerSlug.includes('shih-tzu')) breed = 'shih-tzu';
  else if (lowerSlug.includes('maltipoo')) breed = 'maltipoo';

  const origin = lowerSlug.includes('korean') ? 'imported' : 'local';

  // video check
  const hasVideo = metaText.includes('with video') || door.includes('tp-clip') || door.includes('Play video');

  // image extraction
  const imgMatch = door.match(/<img[^>]+>/);
  const imgTag = imgMatch ? imgMatch[0] : '';
  
  // Find media url in srcset: url=%2Fmedia%2F...
  let mediaPath = '';
  const urlParamMatch = imgTag.match(/url=([^&"'\s]+)/);
  if (urlParamMatch) {
    mediaPath = decodeURIComponent(urlParamMatch[1]);
  } else {
    const rawMedia = imgTag.match(/\/media\/[^&"'\s]+/);
    if (rawMedia) mediaPath = decodeURIComponent(rawMedia[0]);
  }

  // local file path
  const localSrcMatch = imgTag.match(/src="([^"]+)"/);
  const localSrc = localSrcMatch ? localSrcMatch[1] : '';

  const altMatch = imgTag.match(/alt="([^"]+)"/);
  const alt = altMatch ? altMatch[1] : '';

  const objPosMatch = imgTag.match(/object-position:\s*([^;]+);/);
  const objectPosition = objPosMatch ? objPosMatch[1].trim() : '50% 50%';

  const bgColMatch = imgTag.match(/background-color:\s*([^;]+);/);
  const bgColor = bgColMatch ? bgColMatch[1].trim() : '#fffdf8';

  // extract image filename from localSrc or mediaPath
  const fileNameMatch = (localSrc || mediaPath).match(/([^/\\]+\.(?:jpe?g|png|webp))/i);
  const fileName = fileNameMatch ? fileNameMatch[1] : `puppy-${slug}.jpg`;

  puppies.push({
    id: i + 1,
    slug,
    name,
    breed,
    sex,
    age,
    metaText: metaText.replace(/&amp;/g, '&'),
    origin,
    hasVideo,
    alt,
    mediaPath,
    localSrc,
    fileName,
    objectPosition,
    bgColor
  });
}

console.log(JSON.stringify(puppies, null, 2));
fs.writeFileSync('scripts/extracted_puppies.json', JSON.stringify(puppies, null, 2));
