const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const manifestLink = '\n    <link rel="manifest" href="manifest.json">\n    <meta name="theme-color" content="#7b2fff">';

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes('rel="manifest"')) {
        const headEnd = content.indexOf('</head>');
        if (headEnd !== -1) {
            content = content.slice(0, headEnd) + manifestLink + content.slice(headEnd);
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}`);
        }
    }
});
