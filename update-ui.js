const fs = require('fs');

// ── Update tools.html ──
try {
  let toolsContent = fs.readFileSync('tools.html', 'utf8');
  if (!toolsContent.includes('tool-reels.html')) {
    const reelCard = `
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
    `;
    // Insert before the closing tools-grid div
    toolsContent = toolsContent.replace('</div>\n\n            <!-- CTA -->', reelCard + '\n            </div>\n\n            <!-- CTA -->');
    fs.writeFileSync('tools.html', toolsContent);
    console.log('Updated tools.html');
  }
} catch (e) {
  console.error('Error updating tools.html:', e.message);
}

// ── Update dashboard.html ──
try {
  let dashContent = fs.readFileSync('dashboard.html', 'utf8');
  if (!dashContent.includes('tool-reels.html')) {
    const dashCards = `
                    <div class="tool-quick-card" onclick="location.href='tool-reels.html'">
                        <div class="q-icon pink">🎬</div>
                        <span>Reel Script</span>
                    </div>
                    <div class="tool-quick-card" onclick="location.href='tool-interior.html'">
                        <div class="q-icon gold">🏠</div>
                        <span>Interior</span>
                    </div>
    `;
    // Insert after the last quick card or before the ending div
    dashContent = dashContent.replace('</div>\n                </div>\n            </div>\n\n            <div class="dashboard-grid">', dashCards + '\n                </div>\n            </div>\n\n            <div class="dashboard-grid">');
    fs.writeFileSync('dashboard.html', dashContent);
    console.log('Updated dashboard.html');
  }
} catch (e) {
  console.error('Error updating dashboard.html:', e.message);
}
