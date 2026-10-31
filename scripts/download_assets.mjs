import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Ensure destination dirs
const publicDir = path.resolve('public');
const mediaDir = path.resolve('public/media');
const brandDir = path.resolve('public/brand');
fs.mkdirSync(mediaDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

// Copy all files from reference/files that match images/icons/logos
const refFilesDir = path.resolve('reference/files');
if (fs.existsSync(refFilesDir)) {
  const files = fs.readdirSync(refFilesDir);
  for (const f of files) {
    if (f.match(/\.(jpeg|jpg|png|webp|avif|mp4|webm)$/i)) {
      const src = path.join(refFilesDir, f);
      // copy flat to public/media
      fs.copyFileSync(src, path.join(mediaDir, f));
      if (f.includes('logo')) {
        fs.copyFileSync(src, path.join(brandDir, 'logo.png'));
        fs.copyFileSync(src, path.join(publicDir, 'logo.png'));
      }
    }
  }
}

// Map all /media/<id>/<hash>/<filename> paths to make exact replicas in public/media
const mediaRegex = /\/media\/([a-zA-Z0-9_-]{8,16})\/([a-zA-Z0-9]{8,16})\/([a-zA-Z0-9_\-\.]+\.(?:jpe?g|png|webp|avif|mp4))/gi;
let match;
const mediaPaths = [];
const seen = new Set();
while ((match = mediaRegex.exec(html)) !== null) {
  const full = match[0];
  if (!seen.has(full)) {
    seen.add(full);
    mediaPaths.push({
      full,
      id: match[1],
      hash: match[2],
      filename: match[3]
    });
  }
}

console.log(`Found ${mediaPaths.length} exact media paths.`);

// Function to download a file if missing
async function downloadIfMissing(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  console.log(`Downloading: ${url} -> ${destPath}`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: ${res.statusText}`);
      return;
    }
    const fileStream = fs.createWriteStream(destPath);
    await pipeline(Readable.fromWeb(res.body), fileStream);
    console.log(`Saved: ${destPath}`);
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

async function run() {
  for (const m of mediaPaths) {
    const targetDir = path.join(publicDir, 'media', m.id, m.hash);
    const targetFile = path.join(targetDir, m.filename);
    fs.mkdirSync(targetDir, { recursive: true });

    // Check if we have the file in mediaDir flat
    let copied = false;
    const baseName = m.filename.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    const flatFiles = fs.readdirSync(mediaDir);
    for (const ff of flatFiles) {
      if (ff.startsWith(baseName) || ff === m.filename) {
        fs.copyFileSync(path.join(mediaDir, ff), targetFile);
        copied = true;
        break;
      }
    }

    if (!copied && !fs.existsSync(targetFile)) {
      const remoteUrl = `https://puppy.instabizweb.com${m.full}`;
      await downloadIfMissing(remoteUrl, targetFile);
    }
  }

  // Download the showroom video if not present
  const videoPath = path.join(publicDir, 'media', 'dSAUmXs8Qai9', 'ef39cbea20', '27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4');
  await downloadIfMissing('https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4', videoPath);

  // Also copy video to flat media directory for easy access
  if (fs.existsSync(videoPath)) {
    fs.copyFileSync(videoPath, path.join(mediaDir, 'showroom-video.mp4'));
  }

  // Download favicon and apple icon
  await downloadIfMissing('https://puppy.instabizweb.com/icon.png', path.join(publicDir, 'icon.png'));
  await downloadIfMissing('https://puppy.instabizweb.com/apple-icon.png', path.join(publicDir, 'apple-icon.png'));

  console.log('\nAsset download and mapping complete!');
}

run();
