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
  mountFind();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
