/* Help Widget v3 — Inline SVG icon, bulletproof */
window.addEventListener('load', function () {

  var HELP_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>' +
    '<path d="M9.5 9.5C9.5 8.12 10.62 7 12 7s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2 2.5V13" stroke="white" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="12" cy="16.5" r="1" fill="white"/>' +
    '</svg>';

  var CLOSE_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  /* ── CSS ── */
  var s = document.createElement('style');
  s.textContent =
    '#help-fab{position:fixed;bottom:26px;right:26px;width:58px;height:58px;border-radius:50%;' +
    'background:linear-gradient(135deg,#7b2fff 0%,#00bcd4 100%);border:none;cursor:pointer;' +
    'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;' +
    'box-shadow:0 4px 24px rgba(123,47,255,0.55),0 0 0 3px rgba(123,47,255,0.18);' +
    'z-index:2147483647;transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1);' +
    'animation:hfab-pulse 2.8s ease-in-out infinite;}' +

    '#help-fab span{font-family:Arial,sans-serif;font-size:0.58rem;font-weight:700;color:#fff;' +
    'letter-spacing:0.5px;text-transform:uppercase;line-height:1;}' +

    '#help-fab:hover{transform:scale(1.1) translateY(-3px);}' +
    '#help-fab.is-open{animation:none;background:linear-gradient(135deg,#ff2d78,#7b2fff);}' +

    '@keyframes hfab-pulse{' +
    '0%,100%{box-shadow:0 4px 24px rgba(123,47,255,0.55),0 0 0 3px rgba(123,47,255,0.18);}' +
    '50%{box-shadow:0 4px 32px rgba(0,245,255,0.6),0 0 0 5px rgba(0,245,255,0.12);}}' +

    /* overlay */
    '#help-ovl{position:fixed;inset:0;background:rgba(0,0,0,0.48);backdrop-filter:blur(5px);' +
    'z-index:2147483646;opacity:0;pointer-events:none;transition:opacity 0.3s;}' +
    '#help-ovl.on{opacity:1;pointer-events:all;}' +

    /* modal */
    '#help-box{position:fixed;bottom:96px;right:22px;width:320px;max-width:calc(100vw - 32px);' +
    'background:rgba(7,9,28,0.98);border:1.5px solid rgba(123,47,255,0.4);border-radius:20px;' +
    'padding:22px 20px 20px;z-index:2147483647;box-shadow:0 16px 60px rgba(0,0,0,0.55);' +
    'transform:translateY(20px) scale(0.95);opacity:0;pointer-events:none;' +
    'transition:all 0.33s cubic-bezier(0.16,1,0.3,1);}' +
    '#help-box::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;' +
    'background:linear-gradient(90deg,#7b2fff,#00f5ff);border-radius:20px 20px 0 0;}' +
    '#help-box.on{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}' +

    '#help-box h3{font-family:"Syne",Arial,sans-serif;font-size:1rem;font-weight:800;color:#fff;margin:0 0 2px;}' +
    '.hw-sub{font-size:0.75rem;color:rgba(255,255,255,0.38);margin-bottom:14px;}' +

    '.hw-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}' +
    '.hw-tag{font-size:0.72rem;padding:5px 11px;border-radius:50px;cursor:pointer;' +
    'border:1px solid rgba(123,47,255,0.35);color:rgba(255,255,255,0.6);' +
    'background:rgba(123,47,255,0.07);transition:all 0.2s;user-select:none;}' +
    '.hw-tag:hover{border-color:#00f5ff;color:#00f5ff;background:rgba(0,245,255,0.06);}' +
    '.hw-tag.sel{border-color:#7b2fff;background:rgba(123,47,255,0.3);color:#fff;}' +

    '#hw-txt{width:100%;min-height:78px;background:rgba(255,255,255,0.04);' +
    'border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;' +
    'color:#fff;font-size:0.84rem;resize:none;outline:none;box-sizing:border-box;' +
    'font-family:Arial,sans-serif;transition:border-color 0.22s;margin-bottom:11px;}' +
    '#hw-txt:focus{border-color:rgba(123,47,255,0.65);}' +
    '#hw-txt::placeholder{color:rgba(255,255,255,0.25);}' +

    '#hw-btn{width:100%;padding:10px;border:none;border-radius:50px;cursor:pointer;' +
    'background:linear-gradient(135deg,#7b2fff,#00f5ff);color:#fff;' +
    'font-family:"Syne",Arial,sans-serif;font-size:0.88rem;font-weight:700;' +
    'transition:transform 0.2s,box-shadow 0.2s;}' +
    '#hw-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(123,47,255,0.4);}' +
    '#hw-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}' +

    '.hw-ok{display:none;text-align:center;padding:10px 0 4px;}' +
    '.hw-ok-ico{font-size:2rem;margin-bottom:6px;}' +
    '.hw-ok h4{font-family:"Syne",Arial,sans-serif;color:#fff;font-size:0.92rem;margin:0 0 4px;}' +
    '.hw-ok p{font-size:0.76rem;color:rgba(255,255,255,0.4);}' +

    '@media(max-width:480px){#help-box{right:12px;width:calc(100vw - 24px);}' +
    '#help-fab{bottom:16px;right:16px;}}';
  document.head.appendChild(s);

  /* ── Elements ── */
  var fab = document.createElement('button');
  fab.id = 'help-fab';
  fab.setAttribute('aria-label', 'Help & Support');
  fab.innerHTML = HELP_SVG + '<span>Help</span>';
  document.body.appendChild(fab);

  var ovl = document.createElement('div');
  ovl.id = 'help-ovl';
  document.body.appendChild(ovl);

  var TAGS = ['🔑 Login/Signup','🤖 AI not responding','🐢 Website slow','📱 Mobile issue',
              '🔧 Tool broken','🔒 Account security','✨ Feature request','🐛 Bug report'];

  var box = document.createElement('div');
  box.id = 'help-box';
  box.innerHTML =
    '<h3>🛟 Help & Support</h3>' +
    '<p class="hw-sub">Pick an issue or describe your problem.</p>' +
    '<div class="hw-tags">' + TAGS.map(function(t){ return '<span class="hw-tag">'+t+'</span>'; }).join('') + '</div>' +
    '<textarea id="hw-txt" placeholder="Describe your issue..."></textarea>' +
    '<button id="hw-btn">🚀 Send Report</button>' +
    '<div class="hw-ok" id="hw-ok"><div class="hw-ok-ico">✅</div>' +
    '<h4>Reported! We\'ll reply in 24 hrs.</h4><p>Thank you for your feedback!</p></div>';
  document.body.appendChild(box);

  /* ── State ── */
  var picked = [];

  function open() {
    box.classList.add('on');
    ovl.classList.add('on');
    fab.classList.add('is-open');
    fab.innerHTML = CLOSE_SVG;
  }
  function close() {
    box.classList.remove('on');
    ovl.classList.remove('on');
    fab.classList.remove('is-open');
    fab.innerHTML = HELP_SVG + '<span>Help</span>';
  }

  fab.onclick = function(e){ e.stopPropagation(); box.classList.contains('on') ? close() : open(); };
  ovl.onclick = close;
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });

  box.querySelector('.hw-tags').onclick = function(e) {
    var t = e.target;
    while(t && !t.classList.contains('hw-tag')) t = t.parentElement;
    if(!t) return;
    t.classList.toggle('sel');
    var txt = t.textContent.trim();
    if(t.classList.contains('sel')) picked.push(txt);
    else picked = picked.filter(function(x){ return x!==txt; });
  };

  document.getElementById('hw-btn').onclick = function() {
    var custom = document.getElementById('hw-txt').value.trim();
    if(!picked.length && !custom) {
      var ta = document.getElementById('hw-txt');
      ta.style.borderColor='rgba(255,45,120,0.7)'; ta.focus();
      setTimeout(function(){ ta.style.borderColor=''; }, 2000);
      return;
    }
    var btn = document.getElementById('hw-btn');
    btn.disabled=true; btn.textContent='⏳ Sending...';
    var subj = encodeURIComponent('[Akshay AI Tools] Issue Report');
    var body = encodeURIComponent('Issues:\n'+(picked.length?picked.join('\n'):'None')+'\n\nDetails:\n'+(custom||'None')+'\n\nPage: '+location.href);
    setTimeout(function(){
      window.open('mailto:bhorakshay146@gmail.com?subject='+subj+'&body='+body,'_blank');
      document.getElementById('hw-ok').style.display='block';
      btn.style.display='none';
      picked=[]; document.querySelectorAll('.hw-tag.sel').forEach(function(x){x.classList.remove('sel');});
      document.getElementById('hw-txt').value='';
      setTimeout(function(){ document.getElementById('hw-ok').style.display='none'; btn.style.display='block'; btn.disabled=false; btn.textContent='🚀 Send Report'; close(); }, 3500);
    }, 700);
  };

});
