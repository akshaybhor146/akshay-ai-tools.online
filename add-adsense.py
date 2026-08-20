import os
import glob

html_files = glob.glob(r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\*.html')
ad_code = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3879352344616673" crossorigin="anonymous"></script>\n'

count = 0
for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the code is already there
    if 'ca-pub-3879352344616673' in content or 'pagead2.googlesyndication.com' in content:
        continue
        
    if '</head>' in content:
        content = content.replace('</head>', f'    {ad_code}</head>')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"AdSense code added to {count} files.")
