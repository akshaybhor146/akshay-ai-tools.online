import os

files_to_update = [
    r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\tools.html',
    r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\tool-reels.html',
    r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\index.html'
]

for path in files_to_update:
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'ad-placeholder' in content: continue
    
    ad_div = '\n            <div class="ad-placeholder"></div>\n'
    
    if 'tools.html' in path:
        # Insert after tools-hero
        content = content.replace('</div>\n\n            <!-- Tools Grid -->', '</div>' + ad_div + '\n            <!-- Tools Grid -->')
    elif 'tool-reels.html' in path:
        # Insert after tool-page-header
        content = content.replace('</div>\n            </div>\n            <div class="tool-workspace">', '</div>\n            </div>' + ad_div + '            <div class="tool-workspace">')
    elif 'index.html' in path:
        # Insert before footer
        content = content.replace('<!-- Footer -->', ad_div + '    <!-- Footer -->')
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Ad placeholders inserted.")
