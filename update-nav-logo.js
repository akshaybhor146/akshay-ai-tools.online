const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'google67411ea27e1cf0e5.html');
files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  // Replace the old logo text with image + text
  // Looking for <a href="index.html" class="nav-logo">⚡ Akshay AI</a> or similar
  // We'll replace the content inside the tag while keeping the tag itself.
  const regex = /(<a href="index\.html" class="nav-logo">)(.*?)(<\/a>)/gi;
  if (regex.test(text)) {
    text = text.replace(regex, '$1<img src="favicon.png" alt="Logo"><span>Akshay AI</span>$3');
    fs.writeFileSync(f, text);
    console.log(`Updated navbar logo in ${f}`);
  }
});
