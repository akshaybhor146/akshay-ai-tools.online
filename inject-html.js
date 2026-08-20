const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

let modifiedConfig = 0;
let modifiedTheme = 0;

for (const file of files) {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Inject config.js before script.js if not present
  if (!content.includes('config.js') && content.includes('script.js')) {
    content = content.replace(
      '<script src="script.js"></script>',
      '<script src="config.js"></script>\n    <script src="script.js"></script>'
    );
    modifiedConfig++;
  }

  // 2. Inject Theme Toggle into navbar
  // We look for the closing </ul> of .nav-links
  if (!content.includes('id="theme-toggle"') && content.includes('</nav>')) {
    // Find the ul.nav-links block
    const navLinksEndIndex = content.indexOf('</ul>', content.indexOf('nav-links'));
    if (navLinksEndIndex !== -1) {
      const toggleHtml = `\n                <li><button id="theme-toggle" class="nav-btn" style="padding: 6px 12px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; background: transparent; border: 1px solid var(--border); color: var(--text-head); display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">🌙</button></li>\n            `;
      
      content = content.slice(0, navLinksEndIndex) + toggleHtml + content.slice(navLinksEndIndex);
      modifiedTheme++;
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

console.log(`\nInjected config script into ${modifiedConfig} files.`);
console.log(`Injected theme toggle into ${modifiedTheme} files.`);
