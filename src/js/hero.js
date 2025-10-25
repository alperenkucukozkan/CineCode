import {
  fetchDailyTrending,
  fetchMovieDetails,
  fetchMovieVideos,
} from '../api/api.js';
import { Modal } from './modal.js';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

async function initHeroSection() {
  const heroRoot = document.getElementById('hero-x');
  if (!heroRoot) return;

  try {
    const data = await fetchDailyTrending();
    const movies = Array.isArray(data?.data?.results)
      ? data.data.results
      : data?.results || [];

    if (!movies.length) {
      renderDefaultHero(heroRoot);
      return;
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    renderMovieHero(heroRoot, randomMovie);
  } catch (err) {
    console.error('Movie init error:', err);
    renderDefaultHero(heroRoot);
  }
}
function createRatingStars(vote) {
  const fullStars = Math.floor(vote / 2);
  const hasHalfStar = vote % 2 >= 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let stars = [];
  for (let i = 0; i < fullStars; i++)
    stars.push(
      '<svg class="icon-full-star"><use xlink:href="./img/icon.svg#icon-full-star"></use></svg>'
    );
  if (hasHalfStar)
    stars.push(
      '<svg class="icon-half-star"><use xlink:href="./img/icon.svg#icon-half-star"></use></svg>'
    );
  for (let i = 0; i < emptyStars; i++)
    stars.push(
      '<svg class="icon-empty-star"><use xlink:href="./img/icon.svg#icon-empty-star"></use></svg>'
    );
  return stars.join('');
}

function renderMovieHero(container, movie) {
  const ratingStars = createRatingStars(movie.vote_average);
  container.innerHTML = `
    <div class="hero-bg" style="background-image:url('${IMAGE_BASE_URL}${
    movie.backdrop_path || movie.poster_path || ''
  }')"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
    <div class="hero-badge">
      <h2 class="hero-title">${movie.title ?? movie.name ?? 'Untitled'}</h2>
      <span class="hero-rating">${ratingStars}</span>
      </div>
      <p class="hero-sub">
        ${movie.overview || 'No description available.'}
      </p>

      <div class="hero-ctas">
        <button class="btn-play" id="play-trailer-btn">Watch Trailer</button>
        <button class="btn-info" id="more-info-btn">More Info</button>
      </div>
    </div>
  `;

  // ID çakışması olmasın diye container scope'undan seç
  const trailerBtn = container.querySelector('#play-trailer-btn');
  const detailsBtn = container.querySelector('#more-info-btn');

  trailerBtn?.addEventListener('click', () => playTrailer(movie.id));
  detailsBtn?.addEventListener('click', () => showMovieDetails(movie.id));
}

function renderDefaultHero(container) {
  container.innerHTML = `
    <div class="hero-bg" style="background-image:linear-gradient(90deg,#000,#111)"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
      <h2 class="hero-title">Let's Make Your Own Cinema</h2>
      <p class="hero-sub">
        A guide to creating a personalized movie experience.
        Decorate your space, choose your films, and enjoy the show!
      </p>

      <div class="hero-ctas">
        <a href="./catalog.html" class="btn-play">Get Started</a>
      </div>
    </div>
  `;
}

async function playTrailer(movieId) {
  try {
    const data = await fetchMovieVideos(movieId);
    const results = Array.isArray(data?.data?.results)
      ? data.data.results
      : data?.results;
    const trailer = results?.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );
    if (trailer) {
      Modal.showTrailer(trailer.key); // <-- basicLightbox
    } else {
      Modal.showMessage('Trailer not available.', 'Info');
    }
  } catch (err) {
    console.error('Play trailer error:', err);
    Modal.showMessage('Error fetching trailer.', 'Error');
  }
}

async function showMovieDetails(movieId) {
  try {
    const res = await fetchMovieDetails(movieId);
    const movie = res?.data ?? res;
    Modal.renderMovie(movie); // <-- tek çağrı, kendi kendine açar
  } catch (err) {
    console.error('Movie details error:', err);
    Modal.showMessage('Movie details could not be loaded.', 'Error');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('partials:loaded', initHeroSection, { once: true });
} else {
  initHeroSection();
}
