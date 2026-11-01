const fs = require('fs');
const files = [
  'components/scenes/HeroScene.tsx',
  'components/scenes/MeetPupsScene.tsx',
  'components/scenes/TwoWaysScene.tsx',
  'components/scenes/JourneyScene.tsx',
  'components/scenes/PassportScene.tsx',
  'components/scenes/HappyFamiliesScene.tsx',
  'components/scenes/QuestionsScene.tsx',
  'components/scenes/ClosingCtaScene.tsx',
  'components/footer/Footer.tsx',
  'app/page.tsx'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const matches = c.match(/<[^>]*data-pup-stop[^>]*>/g);
    console.log(f, matches);
  }
}

