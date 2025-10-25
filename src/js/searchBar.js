import * as API from '../api/api.js';

let currentSearchState = {
  isSearching: false,
  query: '',
  year: '',
  currentPage: 1,
};

export function initSearchBar() {
  const form  = document.getElementById('catalog-search-form');
  if (!form) return;

  const input   = document.getElementById('catalog-search-input');
  const clear   = document.getElementById('catalog-search-clear');
  const alertEl = document.getElementById('catalog-search-alert');

  const yearWrap = document.getElementById('yearFilter');
  const yearBtn  = document.getElementById('yearBtn');
  const yearList = document.getElementById('yearList');

  buildYearList(yearList);

  const setHasQuery = () => {
    const has = !!input.value.trim();
    form.classList.toggle('has-query', has);
    if (clear) clear.hidden = !has;
    if (!has) setYear(''); 
  };
  input.addEventListener('input', setHasQuery);
  setHasQuery();

  clear?.addEventListener('click', () => {
    input.value = '';
    setHasQuery();
    handleClear(alertEl);
    input.focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    const y = getYear();
    if (!q && !y) { handleClear(alertEl); return; }
    await handleSearch(q, y, alertEl);
  });

  yearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleYearMenu(yearList.hidden); // aç/kapat
  });

  yearList.addEventListener('click', (e) => {
    const li = e.target.closest('.year-option');
    if (!li) return;
    setYear(li.dataset.value);
    toggleYearMenu(false);
    const q = input.value.trim();
    const y = getYear();
    if (q || y) handleSearch(q, y, alertEl);
  });

  // Klavye
  yearBtn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleYearMenu(true);
      focusFirstYear();
    }
  });
  yearList.addEventListener('keydown', (e) => {
    const items = [...yearList.querySelectorAll('.year-option')];
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'Escape') toggleYearMenu(false);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(idx+1, items.length-1)]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); items[Math.max(idx-1, 0)]?.focus(); }
    if (e.key === 'Enter')     { e.preventDefault(); document.activeElement?.click(); }
    if (e.key === 'Tab')       { toggleYearMenu(false); }
  });

  document.addEventListener('click', (e) => {
    if (!yearWrap.contains(e.target)) toggleYearMenu(false);
  });

  function toggleYearMenu(open){
    const willOpen = open === undefined ? yearList.hidden : !!open;
    if (willOpen) {
      yearList.hidden = false;
      yearBtn.setAttribute('aria-expanded', 'true');
      yearList.focus();
    } else {
      yearList.hidden = true;
      yearBtn.setAttribute('aria-expanded', 'false');
    }
  }
  function focusFirstYear(){
    const sel = yearList.querySelector('.year-option[aria-selected="true"]') ||
                yearList.querySelector('.year-option');
    sel?.focus();
  }
  function setYear(val){
    yearBtn.dataset.value = val || '';
    yearBtn.firstChild.nodeValue = val ? val : 'Year';
    yearList.querySelectorAll('.year-option').forEach(li => {
      li.setAttribute('aria-selected', li.dataset.value === val ? 'true' : 'false');
    });
  }
  function getYear(){ return yearBtn.dataset.value || ''; }
}

export async function handleSearchPageChange(page) {
  if (!currentSearchState.isSearching) return false;

  try {
    showLoader();
    const data = await API.searchMovies(
      currentSearchState.query,
      page,
      currentSearchState.year
    );

    if (window.renderMoviesList) window.renderMoviesList(data.results || []);
    if (window.renderPagination) window.renderPagination(page, data.total_pages || 1);

    currentSearchState.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setAlert(data?.results?.length ? '' : '');
    return true;
  } catch (err) {
    console.error('Sayfa değiştirme hatası:', err);
    setAlert('An error occurred while loading the page.');
    return false;
  } finally {
    hideLoader();
  }
}

export async function handleClear(alertEl) {
  currentSearchState = { isSearching: false, query: '', year: '', currentPage: 1 };
  try {
    showLoader();
    const data = await API.fetchTrendingWeek(1);
    if (window.renderMoviesList) window.renderMoviesList(data.results || []);
    if (window.renderPagination) window.renderPagination(1, data.total_pages || 1);
    setAlert('', alertEl);
  } catch (err) {
    console.error('Temizleme hatası:', err);
    setAlert('Failed to load movies.', alertEl);
  } finally {
    hideLoader();
  }
}

async function handleSearch(query, year, alertEl) {
  currentSearchState = { isSearching: true, query, year, currentPage: 1 };
  try {
    showLoader();
    const data = await API.searchMovies(query, 1, year); // (query,page,year)
    if (window.renderMoviesList) window.renderMoviesList(data.results || []);
    if (window.renderPagination) window.renderPagination(1, data.total_pages || 1);
    setAlert(data?.results?.length ? '' : '', alertEl);
  } catch (err) {
    console.error('Arama hatası:', err);
    setAlert('Search failed. Please try again.', alertEl);
  } finally {
    hideLoader();
  }
}

function buildYearList(ul){
  if (!ul || ul.childElementCount) return;
  const now = new Date().getFullYear();
  for (let y = now; y >= 1950; y--){
    const li = document.createElement('li');
    li.className = 'year-option';
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '-1');
    li.dataset.value = String(y);
    li.textContent = String(y);
    ul.appendChild(li);
  }
}

function showLoader() {
  const loader = document.getElementById('loading-indicator');
  if (loader) loader.style.display = 'flex';
}
function hideLoader() {
  const loader = document.getElementById('loading-indicator');
  if (loader) loader.style.display = 'none';
}
function setAlert(msg, el = document.getElementById('catalog-search-alert')) {
  if (!el) return;
  el.textContent = msg || '';
  el.style.display = msg ? 'block' : 'none';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchBar);
} else {
  initSearchBar();
}
