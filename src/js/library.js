
import * as API from '../api/api.js';
import { Modal } from './modal.js';

// ===== DOM =====
const hero           = document.getElementById('hero');
const titleEl        = document.getElementById('movie-title');
const overviewEl     = document.getElementById('movie-overview');
const ratingEl       = document.getElementById('movie-rating');
const heroButtons    = document.getElementById('hero-buttons');
const trailerBtn     = document.getElementById('trailer-btn');
const libraryListEl  = document.getElementById('library-list');
const emptyLibraryEl = document.getElementById('empty-library');
const genreFilter    = document.getElementById('genre-filter');
const loadMoreBtn    = document.getElementById('load-more-btn');
// ===== STATE =====
let GENRES = {};                  
let currentLibraryView = [];     
let displayedCount = 0;
const LOAD_COUNT = 9;
// ===== UTILS =====
function createStarRating(vote) {
  const rating = (Number(vote) || 0) / 2;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `
        <svg class="star-svg-full" width="20" height="20">
          <use xlink:href="../img/icon.svg#icon-full-star"></use>
        </svg>`;
    } else if (rating >= i - 0.5) {
      stars += `
        <svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
          <path fill="none" stroke="#f87719" stroke-linejoin="round" stroke-linecap="butt"
                stroke-miterlimit="4" stroke-width="2"
                d="M30 13h-10.75l-3.25-10-3.25 10h-10.75l8.75 6-3.375 10 8.625-6.25 8.625 6.25-3.375-10 8.75-6z"></path>
          <path d="M16 3v19.75l-8.625 6.25 3.375-10-8.75-6h10.75l3.25-10z" fill="#f87719"></path>
        </svg>`;
    } else {
      stars += `
        <svg class="star-svg-empty" width="20" height="20">
          <use xlink:href="../img/icon.svg#icon-empty-star"></use>
        </svg>`;
    }
  }
  return stars;
}
function getBrightness(rgb) {
  const m = rgb.match(/\d+/g);
  if (!m) return 255;
  const [r, g, b] = m.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000;
}
// ===== HERO =====
async function initHero() {
  try {
    const dayData = await API.fetchDailyTrending(); // Eski fetch
    const movie = dayData?.results?.[0];
    if (!movie) return;

    const bg = movie.backdrop_path || movie.poster_path || '';
    hero.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${bg}")`;

    titleEl.textContent    = movie.title || movie.name || '—';
    overviewEl.textContent = movie.overview || 'No description available.';
    ratingEl.innerHTML     = createStarRating(movie.vote_average);
    heroButtons.classList.remove('hidden');

    // Trailer butonu
    trailerBtn.onclick = async () => {
      try {
        const vids = await API.fetchMovieVideos(movie.id);
        const trailer = vids?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer?.key) {
          Modal.showTrailer(trailer.key);
        } else {
          alert('Trailer not available!');
        }
      } catch (e) {
        console.error('Trailer fetch error:', e);
      }
    };

    // İsteğe bağlı: hero tıklama ile modal açma
    hero.addEventListener('click', async () => {
      try {
        const details = await API.fetchMovieDetails(movie.id);
        Modal.renderMovie(details);
      } catch (e) {
        console.error('Hero modal error:', e);
      }
    });

  } catch (e) {
    console.error('Hero init error:', e);
  }
}

// ===== LIBRARY RENDER =====
function displayLibrary(movies, reset = true) {
  if (reset) {
    libraryListEl.innerHTML = '';
    displayedCount = 0;
    currentLibraryView = Array.isArray(movies) ? movies : [];
  }
  const batch = currentLibraryView.slice(displayedCount, displayedCount + LOAD_COUNT);
  const html = batch.map(movie => {
    if (!movie.poster_path) return '';
    const year   = movie.release_date ? movie.release_date.slice(0, 4) : '—';
    const genres = (movie.genre_ids || [])
      .map(id => GENRES[id])
      .filter(Boolean)
      .join(', ') || '—';
    const stars  = createStarRating(movie.vote_average);
    return `
      <li id="${movie.id}" class="library-card"
          style="
            background-image:url(https://image.tmdb.org/t/p/w500${movie.poster_path});
            background-size:cover;background-position:center;
            width:100%;max-width:395px;aspect-ratio:395/574;border-radius:12px;overflow:hidden;position:relative;">
        <div class="library-card-content"
             style="position:absolute;bottom:0;width:100%;
                    background:linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
                    color:#fff;padding:10px;box-sizing:border-box;">
          <h3 style="margin:0;font-size:18px;">${movie.title}</h3>
          <p style="margin:2px 0;font-size:14px; color: #fff;">${genres} | ${year}</p>
          <div>${stars}</div>
        </div>
      </li>`;
  }).join('');
  libraryListEl.insertAdjacentHTML('beforeend', html);
  displayedCount += batch.length;
  if (displayedCount < currentLibraryView.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
  attachCardClickEvents();
}
function loadLibrary() {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  if (!library.length) {
    emptyLibraryEl.style.display = 'flex';
    libraryListEl.innerHTML = '';
    genreFilter?.parentElement && (genreFilter.parentElement.style.display = 'none');
    loadMoreBtn?.classList.add('hidden');
    return;
  }
  emptyLibraryEl.style.display = 'none';
  genreFilter?.parentElement && (genreFilter.parentElement.style.display = 'flex');

  const set = new Set();
  library.forEach(m => (m.genre_ids || []).forEach(id => GENRES[id] && set.add(GENRES[id])));
  if (genreFilter) {
    genreFilter.innerHTML = `<option value="all">Genre</option>` +
      [...set].map(n => `<option value="${n}">${n}</option>`).join('');
  }
  displayLibrary(library);
}
function attachCardClickEvents() {
  document.querySelectorAll('.library-card').forEach(card => {
    card.removeEventListener('click', card._clickHandler);
    const handler = () => {
      const id = Number(card.id);
      const library = JSON.parse(localStorage.getItem('library')) || [];
      const movie = library.find(m => Number(m.id) === id);
      if (movie) Modal.renderMovie(movie);
    };
    card._clickHandler = handler;
    card.addEventListener('click', handler);
  });
}

document.addEventListener('click', e => {
  if (e.target?.matches?.('[data-action="toggle-library"]')) {
    setTimeout(() => loadLibrary(), 0);
  }
});
// ===== EVENTS =====
loadMoreBtn?.addEventListener('click', () => displayLibrary(currentLibraryView, false));
genreFilter?.addEventListener('change', e => {
  const value = e.target.value;
  const all = JSON.parse(localStorage.getItem('library')) || [];
  if (value === 'all') return displayLibrary(all);
  const filtered = all.filter(m => (m.genre_ids || []).some(id => GENRES[id] === value));
  displayLibrary(filtered);
});

(function styleSelectByTheme() {
  if (!genreFilter) return;
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  const brightness = getBrightness(bodyBg);
  const textColor = brightness < 128 ? '#fff' : '#000';
  genreFilter.style.backgroundColor = bodyBg;
  genreFilter.style.color = textColor;
  genreFilter.style.border = `1px solid ${brightness < 128 ? '#000' : '#fff'}`;
})();
// ===== INIT =====
(async function init() {
  try {

    const genresRes = await API.fetchGenres(); // { genres: [{id,name},...] }
    const list = genresRes?.genres || [];
    GENRES = list.reduce((acc, g) => ((acc[g.id] = g.name), acc), {});

    await initHero();

    loadLibrary();
  } catch (err) {
    console.error('Library init error:', err);
  }
})();