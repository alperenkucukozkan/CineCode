const importIf = (selectorOrTestFn, importer) => {
  const ok = typeof selectorOrTestFn === 'function'
    ? selectorOrTestFn()
    : !!document.querySelector(selectorOrTestFn);
  return ok ? importer() : Promise.resolve();
};

async function boot() {
  await Promise.all([
    importIf('header, .header, #header', () => import('./header.js')),
    importIf('footer, .footer, #footer', () => import('./footer.js')),
    importIf('#hero-x, #hero-content, .hero-x', () => import('./hero.js')),
    importIf('#loading-indicator, .loading-indicator', () => import('./loader.js')),
    importIf('#app-modal-template', () => import('./modal.js')),
    importIf('#movies-ul, .movie-list-grid', () => import('./catalog.js')),
    importIf('#pagination-ul, .pagination', () => import('./pagination.js')),
    importIf('#search-form, #searchbar, .search-container', () => import('./searchbar.js')),
    importIf('.weekly-gallery', () => import('./weekly.js')),
    importIf('.upcoming-section, #upcoming', () => import('./upcoming.js')),
    importIf('#library-root, .library-grid', () => import('./library.js')),
    importIf('#scroll-up, .button-up', () => import('./scrollup.js')),
  ]);
}

if (document.readyState === 'loading') {
  document.addEventListener('partials:loaded', boot, { once: true });
}

boot();