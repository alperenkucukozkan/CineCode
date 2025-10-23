const API_KEY = 'c0fe092c4149192005601ffec65036a5';
const BASE_URL = 'https://api.themoviedb.org/3';
const TRENDING_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

const hero = document.getElementById('hero');
const titleEl = document.getElementById('movie-title');
const overviewEl = document.getElementById('movie-overview');
const ratingEl = document.getElementById('movie-rating');
const heroButtons = document.getElementById('hero-buttons');
const trailerBtn = document.getElementById('trailer-btn');
const loadMoreBtn = document.getElementById('load-more-btn');

const trailerModal = document.getElementById('trailer-modal');
const closeModal = document.getElementById('close-modal');
const trailerFrame = document.getElementById('trailer-frame');

const libraryListEl = document.getElementById('library-list');
const emptyLibraryEl = document.getElementById('empty-library');
const genreFilter = document.getElementById('genre-filter');

let displayedCount = 0;
const LOAD_COUNT = 9;

function createStarRating(vote) {
  const rating = vote / 2; // 0-5 arası
  let stars = '';

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<svg class="star-svg-full" width="20" height="20"><use href="../img/icon.svg#icon-full-star"></svg>`;
    } else if (rating >= i - 0.5) {
      stars += `<svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
                    <path
                      fill="none"
                      stroke="#f87719"
                      stroke-linejoin="round"
                      stroke-linecap="butt"
                      stroke-miterlimit="4"
                      stroke-width="2"
                      d="M30 13h-10.75l-3.25-10-3.25 10h-10.75l8.75 6-3.375 10 8.625-6.25 8.625 6.25-3.375-10 8.75-6z">
                    </path>

                    <path
                      d="M16 3v19.75l-8.625 6.25 3.375-10-8.75-6h10.75l3.25-10z"
                      fill="#f87719">
                    </path>
                </svg>
              `;
    } else {
      stars += `<svg class="star-svg-empty" width="20" height="20"><use href="../img/icon.svg#icon-empty-star"></svg>`;
    }
  }

  return stars;
}

async function fetchTrendingMovie() {
  try {
    const res = await fetch(TRENDING_URL);
    const data = await res.json();
    const movie = data.results[0];
    if (!movie) return;

    hero.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`;
    titleEl.textContent = movie.title;
    overviewEl.textContent = movie.overview;
    ratingEl.innerHTML = createStarRating(movie.vote_average);
    heroButtons.classList.remove('hidden');

    trailerBtn.onclick = async () => {
      const trailerUrl = await fetchTrailer(movie.id);
      if (trailerUrl) {
        trailerFrame.src = trailerUrl;
        trailerModal.classList.remove('hidden');
      } else {
        alert('Trailer not available!');
      }
    };
  } catch (err) {
    console.error('Trending movie fetch error:', err);
  }
}

async function fetchTrailer(movieId) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (err) {
    console.error('Trailer fetch error:', err);
    return null;
  }
}

function closeTrailer() {
  trailerFrame.src = '';
  trailerModal.classList.add('hidden');
}

closeModal.addEventListener('click', closeTrailer);
trailerModal.addEventListener('click', e => {
  if (e.target === trailerModal) closeTrailer();
});

let currentLibraryView = [];

function displayLibrary(movies, reset = true) {
  if (reset) {
    libraryListEl.innerHTML = '';
    displayedCount = 0;
    currentLibraryView = movies;
  }

  const remaining = movies.slice(displayedCount, displayedCount + LOAD_COUNT);

  const newHTML = remaining
    .map(movie => {
      const date = movie.release_date ? movie.release_date.slice(0, 4) : '---';
      const genres = movie.genre_ids?.map(id => GENRES[id]).join(', ') || '---';
      const stars = createStarRating(movie.vote_average);

      return (
        movie.poster_path &&
        `
                <li id="${movie.id}" class="library-card" style="
                    background-image: url(https://image.tmdb.org/t/p/w500${movie.poster_path});
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    max-width: 395px;
                    aspect-ratio: 395 / 574;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                ">
                <div class="library-card-content" style="
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
                    color: #fff;
                    padding: 10px;
                    box-sizing: border-box;
                ">
                    <h3 style="margin:0; font-size:18px;">${movie.title}</h3>
                    <p style="margin:2px 0; font-size:14px;">${genres} | ${date}</p>
                    <div id="movie-rating">${stars}</div>
                </div>
            </li>
        `
      );
    })
    .join('');

  libraryListEl.insertAdjacentHTML('beforeend', newHTML);

  displayedCount += remaining.length;

  if (displayedCount < movies.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }

  attachCardClickEvents();
}

loadMoreBtn.addEventListener('click', () => {
  displayLibrary(currentLibraryView, false);
});

function loadLibrary() {
  const library = JSON.parse(localStorage.getItem('library')) || [];

  if (library.length === 0) {
    emptyLibraryEl.style.display = 'flex';
    libraryListEl.innerHTML = '';
    genreFilter.parentElement.style.display = 'none';
    loadMoreBtn.classList.add('hidden');
    return;
  }

  emptyLibraryEl.style.display = 'none';
  genreFilter.parentElement.style.display = 'flex';

  const genresSet = new Set();
  library.forEach(movie =>
    movie.genre_ids?.forEach(id => {
      if (GENRES[id]) genresSet.add(GENRES[id]);
    })
  );

  genreFilter.innerHTML = `<option value="all">Genre</option>`;
  genresSet.forEach(name => {
    genreFilter.innerHTML += `<option value="${name}">${name}</option>`;
  });

  displayLibrary(library);
}

genreFilter.addEventListener('change', e => {
  const value = e.target.value;
  const library = JSON.parse(localStorage.getItem('library')) || [];
  if (value === 'all') {
    displayLibrary(library);
  } else {
    const filtered = library.filter(m =>
      m.genre_ids.some(id => GENRES[id] === value)
    );
    displayLibrary(filtered);
  }
});

if (genreFilter) {
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;

  function getBrightness(rgb) {
    const rgbValues = rgb.match(/\d+/g).map(Number);
    return (
      (rgbValues[0] * 299 + rgbValues[1] * 587 + rgbValues[2] * 114) / 1000
    );
  }

  const brightness = getBrightness(bodyBg);

  const textColor = brightness < 128 ? '#fff' : '#000';

  genreFilter.style.backgroundColor = bodyBg;
  genreFilter.style.color = textColor;
  genreFilter.style.border = `1px solid ${brightness < 128 ? '#000' : '#fff'}`;

  const options = genreFilter.querySelectorAll('option');
  options.forEach(option => {
    option.style.backgroundColor = bodyBg;
    option.style.color = textColor;
  });
}

function attachCardClickEvents() {
  document.querySelectorAll('.library-card').forEach(card => {
    card.removeEventListener('click', card._clickHandler);
    const handler = () => {
      const movieId = parseInt(card.id);
      const library = JSON.parse(localStorage.getItem('library')) || [];
      const movie = library.find(m => m.id === movieId);
      if (movie) showDetailsPopup(movie, loadLibrary);
    };
    card.addEventListener('click', handler);
    card._clickHandler = handler;
  });
}

function showDetailsPopup(movie, onLibraryChange) {
  const modal = document.getElementById('movie-detail-modal');
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;

  // Parlaklık hesaplama
  function getBrightness(rgb) {
    const rgbValues = rgb.match(/\d+/g).map(Number);
    return (
      (rgbValues[0] * 299 + rgbValues[1] * 587 + rgbValues[2] * 114) / 1000
    );
  }
  const brightness = getBrightness(bodyBg);
  const textColor = brightness < 128 ? '#fff' : '#000'; // yazı rengi

  // Modal HTML
  modal.innerHTML = `
        <div class="detail-box" role="dialog" aria-modal="true" style="background-color: ${bodyBg}; color: ${textColor};">
            <button class="close-span-btn-details" aria-label="Close detail">&times;</button>
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" class="detail-poster"/>
            <div class="detail-content">
                <h2>${movie.title}</h2>
                <p><strong>Vote / Votes:</strong> <span>${
                  movie.vote_average?.toFixed(1) || 'N/A'
                }</span> / <span>${movie.vote_count || 'N/A'}</span></p>
                <p><strong>Popularity:</strong> <span>${
                  movie.popularity?.toFixed(1) || 'N/A'
                }</span></p>
                <p><strong>Genre:</strong> <span>${
                  movie.genre_ids?.map(id => GENRES[id]).join(', ') || 'N/A'
                }</span></p>
                <p><strong>ABOUT</strong></p>
                <div class="scrollable-description">${
                  movie.overview || 'No description available.'
                }</div>
                <button class="library-btn" data-id="${movie.id}"></button>
            </div>
        </div>
    `;

  modal.classList.add('active');

  // Kapatma tuşu
  const closeBtn = modal.querySelector('.close-span-btn-details');
  closeBtn.style.color = textColor;
  closeBtn.addEventListener(
    'mouseenter',
    () => (closeBtn.style.color = '#F87719')
  );
  closeBtn.addEventListener(
    'mouseleave',
    () => (closeBtn.style.color = textColor)
  );
  closeBtn.addEventListener('click', closeModal);

  // Library butonu
  const libBtn = modal.querySelector('.library-btn');

  function setButtonStyle() {
    if (brightness > 128) {
      // Sayfa açık (beyaz)
      libBtn.style.backgroundImage = 'none';
      libBtn.style.backgroundColor = '#fff';
      libBtn.style.color = '#000';
      libBtn.style.border = '1px solid #F84119';
      libBtn.onmouseenter = () => {
        libBtn.style.backgroundColor = '#000';
        libBtn.style.color = '#F87719';
        libBtn.style.border = '1px solid #000';
      };
      libBtn.onmouseleave = () => {
        libBtn.style.backgroundColor = '#fff';
        libBtn.style.color = '#000';
        libBtn.style.border = '1px solid #f84119';
      };
    } else {
      // Sayfa koyu (siyah)
      libBtn.style.backgroundImage = 'none';
      libBtn.style.backgroundColor = '#000';
      libBtn.style.color = '#fff';
      libBtn.style.border = '1px solid #F87719';
      libBtn.onmouseenter = () => {
        libBtn.style.backgroundColor = '#fff';
        libBtn.style.color = '#F87719';
        libBtn.style.border = '1px solid #F87719';
      };
      libBtn.onmouseleave = () => {
        libBtn.style.backgroundColor = '#000';
        libBtn.style.color = '#fff';
        libBtn.style.border = '1px solid #F87719';
      };
    }
  }
  setButtonStyle();

  function updateButton() {
    const library = JSON.parse(localStorage.getItem('library')) || [];
    const inLibrary = library.some(f => f.id === movie.id);
    libBtn.textContent = inLibrary
      ? 'Remove from My Library'
      : 'Add to My Library';
  }
  updateButton();

  libBtn.addEventListener('click', () => {
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const inLibrary = library.some(f => f.id === movie.id);
    library = inLibrary
      ? library.filter(f => f.id !== movie.id)
      : [...library, movie];
    localStorage.setItem('library', JSON.stringify(library));
    updateButton();
    if (typeof onLibraryChange === 'function') onLibraryChange();
  });

  const escHandler = e => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.innerHTML = '';
    document.removeEventListener('keydown', escHandler);
  }
}

export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.genres;
}

async function loadGenres() {
  const genres = await fetchGenres();
  GENRES = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});
}

let GENRES = {};

(async function init() {
  await loadPartials();
  await loadGenres();
  fetchTrendingMovie();
  loadLibrary();
})();
