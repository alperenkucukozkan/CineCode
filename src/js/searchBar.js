// ===== IMPORTS =====
import { SearchBar } from './components/SearchBar.js';
import * as API from '../api/api.js';

// ===== STATE =====
let searchBarInstance = null;
let currentSearchState = {
  isSearching: false,
  query: '',
  year: '',
  currentPage: 1
};

// ===== INITIALIZATION =====
function initSearchBar() {
  const container = document.getElementById('searchBarContainer');

  if (!container) {
    console.warn('SearchBar container bulunamadı');
    return;
  }

  // SearchBar instance'ı oluştur
  searchBarInstance = new SearchBar('#searchBarContainer', {
    onSearch: handleSearch,
    onClear: handleClear
  });

  console.log('SearchBar initialized');
}

// ===== SEARCH HANDLER =====
async function handleSearch(query, year) {
  currentSearchState = {
    isSearching: true,
    query: query,
    year: year,
    currentPage: 1
  };

  try {
    showLoader();

    const data = await API.searchMovies(query, 1, year);

    if (data.results && data.results.length > 0) {
      // Catalog.js'deki render fonksiyonunu çağır
      if (window.renderMoviesList) {
        window.renderMoviesList(data.results);
      }

      // Pagination güncelle
      if (window.renderPagination) {
        window.renderPagination(1, data.total_pages);
      }

      hideError();
    } else {
      showError('Arama kriterlerine uygun film bulunamadı.');
      if (window.renderMoviesList) {
        window.renderMoviesList([]);
      }
    }
  } catch (error) {
    console.error('Arama hatası:', error);
    showError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
  } finally {
    hideLoader();
  }
}

// ===== CLEAR HANDLER =====
async function handleClear() {
  currentSearchState = {
    isSearching: false,
    query: '',
    year: '',
    currentPage: 1
  };

  try {
    showLoader();

    // Trending filmleri yükle
    const data = await API.fetchTrendingWeek(1);

    if (window.renderMoviesList) {
      window.renderMoviesList(data.results);
    }

    if (window.renderPagination) {
      window.renderPagination(1, data.total_pages);
    }

    hideError();
  } catch (error) {
    console.error('Temizleme hatası:', error);
    showError('Filmler yüklenirken bir hata oluştu.');
  } finally {
    hideLoader();
  }
}

// ===== PAGE CHANGE HANDLER =====
export async function handleSearchPageChange(page) {
  if (!currentSearchState.isSearching) return false;

  try {
    showLoader();

    const data = await API.searchMovies(
      currentSearchState.query,
      page,
      currentSearchState.year
    );

    if (window.renderMoviesList) {
      window.renderMoviesList(data.results);
    }

    if (window.renderPagination) {
      window.renderPagination(page, data.total_pages);
    }

    currentSearchState.currentPage = page;

    // Sayfayı yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return true;
  } catch (error) {
    console.error('Sayfa değiştirme hatası:', error);
    showError('Sayfa yüklenirken bir hata oluştu.');
    return false;
  } finally {
    hideLoader();
  }
}

// ===== UTILITY FUNCTIONS =====
function showLoader() {
  const loader = document.getElementById('loading-indicator');
  if (loader) {
    loader.style.display = 'flex';
  }
}

function hideLoader() {
  const loader = document.getElementById('loading-indicator');
  if (loader) {
    loader.style.display = 'none';
  }
}

function showError(message) {
  const errorContainer = document.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.add('show');
  } else {
    // Eğer error container yoksa oluştur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      text-align: center;
      padding: 1rem;
      margin: 1rem auto;
      max-width: 600px;
      background-color: rgba(248, 119, 25, 0.1);
      border: 1px solid #F87719;
      border-radius: 8px;
      color: #F87719;
    `;

    const movieList = document.getElementById('movie-list');
    if (movieList) {
      movieList.insertAdjacentElement('beforebegin', errorDiv);
    }
  }
}

function hideError() {
  const errorContainer = document.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.classList.remove('show');
    errorContainer.textContent = '';
  }
}

// ===== PUBLIC API =====
export function getSearchState() {
  return currentSearchState;
}

export function resetSearch() {
  if (searchBarInstance) {
    searchBarInstance.reset();
  }
  handleClear();
}

// ===== AUTO INIT =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchBar);
} else {
  initSearchBar();
}

// Export for other modules
export { initSearchBar };g