import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Find faq section
const faqMatch = html.match(/<section[^>]*tp-night[^>]*>([\s\S]*?)<\/section>/);
if (faqMatch) {
  const faqHtml = faqMatch[0];
  console.log('--- FAQ SECTION ---');
  // extract question buttons or titles
  const questions = faqHtml.match(/<button[^>]*>([\s\S]*?)<\/button>/g) || [];
  questions.forEach((q, i) => {
    console.log(`Q${i+1}:`, q.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  });
  
  // extract answers
  const answers = faqHtml.match(/<div[^>]*class="[^"]*tp-qa__answer[^"]*"[^>]*>([\s\S]*?)<\/div>/g) || faqHtml.match(/<div[^>]*role="region"[^>]*>([\s\S]*?)<\/div>/g) || [];
  answers.forEach((a, i) => {
    console.log(`A${i+1}:`, a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  });
}
