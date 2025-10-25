import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
/* ----- küçük “library” yardımcıları ----- */
function readLibrary() {
  try {
    return JSON.parse(localStorage.getItem('library')) || [];
  } catch {
    return [];
  }
}
function writeLibrary(arr) {
  localStorage.setItem('library', JSON.stringify(arr));
}
function isInLibrary(movieId) {
  const lib = readLibrary();
  return lib.some(m => Number(m.id) === Number(movieId));
}
function toggleLibrary(movie, btn) {
  let lib = readLibrary();
  const exists = lib.some(m => Number(m.id) === Number(movie.id));
  if (exists) {
    lib = lib.filter(m => Number(m.id) !== Number(movie.id));
    btn.textContent = 'Add to Library';
    btn.classList.remove('app-btn--danger');
    btn.classList.add('app-btn--primary');
  } else {
    if (!movie.genre_ids && movie.genres) {
      movie.genre_ids = movie.genres.map(g => g.id);
    }
    lib.push(movie);
    btn.textContent = 'Remove from my library';
    btn.classList.remove('app-btn--primary');
    btn.classList.add('app-btn--danger');
  }
  writeLibrary(lib);
}
/* ----- tekil basicLightbox instance ----- */
let instance = null;
function openWithHTML(html, onShow) {
  if (instance?.visible()) instance.close();
  instance = basicLightbox.create(html, {
    onShow: inst => {
      const closeBtn = inst.element().querySelector('.app-modal__close');
      if (closeBtn) closeBtn.addEventListener('click', () => inst.close());
      if (typeof onShow === 'function') onShow(inst);
    },
  });
  instance.show();
}
/* ----- film layout (weekly’den bağımsız sınıflar) ----- */
function movieHTML(movie) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/500x750?text=No+Image`;
  const genres = Array.isArray(movie.genres)
    ? movie.genres.map(g => g.name).join(', ')
    : Array.isArray(movie.genre_ids)
    ? movie.genre_ids.join(', ')
    : '-';
  const inLib = isInLibrary(movie.id);
  return `
    <div class="app-modal" role="dialog" aria-modal="true">
      <button class="app-modal__close" type="button" aria-label="Close">
        <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
          <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="${posterUrl}" class="app-modal__poster" alt="${
    movie.title || movie.name || 'Movie'
  }"/>
      <div class="app-modal__details">
        <h2 class="app-modal__title">${
          movie.title || movie.name || 'Untitled'
        }</h2>
        <div class="app-meta">
          <div><strong>Vote / Votes:</strong> <span class="vote-box">${
            movie.vote_average ?? 0
          }</span> <span>/</span> <span class="vote-box">${
    movie.vote_count ?? 0
  }</span></div>
          <div><strong>Popularity:</strong> ${movie.popularity ?? 0}</div>
          <div><strong>Genre:</strong> ${genres}</div>
        </div>
        <h3 class="app-section-title">ABOUT</h3>
        <p class="app-modal__about">${
          movie.overview || 'No description available.'
        }</p>
        <button class="app-btn ${
          inLib ? 'app-btn--danger' : 'app-btn--primary'
        }" data-action="toggle-library">
          ${inLib ? 'Remove from my library' : 'Add to Library'}
        </button>
      </div>
    </div>
  `;
}
/* ----- public API ----- */
export const Modal = {
  renderMovie(movie) {
    openWithHTML(movieHTML(movie), inst => {
      const btn = inst
        .element()
        .querySelector('[data-action="toggle-library"]');
      if (btn) btn.addEventListener('click', () => toggleLibrary(movie, btn));
    });
  },
  showTrailer(youtubeKey) {
    openWithHTML(`
      <div class="app-modal app-modal--wide">
        <button class="app-modal__close" type="button" aria-label="Close">
          <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
            <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="app-modal__player">
          <iframe
            src="https://www.youtube.com/embed/${youtubeKey}"
            width="100%" height="100%" frameborder="0" allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
        </div>
      </div>
    `);
  },
  showMessage(text, title = 'Info') {
    openWithHTML(`
      <div class="app-modal">
        <button class="app-modal__close" type="button" aria-label="Close">
          <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
            <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="app-modal__details">
          <h2 class="app-modal__title">${title}</h2>
          <p class="app-modal__about">${text}</p>
        </div>
      </div>
    `);
  },
  openWithHTML,
  close() {
    if (instance?.visible()) instance.close();
  },
};
