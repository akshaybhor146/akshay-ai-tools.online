/**
 * AKSHAY AI TOOLS - COMMAND PALETTE
 * Global Cmd+K tool search system
 */

const COMMAND_PALETTE = {
    isOpen: false,
    tools: [
        { id: 'lovex', title: '💜 LoveX AI — Neural Companion Chat', desc: 'Full ChatGPT/Claude-style conversational AI with memory & voice', icon: '💜', url: 'lovex.html', featured: true },
        { id: 'reasoning', title: 'DeepSeek Neural Reasoning', desc: 'Chain-of-thought logic & math solver', icon: '🧠', url: 'tool-reasoning.html' },
        { id: 'video-gen', title: 'Sora / Runway Video Studio', desc: 'Generate cinematic AI videos from text', icon: '🎥', url: 'tool-video-gen.html' },
        { id: 'flux', title: 'FLUX.1 / Midjourney Studio', desc: 'Photorealistic prompt engineer & visualizer', icon: '🖼️', url: 'tool-flux.html' },
        { id: 'canvas', title: 'Claude Canvas & Artifacts', desc: 'Interactive live code & doc sandbox', icon: '🎨', url: 'tool-canvas.html' },
        { id: 'music', title: 'Suno AI Music & Sound FX', desc: 'Generate song lyrics, audio & beats', icon: '🎵', url: 'tool-music.html' },
        { id: 'research', title: 'Perplexity Deep Research', desc: 'Synthesized reports with citations', icon: '🕵️', url: 'tool-research.html' },
        { id: 'image', title: 'AI Image Generator', desc: 'Create studio visuals with SDXL', icon: '🎨', url: 'tool-image.html' },
        { id: 'chat', title: 'AI Chat Advisor', desc: 'Intelligent planning & brainstorming', icon: '💬', url: 'tool-chat.html' },
        { id: 'code', title: 'AI Code Helper', desc: 'Debug & generate in 20+ languages', icon: '💻', url: 'tool-code.html' },
        { id: 'interview', title: 'AI Interview Copilot', desc: 'Live interview whispers & answers', icon: '🎯', url: 'tool-interview.html' },
        { id: 'resume', title: 'Smart Resume Builder', desc: 'ATS-friendly resume generator', icon: '📄', url: 'tool-resume.html' },
        { id: 'pdf', title: 'Chat with PDF', desc: 'Extract insights from documents', icon: '📁', url: 'tool-pdf-chat.html' },
        { id: 'bg-remover', title: 'AI BG Remover', desc: 'One-click pixel-perfect transparency', icon: '🖼️', url: 'tool-bg-remover.html' },
        { id: 'voiceover', title: 'AI Voiceover Studio', desc: 'Realistic text-to-speech engine', icon: '🎙️', url: 'tool-voiceover.html' },
        { id: 'interior', title: 'AI Interior Designer', desc: 'Architectural room redesigns', icon: '🏠', url: 'tool-interior.html' },
        { id: 'presentation', title: 'AI Presentation Maker', desc: 'Auto-generate PowerPoint PPTX', icon: '📊', url: 'tool-presentation.html' },
        { id: 'social', title: 'Social AI Growth', desc: 'Viral captions & content schedules', icon: '📸', url: 'tool-social.html' },
        { id: 'youtube', title: 'YouTube Scriptwriter', desc: 'High retention scripts & hooks', icon: '📺', url: 'tool-youtube.html' },
        { id: 'translator', title: 'Neural Translator', desc: 'Nuanced translations in 50+ languages', icon: '🌐', url: 'tool-translator.html' },
        { id: 'text', title: 'AI Copy & Blog Writer', desc: 'Long-form articles & marketing copy', icon: '✍️', url: 'tool-text.html' },
        { id: 'reels', title: 'Viral Reel Script', desc: 'Shorts & Reels scripts with cues', icon: '🎬', url: 'tool-reels.html' },
        { id: 'avatar-video', title: 'AI Talking Avatar Video', desc: 'Photorealistic talking avatars', icon: '👤', url: 'tool-avatar-video.html' },
        { id: 'ai-detector', title: 'AI Content Detector', desc: 'Detect AI vs human writing', icon: '🔍', url: 'tool-ai-detector.html' },
        { id: 'voice-text', title: 'Voice Transcriber', desc: 'Convert live speech to clean text', icon: '🎤', url: 'tool-voice-text.html' }
    ],

    init() {
        this.render();
        this.addEventListeners();
    },

    render() {
        const html = `
            <div class="cmd-palette-overlay" id="cmd-overlay">
                <div class="cmd-palette-container">
                    <div class="cmd-input-wrap">
                        <span class="cmd-icon">🔍</span>
                        <input type="text" class="cmd-input" id="cmd-search" placeholder="Type to search tools..." autocomplete="off">
                    </div>
                    <div class="cmd-results" id="cmd-results">
                        <!-- Results injected here -->
                    </div>
                    <div class="cmd-hint">
                        <span>Navigate with <span class="cmd-key">↑</span> <span class="cmd-key">↓</span></span>
                        <span>Open with <span class="cmd-key">Enter</span></span>
                        <span>Close with <span class="cmd-key">Esc</span></span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.overlay = document.getElementById('cmd-overlay');
        this.search = document.getElementById('cmd-search');
        this.results = document.getElementById('cmd-results');
        this.filter('');
    },

    addEventListeners() {
        // Toggle with Cmd/Ctrl + K
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Search logic
        this.search.addEventListener('input', () => this.filter(this.search.value));

        // Keyboard navigation
        this.search.addEventListener('keydown', (e) => {
            const items = this.results.querySelectorAll('.cmd-item');
            const selected = this.results.querySelector('.cmd-item.selected');
            let idx = Array.from(items).indexOf(selected);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[idx]?.classList.remove('selected');
                items[(idx + 1) % items.length].classList.add('selected');
                items[(idx + 1) % items.length].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[idx]?.classList.remove('selected');
                items[(idx - 1 + items.length) % items.length].classList.add('selected');
                items[(idx - 1 + items.length) % items.length].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                selected?.click();
            }
        });
    },

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    },

    open() {
        this.isOpen = true;
        this.overlay.classList.add('active');
        this.search.value = '';
        this.filter('');
        setTimeout(() => this.search.focus(), 50);
    },

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
    },

    filter(query) {
        const q = query.toLowerCase();
        const filtered = this.tools.filter(t => 
            t.title.toLowerCase().includes(q) || 
            t.desc.toLowerCase().includes(q)
        );

        this.results.innerHTML = filtered.map((t, i) => `
            <div class="cmd-item ${i === 0 ? 'selected' : ''}" onclick="window.location.href='${t.url}'">
                <div class="cmd-item-icon">${t.icon}</div>
                <div class="cmd-item-info">
                    <div class="cmd-item-title">${t.title}</div>
                    <div class="cmd-item-desc">${t.desc}</div>
                </div>
            </div>
        `).join('') || '<div style="padding:20px;text-align:center;color:var(--text-muted)">No tools found matching your search.</div>';
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => COMMAND_PALETTE.init());
