(() => {
'use strict';

/* =====================================================================
   CONTENT  -  edit text, images and links here. Nothing else needs to change.
   - Images live in the img/ folder next to this file.
   - Each folder on the desktop is one entry in "folders". A folder with a
     single item opens straight into the viewer; more items open a gallery.
   - icon: 'folder' or 'frame'.  tint: any hex colour for the folder.
   ===================================================================== */
const CONTENT = {
  name: 'Lakshmi Kumavat',
  shortName: 'Lakshmi',
  role: 'Visual Designer',
  portrait: 'img/lakshmi-pixel.png',
  bio: [
    'Hi, I am Lakshmi. Design has always been a strong passion of mine. Art plays a significant role in my life, and I always try to find a way to do things creatively.',
    'I have more than two years of experience as a Graphic Designer, but I believe there is still so much more to learn and explore. I\'m eager to dive into different areas of design, continually grow my skills, and take on new creative challenges.',
    'For me, design is not just work, it\'s something I truly enjoy and love doing.'
  ],
  stat: '2+ years of experience',
  experience: [
    { title: 'Visual Designer',  place: 'Birds of Paradyes',          years: '2025 – 2026' },
    { title: 'Graphic Designer', place: 'Equinoxx Creative Academy',  years: '2024 – 2025' }
  ],
  education: [
    { title: 'Graphic Design',   place: 'Equinoxx Creative Academy',  years: '2023 – 2024' },
    { title: 'Bachelor of Arts', place: 'Gujarat College',            years: '2020 – 2023' },
    { title: 'High School',      place: 'A-One School',               years: '2018 – 2020' }
  ],
  skills: {
    'Craft': ['Social Media Design', 'Branding & Logo Design', 'Content Strategy', 'Meta Ads', 'Illustration', 'Typography', 'Basic UI/UX Design', 'Video Editing'],
    'How I work': ['Creative Thinking', 'Visual Communication', 'Team Management', 'Problem Solving', 'Communication', 'Attention to Detail']
  },
  // Replace these placeholders with your real details.
  contact: [
    { label: 'Email',     value: 'your-email@example.com' },
    { label: 'Instagram', value: '@your.handle' },
    { label: 'LinkedIn',  value: 'linkedin.com/in/your-name' }
  ],
  folders: [
    {
      id: 'branding', label: 'Branding', icon: 'folder', tint: '#c9a7e0',
      items: [
        { title: 'Tiny Crumbs', image: 'img/tiny-crumbs.jpg',
          text: 'Tiny Crumbs is Tina\'s little world of baking, where every sweet creation is made with love and a touch of her personality. The branding brings this to life through a playful, personal identity that reflects both Tina\'s charm and the irresistible cuteness of her bakes.',
          tags: ['Logo', 'Packaging', 'Business cards', 'Stickers'] },
        { title: 'Grills N Gains', image: 'img/grills-n-gains.jpg',
          text: 'Grills N Gains is a premium nutrition-first food brand built for people who take their goals seriously. From protein-packed grills and bowls to customised nutrition plans, every meal is designed to fuel performance, support progress, and fit seamlessly into modern life.',
          tags: ['Logo', 'Apron', 'Packaging', 'Signage'] },
        { title: 'Shreeya Devi Matka House', image: 'img/matka-house.jpg',
          text: 'A family-owned pottery business built on 18 years of craftsmanship, trust, and tradition. Instead of using an existing typeface, the wordmark was hand-crafted for the brand, with every character customised to reflect the organic curves of traditional clay pots.',
          tags: ['Hand-crafted wordmark', 'Illustration', 'Merch'] }
      ]
    },
    {
      id: 'paradyes', label: 'Work at Paradyes', icon: 'folder', tint: '#f2a6c8',
      items: [
        { title: 'Special edition packaging and ads', image: 'img/paradyes-packaging.jpg',
          text: 'Limited-edition Paradyes hair colour packaging and the ads that launched it: Vampy Red, Purple Cherry, Baddie Birthday and Be a Baddie.',
          tags: ['Packaging', 'Ads', 'Limited edition'] },
        { title: '5 year celebration box', image: 'img/paradyes-box.jpg',
          text: 'A gift box for Paradyes turning 5, with an illustrated lid, a timeline card of the journey so far and a thank-you note.',
          tags: ['Gift box', 'Print', 'Packaging'] },
        { title: 'Ads for Lovelang', image: 'img/lovelang.jpg',
          text: 'Social ads for Lovelang hair care combos: Mango + Hyaluronic, Peach + Biotin and a Valentine\'s campaign.',
          tags: ['Social ads', 'Campaigns'] }
      ]
    },
    {
      id: 'social', label: 'Social Media', icon: 'folder', tint: '#d98bc4',
      items: [
        { title: 'Social media design', image: 'img/social.jpg',
          text: 'Posters and posts for events, brand campaigns and seasonal content, from club nights to hair colour launches.',
          tags: ['Posters', 'Event promos', 'Brand campaigns'] }
      ]
    },
    {
      id: 'art', label: 'Little Art', icon: 'frame',
      items: [
        { title: 'Little Art', image: 'img/little-art.jpg',
          text: 'Sketches, journal spreads, a hand-painted jacket, a window mural and digital illustrations made for the love of it.',
          tags: ['Sketches', 'Journaling', 'Hand-painted', 'Digital illustration'] }
      ]
    }
  ]
};
/* ===================== end of CONTENT ===================== */


/* ---------- tiny helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (v === true) e.setAttribute(k, '');
    else e.setAttribute(k, v);
  }
  kids.flat().filter(Boolean).forEach(c => e.append(c));
  return e;
}

/* ---------- pixel sprites (each letter is one pixel) ---------- */
const SPRITE_VARS = { k: '--px-k', b: '--px-b', s: '--px-s', y: '--px-y', p: '--px-p', w: '--px-w', g: '--px-g' };
function spritePalette() {
  const cs = getComputedStyle(document.documentElement);
  const pal = {};
  for (const [key, name] of Object.entries(SPRITE_VARS)) pal[key] = cs.getPropertyValue(name).trim();
  return pal;
}
function paintSprite(c) {
  const rows = ART[c.dataset.art] || ART.doc;
  const over = c.dataset.over ? JSON.parse(c.dataset.over) : null;
  const pal = Object.assign(spritePalette(), over || {});
  const g = c.getContext('2d');
  g.clearRect(0, 0, c.width, c.height);
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    const col = pal[ch];
    if (col) { g.fillStyle = col; g.fillRect(x, y, 1, 1); }
  }));
}
function repaintSprites() {
  document.querySelectorAll('canvas.sprite').forEach(paintSprite);
}
const ART = {
  folder: [
    '.kkkkkk.........',
    'kyyyyyykkkkkkkk.',
    'kyyyyyyyyyyyyyk.',
    'kwwwwwwwwwwwwwk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    'kwyyyyyyyyyyyyk.',
    '.kkkkkkkkkkkkk..'
  ],
  doc: [
    'kkkkkkkkkk....',
    'kwwwwwwwwkk...',
    'kwwwwwwwwkwk..',
    'kwwwwwwwwkkkk.',
    'kwbbbbbbwwwwk.',
    'kwwwwwwwwwwwk.',
    'kwbbbbbbbbbwk.',
    'kwwwwwwwwwwwk.',
    'kwbbbbbbbwwwk.',
    'kwwwwwwwwwwwk.',
    'kwbbbbbbbbbwk.',
    'kwwwwwwwwwwwk.',
    'kwwwwwwwwwwwk.',
    'kkkkkkkkkkkkk.'
  ],
  frame: [
    'kkkkkkkkkkkkkk',
    'kssssssssssssk',
    'kssssssssyyssk',
    'kssssssssyyssk',
    'ksssssbssssssk',
    'kssssbbbssbssk',
    'ksssbbbbbbbbsk',
    'kssbbbbbbbbbbk',
    'kkkkkkkkkkkkkk'
  ],
  mail: [
    'kkkkkkkkkkkkkk',
    'kpkppppppppkpk',
    'kppkppppppkppk',
    'kpppkppppkpppk',
    'kppppkkkkppppk',
    'kppppppppppppk',
    'kppppppppppppk',
    'kkkkkkkkkkkkkk'
  ],
  star: [
    '.....y.....',
    '.....y.....',
    '....yyy....',
    'yyyyyyyyyyy',
    '.yyyyyyyyy.',
    '..yyyyyyy..',
    '..yyyyyyy..',
    '.yyyy.yyyy.',
    '.yyy...yyy.',
    'yy.......yy'
  ]
};
function sprite(name, over, px) {
  const key = ART[name] ? name : 'doc';
  const rows = ART[key];
  const w = Math.max(...rows.map(r => r.length)), hh = rows.length;
  const c = document.createElement('canvas');
  c.width = w; c.height = hh; c.className = 'sprite'; c.setAttribute('aria-hidden', 'true');
  c.dataset.art = key;
  if (over) c.dataset.over = JSON.stringify(over);
  c.style.setProperty('--sw', w);
  c.style.setProperty('--sh', hh);
  c.style.width = (w * px) + 'px'; c.style.height = (hh * px) + 'px';
  paintSprite(c);
  return c;
}

/* ---------- theme ---------- */
const THEME_KEY = 'lakshmi-os-theme';
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const themeBtn = $('#themebtn');
const themeLabel = $('#themelabel');
function storedTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
}
function applyTheme(theme, persist) {
  const dark = theme === 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  if (themeLabel) themeLabel.textContent = dark ? 'Dark' : 'Light';
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#160b1b' : '#ffe9f3');
  if (persist) { try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ } }
  repaintSprites();
}
function toggleTheme() {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
}
applyTheme(storedTheme() || (systemDark.matches ? 'dark' : 'light'), false);
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
systemDark.addEventListener('change', e => {
  if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light', false);
});
function warmAltBackground() {
  const img = new Image();
  img.src = document.documentElement.dataset.theme === 'dark' ? 'img/laxmi-light-bg.png' : 'img/laxmi-dark-bg.png';
}
if ('requestIdleCallback' in window) requestIdleCallback(warmAltBackground, { timeout: 4000 });
else setTimeout(warmAltBackground, 3000);

/* ---------- window manager ---------- */
const area = $('#desk'), tasks = $('#tasks'), taskEmpty = $('#taskEmpty');
const narrow = matchMedia('(max-width: 720px)');
const coarse = matchMedia('(pointer: coarse)');
const wins = new Map();
let z = 10, cascade = 0, active = null;

/* ---------- icon <-> window morph animations ---------- */
function originForWin(id) {
  const key = id.includes(':') ? id.slice(id.indexOf(':') + 1) : id;
  return document.querySelector('.icon[data-id="' + CSS.escape(key) + '"]');
}
function morphFrom(el, target) {
  const a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
  const dx = b.left - a.left, dy = b.top - a.top;
  const sx = b.width / a.width, sy = b.height / a.height;
  return { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')', opacity: .2 };
}
function cancelAnim(r) {
  if (r.anim) { const a = r.anim; r.anim = null; a.cancel(); }
  r.root.classList.remove('animating');
}
function playOpen(r) {
  const icon = originForWin(r.id);
  if (!icon) return;
  r.root.classList.add('animating');
  const anim = r.root.animate([morphFrom(r.root, icon), { transform: 'none', opacity: 1 }],
    { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
  r.anim = anim;
  anim.addEventListener('finish', () => {
    if (r.anim === anim) r.anim = null;
    r.root.classList.remove('animating');
  });
}
function playCollapse(r, done) {
  const target = originForWin(r.id) || r.task;
  const end = morphFrom(r.root, target);
  end.opacity = 0;
  r.root.classList.add('animating');
  const anim = r.root.animate([{ transform: 'none', opacity: 1 }, end],
    { duration: 260, easing: 'cubic-bezier(.4,0,.2,1)' });
  r.anim = anim;
  anim.addEventListener('finish', () => {
    if (r.anim !== anim) return;
    r.anim = null;
    r.root.classList.remove('animating');
    done();
  });
  anim.addEventListener('cancel', () => {
    if (r.anim === anim) r.anim = null;
    r.root.classList.remove('animating');
  });
}

function syncTasks() {
  wins.forEach(x => {
    const on = x.id === active && !x.root.hidden;
    x.root.classList.toggle('active', on);
    x.task.setAttribute('aria-pressed', String(on));
    x.task.classList.toggle('min', x.root.hidden);
  });
  taskEmpty.hidden = wins.size > 0;
}
function focusWin(id) {
  const r = wins.get(id);
  if (!r || r.closing) return;
  const wasHidden = r.root.hidden;
  cancelAnim(r);
  r.minimizing = false;
  r.root.hidden = false;
  r.root.style.zIndex = String(++z);
  active = id;
  syncTasks();
  if (wasHidden) playOpen(r);
}
function topVisible(except) {
  return [...wins.values()].filter(w => !w.root.hidden && w.id !== except)
    .sort((a, b) => Number(b.root.style.zIndex) - Number(a.root.style.zIndex))[0];
}
function minimizeWin(id) {
  const r = wins.get(id);
  if (!r || r.minimizing || r.closing) return;
  cancelAnim(r);
  r.minimizing = true;
  if (active === id) {
    active = null;
    const next = topVisible(id);
    if (next) active = next.id;
  }
  syncTasks();
  playCollapse(r, () => {
    r.minimizing = false;
    r.root.hidden = true;
    syncTasks();
  });
}
function closeWin(id, instant) {
  const r = wins.get(id);
  if (!r || r.closing) return;
  cancelAnim(r);
  r.closing = true;
  if (active === id) {
    active = null;
    const next = topVisible(id);
    if (next) active = next.id;
  }
  syncTasks();
  const done = () => {
    r.root.remove(); r.task.remove(); wins.delete(id);
    if (active === id) {
      active = null;
      const next = topVisible();
      if (next) active = next.id;
    }
    syncTasks();
  };
  if (instant) done();
  else playCollapse(r, done);
}
function toggleMax(r) {
  const before = r.root.getBoundingClientRect();
  r.root.classList.toggle('maxed');
  const after = r.root.getBoundingClientRect();
  if (!after.width || !after.height) return;
  const dx = before.left - after.left, dy = before.top - after.top;
  const sx = before.width / after.width, sy = before.height / after.height;
  r.root.animate([
    { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')', opacity: .85 },
    { transform: 'none', opacity: 1 }
  ], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' });
}
const RESIZE_DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
function startResize(r, e) {
  if (e.button !== 0 || narrow.matches || r.root.classList.contains('maxed')) return;
  e.preventDefault();
  e.stopPropagation();
  focusWin(r.id);
  const dir = e.currentTarget.dataset.dir;
  const root = r.root;
  const aw = area.clientWidth, ah = area.clientHeight;
  const s = { left: root.offsetLeft, top: root.offsetTop, w: root.offsetWidth, h: root.offsetHeight };
  const sx = e.clientX, sy = e.clientY;
  const minW = Math.min(340, aw - 16), minH = Math.min(200, ah - 16);
  root.classList.add('resizing');
  const move = ev => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    let left = s.left, top = s.top, w = s.w, h = s.h;
    if (dir.includes('e')) w = Math.max(minW, Math.min(aw - left - 8, s.w + dx));
    if (dir.includes('s')) h = Math.max(minH, Math.min(ah - top - 8, s.h + dy));
    if (dir.includes('w')) {
      left = Math.max(8, Math.min(s.left + s.w - minW, s.left + dx));
      w = s.w + (s.left - left);
    }
    if (dir.includes('n')) {
      top = Math.max(8, Math.min(s.top + s.h - minH, s.top + dy));
      h = s.h + (s.top - top);
    }
    root.style.left = left + 'px';
    root.style.top = top + 'px';
    root.style.width = w + 'px';
    root.style.height = h + 'px';
  };
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    root.classList.remove('resizing');
    r.fit();
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
}
function fitWin(r) {
  if (narrow.matches || r.root.classList.contains('maxed') || r.root.classList.contains('animating')) return;
  const aw = area.clientWidth, ah = area.clientHeight;
  const hh = r.root.offsetHeight, ww = r.root.offsetWidth;
  r.root.style.top = Math.max(8, Math.min(r.root.offsetTop, ah - hh - 8)) + 'px';
  r.root.style.left = Math.max(8, Math.min(r.root.offsetLeft, aw - ww - 8)) + 'px';
}

function openWin(o) {
  if (wins.has(o.id)) { const r = wins.get(o.id); focusWin(o.id); return r; }
  const id = o.id;
  const root = h('section', { class: 'win', role: 'dialog', 'aria-label': o.title, tabindex: '-1' });
  const titleEl = h('span', { class: 'win-title', text: o.title });
  const bClose = h('button', { class: 'wb', type: 'button', 'aria-label': 'Close window', text: 'X' });
  const bMin = h('button', { class: 'wb', type: 'button', 'aria-label': 'Minimize window', text: '_' });
  const bMax = h('button', { class: 'wb max', type: 'button', 'aria-label': 'Maximize window', text: '+' });
  const bar = h('header', { class: 'win-bar' }, bClose, titleEl, h('span', { class: 'wb-group' }, bMin, bMax));
  const body = h('div', { class: 'win-body' });
  const grips = h('div', { class: 'rs-layer', 'aria-hidden': 'true' }, RESIZE_DIRS.map(dir =>
    h('div', { class: 'rs rs-' + dir, 'data-dir': dir })));
  root.append(bar, body, grips);

  const taskLabel = h('span', { text: o.title });
  const task = h('button', { class: 'task', type: 'button', 'aria-pressed': 'false' }, sprite(o.art || 'doc', o.tint ? { y: o.tint } : null, 1), taskLabel);
  const rec = {
    id, root, body, task,
    setTitle(t) { titleEl.textContent = t; taskLabel.textContent = t; root.setAttribute('aria-label', t); },
    fit() { fitWin(rec); }
  };
  wins.set(id, rec);

  const aw = area.clientWidth;
  const width = Math.min(o.w || 620, aw - 16);
  const n = cascade++ % 6;
  root.style.width = width + 'px';
  root.style.left = Math.max(8, Math.min(aw - width - 8, 150 + n * 30)) + 'px';
  root.style.top = (14 + n * 28) + 'px';
  area.append(root);
  tasks.append(task);
  if (o.build) o.build(rec);
  fitWin(rec);
  focusWin(id);
  playOpen(rec);
  root.focus({ preventScroll: true });

  grips.querySelectorAll('.rs').forEach(el => el.addEventListener('pointerdown', e => startResize(rec, e)));
  root.addEventListener('pointerdown', () => focusWin(id));
  bClose.addEventListener('click', () => closeWin(id));
  bMin.addEventListener('click', () => minimizeWin(id));
  bMax.addEventListener('click', () => toggleMax(rec));
  bar.addEventListener('dblclick', e => { if (!e.target.closest('button') && !narrow.matches) toggleMax(rec); });
  task.addEventListener('click', () => {
    if (rec.closing) return;
    if (root.hidden) focusWin(id);
    else if (active === id) minimizeWin(id);
    else focusWin(id);
  });

  bar.addEventListener('pointerdown', e => {
    if (e.button !== 0 || narrow.matches || root.classList.contains('maxed') || e.target.closest('button')) return;
    const sx = e.clientX, sy = e.clientY, ox = root.offsetLeft, oy = root.offsetTop;
    bar.setPointerCapture(e.pointerId);
    root.classList.add('dragging');
    const move = ev => {
      const awn = area.clientWidth, ahn = area.clientHeight;
      root.style.left = Math.max(-root.offsetWidth + 90, Math.min(awn - 90, ox + ev.clientX - sx)) + 'px';
      root.style.top = Math.max(0, Math.min(ahn - 36, oy + ev.clientY - sy)) + 'px';
    };
    const up = () => {
      bar.removeEventListener('pointermove', move);
      bar.removeEventListener('pointerup', up);
      bar.removeEventListener('pointercancel', up);
      root.classList.remove('dragging');
    };
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
    bar.addEventListener('pointercancel', up);
  });
  return rec;
}

/* ---------- tabs ---------- */
function tabs(defs) {
  const list = h('div', { class: 'tabs', role: 'tablist' });
  const panel = h('div', { class: 'panel', role: 'tabpanel' });
  const btns = defs.map((d, i) => {
    const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': 'false', tabindex: '-1', text: d.label });
    b.addEventListener('click', () => pick(i));
    b.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); pick((i + 1) % defs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); pick((i - 1 + defs.length) % defs.length, true); }
    });
    return b;
  });
  function pick(i, focus) {
    btns.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    panel.replaceChildren(defs[i].el);
    if (focus) btns[i].focus();
  }
  list.append(...btns);
  pick(0);
  return h('div', { class: 'tabset' }, list, panel);
}

/* ---------- window contents ---------- */
function rowList(arr) {
  return h('ul', { class: 'rows' }, arr.map(x =>
    h('li', { class: 'row' },
      h('span', { class: 'yrs', text: x.years }),
      h('div', {}, h('div', { class: 'row-t', text: x.title }), h('div', { class: 'row-s', text: x.place })))));
}
function chipList(arr) { return h('ul', { class: 'chips' }, arr.map(t => h('li', { class: 'chip', text: t }))); }

function openAbout() {
  openWin({ id: 'about', title: 'About Me', art: 'doc', w: 680, build: rec => {
    const hello = h('div', { class: 'hello' },
      h('div', { class: 'portrait' },
        h('img', { src: CONTENT.portrait, alt: 'Pixel portrait of ' + CONTENT.name, width: '92', height: '103', decoding: 'async' }),
        sprite('star', null, 3)),
      h('div', { class: 'hello-text' },
        h('p', { class: 'kicker', text: CONTENT.role }),
        h('h2', { class: 'name', text: CONTENT.name }),
        CONTENT.bio.map(t => h('p', { text: t })),
        h('span', { class: 'stat', text: CONTENT.stat })));
    const journey = h('div', {},
      h('h3', { class: 'sec-h', text: 'Experience' }), rowList(CONTENT.experience),
      h('h3', { class: 'sec-h', text: 'Education' }), rowList(CONTENT.education));
    const skills = h('div', {}, Object.entries(CONTENT.skills).map(([g, list]) =>
      [h('h3', { class: 'sec-h', text: g }), chipList(list)]));
    rec.body.append(tabs([{ label: 'Hello', el: hello }, { label: 'Journey', el: journey }, { label: 'Skills', el: skills }]));
  } });
}

function openFolder(f) {
  if (f.items.length === 1) return openViewer(f, 0);
  openWin({ id: 'folder:' + f.id, title: f.label, art: f.icon || 'folder', tint: f.tint, w: 680, build: rec => {
    rec.body.append(h('div', { class: 'items' }, f.items.map((it, i) => {
      const c = h('button', { class: 'card', type: 'button' },
        h('div', { class: 'thumb' }, h('img', { src: it.image, alt: '', loading: 'lazy', decoding: 'async' })),
        h('div', { class: 'card-t', text: it.title }),
        it.tags ? h('div', { class: 'card-s', text: it.tags.slice(0, 2).join(' · ') }) : null);
      c.addEventListener('click', () => openViewer(f, i));
      return c;
    })));
  } });
}

function renderViewer(rec, f, n) {
  const it = f.items[n], many = f.items.length > 1;
  rec.setTitle(it.title);
  const img = h('img', { src: it.image, alt: it.title + ' project slide', decoding: 'async' });
  img.addEventListener('load', () => rec.fit());
  const nav = many ? h('div', { class: 'v-nav' },
    h('button', { class: 'pbtn', type: 'button', text: '< Prev' }),
    h('span', { class: 'count', text: (n + 1) + ' / ' + f.items.length }),
    h('button', { class: 'pbtn', type: 'button', text: 'Next >' })) : null;
  if (nav) {
    const [prev, , next] = nav.children;
    prev.addEventListener('click', () => renderViewer(rec, f, (n - 1 + f.items.length) % f.items.length));
    next.addEventListener('click', () => renderViewer(rec, f, (n + 1) % f.items.length));
  }
  rec.body.replaceChildren(
    h('figure', { class: 'shot' }, img),
    h('h2', { class: 'v-title', text: it.title }),
    h('p', { class: 'v-text', text: it.text }),
    it.tags ? chipList(it.tags) : null,
    h('div', { class: 'v-links' }, h('a', { class: 'pbtn', href: it.image, target: '_blank', rel: 'noopener', text: 'View full size' })),
    nav);
  rec.body.scrollTop = 0;
  rec.fit();
}
function openViewer(f, i) {
  const rec = openWin({ id: 'view:' + f.id, title: f.items[i].title, art: 'frame', w: 800 });
  renderViewer(rec, f, i);
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copied';
  } catch (e) {
    const val = btn.closest('.crow').querySelector('.cval');
    const range = document.createRange(); range.selectNodeContents(val);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    btn.textContent = 'Selected';
  }
  setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
}
function openContact() {
  openWin({ id: 'contact', title: 'Contact', art: 'mail', w: 520, build: rec => {
    rec.body.append(
      h('p', { class: 'c-intro', text: 'Want to work together, or just say hi? Reach out here.' }),
      ...CONTENT.contact.map(c => {
        const b = h('button', { class: 'pbtn', type: 'button', text: 'Copy' });
        b.addEventListener('click', () => copyText(c.value, b));
        return h('div', { class: 'crow' }, h('span', { class: 'clabel', text: c.label }), h('span', { class: 'cval', text: c.value }), b);
      }));
  } });
}

/* ---------- desktop icons ---------- */
const ENTRIES = [
  { id: 'about', label: 'About Me', art: 'doc', open: openAbout },
  ...CONTENT.folders.map(f => ({ id: f.id, label: f.label, art: f.icon || 'folder', tint: f.tint, open: () => openFolder(f) })),
  { id: 'contact', label: 'Contact', art: 'mail', open: openContact }
];

const POS_KEY = 'lakshmi-os-icon-positions';
let pos = {};
try { pos = JSON.parse(localStorage.getItem(POS_KEY) || '{}') || {}; } catch (e) { pos = {}; }
function savePos() { try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch (e) { /* storage unavailable */ } }
function place(b, id) { const p = pos[id]; b.style.transform = p ? 'translate(' + p[0] + 'px,' + p[1] + 'px)' : ''; }

const iconsEl = $('#icons');
const iconBtns = [];
let moved = false;
function select(btn) { iconBtns.forEach(b => b.classList.toggle('sel', b === btn)); }
const canDrag = () => !narrow.matches && !coarse.matches;

ENTRIES.forEach(en => {
  const b = h('button', { class: 'icon', type: 'button', 'data-id': en.id, 'aria-label': 'Open ' + en.label },
    h('span', { class: 'ico' }, sprite(en.art, en.tint ? { y: en.tint } : null, 4)),
    h('span', { class: 'label', text: en.label }));
  place(b, en.id);
  iconBtns.push(b);
  iconsEl.append(b);

  b.addEventListener('click', () => {
    if (moved) return;
    select(b);
    if (coarse.matches || narrow.matches) en.open();
  });
  b.addEventListener('dblclick', () => en.open());
  b.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); en.open(); }
  });
  b.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    select(b);
    if (!canDrag()) return;
    const sx = e.clientX, sy = e.clientY, p0 = pos[en.id] || [0, 0];
    let dragging = false;
    const move = ev => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (!dragging) {
        if (Math.hypot(dx, dy) < 5) return;
        dragging = true; b.setPointerCapture(e.pointerId); b.classList.add('drag');
      }
      pos[en.id] = [p0[0] + dx, p0[1] + dy];
      place(b, en.id);
    };
    const up = () => {
      b.removeEventListener('pointermove', move);
      b.removeEventListener('pointerup', up);
      b.removeEventListener('pointercancel', up);
      if (dragging) { moved = true; setTimeout(() => { moved = false; }, 0); b.classList.remove('drag'); savePos(); }
    };
    b.addEventListener('pointermove', move);
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
  });
});
area.addEventListener('pointerdown', e => { if (!e.target.closest('.icon') && !e.target.closest('.win')) select(null); });

/* Keep saved icon offsets on-screen when the desktop is resized or rotated. */
function clampIcon(b) {
  const id = b.dataset.id, p = pos[id];
  if (!p || narrow.matches) return;
  const desk = area.getBoundingClientRect(), r = b.getBoundingClientRect(), pad = 6;
  let dx = 0, dy = 0;
  if (r.right > desk.right - pad) dx = desk.right - pad - r.right;
  else if (r.left < desk.left + pad) dx = desk.left + pad - r.left;
  if (r.bottom > desk.bottom - pad) dy = desk.bottom - pad - r.bottom;
  else if (r.top < desk.top + pad) dy = desk.top + pad - r.top;
  if (dx || dy) { pos[id] = [p[0] + dx, p[1] + dy]; place(b, id); savePos(); }
}
function reflowDesktop() {
  if (narrow.matches) return;
  iconBtns.forEach(clampIcon);
}
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    wins.forEach(w => { if (!w.root.hidden && !w.root.classList.contains('animating')) w.fit(); });
    reflowDesktop();
  }, 120);
});
requestAnimationFrame(reflowDesktop);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    wins.forEach(w => { if (!w.root.hidden) w.fit(); });
    reflowDesktop();
  });
}

/* ---------- decor ---------- */
(function decor() {
  const d = $('#decor');
  [[ 'left:52%;bottom:64px', 4 ], [ 'left:34%;top:26px', 3 ], [ 'right:210px;bottom:120px', 3 ]].forEach(([css, px]) => {
    const s = sprite('star', null, px);
    s.classList.add('deco'); s.style.cssText += ';' + css;
    d.append(s);
  });
  $('#tagname').textContent = CONTENT.shortName;
  $('#starico').append(sprite('star', null, 2));
  $('#bootstar').append(sprite('star', null, 8));
})();

/* ---------- star menu ---------- */
const menu = $('#menu'), starBtn = $('#starbtn');
function closeMenu() { menu.hidden = true; starBtn.setAttribute('aria-expanded', 'false'); }
function mItem(label, art, tint, fn) {
  const b = h('button', { class: 'mitem', type: 'button', role: 'menuitem' }, art ? sprite(art, tint ? { y: tint } : null, 2) : null, h('span', { text: label }));
  b.addEventListener('click', () => { closeMenu(); fn(); });
  return b;
}
menu.append(
  ...ENTRIES.map(en => mItem(en.label, en.art, en.tint, en.open)),
  h('hr', { class: 'msep' }),
  mItem('Clean up desktop', null, null, () => { pos = {}; iconBtns.forEach((b, i) => place(b, ENTRIES[i].id)); savePos(); }),
  mItem('Restart', null, null, restart));
starBtn.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  starBtn.setAttribute('aria-expanded', String(!menu.hidden));
  if (!menu.hidden) { const first = $('.mitem', menu); if (first && !coarse.matches) first.focus(); }
});
document.addEventListener('pointerdown', e => {
  if (!menu.hidden && !menu.contains(e.target) && !starBtn.contains(e.target)) closeMenu();
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!menu.hidden) { closeMenu(); starBtn.focus(); return; }
  if (active) closeWin(active);
});

/* ---------- clock ---------- */
const clock = $('#clock');
function tick() { clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
tick(); setInterval(tick, 15000);

/* ---------- boot screen ---------- */
const boot = $('#boot'), startBtn = $('#startbtn');
let booted = false;
function startOS() {
  if (booted) return;
  booted = true;
  boot.classList.add('done');
  setTimeout(() => { boot.hidden = true; }, 380);
  if (!wins.size) openAbout();
}
function restart() {
  [...wins.keys()].forEach(id => closeWin(id, true));
  booted = false; boot.hidden = false;
  requestAnimationFrame(() => {
    boot.classList.remove('done');
    const bar = $('.loadbar i', boot); bar.replaceWith(bar.cloneNode());
    startBtn.focus({ preventScroll: true });
  });
}
boot.addEventListener('click', startOS);
document.addEventListener('keydown', e => {
  if (!booted && !boot.hidden && e.key !== 'Tab' && e.key !== 'Shift') startOS();
});
startBtn.focus({ preventScroll: true });
})();
