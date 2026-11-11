// shell.js — loaded on every page. Renders nav tabs, footer, and mounts the global find popup.
//   [data-nav]            → tab links from PAGES (nav: true)
//   [data-site-footer]    → social links from SOCIAL
//   [data-site-header]    → inner-page header (name + tabs)
import { SITE, PAGES, SOCIAL } from './site-config.js';

const here = location.pathname.replace(/index\.html$/, '');
const isCurrent = p => here === p || (p !== '/' && here.startsWith(p));

function link(href, text, cls) {
  const a = document.createElement('a');
  a.href = href; a.textContent = text; if (cls) a.className = cls;
  return a;
}

function renderNav(el) {
  el.setAttribute('aria-label', el.getAttribute('aria-label') || 'Sections');
  for (const p of PAGES.filter(p => p.nav)) {
    const a = link(p.path, p.label);
    if (isCurrent(p.path)) a.setAttribute('aria-current', 'page');
    el.appendChild(a);
  }
}

function renderHeader(el) {
  el.className = 'site-hdr';
  el.appendChild(link('/', SITE.name, 'site-hdr__name'));
  const nav = document.createElement('nav'); nav.className = 'tabs tabs--row'; nav.setAttribute('aria-label', 'Sections');
  renderNav(nav); el.appendChild(nav);
}

const ICONS = {
  'GitHub': 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  'Twitter': 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  'Google Scholar': 'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  'LinkedIn': 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

function renderSocial(el) {
  el.classList.add('social');
  for (const s of SOCIAL) {
    const a = link(s.url, '');
    a.target = '_blank'; a.rel = 'noopener noreferrer'; a.title = s.label;
    a.setAttribute('aria-label', `${s.label} (opens in a new tab)`);
    a.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="${ICONS[s.label] || ''}"/></svg>`;
    el.appendChild(a);
  }
}

function renderFooter(el) {
  el.classList.add('site-footer');
  SOCIAL.forEach((s, i) => {
    if (i) { const d = document.createElement('span'); d.textContent = ' · '; d.setAttribute('aria-hidden', 'true'); el.appendChild(d); }
    const a = link(s.url, s.label);
    a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', `${s.label} (opens in a new tab)`);
    el.appendChild(a);
  });
}

// ------------------------------------------------------------------ find popup
const SHORTCUTS = [['⌘F / Ctrl+F', 'open find'], ['/', 'open find'], ['↑ ↓', 'move'], ['enter', 'visit'], ['?', 'toggle shortcuts'], ['esc', 'close']];

function mountFind() {
  const root = document.createElement('div');
  root.className = 'find'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Find a page');
  root.innerHTML = `
    <div class="find__card">
      <label class="find__q"><span aria-hidden="true">sutharsika/</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Search pages" role="combobox" aria-expanded="true" aria-controls="find-list"></label>
      <ul id="find-list" role="listbox" aria-label="Pages"></ul>
      <div class="find__ft"><span>[↓] [↑]<button type="button" data-help>[?] Shortcuts</button></span><span>[enter] to visit</span></div>
    </div>
    <button type="button" class="find__close" data-close>Close [esc]</button>`;
  document.body.appendChild(root);
  const q = root.querySelector('input'), list = root.querySelector('ul');
  let items = [], sel = 0, help = false, lastFocus = null;

  function render() {
    list.replaceChildren();
    if (help) {
      for (const [k, v] of SHORTCUTS) {
        const li = document.createElement('li'); li.className = 'is-static';
        const a = document.createElement('span'); a.className = 'k'; a.textContent = `[${k}]`;
        const b = document.createElement('span'); b.className = 'p'; b.textContent = v;
        li.append(a, b); list.appendChild(li);
      }
      q.removeAttribute('aria-activedescendant'); return;
    }
    const s = q.value.trim().toLowerCase();
    items = PAGES.filter(p => !s || p.label.toLowerCase().includes(s) || p.path.includes(s) || (p.description || '').toLowerCase().includes(s));
    sel = Math.min(sel, Math.max(0, items.length - 1));
    if (!items.length) { const li = document.createElement('li'); li.className = 'is-static'; li.textContent = 'No matches'; list.appendChild(li); return; }
    items.forEach((p, i) => {
      const li = document.createElement('li'); li.id = `find-opt-${i}`; li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); if (i === sel) li.className = 'on';
      const a = document.createElement('span'); a.textContent = p.label;
      const b = document.createElement('span'); b.className = 'p'; b.textContent = p.path.replace(/\/$/, '') || '/';
      li.append(a, b);
      li.addEventListener('mousemove', () => { if (sel !== i) { sel = i; render(); } });
      li.addEventListener('click', () => go(p));
      list.appendChild(li);
    });
    q.setAttribute('aria-activedescendant', `find-opt-${sel}`);
  }
  const go = p => { location.href = p.path; };
  function open() { if (!root.hidden) return; lastFocus = document.activeElement; root.hidden = false; help = false; q.value = ''; sel = 0; render(); q.focus(); }
  function close() { if (root.hidden) return; root.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  const typing = () => { const e = document.activeElement; return e && (/^(input|textarea|select)$/i.test(e.tagName) || e.isContentEditable); };

  addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if ((e.metaKey || e.ctrlKey) && k === 'f') { e.preventDefault(); root.hidden ? open() : close(); return; }
    if (root.hidden) { if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !typing()) { e.preventDefault(); open(); } return; }
    if (k === 'escape') { e.preventDefault(); close(); }
    else if (k === 'arrowdown') { e.preventDefault(); if (!help) { sel = (sel + 1) % Math.max(1, items.length); render(); } }
    else if (k === 'arrowup') { e.preventDefault(); if (!help) { sel = (sel - 1 + items.length) % Math.max(1, items.length); render(); } }
    else if (k === 'enter') { if (document.activeElement === q) { e.preventDefault(); if (!help && items[sel]) go(items[sel]); } }
    else if (e.key === '?') { e.preventDefault(); help = !help; render(); }
    else if (k === 'tab') {                                   // keep focus inside the dialog
      const f = [...root.querySelectorAll('input,button')]; const i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  q.addEventListener('input', () => { help = false; sel = 0; render(); });
  root.querySelector('[data-close]').addEventListener('click', close);
  root.querySelector('[data-help]').addEventListener('click', () => { help = !help; render(); q.focus(); });
  root.addEventListener('mousedown', e => { if (e.target === root) close(); });
}

// ------------------------------------------------------------------ boot
function boot() {
  document.querySelectorAll('[data-nav]').forEach(renderNav);
  document.querySelectorAll('[data-site-header]').forEach(renderHeader);
  document.querySelectorAll('[data-site-footer]').forEach(renderFooter);
  document.querySelectorAll('[data-social]').forEach(renderSocial);
  mountFind();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
