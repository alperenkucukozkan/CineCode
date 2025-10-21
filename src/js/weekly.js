import {
  fetchWeeklyMovies,
  fetchGenres,
  fetchMovieDetails,
} from '../api/api.js';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const gallery = document.querySelector('.weekly-gallery');
const seeAllBtn = document.querySelector('.see-all');

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
      '<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>'
    );
  if (hasHalfStar)
    stars.push(
      '<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>'
    );
  for (let i = 0; i < emptyStars; i++)
    stars.push(
      '<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>'
    );

  return stars.join('');
}

function toggleLibraryButton(movie, button) {
  let library = JSON.parse(localStorage.getItem('library')) || [];
  const isInLibrary = library.some(item => item.id === movie.id);
  if (isInLibrary) {
    library = library.filter(item => item.id !== movie.id);
    button.textContent = 'Add to Library';
    button.classList.remove('remove-from-library');
    button.classList.add('library-btn-w');
  } else {
    library.push(movie);
    button.textContent = 'Remove from my library';
    button.classList.remove('library-btn-w');
    button.classList.add('remove-from-library');
  }
  localStorage.setItem('library', JSON.stringify(library));
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
          : 'https://via.placeholder.com/500x750?text=No+Image';

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

// See all butonu
seeAllBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  const count = isExpanded ? allMovies.length : getVisibleCardCount();
  renderWeeklyTrends(count);
});

// Kart tıklanmasıyla modal açma
gallery.addEventListener('click', async e => {
  const card = e.target.closest('.weekly-card');
  if (!card) return;

  const movieId = card.dataset.id;

  try {
    const movie = await fetchMovieDetails(movieId);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    const genres = movie.genres.map(g => g.name).join(', ');

    const library = JSON.parse(localStorage.getItem('library')) || [];
    const inLibrary = library.includes(movie.id);

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
          <button class="library-btn-w ${
            inLibrary ? 'remove-from-library' : 'library-btn-w'
          }">
            ${inLibrary ? 'Remove from my library' : 'Add to Library'}
          </button>
        </div>
      </div>
      `,
      {
        onShow: instance => {
          const closeBtn = instance.element().querySelector('.popup-close-btn');
          closeBtn.addEventListener('click', () => instance.close());

          const addBtn = instance.element().querySelector('.library-btn-w');
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
});

renderWeeklyTrends();
