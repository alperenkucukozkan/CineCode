const API_KEY = 'f110e770169ce8b0fb6c62491d2b9ebb';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const searchInput = document.querySelector('.catalog-search-input');
const searchButton = document.querySelector('.catalog-search-button');
const filmList = document.getElementById('filmList');
const alertMessage = document.getElementById('alertMessage');

const yearSelect = document.createElement('select');
yearSelect.className = 'year-select';
yearSelect.innerHTML = `<option value="">Year</option>`;
for (let y = new Date().getFullYear(); y >= 1950; y--) {
  yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
}
document.querySelector('.search-container').appendChild(yearSelect);

const clearButton = document.createElement('button');
clearButton.textContent = '×';
clearButton.className = 'clear-button';
clearButton.style.display = 'none';
document.querySelector('.search-container').appendChild(clearButton);

async function searchMovies(query, year) {
  const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}${year ? `&year=${year}` : ''}`;
  const res = await fetch(url);
  const data = await res.json();

  filmList.innerHTML = '';
  if (data.results && data.results.length > 0) {
    alertMessage.style.display = 'none';
    data.results.forEach(movie => {
      const item = document.createElement('div');
      item.className = 'movie-item';
      item.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.release_date || 'No release date available'}</p>
        <p>${movie.overview || 'No description available'}</p>
      `;
      filmList.appendChild(item);
    });
  } else {
    alertMessage.style.display = 'block';
  }
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  const year = yearSelect.value;
  if (query) {
    searchMovies(query, year);
  }
});

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  clearButton.style.display = 'none';
  filmList.innerHTML = '';
  alertMessage.style.display = 'none';
});

searchInput.addEventListener('input', () => {
  clearButton.style.display = searchInput.value.trim() ? 'inline-block' : 'none';
});