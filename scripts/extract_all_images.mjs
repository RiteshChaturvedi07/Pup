import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

const imgRegex = /<img[^>]+>/g;
let match;
const images = [];

while ((match = imgRegex.exec(html)) !== null) {
  const imgTag = match[0];
  const srcMatch = imgTag.match(/src="([^"]+)"/);
  const src = srcMatch ? srcMatch[1] : '';

  let mediaPath = '';
  const urlParamMatch = imgTag.match(/url=([^&"'\s]+)/);
  if (urlParamMatch) {
    mediaPath = decodeURIComponent(urlParamMatch[1]);
  } else {
    const rawMedia = imgTag.match(/\/media\/[^&"'\s]+/);
    if (rawMedia) mediaPath = decodeURIComponent(rawMedia[0]);
  }

  const altMatch = imgTag.match(/alt="([^"]+)"/);
  const alt = altMatch ? altMatch[1] : '';

  const classMatch = imgTag.match(/class="([^"]+)"/);
  const cls = classMatch ? classMatch[1] : '';

  // Find parent or nearby section/class to know the context
  const index = match.index;
  const contextSnippet = html.slice(Math.max(0, index - 300), Math.min(html.length, index + 300));
  
  images.push({
    index: images.length + 1,
    src,
    mediaPath,
    alt,
    cls,
    contextSnippet
  });
}

console.log(`Found ${images.length} images.`);
images.forEach(img => {
  console.log(`[#${img.index}] alt: "${img.alt}", src: ${img.src}, mediaPath: ${img.mediaPath}`);
});

fs.writeFileSync('scripts/extracted_images.json', JSON.stringify(images, null, 2));
