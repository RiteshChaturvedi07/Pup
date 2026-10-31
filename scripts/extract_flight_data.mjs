import fs from 'fs';

const html = fs.readFileSync('reference/home.html', 'utf8');

// Extract all self.__next_f.push([1, "..."]) chunks
const flightChunks = [];
const pushRegex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
let match;
while ((match = pushRegex.exec(html)) !== null) {
  try {
    // Unescape json string
    const unescaped = JSON.parse(`"${match[1]}"`);
    flightChunks.push(unescaped);
  } catch (e) {
    // raw fallback
    flightChunks.push(match[1]);
  }
}

const fullFlight = flightChunks.join('');
console.log('Total Flight data length:', fullFlight.length);

fs.writeFileSync('scripts/flight_data.txt', fullFlight);

// Let's search flight data for puppy objects, gone-home data, faq data, etc.
console.log('Checking for keywords in flight data:');
['puppies', 'gone-home', 'faq', 'families', 'Sarah M', 'Downtown Dubai', 'maltipoo-max-male'].forEach(k => {
  console.log(`  Keyword "${k}": index =`, fullFlight.indexOf(k));
});
