const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Array of texts to remove completely
  const removals = [
    '<div class="process-hint">Powered by Akshay AI Vision Analysis</div>',
    '<p>Real conversations powered by akshay-ai-tools</p>',
    '<p>AI-described visuals powered by Akshay AI</p>',
    '<p>Real AI content powered by Akshay AI</p>',
    '// Powered by Google Gemini AI',
    '<span class="section-tag reveal" style="background:rgba(59,35,216,0.1); color:var(--accent-primary); padding:6px 16px; border-radius:50px; font-size:0.8rem; font-weight:600; text-transform:uppercase; letter-spacing:2px; display:inline-block; margin-bottom:20px;">✦ Powered by Gemini AI</span>',
    '<span>Gemini is refining your transcription...</span>'
  ];

  for (const text of removals) {
     if (content.includes(text)) {
         content = content.replace(text, '');
     }
  }

  // 2. Replace SEO meta descriptions mentioning gemini
  if (content.includes('powered by Gemini AI.')) {
      content = content.replace('powered by Gemini AI.', 'powered by our advanced routing engine.');
  }

  // 3. Fix the AI Translator header text
  if (content.includes('<p>Translate any text into 50+ languages with Gemini AI</p>')) {
      content = content.replace('<p>Translate any text into 50+ languages with Gemini AI</p>', '<p>Translate any text into 50+ languages utilizing our advanced routing engine</p>');
  }

  // 4. Fix Tools page grid text
  if (content.includes('Professional quality translations in 50+ languages. Powered by advanced linguistic AI.')) {
      content = content.replace('Professional quality translations in 50+ languages. Powered by advanced linguistic AI.', 'Professional quality translations in 50+ languages.');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`Cleaned "Powered by" text from ${file}`);
  }
}

console.log(`\nSuccessfully removed "Powered by" attributes from ${modifiedCount} files.`);
