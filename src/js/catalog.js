import axios from 'axios';

// ===== LOAD PARTIALS =====
async function loadPartials() {
  const loads = document.querySelectorAll('load[src]');
  for (const el of loads) {
    const src = el.getAttribute('src');
    if (!src) continue;
    try {
      const res = await fetch(src);
      if (!res.ok) {
        console.error('Partial yüklenemedi:', src, res.status);
        continue;
      }
      const html = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;

      wrapper.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        for (const attr of old.attributes)
          s.setAttribute(attr.name, attr.value);
        s.text = old.textContent;
        old.parentNode.replaceChild(s, old);
      });

      const frag = document.createDocumentFragment();
      while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
      el.replaceWith(frag);
    } catch (err) {
      console.error('Partial fetch hatası:', src, err);
    }
  }
}

// ===== CONFIGURATION =====
const CONFIG = {
  API_KEY: '0c52aafa16e24577e4a48f6286d3f101',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  IMAGE_BASE_URL_2X: 'https://image.tmdb.org/t/p/w780',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/w1280',
  BACKDROP_BASE_URL_2X: 'https://image.tmdb.org/t/p/w1920',
  IMAGE_PLACEHOLDER: 'src/images/no-poster.svg',
  DEFAULT_LANGUAGE: 'en-US',
  PAGINATION_MAX_BUTTONS: 5,
  YEAR_SELECT_START: 1980,
};

// ===== DOM ELEMENTS CACHE =====
let DOM;

// ===== APPLICATION STATE =====
const AppState = {
  lastSearch: { input: '', year: '', isSearch: false },
  currentPage: 1,
  totalPages: 1,
  genresCache: [],
};

// ===== UTILITY FUNCTIONS =====

function buildApiUrl(path, params = {}) {
  const url = new URL(`${CONFIG.BASE_URL}${path}`);
  url.searchParams.set('api_key', CONFIG.API_KEY);

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== '' && value !== null && value !== undefined) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

function extractYear(releaseDate) {
  return releaseDate ? releaseDate.split('-')[0] : '—';
}

function getImageUrl(posterPath) {
  if (!posterPath) return CONFIG.IMAGE_PLACEHOLDER;
  const baseUrl =
    window.devicePixelRatio > 1
      ? CONFIG.IMAGE_BASE_URL_2X
      : CONFIG.IMAGE_BASE_URL;
  return baseUrl + posterPath;
}

function getImageSrcset(posterPath) {
  if (!posterPath) return CONFIG.IMAGE_PLACEHOLDER;
  const smallUrl = CONFIG.IMAGE_BASE_URL.replace('/w500', '/w300') + posterPath;
  const largeUrl = CONFIG.IMAGE_BASE_URL + posterPath;
  return `${smallUrl} 1x, ${largeUrl} 2x`;
}

function getBackdropUrl(backdropPath) {
  if (!backdropPath) return CONFIG.IMAGE_PLACEHOLDER;
  const baseUrl =
    window.devicePixelRatio > 1
      ? CONFIG.BACKDROP_BASE_URL_2X
      : CONFIG.BACKDROP_BASE_URL;
  return baseUrl + backdropPath;
}

// ===== LOADING STATES =====

/**
 * Shows loading indicator
 */
function showLoader() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'flex';
    loadingIndicator.setAttribute('aria-hidden', 'false');
  }
}

/**
 * Hides loading indicator
 */
function hideLoader() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
    loadingIndicator.setAttribute('aria-hidden', 'true');
  }
}

// ===== ERROR HANDLING =====
function showErrorMessage(message, type = 'error') {
  const errorDiv = document.createElement('div');
  errorDiv.className = `error-message ${type}`;
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 500;
  `;

  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// ===== API FUNCTIONS =====
async function fetchTrendingDay() {
  const url = buildApiUrl('/trending/movie/day');
  const response = await axios.get(url);
  return response.data;
}

async function fetchTrendingWeek(page = 1) {
  const url = buildApiUrl('/trending/movie/week', { page });
  const response = await axios.get(url);
  return response.data;
}

async function fetchMovieDetails(movieId) {
  const url = buildApiUrl(`/movie/${movieId}`, {
    language: CONFIG.DEFAULT_LANGUAGE,
  });
  const response = await axios.get(url);
  return response.data;
}

async function fetchGenres() {
  const url = buildApiUrl('/genre/movie/list', {
    language: CONFIG.DEFAULT_LANGUAGE,
  });
  const response = await axios.get(url);
  return response.data.genres;
}

async function fetchMovieVideos(movieId) {
  try {
    const url = buildApiUrl(`/movie/${movieId}/videos`, {
      language: CONFIG.DEFAULT_LANGUAGE,
    });
    const response = await axios.get(url);
    const videos = response.data?.results || [];
    return videos.filter(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
}

async function searchMovies(query, year = '', page = 1) {
  const url = buildApiUrl('/search/movie', {
    query,
    year,
    page,
    include_adult: false,
    language: CONFIG.DEFAULT_LANGUAGE,
  });
  const response = await axios.get(url);
  return response.data;
}

// ===== RENDERING FUNCTIONS =====
function renderStarRating(voteAverage, container) {
  if (!container) return;

  const rating = voteAverage / 2;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = '';

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML +=
      '<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';
  }

  // Render half star if needed
  if (hasHalfStar) {
    starsHTML +=
      '<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>';
  }

  // Render empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML +=
      '<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';
  }

  container.innerHTML = starsHTML;
}

function renderHeroSection(movie) {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  // Use backdrop image for better quality, fallback to poster if no backdrop
  const bgUrl = movie.backdrop_path
    ? getBackdropUrl(movie.backdrop_path)
    : getImageUrl(movie.poster_path);

  // Preload high-quality image
  const img = new Image();
  img.onload = function () {
    heroSection.style.backgroundImage = `url(${bgUrl})`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroSection.style.backgroundAttachment = 'fixed';
    heroSection.style.transition = 'background-image 0.3s ease';
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
        }" aria-label="Trailer for ${movie.title}">
          Watch trailer
        </button>
        <button class="btn details-btn" data-id="${
          movie.id
        }" aria-label="More details for ${movie.title}">
          More details
        </button>
      </div>
    </div>
  `;

  const heroStarsContainer = document.getElementById('hero-rating-stars');
  renderStarRating(movie.vote_average || 0, heroStarsContainer);
}

function renderMoviesList(movies) {
  DOM.moviesUl.innerHTML = '';

  if (!movies || movies.length === 0) {
    DOM.moviesUl.innerHTML = `
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    fragment.appendChild(movieCard);
  });
  DOM.moviesUl.appendChild(fragment);
}

function createMovieCard(movie) {
  const li = document.createElement('li');
  li.className = 'movie-card';

  // Process genres
  let genresText = '';
  if (movie.genres && movie.genres.length > 0) {
    genresText = movie.genres.map(g => g.name).join(', ');
  } else if (movie.genre_ids && movie.genre_ids.length > 0) {
    const genreNames = movie.genre_ids
      .map(id => {
        const genre = AppState.genresCache.find(g => g.id === id);
        return genre ? genre.name : '';
      })
      .filter(name => name !== '')
      .slice(0, 2);
    genresText = genreNames.join(', ');
  }

  const releaseYear = extractYear(movie.release_date);
  const genreAndYear = genresText
    ? `${genresText} | ${releaseYear}`
    : releaseYear;

  li.innerHTML = `
    <div class="movie-poster">
      <img src="${getImageUrl(movie.poster_path)}"
           alt="${movie.title} poster"
           loading="lazy"
           srcset="${getImageSrcset(movie.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-meta">${genreAndYear}</div>
      </div>
      <div class="movie-info-right">
        <div class="catalog-rating-stars"></div>
      </div>
    </div>
  `;

  const starsContainer = li.querySelector('.catalog-rating-stars');
  renderStarRating(movie.vote_average || 0, starsContainer);

  return li;
}

function renderPagination(currentPage, totalPages) {
  // Skip if pagination is deactivated
  if (!DOM.paginationUl) return;

  DOM.paginationUl.innerHTML = '';
  AppState.totalPages = totalPages;
  AppState.currentPage = currentPage;

  if (totalPages <= 1) return;

  const fragment = document.createDocumentFragment();

  // Previous button
  if (currentPage > 1) {
    const prevBtn = createPaginationButton('‹', false, 'prev');
    const prevButton = prevBtn.querySelector('button');
    prevButton.addEventListener('click', () =>
      handlePageChange(currentPage - 1)
    );
    fragment.appendChild(prevBtn);
  }

  // Calculate page range to show
  let startPage, endPage;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  // Render page numbers
  for (let page = startPage; page <= endPage; page++) {
    const pageNumber = page.toString().padStart(2, '0');
    const pageBtn = createPaginationButton(pageNumber, page === currentPage);
    const button = pageBtn.querySelector('button');
    button.addEventListener('click', () => handlePageChange(page));
    fragment.appendChild(pageBtn);
  }

  // Show ellipsis and last page if there's a gap
  if (endPage < totalPages - 1) {
    fragment.appendChild(createPaginationDots());
    const lastPageNumber = totalPages.toString().padStart(2, '0');
    const lastPageBtn = createPaginationButton(
      lastPageNumber,
      currentPage === totalPages
    );
    const lastButton = lastPageBtn.querySelector('button');
    lastButton.addEventListener('click', () => handlePageChange(totalPages));
    fragment.appendChild(lastPageBtn);
  } else if (endPage < totalPages) {
    const lastPageNumber = totalPages.toString().padStart(2, '0');
    const lastPageBtn = createPaginationButton(
      lastPageNumber,
      currentPage === totalPages
    );
    const lastButton = lastPageBtn.querySelector('button');
    lastButton.addEventListener('click', () => handlePageChange(totalPages));
    fragment.appendChild(lastPageBtn);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = createPaginationButton('›', false, 'next');
    const nextButton = nextBtn.querySelector('button');
    nextButton.addEventListener('click', () =>
      handlePageChange(currentPage + 1)
    );
    fragment.appendChild(nextBtn);
  }

  DOM.paginationUl.appendChild(fragment);
}

function createPaginationButton(page, isActive = false, type = 'page') {
  const li = document.createElement('li');
  const button = document.createElement('button');

  button.className = `page-btn ${type}`;
  if (isActive) button.classList.add('active');
  button.textContent = page;

  li.appendChild(button);
  return li;
}

function createPaginationDots() {
  const li = document.createElement('li');
  li.className = 'page-ellipsis';
  li.textContent = '...';
  return li;
}

// ===== MODAL FUNCTIONS =====
function renderTrailerModal(videoKey, title) {
  const modal = document.createElement('div');
  modal.className = 'movie-modal';

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" aria-label="Close modal">&times;</span>
      <div class="trailer-container">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${videoKey}?autoplay=1"
          title="${title} trailer"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  setupModalEventListeners(modal);
}

async function renderMovieDetailsModal(movieId) {
  try {
    const [movie, videos] = await Promise.all([
      fetchMovieDetails(movieId),
      fetchMovieVideos(movieId),
    ]);

    const trailer = videos.length ? videos[0] : null;
    const genres = movie.genres?.length
      ? movie.genres.map(g => g.name).join(', ')
      : '—';

    const modal = document.createElement('div');
    modal.className = 'movie-modal';

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${getImageUrl(movie.poster_path)}" 
               alt="${movie.title} poster"
               loading="lazy"
               srcset="${getImageSrcset(movie.poster_path)}" />

          <div class="modal-info">
            <h2>${movie.title}</h2>
            <p><strong>Release:</strong> ${extractYear(movie.release_date)}</p>
            <p><strong>Genres:</strong> ${genres}</p>
            <p><strong>Rating:</strong> ${
              movie.vote_average ? movie.vote_average.toFixed(1) : 'No rating'
            }</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${movie.overview || 'No overview available.'}</p>

          ${
            trailer
              ? `
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${trailer.key}"
                title="${movie.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    setupModalEventListeners(modal);
  } catch (error) {
    console.error('Error loading movie details:', error);
    showErrorMessage('Error loading movie details.');
  }
}

function setupModalEventListeners(modal) {
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => modal.remove());

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
}

// ===== MAIN FUNCTIONS =====
async function loadTrendingMovies(page = 1) {
  try {
    showLoader();
    DOM.movieListRegion.setAttribute('aria-busy', 'true');

    const [data] = await Promise.all([
      fetchTrendingWeek(page),
      new Promise(resolve => setTimeout(resolve, 800)), // Minimum loading time
    ]);

    AppState.totalPages = data.total_pages || 1;

    // Only render hero section if hero content exists (may be deactivated)
    if (DOM.heroContent && page === 1) {
      const firstMovie = data.results?.[0];
      if (firstMovie) {
        renderHeroSection(firstMovie);
      } else {
        DOM.heroContent.innerHTML = `
          <div class="hero-fall-back" style="
            text-align: center; 
            padding: 4rem 2rem; 
            background: rgba(0, 0, 0, 0.8); 
            color: #ffffff; 
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          ">
            <div style="font-size: 1.5rem; font-weight: 400; margin-bottom: 0.5rem;">OOPS...</div>
            <div style="font-size: 1.2rem; font-weight: 400; margin-bottom: 0.5rem;">We are very sorry!</div>
            <div style="font-size: 1rem; font-weight: 300; opacity: 0.9;">We don't have any results matching your search.</div>
          </div>
        `;
      }
    }

    const movies = data.results || [];
    renderMoviesList(movies);
    renderPagination(page, AppState.totalPages);

    AppState.lastSearch = { input: '', year: '', isSearch: false };
  } catch (error) {
    console.error('Error loading trending movies:', error);
    showErrorMessage('Failed to load trending movies. Please try again later.');
  } finally {
    hideLoader();
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

async function performMovieSearch(query, year = '', page = 1) {
  if (!query || query.trim() === '') {
    return loadTrendingMovies();
  }

  try {
    showLoader();
    DOM.movieListRegion.setAttribute('aria-busy', 'true');

    const [data] = await Promise.all([
      searchMovies(query.trim(), year, page),
      new Promise(resolve => setTimeout(resolve, 600)), // Minimum loading time
    ]);

    const movies = data.results || [];
    renderMoviesList(movies);
    renderPagination(page, data.total_pages || 1);

    AppState.lastSearch = { input: query, year: year, isSearch: true };
  } catch (error) {
    console.error('Error performing search:', error);
    showErrorMessage('Search failed. Please try again.');
  } finally {
    hideLoader();
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

function handlePageChange(page) {
  AppState.currentPage = page;

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

async function handleTrailerClick(movieId) {
  try {
    const videos = await fetchMovieVideos(movieId);

    if (!videos.length) {
      showErrorMessage('No trailer available for this movie.', 'warning');
      return;
    }

    const trailer = videos[0];
    renderTrailerModal(trailer.key, trailer.name || 'Trailer');
  } catch (error) {
    console.error('Error loading trailer:', error);
    showErrorMessage('Error loading trailer.');
  }
}

async function handleDetailsClick(movieId) {
  try {
    await renderMovieDetailsModal(movieId);
  } catch (error) {
    console.error('Error loading movie details:', error);
    showErrorMessage('Error loading movie details.');
  }
}

// ===== EVENT LISTENERS =====
/**
 * Populates year select dropdown
 */
function populateYearSelect() {
  if (!DOM.yearSelect) return; // Skip if search is deactivated

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= CONFIG.YEAR_SELECT_START; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    DOM.yearSelect.appendChild(option);
  }
}

/**
 * Sets up all event listeners
 */
function setupEventListeners() {
  // Only setup search-related listeners if search elements exist
  if (DOM.searchForm && DOM.searchInput && DOM.yearSelect && DOM.clearBtn) {
    // Search form submission
    DOM.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = DOM.searchInput.value;
      const year = DOM.yearSelect.value;
      performMovieSearch(query, year, 1);
    });

    // Search input changes
    DOM.searchInput.addEventListener('input', e => {
      const value = e.target.value;
      DOM.clearBtn.style.display = value.trim() ? 'flex' : 'none';
    });

    // Clear button
    DOM.clearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      DOM.clearBtn.style.display = 'none';
      DOM.yearSelect.value = '';
      loadTrendingMovies(1);
    });
  }

  // Movie action buttons (always setup - these work for modal buttons too)
  document.addEventListener('click', async e => {
    const trailerBtn = e.target.closest('.trailer-btn');
    if (trailerBtn) {
      const movieId = trailerBtn.dataset.id;
      if (movieId) {
        await handleTrailerClick(movieId);
      }
      return;
    }

    const detailsBtn = e.target.closest('.details-btn');
    if (detailsBtn) {
      const movieId = detailsBtn.dataset.id;
      if (movieId) {
        await handleDetailsClick(movieId);
      }
    }
  });
}

// ===== INITIALIZATION =====
/**
 * Initializes the application
 */
async function initializeApp() {
  try {
    // Initialize DOM elements after partials are loaded
    DOM = {
      moviesUl: document.getElementById('movies-ul'),
      paginationUl: document.getElementById('pagination-ul'),
      heroContent: document.getElementById('hero-content'), // May be null if deactivated
      searchForm: document.getElementById('search-form'), // May be null if deactivated
      searchInput: document.getElementById('search-input'), // May be null if deactivated
      clearBtn: document.getElementById('clear-btn'), // May be null if deactivated
      yearSelect: document.getElementById('year-select'), // May be null if deactivated
      movieListRegion: document.getElementById('movie-list'),
    };

    // Setup event listeners (search events will be skipped if search is deactivated)
    setupEventListeners();

    // Only populate year select if search form exists
    if (DOM.yearSelect) {
      populateYearSelect();
    }

    AppState.genresCache = await fetchGenres();

    // Only render hero section if hero content exists
    if (DOM.heroContent) {
      const dayData = await fetchTrendingDay();
      const heroMovie = dayData.results?.[0];
      if (heroMovie) {
        renderHeroSection(heroMovie);
      }
    }

    await loadTrendingMovies(1);
  } catch (error) {
    console.error('Error initializing app:', error);
    showErrorMessage('Failed to initialize application.');
  }
}

// ===== APP STARTUP =====
async function startApp() {
  await loadPartials();
  initializeApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
