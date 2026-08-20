# 🎨 Sapphire Palette + Animations — Website Theming Prompt
# ============================================================
# INSTRUCTIONS FOR AI: Read this entire file carefully before
# making any changes. Follow every rule exactly as written.
# ============================================================

You are a UI/UX theming specialist. Your task is to apply a complete
visual theme to an existing website.

⚠️ STRICT RULES — DO NOT VIOLATE:
- Do NOT change any HTML structure or layout
- Do NOT modify any JavaScript logic, functions, or variables
- Do NOT alter any class names, IDs, or data attributes
- Do NOT touch any API calls, event listeners, or business logic
- Do NOT change any content, text, or images
- ONLY add or modify CSS custom properties (variables), font imports,
  @keyframes, and visual styling/animation rules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 COLOUR PALETTE — SAPPHIRE BLUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implement as CSS custom properties.
Use [data-theme="light"] and [data-theme="dark"] attribute
selectors. If the site uses a different toggle mechanism
(e.g. .dark class, prefers-color-scheme), adapt accordingly
without changing any JS toggle logic.

── LIGHT MODE ──────────────────────────────
  --bg-base:        #EEF0FF;   /* Page background         */
  --bg-surface:     #FFFFFF;   /* Cards, modals, nav      */
  --bg-card:        #DFE3FF;   /* Subtle card backgrounds */
  --accent-primary: #3B23D8;   /* Primary buttons, links  */
  --accent-second:  #6C55FF;   /* Hover states, secondary */
  --accent-soft:    #C8C0FF;   /* Tints, focus rings      */
  --text-head:      #100D40;   /* Headings, titles        */
  --text-body:      #30286B;   /* Body paragraphs         */
  --text-muted:     #7A72B8;   /* Placeholders, captions  */
  --border:         #C0B8F5;   /* Borders, dividers       */
  --gradient:       linear-gradient(135deg, #3B23D8, #6C55FF, #ABAEFF);
  --shadow:         0 4px 32px rgba(59, 35, 216, 0.14);
  --shadow-hover:   0 12px 40px rgba(59, 35, 216, 0.28);
  --glow:           0 0 20px rgba(59, 35, 216, 0.35);

── DARK MODE ───────────────────────────────
  --bg-base:        #040310;   /* Page background         */
  --bg-surface:     #090820;   /* Cards, modals, nav      */
  --bg-card:        #100E32;   /* Subtle card backgrounds */
  --accent-primary: #7060FF;   /* Primary buttons, links  */
  --accent-second:  #9888FF;   /* Hover states, secondary */
  --accent-soft:    #180D48;   /* Tints, focus rings      */
  --text-head:      #E0DEFF;   /* Headings, titles        */
  --text-body:      #8880CC;   /* Body paragraphs         */
  --text-muted:     #3C3890;   /* Placeholders, captions  */
  --border:         #1C1855;   /* Borders, dividers       */
  --gradient:       linear-gradient(135deg, #100E32, #3B23D8, #7060FF);
  --shadow:         0 4px 40px rgba(112, 96, 255, 0.22);
  --shadow-hover:   0 14px 48px rgba(112, 96, 255, 0.40);
  --glow:           0 0 24px rgba(112, 96, 255, 0.45);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Import from Google Fonts:
  https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800
  &family=Instrument+Sans:wght@300;400;500;600&display=swap

Apply:
  --font-display: 'Syne', sans-serif;
  --font-body:    'Instrument Sans', sans-serif;

  body, p, input, button → font-family: var(--font-body)
  h1, h2, h3, .logo      → font-family: var(--font-display)

  h1: font-weight 800, letter-spacing -1.5px to -2px, line-height 1.1
  h2: font-weight 700, letter-spacing -0.8px
  h3: font-weight 600
  body: line-height 1.7

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖌️ UI STYLE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BACKGROUNDS
  body                → background: var(--bg-base)
  nav, header, footer → background: var(--bg-surface)
  cards, modals       → background: var(--bg-surface)
  subtle sections     → background: var(--bg-card)

BORDERS & RADIUS
  Cards               → border: 1px solid var(--border);
                        border-radius: 16px
  Inputs, selects     → border: 1.5px solid var(--border);
                        border-radius: 9px
  Buttons (primary)   → border-radius: 10px
  Buttons (pill/tag)  → border-radius: 99px
  Badges/chips        → border-radius: 8px

BUTTONS
  Primary:  background: var(--accent-primary); color: #fff;
            box-shadow: var(--shadow);
  Ghost:    border: 1.5px solid var(--accent-primary);
            color: var(--accent-primary); background: transparent;

TEXT
  Headings:   color: var(--text-head)
  Body text:  color: var(--text-body)
  Muted text: color: var(--text-muted)
  Links:      color: var(--accent-primary); text-decoration: none
  Link hover: color: var(--accent-second)

GRADIENT ACCENTS
  Hero heading gradient text:
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

  Decorative bars / dividers:
    background: var(--gradient);
    height: 6–10px; border-radius: 99px;

SHADOWS
  Cards & surfaces: box-shadow: var(--shadow)
  Nav bar:          box-shadow: 0 2px 24px var(--shadow)

NAV / HEADER
  position: sticky; top: 0; z-index: 100
  background: var(--bg-surface)
  border-bottom: 1px solid var(--border)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)

SCROLLBAR
  ::-webkit-scrollbar { width: 6px }
  ::-webkit-scrollbar-track { background: var(--bg-base) }
  ::-webkit-scrollbar-thumb {
    background: var(--accent-soft); border-radius: 99px
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent-primary) }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ ANIMATIONS & TRANSITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add ALL of the following using only CSS @keyframes and
transition properties. Do NOT touch any JS. Do NOT change
HTML. Only inject CSS rules targeting existing elements
by their existing classes/tags/IDs.

──────────────────────────────────────────────
1. GLOBAL THEME TRANSITION
   Apply to every element so light ↔ dark mode
   feels like a smooth cinematic fade:

   *, *::before, *::after {
     transition:
       background-color 0.45s ease,
       color            0.45s ease,
       border-color     0.45s ease,
       box-shadow       0.45s ease,
       fill             0.45s ease,
       stroke           0.45s ease;
   }

──────────────────────────────────────────────
2. PAGE LOAD — FADE + RISE ENTRANCE
   On initial load, all major sections and
   elements should fade in and rise from below.

   @keyframes fadeRiseIn {
     from {
       opacity: 0;
       transform: translateY(28px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }

   Usage pattern:
   .hero-content  { animation: fadeRiseIn 0.7s ease both;
                    animation-delay: 0.1s; }
   .section-1     { animation: fadeRiseIn 0.7s ease both;
                    animation-delay: 0.2s; }
   .section-2     { animation: fadeRiseIn 0.7s ease both;
                    animation-delay: 0.35s; }
   .cards > *:nth-child(1) { animation-delay: 0.1s; }
   .cards > *:nth-child(2) { animation-delay: 0.2s; }
   .cards > *:nth-child(3) { animation-delay: 0.3s; }
   (continue staggering for more children)

──────────────────────────────────────────────
3. CARD HOVER — FLOAT + GLOW
   Cards should feel like they lift off the
   surface on hover with a glowing shadow.

   .card, [class*="card"] {
     transition:
       transform    0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
       box-shadow   0.28s ease,
       border-color 0.28s ease;
     will-change: transform;
   }
   .card:hover, [class*="card"]:hover {
     transform:    translateY(-7px) scale(1.012);
     box-shadow:   var(--shadow-hover);
     border-color: var(--accent-soft);
   }

──────────────────────────────────────────────
4. BUTTON ANIMATIONS

   a) Primary button — lift + glow on hover:
   button[class*="primary"], .btn-primary,
   input[type="submit"] {
     transition:
       transform  0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
       box-shadow 0.22s ease,
       background 0.3s ease;
     position: relative;
     overflow: hidden;
   }
   :hover state → transform: translateY(-3px) scale(1.03);
                  box-shadow: var(--glow);

   b) Ripple effect on click — CSS only:
   button::after {
     content: '';
     position: absolute;
     inset: 0;
     background: rgba(255,255,255,0.18);
     border-radius: inherit;
     opacity: 0;
     transform: scale(0);
     transition: transform 0.4s ease, opacity 0.4s ease;
   }
   button:active::after {
     transform: scale(2.5);
     opacity: 0;
     transition: 0s;
   }

   c) Ghost button — border glow pulse on hover:
   .btn-ghost:hover {
     box-shadow: 0 0 0 3px var(--accent-soft),
                 var(--glow);
   }

──────────────────────────────────────────────
5. NAVIGATION LINK UNDERLINE SLIDE
   Nav links get a sliding underline on hover
   using a pseudo-element. No HTML changes.

   nav a {
     position: relative;
   }
   nav a::after {
     content: '';
     position: absolute;
     bottom: -3px; left: 0;
     width: 0; height: 2px;
     background: var(--accent-primary);
     border-radius: 99px;
     transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
   }
   nav a:hover::after { width: 100%; }

──────────────────────────────────────────────
6. INPUT FIELD FOCUS ANIMATION

   input, select, textarea {
     transition:
       border-color 0.25s ease,
       box-shadow   0.25s ease,
       transform    0.2s ease;
   }
   input:focus, select:focus, textarea:focus {
     border-color: var(--accent-primary);
     box-shadow: 0 0 0 3.5px var(--accent-soft);
     transform: translateY(-1px);
     outline: none;
   }

──────────────────────────────────────────────
7. LOGO / ACCENT DOT PULSE
   Any brand dot, status indicator, or live
   badge should gently pulse to feel alive.

   @keyframes glowPulse {
     0%, 100% {
       box-shadow: 0 0 6px var(--accent-primary);
       transform: scale(1);
       opacity: 1;
     }
     50% {
       box-shadow: 0 0 18px var(--accent-primary);
       transform: scale(1.4);
       opacity: 0.5;
     }
   }

   .logo-dot, [class*="status-dot"],
   [class*="badge-live"] {
     animation: glowPulse 2.2s ease-in-out infinite;
   }

──────────────────────────────────────────────
8. GRADIENT BAR SHIMMER
   Any gradient divider bars should have a
   subtle shimmer animation moving across.

   @keyframes shimmer {
     0%   { background-position: -200% center; }
     100% { background-position:  200% center; }
   }

   .gradient-bar, [class*="divider"],
   hr[class*="gradient"] {
     background: linear-gradient(
       90deg,
       var(--accent-primary) 0%,
       var(--accent-second)  40%,
       var(--accent-soft)    60%,
       var(--accent-primary) 100%
     );
     background-size: 200% auto;
     animation: shimmer 3.5s linear infinite;
   }

──────────────────────────────────────────────
9. SCROLL-TRIGGERED FADE IN
   Elements below the fold animate in as the
   user scrolls. Uses a minimal class-toggle
   script that does NOT modify existing JS.

   CSS setup:
   .scroll-reveal {
     opacity: 0;
     transform: translateY(32px);
     transition:
       opacity   0.65s ease,
       transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
   }
   .scroll-reveal.is-visible {
     opacity: 1;
     transform: translateY(0);
   }

   Minimal IntersectionObserver
   (add as a NEW separate <script> block only):
   ─────────────────────────────────────────
   <script>
     const revealEls = document.querySelectorAll(
       'section, .card, .stat-block, .hero > *'
     );
     revealEls.forEach(el => el.classList.add('scroll-reveal'));
     const io = new IntersectionObserver(entries => {
       entries.forEach(e => {
         if (e.isIntersecting) {
           e.target.classList.add('is-visible');
           io.unobserve(e.target);
         }
       });
     }, { threshold: 0.12 });
     revealEls.forEach(el => io.observe(el));
   </script>
   ─────────────────────────────────────────
   ⚠️ This script ONLY toggles a CSS class.
      It does NOT modify any existing logic.

──────────────────────────────────────────────
10. STAT / NUMBER POP-IN
    Stat numbers get a bouncy pop-in on load
    so they feel energetic and alive.

    @keyframes popIn {
      0%   { transform: scale(0.7); opacity: 0; }
      70%  { transform: scale(1.08); }
      100% { transform: scale(1);   opacity: 1; }
    }

    .stat-num, [class*="stat"] > :first-child,
    [class*="counter"] {
      animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .stat-block:nth-child(1) .stat-num { animation-delay: 0.10s; }
    .stat-block:nth-child(2) .stat-num { animation-delay: 0.22s; }
    .stat-block:nth-child(3) .stat-num { animation-delay: 0.34s; }
    .stat-block:nth-child(4) .stat-num { animation-delay: 0.46s; }

──────────────────────────────────────────────
11. PROGRESS BAR FILL ANIMATION
    Progress bars animate from 0% to their
    target width on page load.

    @keyframes fillBar {
      from { width: 0%; opacity: 0.4; }
      to   { opacity: 1; }
    }

    [class*="progress-fill"],
    [class*="bar-fill"],
    [role="progressbar"] > * {
      animation: fillBar 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 0.3s;
    }

──────────────────────────────────────────────
12. ICON / EMOJI MICRO-BOUNCE ON HOVER
    Card icons and decorative elements bounce
    subtly when hovered.

    @keyframes microBounce {
      0%,100% { transform: translateY(0); }
      40%     { transform: translateY(-5px); }
      70%     { transform: translateY(-2px); }
    }

    [class*="card-icon"]:hover,
    [class*="icon"]:hover,
    [class*="feature-icon"]:hover {
      animation: microBounce 0.5s ease;
    }

──────────────────────────────────────────────
13. THEME TOGGLE KNOB SPIN
    The dark/light toggle knob slides and
    rotates when the theme switches.

    .toggle::after, [class*="toggle-thumb"],
    [class*="theme-knob"] {
      transition:
        transform  0.38s cubic-bezier(0.4, 0, 0.2, 1),
        background 0.38s ease;
    }
    [data-theme="dark"] .toggle::after {
      transform: translateX(24px) rotate(180deg);
    }

──────────────────────────────────────────────
14. TAG / BADGE HOVER POP
    Tags and badges scale up slightly on hover
    for satisfying tactile feedback.

    [class*="tag"], [class*="badge"],
    [class*="chip"], [class*="pill"] {
      transition:
        transform  0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.18s ease,
        background 0.2s ease;
      cursor: pointer;
    }
    [class*="tag"]:hover {
      transform:  scale(1.07) translateY(-1px);
      box-shadow: var(--shadow);
    }

──────────────────────────────────────────────
15. ALERT / NOTIFICATION SLIDE-IN
    Alert banners and toasts slide in from
    the top on appearance.

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    [class*="alert"], [class*="toast"],
    [class*="notification"], [class*="banner"] {
      animation: slideDown 0.45s
                 cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 0.2s;
    }

──────────────────────────────────────────────
16. IMAGE / AVATAR HOVER ZOOM
    Images and thumbnails subtly zoom on hover
    inside their container (overflow: hidden).

    img, [class*="thumbnail"], [class*="avatar"],
    [class*="feature-img"] {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    img:hover, [class*="thumbnail"]:hover {
      transform: scale(1.05);
    }

──────────────────────────────────────────────
17. MODAL / DROPDOWN SCALE-IN
    Popups, modals, and dropdowns scale in
    from center on open.

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.92) translateY(8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    [class*="modal"], [class*="dropdown"],
    [class*="popup"], [class*="tooltip"],
    [class*="menu"][class*="open"] {
      animation: scaleIn 0.3s
                 cubic-bezier(0.16, 1, 0.3, 1) both;
      transform-origin: top center;
    }

──────────────────────────────────────────────
18. PERFORMANCE BEST PRACTICES
    Always follow these for buttery 60fps:

    ✅ Only animate: transform, opacity,
       box-shadow, filter — GPU-safe properties
    ✅ Add will-change: transform to cards,
       buttons, and modals
    ✅ Use cubic-bezier(0.16, 1, 0.3, 1) for
       snappy spring-like easing
    ✅ Use cubic-bezier(0.34, 1.56, 0.64, 1)
       for bouncy/elastic easing
    ✅ Keep durations: 0.2s (micro) – 0.8s (entrance)
    ✅ Always use animation-fill-mode: both
    ✅ Respect reduced motion:

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration:        0.01ms !important;
        animation-iteration-count: 1      !important;
        transition-duration:       0.01ms !important;
      }
    }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ THEME TOGGLE IMPLEMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do NOT rewrite the toggle JavaScript.
Only ensure CSS variables respond to
whatever toggle mechanism already exists:
  - data-theme attr  → [data-theme="dark"] selector
  - .dark class      → html.dark selector
  - OS preference    → @media (prefers-color-scheme: dark)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ FINAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before finishing, verify every item:

PALETTE
[ ] All background colors use CSS variables
[ ] All text colors use CSS variables
[ ] All border colors use CSS variables
[ ] Both light and dark modes fully render
[ ] No hardcoded hex values in themed rules

TYPOGRAPHY
[ ] Google Fonts imported at top of CSS
[ ] Syne applied to all headings & logo
[ ] Instrument Sans applied to body text
[ ] Letter-spacing and line-height applied

ANIMATIONS
[ ] Page load fade-rise entrance works
[ ] Cards lift and glow on hover
[ ] Buttons lift, glow, and show ripple
[ ] Nav links have sliding underline
[ ] Input focus shows ring + slight rise
[ ] Logo dot / status badge pulses
[ ] Gradient bars have shimmer
[ ] Scroll-reveal works on sections & cards
[ ] Stat numbers pop in with stagger
[ ] Progress bars fill from left on load
[ ] Card icons micro-bounce on hover
[ ] Theme toggle knob spins on switch
[ ] Tags scale on hover
[ ] Alerts slide down on appear
[ ] Modals / dropdowns scale in

QUALITY
[ ] No layout or structure changed
[ ] No JavaScript logic modified
[ ] All animations are GPU-safe
[ ] will-change applied where needed
[ ] prefers-reduced-motion respected
[ ] Animations feel smooth at 60fps
[ ] No flickering or layout shift (CLS)
