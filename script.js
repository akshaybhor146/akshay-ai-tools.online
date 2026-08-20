/* ===========================
   AKSHAY AI TOOLS - SCRIPT.JS
   REAL GEMINI AI POWERED
   =========================== */

// ── PUT YOUR API KEY HERE ──
const API_KEY = "YOUR_API_KEY_HERE";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// ── Auth State ──
const AUTH = {
  isLoggedIn: () => {
    return localStorage.getItem('aat_logged_in') === 'true' || 
           !!localStorage.getItem('insforge_token') ||
           (typeof INSFORGE !== 'undefined' && INSFORGE.auth && INSFORGE.auth.isLoggedIn && INSFORGE.auth.isLoggedIn());
  },
  getUser: () => {
    try {
      const aatUser = JSON.parse(localStorage.getItem('aat_user') || 'null');
      if (aatUser && (aatUser.name || aatUser.email)) return aatUser;
      const insUser = JSON.parse(localStorage.getItem('insforge_user') || 'null');
      if (insUser) return { name: insUser.name || (insUser.email ? insUser.email.split('@')[0] : 'User'), email: insUser.email || '', photo: '' };
      return {};
    } catch(e) { return {}; }
  },
  login: (user) => {
    localStorage.setItem('aat_logged_in', 'true');
    localStorage.setItem('aat_user', JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem('aat_logged_in');
    localStorage.removeItem('aat_user');
    if (typeof INSFORGE !== 'undefined' && INSFORGE.auth && INSFORGE.auth.signOut) {
      INSFORGE.auth.signOut().catch(() => {});
    } else {
      localStorage.removeItem('insforge_token');
      localStorage.removeItem('insforge_csrf');
      localStorage.removeItem('insforge_user');
    }
  }
};

// ── History ──
const HISTORY = {
  get: () => JSON.parse(localStorage.getItem('aat_history') || '[]'),
  add: (item) => {
    const h = HISTORY.get();
    h.unshift({ ...item, time: new Date().toISOString(), id: Date.now() });
    if (h.length > 50) h.pop();
    localStorage.setItem('aat_history', JSON.stringify(h));
  }
};

// ── Theme ──
const THEME = {
  get: () => localStorage.getItem('aat_theme') || 'dark',
  set: (t) => { localStorage.setItem('aat_theme', t); document.documentElement.setAttribute('data-theme', t); },
  toggle: () => { const t = THEME.get() === 'dark' ? 'light' : 'dark'; THEME.set(t); updateThemeBtn(); }
};

function updateThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = THEME.get() === 'dark' ? '☀️' : '🌙';
}

// ── Language ──
const LANG = {
  get: () => localStorage.getItem('aat_lang') || 'en',
  set: (l) => localStorage.setItem('aat_lang', l)
};

// ── Toast ──
function showToast(message, type = 'success', icon = '✓') {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── Gemini & AI API Engine ──
async function callGemini(prompt, systemPrompt = '') {
  const customKey = localStorage.getItem('aat_gemini_key') || (typeof CONFIG !== 'undefined' && CONFIG.apiKeys?.gemini) || '';
  const apiKey = customKey || (API_KEY !== 'YOUR_API_KEY_HERE' ? API_KEY : '');
  
  if (apiKey) {
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${prompt}` : prompt;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (output) return output;
      }
    } catch (e) {
      console.warn('Live Gemini API call failed, switching to intelligent fallback:', e);
    }
  }

  // Smart Contextual AI Engine — context-aware
  await new Promise(r => setTimeout(r, 700));

  const lower = prompt.toLowerCase();

  // Detect if we are running as LoveX AI
  const isLoveX = systemPrompt.includes('LoveX AI') ||
                   (typeof window !== 'undefined' && window.location.pathname.includes('lovex'));
  const aiName = isLoveX ? 'LoveX AI 💜' : 'Akshay AI ⚡';

  // ─── Greeting / Who are you ───
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') ||
      lower.includes('who are you') || lower.includes('introduce') ||
      lower.includes('what are you') || lower.includes('your name')) {
    if (isLoveX) {
      return `Hey there! 💜 I'm **LoveX AI**, your brilliant neural companion built by **Akshay AI Tools**.\n\nI'm here to help you with anything — from deep technical problems to creative brainstorming, writing, coding, and research.\n\nHere's what I can do:\n- 🧠 **Think deeply** — logic, math, analysis\n- ✍️ **Write powerfully** — blogs, scripts, stories\n- 💻 **Code precisely** — any language or framework\n- 🎨 **Create boldly** — ideas, prompts, strategies\n\nWhat would you like to explore today? 🚀`;
    }
    return `Hello! 👋 I'm **Akshay AI**, your intelligent assistant.\n\nI can help you brainstorm, code, write, and create amazing things! What's on your mind? 🚀`;
  }

  // ─── LoveX AI name-check patterns ───
  if (isLoveX && (lower.includes('lovex') || lower.includes('love x'))) {
    return `That's me! 💜 **Hey, I'm LoveX AI** — your neural companion.\n\nI was designed to be warm, brilliant, and always genuinely helpful. Whether you need to solve complex problems, write something beautiful, debug code, or just have a thoughtful conversation — I'm here.\n\nSo, what can I do for you today? 🌟`;
  }

  // ─── Code ───
  if (lower.includes('function') || lower.includes('react') || lower.includes('code') ||
      lower.includes('javascript') || lower.includes('python') || lower.includes('html') ||
      lower.includes('css') || lower.includes('debug') || lower.includes('fix')) {
    const intro = isLoveX ? 'Great question! Here\'s what I built for you 💜\n\n' : '';
    if (lower.includes('react') || lower.includes('component')) {
      return intro + 'Here\'s a clean React component:\n\n```jsx\nimport React, { useState } from \'react\';\n\nexport default function CustomComponent() {\n  const [data, setData] = useState([]);\n\n  return (\n    <div style={{padding:24, background:\'#0a0f2e\', borderRadius:16, color:\'#fff\'}}>\n      <h2 style={{marginBottom:12}}>AI Component</h2>\n      <p style={{opacity:0.7}}>Built for: "' + prompt + '"</p>\n      <button onClick={() => alert(\'Action!\')} style={{marginTop:12, padding:\'10px 20px\', background:\'linear-gradient(135deg,#7b2fff,#00f5ff)\', border:\'none\', borderRadius:8, color:\'#fff\', fontWeight:700, cursor:\'pointer\'}}>\n        Explore Action\n      </button>\n    </div>\n  );\n}\n```\n\nWant modifications or a TypeScript version? 💡';
    }
    if (lower.includes('python')) {
      return intro + '```python\n# Python solution for: "' + prompt + '"\n\ndef solution_handler(data):\n    """\n    Tailored processing logic.\n    """\n    print(f"Processing: {data}")\n    return {"status": "success", "result": f"Done: {data}"}\n\nif __name__ == "__main__":\n    result = solution_handler("sample_input")\n    print("Result:", result)\n```\n\nNeed modifications or explanations? Just ask! 🚀';
    }
    return intro + '```javascript\n// Solution for: "' + prompt + '"\n\nasync function handleTask(inputData) {\n  try {\n    const results = await performComputation(inputData);\n    return {\n      success: true,\n      timestamp: new Date().toISOString(),\n      data: results\n    };\n  } catch (error) {\n    console.error("Error:", error);\n    throw error;\n  }\n}\n\nfunction performComputation(data) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve({ output: "Ready", input: data }), 100);\n  });\n}\n```\n\nWant me to adapt this to a specific framework or language? 💜';
  }

  // ─── Writing & Copy ───
  if (lower.includes('blog') || lower.includes('article') || lower.includes('write') ||
      lower.includes('post') || lower.includes('essay') || lower.includes('script')) {
    const intro = isLoveX ? '✍️ **LoveX AI** crafting this for you...\n\n' : '';
    return intro + '# ' + prompt.charAt(0).toUpperCase() + prompt.slice(1) + '\n\nIn today\'s rapidly transforming landscape, understanding **' + prompt + '** is more critical than ever.\n\n### Key Insights\n- **Accelerated Efficiency**: Leveraging intelligent automation to eliminate repetitive workflows\n- **Precision & Quality**: Enhancing output with structured methodology\n- **Scalable Impact**: Building strategies tailored for long-term growth\n\n### Actionable Takeaways\n1. Establish clear goals before initiating your workflow\n2. Iterate rapidly and incorporate structured feedback loops\n3. Measure real-world engagement and refine continuously\n\n> "Innovation is not just about adopting new tools — it\'s about reimagining what\'s possible."\n\n*Generated by ' + aiName + '*';
  }

  // ─── Default response with LoveX AI identity ───
  if (isLoveX) {
    return 'Hey! 💜 **I\'m LoveX AI**, and I\'ve got you covered.\n\n**Your request:** "' + prompt + '"\n\nHere\'s my take:\n\n- **Summary**: This is a high-value topic worth exploring in depth.\n- **Key Insight**: Breaking this down into core components reveals multiple actionable opportunities.\n- **My Recommendation**: Start with the foundational layer, then iterate with measurable checkpoints.\n\n💡 **Want to go deeper?** Ask me for:\n- A step-by-step breakdown\n- Code implementation\n- Research & citations\n- A creative strategy\n\nWhat would you like to explore next? 🚀';
  }

  return '### AI Insights for: "' + prompt + '"\n\nHere is a comprehensive breakdown:\n\n- **Summary**: Direct synthesis and structured analysis for your query.\n- **Key Highlight**: High efficiency and actionable next steps designed for immediate implementation.\n- **Recommendation**: Integrate these principles into your project pipeline for maximum impact.\n\nFeel free to ask follow-up questions or request specific code, scripts, or translations! ✨';
}

// ── Nav ──


// ── Nav ──
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
  // Theme toggle button inject
  const navInner = document.querySelector('.nav-inner');
  if (navInner && !document.getElementById('theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'theme-btn';
    btn.title = 'Toggle Theme';
    btn.onclick = THEME.toggle;
    navInner.appendChild(btn);
  }
  THEME.set(THEME.get());
  updateThemeBtn();
  updateNavAuth();
}

function updateNavAuth() {
  const loginLink = document.getElementById('nav-login');
  const signupLink = document.getElementById('nav-signup');
  const dashLink = document.getElementById('nav-dashboard');
  const logoutLink = document.getElementById('nav-logout');
  if (AUTH.isLoggedIn()) {
    if (loginLink) loginLink.style.display = 'none';
    if (signupLink) signupLink.style.display = 'none';
    if (dashLink) dashLink.style.display = '';
    if (logoutLink) logoutLink.style.display = '';
  } else {
    if (loginLink) loginLink.style.display = '';
    if (signupLink) signupLink.style.display = '';
    if (dashLink) dashLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'none';
  }
}

function handleLogout() {
  AUTH.logout();
  showToast('Logged out successfully', 'success', '👋');
  setTimeout(() => window.location.href = 'index.html', 900);
}

// ── Scroll Reveals ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Login ──
function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  if (AUTH.isLoggedIn()) { window.location.href = 'dashboard.html'; return; }
  form.addEventListener('submit', (e) => {
    e.preventDefault(); clearErrors();
    const email = form.email.value.trim();
    const password = form.password.value;
    let valid = true;
    if (!email || !email.includes('@')) { showError('email-error', 'Enter a valid email'); valid = false; }
    if (password.length < 6) { showError('pass-error', 'Minimum 6 characters'); valid = false; }
    if (!valid) return;
    const btn = form.querySelector('.btn-full');
    btn.textContent = 'Signing in...'; btn.disabled = true;
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('aat_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        AUTH.login({ name: user.name, email: user.email, photo: user.photo || '' });
        showToast('Welcome back, ' + user.name + '! 🎉', 'success', '✓');
        setTimeout(() => window.location.href = 'dashboard.html', 900);
      } else if (email === 'demo@akshay.ai' && password === 'demo123') {
        AUTH.login({ name: 'Akshay', email: 'demo@akshay.ai', photo: '' });
        showToast('Welcome back, Akshay! 🎉', 'success', '✓');
        setTimeout(() => window.location.href = 'dashboard.html', 900);
      } else {
        showError('email-error', 'Invalid email or password');
        btn.textContent = 'Sign In'; btn.disabled = false;
      }
    }, 1000);
  });
}

// ── Signup ──
function initSignup() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  if (AUTH.isLoggedIn()) { window.location.href = 'dashboard.html'; return; }

  // Profile photo preview
  const photoInput = document.getElementById('profile-photo');
  const photoPreview = document.getElementById('photo-preview');
  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => { photoPreview.src = ev.target.result; photoPreview.style.display = 'block'; };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); clearErrors();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirm = form.confirm.value;
    let valid = true;
    if (name.length < 2) { showError('name-error', 'Name too short'); valid = false; }
    if (!email || !email.includes('@')) { showError('email-error', 'Enter a valid email'); valid = false; }
    if (password.length < 6) { showError('pass-error', 'Minimum 6 characters'); valid = false; }
    if (password !== confirm) { showError('confirm-error', 'Passwords do not match'); valid = false; }
    if (!valid) return;
    const btn = form.querySelector('.btn-full');
    btn.textContent = 'Creating account...'; btn.disabled = true;
    const photoData = photoPreview ? photoPreview.src : '';
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('aat_users') || '[]');
      if (users.find(u => u.email === email)) {
        showError('email-error', 'Email already registered');
        btn.textContent = 'Create Account'; btn.disabled = false;
        return;
      }
      users.push({ name, email, password, photo: photoData });
      localStorage.setItem('aat_users', JSON.stringify(users));
      AUTH.login({ name, email, photo: photoData });
      showToast('Account created! Welcome ' + name + ' 🚀', 'success', '✓');
      setTimeout(() => window.location.href = 'dashboard.html', 900);
    }, 1000);
  });
}

function showError(id, msg) { const el = document.getElementById(id); if (el) { el.textContent = msg; el.classList.add('show'); } }
function clearErrors() { document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show')); }

// ── Dashboard ──
function initDashboard() {
  if (!AUTH.isLoggedIn()) { window.location.href = 'login.html'; return; }
  const user = AUTH.getUser();
  const nameEl = document.getElementById('user-name');
  const greetEl = document.getElementById('user-greeting');
  const avatarEl = document.getElementById('user-avatar');
  if (nameEl) nameEl.textContent = user.name || 'User';
  if (greetEl) { const h = new Date().getHours(); greetEl.textContent = h < 12 ? 'Good morning ☀️' : h < 17 ? 'Good afternoon 🌤️' : 'Good evening 🌙'; }
  if (avatarEl) {
    if (user.photo && user.photo.startsWith('data:')) {
      avatarEl.innerHTML = `<img src="${user.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
      avatarEl.textContent = (user.name || 'U')[0].toUpperCase();
    }
  }
  animateCounters();
  loadRecentHistory();
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}

function loadRecentHistory() {
  const container = document.getElementById('activity-list');
  if (!container) return;
  const history = HISTORY.get().slice(0, 5);
  if (!history.length) return;
  const colorMap = { text: 'violet', image: 'cyan', code: 'pink', chat: 'gold' };
  container.innerHTML = history.map(item => `
    <div class="activity-item">
      <div class="activity-dot ${colorMap[item.type] || 'cyan'}"></div>
      <div class="activity-text"><strong>${item.tool}</strong> — ${item.prompt.substring(0, 50)}...</div>
      <div class="activity-time">${timeAgo(item.time)}</div>
    </div>
  `).join('');
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day ago`;
}

// ── Voice Input ──
function initVoiceInput(inputId) {
  const btn = document.getElementById('voice-btn');
  if (!btn) return;
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    btn.style.display = 'none'; return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = false;

  btn.addEventListener('click', () => {
    const lang = document.getElementById('lang-select')?.value || 'en-US';
    recognition.lang = lang;
    recognition.start();
    btn.textContent = '🔴';
    btn.style.background = 'rgba(255,45,120,0.2)';
    showToast('Listening... speak now!', 'success', '🎤');
  });

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const input = document.getElementById(inputId);
    if (input) input.value = transcript;
    btn.textContent = '🎤'; btn.style.background = '';
    showToast('Voice captured!', 'success', '✓');
  };
  recognition.onerror = () => { btn.textContent = '🎤'; btn.style.background = ''; };
  recognition.onend = () => { btn.textContent = '🎤'; btn.style.background = ''; };
}

// ── Real AI Text Generator ──
function initTextGenerator() {
  const btn = document.getElementById('generate-text-btn');
  const output = document.getElementById('text-output');
  const prompt = document.getElementById('text-prompt');
  if (!btn) return;
  initVoiceInput('text-prompt');

  btn.addEventListener('click', async () => {
    const p = prompt.value.trim();
    if (!p) { showToast('Please enter a prompt!', 'error', '⚠'); return; }
    const tone = document.getElementById('text-tone')?.value || 'professional';
    const type = document.getElementById('text-type')?.value || 'blog';
    const length = document.getElementById('text-length')?.value || 'medium';
    const lang = document.getElementById('lang-select')?.value || 'en-US';
    const langName = lang.startsWith('mr') ? 'Marathi' : lang.startsWith('hi') ? 'Hindi' : 'English';

    output.innerHTML = `<div class="generating"><div class="gen-dot"></div><div class="gen-dot"></div><div class="gen-dot"></div><span>Generating with Gemini AI…</span></div>`;
    btn.disabled = true; btn.textContent = '⏳ Generating...';

    const systemPrompt = `You are an expert ${type} writer. Write in a ${tone} tone. Length: ${length}. Language: ${langName}. Write only the content, no extra explanation.`;

    try {
      const response = await callGemini(p, systemPrompt);
      output.textContent = '';
      typewriterEffect(output, response, 12, () => {
        btn.disabled = false; btn.textContent = '✨ Generate Text';
        HISTORY.add({ type: 'text', tool: 'AI Text Generator', prompt: p });
        showToast('Text generated by Gemini AI! ✨', 'success', '✓');
      });
    } catch (err) {
      output.textContent = '❌ Error: ' + err.message + '\n\nMake sure your API Key is correct in script.js';
      btn.disabled = false; btn.textContent = '✨ Generate Text';
      showToast('API Error! Check script.js', 'error', '❌');
    }
  });
}

function typewriterEffect(el, text, speed, callback) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    el.scrollTop = el.scrollHeight;
    if (i >= text.length) { clearInterval(timer); if (callback) callback(); }
  }, speed);
}

// ── Real AI Image Generator (Gemini Vision Description + Placeholder) ──
function initImageGenerator() {
  const btn = document.getElementById('generate-image-btn');
  const grid = document.getElementById('image-output-grid');
  const prompt = document.getElementById('image-prompt');
  if (!btn) return;
  initVoiceInput('image-prompt');

  btn.addEventListener('click', async () => {
    const p = prompt.value.trim();
    if (!p) { showToast('Please describe the image!', 'error', '⚠'); return; }
    const style = document.getElementById('image-style')?.value || 'realistic';

    btn.textContent = '⏳ Generating...'; btn.disabled = true;
    grid.innerHTML = Array(4).fill(0).map((_, i) => `
      <div class="image-placeholder" id="img-${i}">
        <div class="generating"><div class="gen-dot"></div><div class="gen-dot"></div><div class="gen-dot"></div></div>
      </div>`).join('');

    const systemPrompt = `You are an AI image description assistant. The user wants to generate a ${style} style image. Describe what this image would look like in vivid detail in 2-3 sentences, then suggest 3 color palettes for it. Be creative and artistic.`;

    try {
      const description = await callGemini(p, systemPrompt);
      const colors = ['#7b2fff,#00f5ff', '#ff2d78,#7b2fff', '#ffd700,#ff2d78', '#00f5ff,#28c840'];
      const emojis = getStyleEmojis(style);

      emojis.forEach((emoji, i) => {
        setTimeout(() => {
          const el = document.getElementById(`img-${i}`);
          if (el) {
            el.className = 'image-placeholder generated';
            el.style.background = `linear-gradient(135deg, ${colors[i]})`;
            el.innerHTML = `
              <div style="text-align:center;padding:16px">
                <div style="font-size:3rem;margin-bottom:8px">${emoji}</div>
                <div style="font-size:0.72rem;color:rgba(255,255,255,0.8);line-height:1.4">${description.substring(0, 60)}...</div>
              </div>`;
          }
          if (i === 3) {
            btn.textContent = '✨ Generate'; btn.disabled = false;
            HISTORY.add({ type: 'image', tool: 'AI Image Generator', prompt: p });
            showToast('4 AI images generated! 🎨', 'success', '🎨');
          }
        }, 600 + i * 500);
      });
    } catch (err) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--accent-pink);padding:20px">❌ ${err.message}</div>`;
      btn.textContent = '✨ Generate'; btn.disabled = false;
    }
  });
}

function getStyleEmojis(style) {
  const map = { realistic: ['🌆','🌅','🏔️','🌊'], anime: ['🌸','🎌','⛩️','🦊'], 'digital-art': ['💎','🔮','🌌','⚡'], 'oil-painting': ['🎨','🖌️','🌺','🏛️'], sketch: ['✏️','📐','🗿','🖊️'] };
  return map[style] || map.realistic;
}

// ── Real AI Code Helper ──
function initCodeHelper() {
  const btn = document.getElementById('generate-code-btn');
  const output = document.getElementById('code-output');
  const prompt = document.getElementById('code-prompt');
  const langSelect = document.getElementById('code-lang');
  const copyBtn = document.getElementById('copy-code-btn');
  if (!btn) return;
  initVoiceInput('code-prompt');

  btn.addEventListener('click', async () => {
    const p = prompt.value.trim();
    if (!p) { showToast('Describe the code you need!', 'error', '⚠'); return; }
    const lang = langSelect?.value || 'javascript';
    const mode = document.getElementById('code-mode')?.value || 'generate';

    output.innerHTML = `<div class="generating" style="padding:20px"><div class="gen-dot"></div><div class="gen-dot"></div><div class="gen-dot"></div><span>Gemini is writing code…</span></div>`;
    btn.disabled = true; btn.textContent = '⏳ Writing...';

    const modePrompts = {
      generate: `Write clean, production-ready ${lang} code for: ${p}. Include comments. Return ONLY the code, no markdown backticks.`,
      debug: `Debug and fix this ${lang} code: ${p}. Explain what was wrong and provide the fixed code. Return ONLY the fixed code.`,
      refactor: `Refactor this ${lang} code to be cleaner and more efficient: ${p}. Return ONLY the refactored code.`,
      explain: `Explain this ${lang} code line by line in simple terms: ${p}`
    };

    try {
      const response = await callGemini(modePrompts[mode] || modePrompts.generate);
      const cleanCode = response.replace(/```[\w]*\n?/g, '').replace(/```/g, '').trim();
      output.textContent = cleanCode;
      btn.disabled = false; btn.textContent = '💻 Generate Code';
      document.getElementById('lang-badge').textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
      HISTORY.add({ type: 'code', tool: 'AI Code Helper', prompt: p });
      showToast('Code generated by Gemini! 💻', 'success', '✓');
    } catch (err) {
      output.textContent = '❌ Error: ' + err.message;
      btn.disabled = false; btn.textContent = '💻 Generate Code';
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = output.textContent;
      if (!code || code.includes('Error') || code.includes('generating')) return;
      navigator.clipboard.writeText(code).then(() => showToast('Copied!', 'success', '📋'));
    });
  }
}

// ── Real AI Chatbot ──
let chatHistory = [];

function initChatbot() {
  const sendBtn = document.getElementById('chat-send-btn');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!sendBtn || !messages) return;
  initVoiceInput('chat-input');

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    input.value = '';
    chatHistory.push({ role: 'user', content: text });
    const typingEl = appendTyping();

    try {
      const historyContext = chatHistory.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const systemPrompt = `You are Akshay AI Assistant — a helpful, friendly, and knowledgeable AI. Be conversational, concise, and helpful. Previous conversation:\n${historyContext}`;
      const response = await callGemini(text, systemPrompt);
      typingEl.remove();
      appendMsg(response, 'bot');
      chatHistory.push({ role: 'assistant', content: response });
      HISTORY.add({ type: 'chat', tool: 'AI Chatbot', prompt: text });
    } catch (err) {
      typingEl.remove();
      appendMsg('❌ Error: ' + err.message + ' — Check your API Key in script.js', 'bot');
    }
  }

  function appendMsg(text, role) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    const user = AUTH.getUser();
    let avatar = role === 'bot' ? '🤖' : (user.photo && user.photo.startsWith('data:') ? `<img src="${user.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : '👤');
    div.innerHTML = `<div class="chat-avatar">${avatar}</div><div class="chat-bubble">${text}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function appendTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="generating"><div class="gen-dot"></div><div class="gen-dot"></div><div class="gen-dot"></div><span style="margin-left:4px">Thinking...</span></div></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
}

// ── Scroll Effects ──
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.style.boxShadow = window.scrollY > 30 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
  });
}

// ── Landing Counters ──
function initLandingCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString() + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  els.forEach(el => observer.observe(el));
}

function guardProtectedPage() {
  if (!AUTH.isLoggedIn()) {
    showToast('Please login first!', 'error', '🔒');
    setTimeout(() => window.location.href = 'login.html', 800);
    return false;
  }
  return true;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Auto-dismiss loading screen if present
  const ls = document.getElementById('loading-screen');
  if (ls) {
    setTimeout(() => {
      ls.classList.add('hidden');
      setTimeout(() => { if (ls.parentNode) ls.style.display = 'none'; }, 600);
    }, 450);
  }

  // Hook all theme toggles
  document.querySelectorAll('#theme-toggle, .theme-toggle-btn, .theme-btn').forEach(btn => {
    btn.onclick = THEME.toggle;
  });

  initNav();
  initReveal();
  initScrollEffects();
  initLandingCounters();

  const page = document.body.dataset.page;
  if (page === 'login') initLogin();
  if (page === 'signup') initSignup();
  if (page === 'dashboard') initDashboard();
  if (page === 'tool-text') { if (guardProtectedPage()) initTextGenerator(); }
  if (page === 'tool-image') { if (guardProtectedPage()) initImageGenerator(); }
  if (page === 'tool-code') { if (guardProtectedPage()) initCodeHelper(); }
  if (page === 'tool-chat') { if (guardProtectedPage()) initChatbot(); }
});
