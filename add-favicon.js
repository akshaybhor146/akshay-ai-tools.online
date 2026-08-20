const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'google67411ea27e1cf0e5.html');
files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  if (!text.includes('rel="icon"')) {
    text = text.replace(/<\/head>/i, '  <link rel="icon" type="image/png" href="favicon.png">\n</head>');
    fs.writeFileSync(f, text);
    console.log(`Updated ${f}`);
  }
});
