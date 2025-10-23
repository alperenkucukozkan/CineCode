// ===== IMPORTS =====
import * as API from '../api/api.js';
import { initPagination, renderPagination } from './pagination.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// ===== CONFIGURATION =====
const CONFIG = {
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  IMAGE_BASE_URL_2X: 'https://image.tmdb.org/t/p/w780',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/w1280',
  BACKDROP_BASE_URL_2X: 'https://image.tmdb.org/t/p/w1920',
  IMAGE_PLACEHOLDER: 'src/images/no-poster.svg',
};

// ===== DOM ELEMENTS CACHE =====
let DOM;

// ===== EVENT HANDLERS =====
let movieCardClickHandler = null;

// ===== APPLICATION STATE =====
const AppState = {
  lastSearch: { input: '', year: '', isSearch: false },
  genresCache: [],
};

// ===== UTILITY FUNCTIONS =====
function extractYear(releaseDate) {
  return releaseDate ? releaseDate.split('-')[0] : '—';
}

function toggleLibraryButton(movie, button) {
  let library = JSON.parse(localStorage.getItem('library')) || [];
  const isInLibrary = library.some(
    item => Number(item.id) === Number(movie.id)
  );
  if (isInLibrary) {
    library = library.filter(item => Number(item.id) !== Number(movie.id));
    button.textContent = 'Add to Library';
    button.classList.remove('remove-from-library');
    button.classList.add('library-btn-w');
  } else {
    if (!movie.genre_ids && movie.genres) {
      movie.genre_ids = movie.genres.map(g => g.id);
    }
    library.push(movie);
    button.textContent = 'Remove from my library';
    button.classList.remove('library-btn-w');
    button.classList.add('remove-from-library');
  }
  localStorage.setItem('library', JSON.stringify(library));
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
  li.dataset.id = movie.id;
  li.style.cursor = 'pointer';

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

// ===== MAIN FUNCTIONS =====
async function loadTrendingMovies(page = 1) {
  try {
    DOM.movieListRegion.setAttribute('aria-busy', 'true');

    const data = await API.fetchTrendingWeek(page);

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
    renderPagination(page, data.total_pages || 1);

    AppState.lastSearch = { input: '', year: '', isSearch: false };
  } catch (error) {
    console.error('Error loading trending movies:', error);
    showErrorMessage('Failed to load trending movies. Please try again later.');
  } finally {
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

async function performMovieSearch(query, year = '', page = 1) {
  if (!query || query.trim() === '') {
    return loadTrendingMovies();
  }

  try {
    DOM.movieListRegion.setAttribute('aria-busy', 'true');

    const data = await API.searchMovies(query.trim(), year, page);

    const movies = data.results || [];
    renderMoviesList(movies);
    renderPagination(page, data.total_pages || 1);

    AppState.lastSearch = { input: query, year: year, isSearch: true };
  } catch (error) {
    console.error('Error performing search:', error);
    showErrorMessage('Search failed. Please try again.');
  } finally {
    DOM.movieListRegion.removeAttribute('aria-busy');
  }
}

function handlePageChange(page) {
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

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Önceki handler'ı kaldır (eğer varsa)
  if (movieCardClickHandler) {
    DOM.moviesUl.removeEventListener('click', movieCardClickHandler);
  }

  // Movie card click handler'ını tanımla
  movieCardClickHandler = async e => {
    const card = e.target.closest('.movie-card');
    if (!card) return;

    const movieId = card.dataset.id;
    if (!movieId) return;

    try {
      const movie = await API.fetchMovieDetails(movieId);
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `https://via.placeholder.com/500x750?text=No+Image`;
      const genres = movie.genres.map(g => g.name).join(', ');
      const library = JSON.parse(localStorage.getItem('library')) || [];
      const inLibrary = library.some(
        item => Number(item.id) === Number(movie.id)
      );

      const popup = basicLightbox.create(
        `
        <div class="weekly-movie-modal">
          <button class="popup-close-btn" aria-label="Close">
            <svg class="icon-close" width="24" height="24">
              <use xlink:href="../../img/icon.svg#icon-close"></use>
            </svg>
          </button>
          <img src="${posterUrl}" class="modal-poster" alt="${movie.title}">
          <div class="modal-details">
            <h2>${movie.title}</h2>
            <p><strong>Vote / Votes:</strong> ${movie.vote_average} / ${
          movie.vote_count
        }</p>
            <p><strong>Popularity:</strong> ${movie.popularity}</p>
            <p><strong>Genre:</strong> ${genres}</p>
            <h3>ABOUT</h3>
            <p>${movie.overview}</p>
            <button class="${
              inLibrary ? 'remove-from-library' : 'library-btn-w'
            }">
              ${inLibrary ? 'Remove from my library' : 'Add to Library'}
            </button>
          </div>
        </div>
        `,
        {
          onShow: instance => {
            const closeBtn = instance
              .element()
              .querySelector('.popup-close-btn');
            closeBtn.addEventListener('click', () => instance.close());
            const addBtn = instance
              .element()
              .querySelector(
                'button.remove-from-library, button.library-btn-w'
              );
            addBtn.addEventListener('click', () =>
              toggleLibraryButton(movie, addBtn)
            );
          },
        }
      );
      popup.show();
      function handleEscKey(e) {
        if (e.key === 'Escape') {
          popup.close();
          window.removeEventListener('keydown', handleEscKey);
        }
      }
      window.addEventListener('keydown', handleEscKey);
    } catch (err) {
      console.error('Popup açılırken hata:', err);
    }
  };

  // Yeni handler'ı ekle
  DOM.moviesUl.addEventListener('click', movieCardClickHandler);

  // Movie action buttons (works for modal buttons too)
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
async function initializeApp() {
  try {
    // Initialize DOM elements
    DOM = {
      moviesUl: document.getElementById('movies-ul'),
      heroContent: document.getElementById('hero-content'),
      movieListRegion: document.getElementById('movie-list'),
    };

    // Setup event listeners
    setupEventListeners();

    // Initialize pagination module
    initPagination(handlePageChange);

    // Fetch genres cache
    const genresData = await API.fetchGenres();
    AppState.genresCache = genresData.genres || [];

    // Only render hero section if hero content exists
    if (DOM.heroContent) {
      const dayData = await API.fetchTrendingDay();
      const heroMovie = dayData.results?.[0];
      if (heroMovie) {
        renderHeroSection(heroMovie);
      }
    }

    // Load initial trending movies
    await loadTrendingMovies(1);
  } catch (error) {
    console.error('Error initializing app:', error);
    showErrorMessage('Failed to initialize application.');
  }
}

// ===== APP STARTUP =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
