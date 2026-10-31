import fs from 'fs';

const flight = fs.readFileSync('scripts/flight_data.txt', 'utf8');

// Let's search around "maltipoo-max-male"
const pupIndex = flight.indexOf('maltipoo-max-male');
console.log('--- Flight snippet around maltipoo-max-male ---');
console.log(flight.slice(Math.max(0, pupIndex - 500), Math.min(flight.length, pupIndex + 2000)));

// Let's search around "Sarah M"
const sarahIndex = flight.indexOf('Sarah M');
console.log('\n--- Flight snippet around Sarah M ---');
console.log(flight.slice(Math.max(0, sarahIndex - 500), Math.min(flight.length, sarahIndex + 1500)));

// Let's search around "gone-home"
const goneIndex = flight.indexOf('gone-home');
console.log('\n--- Flight snippet around gone-home ---');
console.log(flight.slice(Math.max(0, goneIndex - 300), Math.min(flight.length, goneIndex + 1000)));

// Let's search around "faq"
const faqIndex = flight.indexOf('questions-title');
console.log('\n--- Flight snippet around questions-title/faq ---');
console.log(flight.slice(Math.max(0, faqIndex - 200), Math.min(flight.length, faqIndex + 2500)));
