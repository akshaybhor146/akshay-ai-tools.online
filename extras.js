/* ═══════════════════════════
   EXTRAS.JS — Loading, Particles,
   Cursor, Transitions, Counter
═══════════════════════════ */

// ── Loading Screen ──
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(() => { screen.classList.add('hidden'); }, 1900);
}

// ── Particles ──
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  const COLORS = ['rgba(0,245,255,', 'rgba(123,47,255,', 'rgba(255,45,120,'];
  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.1,
    pulse: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.pulse += 0.02;
      const a = p.alpha + Math.sin(p.pulse) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + a + ')';
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(123,47,255,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Custom Cursor ──
function initCursor() {
  if (window.innerWidth <= 768) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .tool-card, .dash-tool-card, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
  document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
  document.addEventListener('mouseup', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
}

// ── Page Transitions ──
function initPageTransitions() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  // Exit animation on link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('enter');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

  // Entrance animation
  overlay.classList.add('exit');
  setTimeout(() => overlay.classList.remove('exit'), 400);
}

// ── Usage Counter ──
const USAGE = {
  get: () => JSON.parse(localStorage.getItem('aat_usage') || '{"total":0,"text":0,"image":0,"code":0,"chat":0,"resume":0,"translator":0,"youtube":0,"social":0}'),
  increment: (tool) => {
    const u = USAGE.get();
    u.total = (u.total || 0) + 1;
    u[tool] = (u[tool] || 0) + 1;
    localStorage.setItem('aat_usage', JSON.stringify(u));
    updateUsageDisplay();
  },
  display: () => {
    const u = USAGE.get();
    return u.total || 0;
  }
};

function updateUsageDisplay() {
  const els = document.querySelectorAll('[data-usage]');
  const u = USAGE.get();
  els.forEach(el => {
    const tool = el.dataset.usage;
    el.textContent = tool === 'total' ? u.total || 0 : u[tool] || 0;
  });
}

// ── Init All Extras ──
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initParticles();
  initCursor();
  initPageTransitions();
  updateUsageDisplay();
});
