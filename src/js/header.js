function initHeader() {
  initMenu('#menuLinks', 'menuLinks:active');
  initMenu('#links', 'menuLinks:active');
  initSidebar('#menu', '.sidebar', '.sidebar-backdrop');
  initTheme('#toggle', '.theme-toggle use', {
    navbar: 'header',
    menuButton: '#menu',
    modal: '.sidebar',
    backdrop: '.sidebar-backdrop',
    links: '#links',
    logoText: '.logo-text',
    body: 'body',
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}
function initMenu(selector, storageKey) {
  const menu = document.querySelector(selector);
  console;
  if (!menu) return;
  const savedKey = localStorage.getItem(storageKey);
  if (savedKey) {
    const activeLink = menu.querySelector(`a[href="${savedKey}"]`);
    const li = activeLink?.closest('li');
    if (li) {
      menu.querySelector('.active')?.classList.remove('active');
      li.classList.add('active');
    }
  }

  menu.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li || !menu.contains(li)) return;

    menu.querySelector('.active')?.classList.remove('active');
    li.classList.add('active');

    const key = li.querySelector('a')?.getAttribute('href');
    if (key) localStorage.setItem(storageKey, key);
  });
}

function initSidebar(buttonSel, modalSel, backdropSel) {
  const button = document.querySelector(buttonSel);
  const modal = document.querySelector(modalSel);
  const backdrop = document.querySelector(backdropSel);
  if (!button || !modal || !backdrop) return;

  button.addEventListener('click', () => {
    console.log('clicked');
    const visible = modal.style.display === 'flex';
    modal.style.display = visible ? 'none' : 'flex';
    backdrop.style.display = visible ? 'none' : 'block';
    button.style.display = visible ? '' : '';

    const closeOnBackdrop = e => {
      if (e.target === backdrop) {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
        backdrop.removeEventListener('click', closeOnBackdrop);
      }
    };
    backdrop.addEventListener('click', closeOnBackdrop);
  });
}

function initTheme(toggleSel, iconSel, refs = {}) {
  const toggle = document.querySelector(toggleSel);
  const icon = document.querySelector(iconSel);
  const { navbar, menuButton, modal, backdrop, links, logoText, body } =
    getRefs(refs);

  const setTheme = theme => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);

    const isDark = theme === 'dark-theme';
    if (toggle) toggle.checked = isDark;
    if (body) body.style.backgroundColor = isDark ? '#121212' : '#fff';
    if (menuButton) menuButton.style.color = isDark ? '#b7b7b7' : '#595959';
    if (navbar) navbar.style.backgroundColor = isDark ? '#000' : '#fff';
    if (modal) modal.style.backgroundColor = isDark ? '#000' : '#f8f8f8';
    if (logoText) logoText.style.color = isDark ? '#fff' : '#282828';
    if (links) {
      links.querySelectorAll('a').forEach(a => {
        a.style.color = isDark ? '#fff' : '#111';
        if (a.closest('li')?.classList.contains('active')) {
          a.style.color = '#f87719';
        }
      });
    }
    if (modal) {
      modal.querySelectorAll('a').forEach(a => {
        a.style.color = isDark ? '#fff' : '#111';
        if (a.closest('li')?.classList.contains('active')) {
          a.style.color = '#f87719';
        }
      });
    }

    if (backdrop) {
      backdrop.style.backgroundColor = isDark
        ? 'rgba(255,255,255,0.2)'
        : 'rgba(0,0,0,0.2)';
      backdrop.style.zIndex = '1';
    }

    icon?.setAttribute(
      'href',
      `../img/icon.svg#${isDark ? 'icon-Vector' : 'icon-Sun'}`
    );
  };

  setTheme(localStorage.getItem('theme') || 'light-theme');

  toggle?.addEventListener('change', () =>
    setTheme(toggle.checked ? 'dark-theme' : 'light-theme')
  );
}
function getRefs(refs) {
  const obj = {};
  for (const key in refs) {
    const el = document.querySelector(refs[key]);
    obj[key] = el || null;
  }
  return obj;
}
