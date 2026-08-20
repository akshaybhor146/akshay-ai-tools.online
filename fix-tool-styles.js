const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const replacements = [
  // Old CSS variables to Sapphire variables
  { find: /var\(--accent-cyan\)/g, replace: 'var(--accent-primary)' },
  { find: /var\(--accent-magenta\)/g, replace: 'var(--accent-primary)' },
  { find: /var\(--accent-pink\)/g, replace: 'var(--accent-primary)' },
  { find: /var\(--accent-purple\)/g, replace: 'var(--accent-primary)' },
  { find: /var\(--accent-gold\)/g, replace: 'var(--accent-second)' },
  { find: /var\(--text-secondary\)/g, replace: 'var(--text-body)' },
  { find: /var\(--text-primary\)/g, replace: 'var(--text-head)' },
  { find: /var\(--bg-primary\)/g, replace: 'var(--bg-base)' },
  { find: /var\(--glass-border\)/g, replace: 'var(--border)' },
  { find: /var\(--glass\)/g, replace: 'var(--bg-card)' },
  { find: /var\(--gradient-main\)/g, replace: 'var(--gradient)' },
  { find: /color:#ff6fa3/g, replace: 'color:var(--accent-primary)' },
  { find: /color:#b78aff/g, replace: 'color:var(--accent-primary)' },
  { find: /color:#ffd700/g, replace: 'color:var(--accent-second)' },
  
  // Specific inline tag styles from tools.html grid
  { find: /background:rgba\(0,245,255,0\.08\);border:1px solid rgba\(0,245,255,0\.18\)/g, replace: 'background:var(--bg-card);border:1px solid var(--border)' },
  { find: /background:rgba\(123,47,255,0\.08\);border:1px solid rgba\(123,47,255,0\.25\)/g, replace: 'background:var(--bg-card);border:1px solid var(--border)' },
  { find: /background:rgba\(255,45,120,0\.08\);border:1px solid rgba\(255,45,120,0\.25\)/g, replace: 'background:var(--bg-card);border:1px solid var(--border)' },
  { find: /background:rgba\(255,215,0,0\.08\);border:1px solid rgba\(255,215,0,0\.25\)/g, replace: 'background:var(--bg-card);border:1px solid var(--border)' },

  // tool-chat specific styles
  { find: /background:rgba\(0,245,255,0\.1\);border:1px solid rgba\(0,245,255,0\.2\)/g, replace: 'background:var(--bg-card);border:1px solid var(--border)' },
  
  // generic icon backgrounds
  { find: /background:linear-gradient\(135deg,\s*#ff2d78,\s*#7b2fff\)/g, replace: 'background:linear-gradient(135deg, rgba(108,85,255,0.2), rgba(59,35,216,0.2))' },
  { find: /background:linear-gradient\(135deg,\s*#ffd700,\s*#ff8c00\)/g, replace: 'background:linear-gradient(135deg, rgba(59,35,216,0.15), rgba(108,85,255,0.2))' },

  // Made with ❤️ in Space -> India
  { find: /Made with <span style="([^>]+)">❤️<\/span> in Space/g, replace: 'Made with <span style="color:var(--accent-primary);">❤️</span> in India' }
];

let changedCount = 0;

for (const file of files) {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { find, replace } of replacements) {
    content = content.replace(find, replace);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedCount++;
  }
}

console.log(`\nScript complete. Modified ${changedCount} files.`);
