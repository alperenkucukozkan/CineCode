import * as API from '../api/api.js';
import { initPagination, renderPagination } from './pagination.js';
import { Modal } from './modal.js';
import { handleSearchPageChange } from './searchbar.js';

const CONFIG = {
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  IMAGE_BASE_URL_2X: 'https://image.tmdb.org/t/p/w780',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/w1280',
  BACKDROP_BASE_URL_2X: 'https://image.tmdb.org/t/p/w1920',
  IMAGE_PLACEHOLDER: 'src/images/no-poster.svg',
};

let DOM;
let movieCardClickHandler = null;

const AppState = {
  lastSearch: { input: '', year: '', isSearch: false },
  genresCache: [],
};

function extractYear(releaseDate) {
  return releaseDate ? releaseDate.split('-')[0] : '—';
}
function getImageUrl(posterPath) {
  if (!posterPath) return CONFIG.IMAGE_PLACEHOLDER;
  const base =
    window.devicePixelRatio > 1
      ? CONFIG.IMAGE_BASE_URL_2X
      : CONFIG.IMAGE_BASE_URL;
  return base + posterPath;
}
function getImageSrcset(posterPath) {
  if (!posterPath) return CONFIG.IMAGE_PLACEHOLDER;
  const smallUrl = CONFIG.IMAGE_BASE_URL.replace('/w500', '/w300') + posterPath;
  const largeUrl = CONFIG.IMAGE_BASE_URL + posterPath;
  return `${smallUrl} 1x, ${largeUrl} 2x`;
}
function getBackdropUrl(backdropPath) {
  if (!backdropPath) return CONFIG.IMAGE_PLACEHOLDER;
  const base =
    window.devicePixelRatio > 1
      ? CONFIG.BACKDROP_BASE_URL_2X
      : CONFIG.BACKDROP_BASE_URL;
  return base + backdropPath;
}
function showErrorMessage(message) {
  const el = document.createElement('div');
  el.className = 'error-message error';
  el.textContent = message;
  el.style.cssText = `position:fixed;top:20px;right:20px;background:rgba(0,0,0,.9);color:#fff;padding:16px 24px;border-radius:12px;z-index:10000;box-shadow:0 8px 32px rgba(0,0,0,.5);`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

function renderStarRating(voteAverage, container) {
  if (!container) return;
  const rating = (voteAverage || 0) / 2;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  let html = '';
  for (let i = 0; i < full; i++)
    html +=
      '<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';
  if (half)
    html +=
      '<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>';
  for (let i = 0; i < empty; i++)
    html +=
      '<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';
  container.innerHTML = html;
}

function renderHeroSection(movie) {
  const heroSection = document.getElementById('hero');
  if (!heroSection || !DOM.heroContent) return;
  const bgUrl = movie.backdrop_path
    ? getBackdropUrl(movie.backdrop_path)
    : getImageUrl(movie.poster_path);
  const img = new Image();
  img.onload = function () {
    heroSection.style.backgroundImage = `url('${bgUrl}')`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroSection.style.backgroundAttachment = 'fixed';
    heroSection.style.transition = 'background-image .3s ease';
  };
  img.src = bgUrl;

  DOM.heroContent.innerHTML = `
    <div class="hero-info">
      <h2 class="hero-title">${movie.title}</h2>
      <div class="rating-stars" id="hero-rating-stars"></div>
      <p class="hero-overview">${movie.overview || 'No overview available.'}</p>
      <div class="hero-actions">
        <button class="btn trailer-btn" data-id="${
          movie.id
        }">Watch trailer</button>
        <button class="btn details-btn" data-id="${
          movie.id
        }">More details</button>
      </div>
    </div>`;
  renderStarRating(
    movie.vote_average || 0,
    document.getElementById('hero-rating-stars')
  );
}

function renderMoviesList(movies) {
  DOM.moviesUl.innerHTML = '';

  if (!movies || movies.length === 0) {
    showEmpty();           
    return;
  }

  hideEmpty();
  const frag = document.createDocumentFragment();
  movies.forEach(m => frag.appendChild(createMovieCard(m)));
  DOM.moviesUl.appendChild(frag);
}

function createMovieCard(movie) {
  const li = document.createElement('li');
  li.className = 'movie-card';
  li.dataset.id = movie.id;
  li.style.cursor = 'pointer';

  let genresText = '';
  if (movie.genres?.length) {
    genresText = movie.genres.map(g => g.name).join(', ');
  } else if (movie.genre_ids?.length) {
    const names = movie.genre_ids
      .map(id => AppState.genresCache.find(g => g.id === id)?.name || '')
      .filter(Boolean)
      .slice(0, 2);
    genresText = names.join(', ');
  }
  const releaseYear = extractYear(movie.release_date);
  const genreAndYear = genresText
    ? `${genresText} | ${releaseYear}`
    : releaseYear;

  li.innerHTML = `
    <div class="movie-poster">
      <img src="${getImageUrl(movie.poster_path)}" alt="${movie.title} poster"
           loading="lazy" srcset="${getImageSrcset(movie.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-meta">${genreAndYear}</div>
      </div>
      <div class="movie-info-right">
        <div class="catalog-rating-stars"></div>
      </div>
    </div>`;
  renderStarRating(
    movie.vote_average || 0,
    li.querySelector('.catalog-rating-stars')
  );
  return li;
}

window.renderMoviesList = renderMoviesList;
window.renderPagination = renderPagination;

async function loadTrendingMovies(page = 1) {
  try {
    DOM.movieListRegion.setAttribute('aria-busy', 'true');
    const data = await API.fetchTrendingWeek(page);
    if (DOM.heroContent && page === 1) {
      const firstMovie = data.results?.[0];
      if (firstMovie) renderHeroSection(firstMovie);
    }
    renderMoviesList(data.results || []);
    renderPagination(page, data.total_pages || 1);
    AppState.lastSearch = { input: '', year: '', isSearch: false };
  } catch (e) {
    console.error('Error loading trending movies:', e);
    showErrorMessage('Failed to load trending movies. Please try again later.');
  } finally {
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

async function performMovieSearch(query, year = '', page = 1) {
  if (!query || query.trim() === '') return loadTrendingMovies();
  try {
    DOM.movieListRegion.setAttribute('aria-busy', 'true');
    const data = await API.searchMovies(query.trim(), page, year);
    renderMoviesList(data.results || []);
    renderPagination(page, data.total_pages || 1);
    AppState.lastSearch = { input: query, year, isSearch: true };
  } catch (e) {
    console.error('Error performing search:', e);
    showErrorMessage('Search failed. Please try again.');
  } finally {
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

async function handlePageChange(page) {
  const handled = await handleSearchPageChange(page);
  if (handled) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (AppState.lastSearch.isSearch) {
    performMovieSearch(
      AppState.lastSearch.input,
      AppState.lastSearch.year,
      page
    );
  } else {
    loadTrendingMovies(page);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
  if (movieCardClickHandler) {
    DOM.moviesUl.removeEventListener('click', movieCardClickHandler);
  }
  movieCardClickHandler = async e => {
    const card = e.target.closest('.movie-card');
    if (!card) return;
    const id = card.dataset.id;
    if (!id) return;
    try {
      const movie = await API.fetchMovieDetails(id);
      Modal.renderMovie(movie);
    } catch (err) {
      console.error('Modal open error:', err);
    }
  };
  DOM.moviesUl.addEventListener('click', movieCardClickHandler);

  document.addEventListener('click', async e => {
    const tBtn = e.target.closest('.trailer-btn');
    if (tBtn) {
      const data = await API.fetchMovieVideos(tBtn.dataset.id);
      const trailer = data.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) Modal.showTrailer(trailer.key);
      else showErrorMessage('Trailer not available.');
      return;
    }
    const dBtn = e.target.closest('.details-btn');
    if (dBtn) {
      const movie = await API.fetchMovieDetails(dBtn.dataset.id);
      Modal.renderMovie(movie);
    }
  });
}

async function initializeApp() {
  try {
    DOM = {
      moviesUl: document.getElementById('movies-ul'),
      heroContent: document.getElementById('hero-content'),
      movieListRegion: document.getElementById('movie-list'),
      emptyEl: document.getElementById('catalog-empty'),    
    };
    setupEventListeners();
    initPagination(handlePageChange);

    const genresData = await API.fetchGenres();
    AppState.genresCache = genresData.genres || [];

    if (DOM.heroContent) {
      const dayData = await API.fetchTrendingDay();
      const heroMovie = dayData.results?.[0];
      if (heroMovie) renderHeroSection(heroMovie);
    }

    await loadTrendingMovies(1);
  } catch (e) {
    console.error('initialize error:', e);
    showErrorMessage('Failed to initialize application.');
  }
}
function showEmpty() {
  if (!DOM.emptyEl) return;
  DOM.emptyEl.innerHTML = `
    <div class="l1">OOPS...</div>
    <div class="l1">We are very sorry!</div>
    <div class="l1">We don’t have any results matching your search.</div>`;
  DOM.emptyEl.classList.add('is-visible');
  DOM.emptyEl.removeAttribute('hidden');   
}

function hideEmpty() {
  if (!DOM.emptyEl) return;
  DOM.emptyEl.classList.remove('is-visible');
  DOM.emptyEl.setAttribute('hidden', '');  
  DOM.emptyEl.innerHTML = '';
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
