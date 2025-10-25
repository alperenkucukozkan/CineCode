import {
  fetchWeeklyMovies,
  fetchGenres,
  fetchMovieDetails,
} from '../api/api.js';

import { Modal } from './modal.js';

let gallery;
let seeAllBtn;
let allMovies = [];
let isExpanded = false;

function getVisibleCardCount() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 3;
  return 3;
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
async function renderWeeklyTrends(limit = getVisibleCardCount()) {
  try {
    const [trendData, genreData] = await Promise.all([
      fetchWeeklyMovies(),
      fetchGenres(),
    ]);
    allMovies = trendData.results;
    const genreMap = genreData.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    const moviesToShow = allMovies.slice(0, limit);
    const markup = moviesToShow
      .map(movie => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `https://via.placeholder.com/500x750?text=No+Image`;
        const genreName = movie.genre_ids
          .map(id => genreMap[id])
          .slice(0, 1)
          .join(', ');
        const year = movie.release_date
          ? movie.release_date.slice(0, 4)
          : 'N/A';
        const ratingStars = createRatingStars(movie.vote_average);
        return `
          <li class="weekly-card" data-id="${movie.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${posterUrl}" alt="${movie.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${movie.title.toUpperCase()}</h3>
                <p class="card-info">${genreName} | ${year}</p>
                <div class="card-rating">${ratingStars}</div>
              </div>
            </div>
          </li>
        `;
      })
      .join('');
    gallery.innerHTML = markup;
  } catch (err) {
    console.error('Weekly trends fetch error:', err);
    gallery.innerHTML = '<p>Veriler alınamadı.</p>';
  }
}
function initWeeklySection() {
  gallery = document.querySelector('.weekly-gallery');
  seeAllBtn = document.querySelector('.see-all');
  if (!gallery || !seeAllBtn) {
    console.warn('weekly-gallery veya see-all bulunamadı.');
    return;
  }
  seeAllBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    const count = isExpanded ? allMovies.length : getVisibleCardCount();
    renderWeeklyTrends(count);
  });
  gallery.addEventListener('click', async e => {
    const card = e.target.closest('.weekly-card');
    if (!card) return;
    const movieId = card.dataset.id;
    try {
      const movie = await fetchMovieDetails(movieId);
      Modal.renderMovie(movie); // <-- generic modal
    } catch (err) {
      console.error('Popup açılırken hata:', err);
    }
  });
  renderWeeklyTrends();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeeklySection, {
    once: true,
  });
} else {
  initWeeklySection();
}