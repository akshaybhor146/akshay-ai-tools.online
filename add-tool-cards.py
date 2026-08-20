import re

path = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\tools.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

bg_remover_card = """
            <div class="tool-card reveal" style="transition-delay:.5s">
                <div class="card-tag gold">Creator</div>
                <div class="card-icon pink" style="background:linear-gradient(135deg, #ff2d78, #ff8c00)">🖼️</div>
                <h3>AI BG Remover</h3>
                <p>Remove backgrounds from any image instantly with AI.</p>
                <a href="tool-bg-remover.html" class="btn btn-ghost btn-sm">Use Tool</a>
            </div>
"""

voice_text_card = """
            <div class="tool-card reveal" style="transition-delay:.6s">
                <div class="card-tag gold">Productivity</div>
                <div class="card-icon cyan" style="background:linear-gradient(135deg, #00f5ff, #7b2fff)">🎙️</div>
                <h3>AI Voice Transcriber</h3>
                <p>Convert your voice recordings to accurate text notes.</p>
                <a href="tool-voice-text.html" class="btn btn-ghost btn-sm">Use Tool</a>
            </div>
"""

# Insert before the closing grid div
content = content.replace('<!-- End Tools Grid -->', bg_remover_card + voice_text_card + '\n            <!-- End Tools Grid -->')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# Also update dashboard.html
dash_path = r'c:\Users\sunil\OneDrive\Desktop\Akshay-website\akshay-ai-tools\dashboard.html'
with open(dash_path, 'r', encoding='utf-8') as f:
    dash_content = f.read()

dash_cards = """
                <a href="tool-bg-remover.html" class="quick-card">
                    <div class="q-icon" style="background:rgba(255,45,120,0.1);color:#ff2d78">🖼️</div>
                    <div>
                        <div class="q-name">BG Remover</div>
                        <div class="q-desc">Remove backgrounds</div>
                    </div>
                </a>
                <a href="tool-voice-text.html" class="quick-card">
                    <div class="q-icon" style="background:rgba(0,245,255,0.1);color:var(--accent-cyan)">🎙️</div>
                    <div>
                        <div class="q-name">Transcriber</div>
                        <div class="q-desc">Speech to text</div>
                    </div>
                </a>
"""

# Find the quick-actions-grid and append
dash_content = dash_content.replace('<!-- End Quick Actions -->', dash_cards + '\n                <!-- End Quick Actions -->')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(dash_content)

print("Tool cards added to tools.html and dashboard.html")
