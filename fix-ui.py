import os

def fix_tools():
    path = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\tools.html'
    if not os.path.exists(path): return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'tool-reels.html' in content: 
        print("Tools already in tools.html")
    else:
        reel_card = """
                <!-- Reel Script Generator -->
                <a href="tool-reels.html" class="tool-card reveal">
                    <div class="card-icon pink" style="background:linear-gradient(135deg, #ff2d78, #7b2fff)">🎬</div>
                    <div class="card-title">Viral Reel Script</div>
                    <div class="card-desc">
                        Generate high-engagement scripts for Reels, TikToks, and Shorts with viral hooks and trending topics.
                    </div>
                    <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; position:relative; z-index:1">
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.25);color:#ff6fa3">Hooks</span>
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.25);color:#ff6fa3">Scripts</span>
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.25);color:#ff6fa3">Viral</span>
                    </div>
                    <div class="card-arrow">Open Tool →</div>
                </a>

                <!-- Interior Designer -->
                <a href="tool-interior.html" class="tool-card reveal">
                    <div class="card-icon gold" style="background:linear-gradient(135deg, #ffd700, #ff8c00)">🏠</div>
                    <div class="card-title">AI Interior Designer</div>
                    <div class="card-desc">
                        Redesign your living space with AI. Upload a room photo and get architectural & decor advice.
                    </div>
                    <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; position:relative; z-index:1">
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.25);color:#ffd700">Vision</span>
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.25);color:#ffd700">Redesign</span>
                        <span style="font-size:0.72rem;padding:3px 9px;border-radius:50px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.25);color:#ffd700">Space</span>
                    </div>
                    <div class="card-arrow">Open Tool →</div>
                </a>
        """
        # Look for the end of the grid
        closing_tag = '            </div>'
        if closing_tag in content:
            # We want the SECOND ONE or the one after Chatbot
            # Let's just find the last occurrence before CTA
            pivot = content.find('<!-- CTA -->')
            insert_pos = content.rfind(closing_tag, 0, pivot)
            new_content = content[:insert_pos] + reel_card + content[insert_pos:]
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Updated tools.html")

def fix_dash():
    path = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\dashboard.html'
    if not os.path.exists(path): return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'tool-reels.html' in content:
        print("Tools already in dashboard.html")
    else:
        dash_cards = """
                <a href="tool-reels.html" class="dash-tool-card">
                    <div class="dash-tool-icon card-icon pink" style="background:linear-gradient(135deg, #ff2d78, #7b2fff)">🎬</div>
                    <div class="dash-tool-info">
                        <div class="dash-tool-name">Viral Reel Script</div>
                        <div class="dash-tool-desc">Generate trending scripts with hooks</div>
                    </div>
                    <span class="dash-tool-badge">🔥 HOT</span>
                </a>
                <a href="tool-interior.html" class="dash-tool-card">
                    <div class="dash-tool-icon card-icon gold" style="background:linear-gradient(135deg, #ffd700, #ff8c00)">🏠</div>
                    <div class="dash-tool-info">
                        <div class="dash-tool-name">Interior Designer</div>
                        <div class="dash-tool-desc">AI architectural redesign for spaces</div>
                    </div>
                    <span class="dash-tool-badge">🏠 NEW</span>
                </a>
        """
        closing_tag = '            </div>'
        pivot = content.find('<!-- Recent Activity -->')
        insert_pos = content.rfind(closing_tag, 0, pivot)
        new_content = content[:insert_pos] + dash_cards + content[insert_pos:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated dashboard.html")

fix_tools()
fix_dash()
