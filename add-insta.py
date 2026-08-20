import os

# ── Configuration ──
base_dir = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools'
insta_url = 'https://www.instagram.com/akshayaitool?igsh=Mmc2eTVuaXlyeHU3'

# Find all HTML files
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

for filename in html_files:
    path = os.path.join(base_dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for the YouTube link or other social links to replace
    # Replacing the generic "#" link in social-links
    # Specifically targeting the Instagram link if present, or replacing Twitter/Discord defaults
    
    # Let's add the Instagram link to the social-links div
    # Before: <div class="social-links"><a href="#" class="social-link" title="Twitter">𝕏</a>...
    
    # We want to replace the FIRST link or add it
    if 'instagram.com' not in content:
        # Pattern for footer social links
        content = content.replace('<a href="#" class="social-link" title="YouTube">▶</a>', 
                                    f'<a href="{insta_url}" class="social-link" title="Instagram">📸</a>')
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Instagram link added to {len(html_files)} files.")
