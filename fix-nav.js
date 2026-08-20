const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldBtn = '<button id="theme-toggle" class="nav-btn" style="padding: 6px 12px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; background: transparent; border: 1px solid var(--border); color: var(--text-head); display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">🌙</button>';
const newBtn = '<button id="theme-toggle" class="theme-toggle-btn">🌙</button>';

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes(oldBtn)) {
        content = content.replace(oldBtn, newBtn);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        // May have other variations
        const regex = /<button id="theme-toggle" class="nav-btn" style="[^"]+">🌙<\/button>/g;
        if (regex.test(content)) {
            content = content.replace(regex, newBtn);
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file} (Regex match)`);
        }
    }
});
