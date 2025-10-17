const API_KEY = 'TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';
const upcomingContainer = document.getElementById('upcoming-content');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();

const startDate = `${year}-${month}-01`;
const endDate = `${year}-${month}-${lastDay}`;

function getLibrary() {
  return JSON.parse(localStorage.getItem('library')) || [];
}

function isInLibrary(id) {
  return getLibrary().includes(id);
}

function toggleLibrary(id, btn) {
  let library = getLibrary();

  if (library.includes(id)) {
    library = library.filter(item => item !== id);
    btn.textContent = 'Add to My Library';
  } else {
    library.push(id);
    btn.textContent = 'Remove from My Library';
  }

  localStorage.setItem('library', JSON.stringify(library));
}

function renderMovie(movie) {
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : 'https://via.placeholder.com/500x300?text=No+Image';

  const btnText = isInLibrary(movie.id)
    ? 'Remove from My Library'
    : 'Add to My Library';

  upcomingContainer.innerHTML = `
    <img src="${imageUrl}" alt="${movie.title}" style="border-radius:10px; max-width:400px;">
    <div class="info">
      <h3>${movie.title}</h3>
      <p><strong>Release date:</strong> ${movie.release_date}</p>
      <p><strong>Vote average:</strong> ${movie.vote_average}</p>
      <p><strong>Popularity:</strong> ${movie.popularity}</p>
      <p><strong>Overview:</strong> ${movie.overview || 'No description available.'}</p>
      <button id="library-btn" class="btn-library">${btnText}</button>
    </div>
  `;

  const btn = document.getElementById('library-btn');
  btn.addEventListener('click', () => toggleLibrary(movie.id, btn));
}

function getMoviesThisMonth() {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&region=TR&with_release_type=2|3&release_date.gte=${startDate}&release_date.lte=${endDate}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Veri alınamadı');
      }
      return response.json();
    })
    .then(data => data.results);
}

getMoviesThisMonth()
  .then(movies => {
    if (!movies.length) {
      upcomingContainer.innerHTML = `<p>Bu ay çıkacak film bulunamadı.</p>`;
      return;
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    renderMovie(randomMovie);
  })
  .catch(error => {
    console.error('Hata:', error);
    upcomingContainer.innerHTML = `<p>Film verileri alınırken bir hata oluştu.</p>`;
  });
