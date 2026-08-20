/* ==========================================
   ANTIGRAVITY INTERACTIVE ENGINE (GLOBAL)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    injectBackgroundElements();
    initParticles();
    initMagneticHover();
    initSmoothReveal();
    init3DTilt();
});

/* ── Inject Background ── */
function injectBackgroundElements() {
    if (!document.getElementById('particles-canvas')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        Object.assign(canvas.style, {
            position: 'fixed',
            inset: '0',
            zIndex: '-1',
            pointerEvents: 'none'
        });
        document.body.appendChild(canvas);
    }

    if (!document.querySelector('.star-field')) {
        const starField = document.createElement('div');
        starField.className = 'star-field';
        Object.assign(starField.style, {
            position: 'fixed',
            inset: '0',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            zIndex: '-2',
            pointerEvents: 'none'
        });
        document.body.appendChild(starField);
    }
}

/* ── Particle System ── */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* ── Magnetic Hover Effect ── */
function initMagneticHover() {
    const interactives = document.querySelectorAll('.btn-neon, .glass-card, .tool-card, .nav-btn');
    
    interactives.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });
}

/* ── Scroll Reveal ── */
function initSmoothReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── 3D Tilt Effect ── */
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });
}
