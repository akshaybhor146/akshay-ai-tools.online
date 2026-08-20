import os
import re

# ── Configuration ──
base_dir = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools'
# Auto-fetch all HTML files
files_to_update = [f for f in os.listdir(base_dir) if f.endswith('.html')]

seo_data = {
    'index.html': {
        'title': 'Akshay AI Tools — Free Next-Gen AI for Everyone',
        'desc': 'Free AI tools for creators and developers. Generate images, write viral scripts, redesign interiors, and code with Gemini AI. No tokens required.'
    },
    'tools.html': {
        'title': 'AI Tools Directory — Akshay AI',
        'desc': 'Discover our collection of free AI tools. Viral reel scripts, AI interior designer, image generators, and more.'
    },
    'tool-reels.html': {
        'title': 'AI Viral Reel Script Generator — Get More Views',
        'desc': 'Create high-engagement scripts for Instagram Reels, TikTok, and YouTube Shorts with the best AI hook generator.'
    },
    'tool-interior.html': {
        'title': 'AI Interior Designer — Redesign Your Room for Free',
        'desc': 'Upload a photo and let AI suggest professional architectural redesigns and decor ideas for your home.'
    }
}

default_title = 'Akshay AI Tools — Powering the Future'
default_desc = 'Explore the best free AI tools for creative work, development, and productivity.'

# ── Processing ──
for filename in files_to_update:
    path = os.path.join(base_dir, filename)
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    data = seo_data.get(filename, {'title': default_title, 'desc': default_desc})
    title = data['title']
    desc = data['desc']
    
    # Meta tags to insert
    meta_tags = f"""
    <meta name="description" content="{desc}">
    <meta name="keywords" content="free ai tools, viral reels script, ai interior designer, image generator, gemini ai, akshay ai, marathi ai">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="https://akshay-ai-tools.online/favicon.png">
    <meta property="og:url" content="https://akshay-ai-tools.online/{filename}">
    <meta name="twitter:card" content="summary_large_image">
    """
    
    # Update title
    content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', content)
    
    # Insert meta tags after <head> or charset
    if '<meta name="description"' not in content:
        if '<meta charset="UTF-8">' in content:
            content = content.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">' + meta_tags)
        elif '<meta charset="UTF-8" />' in content:
            content = content.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />' + meta_tags)
            
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("SEO Overhaul Complete.")
