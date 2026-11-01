const res = await fetch('http://localhost:3000/');
const html = await res.text();
const idx = html.indexOf('data-p="ledge"');
console.log('ledge idx in HTML:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 600));
}
