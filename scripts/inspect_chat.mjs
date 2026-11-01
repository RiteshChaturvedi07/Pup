import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');
const start = html.indexOf('tp-phone__screen');
const end = html.indexOf('tp-phone__compose', start);
console.log('Phone screen snippet:');
console.log(html.substring(start, end).replace(/srcset="[^"]*"/g, '').replace(/<img[^>]*>/g, '<img/>'));
