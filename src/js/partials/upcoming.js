const API_KEY = 'c0fe092c4149192005601ffec65036a5';
const BASE_URL = 'https://api.themoviedb.org/3';
const upcomingContainer = document.getElementById('upcoming-content');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();

const startDate = `${year}-${month}-01`;
const endDate = `${year}-${month}-${lastDay}`;

let genres = []; 

function getGenres() {
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(data => data.genres);
}

function getLibrary() {
  return JSON.parse(localStorage.getItem('library')) || [];
}

function isInLibrary(id) {
  return getLibrary().includes(id);
}

function toggleLibrary(id, btn) {
  let library = getLibrary();
  const inLib = library.includes(id);

  if (inLib) {
    library = library.filter(item => item !== id);
    btn.textContent = 'Add to my library';
    btn.classList.remove('btn-remove');
    btn.classList.add('btn-add');
  } else {
    library.push(id);
    btn.textContent = 'Remove from my library';
    btn.classList.remove('btn-add');
    btn.classList.add('btn-remove');
  }

  localStorage.setItem('library', JSON.stringify(library));
}

function getGenreNames(ids) {
  return ids
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');
}

function renderMovie(movie) {
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : 'https://via.placeholder.com/500x300?text=No+Image';

  const inLib = isInLibrary(movie.id);
  const btnText  = inLib ? 'Remove from my library' : 'Add to my library';
  const btnClass = inLib ? 'btn-remove':'btn-add';

  const genreNames = getGenreNames(movie.genre_ids);

  upcomingContainer.innerHTML = `
    <div class="upcoming-card">
      <img src="${imageUrl}" alt="${movie.title}" />
      <div class="info">
        <h3 class="movie-name">${movie.title}</h3>

        <p class="movie-detail">
          <span>Release date</span>
          <span class="highlight">${movie.release_date || 'Unknown'}</span>
        </p>

        <p class="movie-detail">
          <span>Vote / Votes</span>
         
           <span>
            <span class="vote-box">${movie.vote_average?.toFixed(1) || '-'}</span>
            <span>/</span>
            <span class="vote-box">${movie.vote_count || '-'}</span> 
          </span>
        
        </p>

        <p class="movie-detail">
          <span>Popularity</span>
          <span>${movie.popularity?.toFixed(1) || '-'}</span>
        </p>

        <p class="movie-detail">
          <span>Genre</span>
          <span>${genreNames || 'Unknown'}</span>
        </p>

        <h4 class="about-title">ABOUT</h4>
        <p class="movie-overview">${movie.overview || 'No description available.'}</p>

        <button id="library-btn" class="btn-library ${btnClass}">${btnText}</button>
      </div>
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
        throw new Error('Failed to fetch movies');
      }
      return response.json();
    })
    .then(data => data.results);
}

getGenres()
  .then(data => {
    genres = data;
    return getMoviesThisMonth();
  })
  .then(movies => {
    if (!movies.length) {
      upcomingContainer.innerHTML = `<p>No upcoming movies this month.</p>`;
      return;
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    renderMovie(randomMovie);
  })
  .catch(error => {
    console.error('Error:', error);
    upcomingContainer.innerHTML = `<p>Error while fetching movie data.</p>`;
  });
