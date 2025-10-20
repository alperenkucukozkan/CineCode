const API_KEY = 'c0fe092c4149192005601ffec65036a5';
const BASE_URL = 'https://api.themoviedb.org/3';

// Tüm filmler
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  return await res.json();
}

// Günlük trend filmler
export async function fetchDailyTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return await res.json();
}

// Haftalık trend filmler
export async function fetchWeeklyTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return await res.json();
}

// Yeni filmler (upcoming)
export async function fetchUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return await res.json();
}

// Film detayları (tek bir film)
export async function fetchMovieDetails(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return await res.json();
}

// Filmin videoları (fragman dahil)
export async function fetchMovieVideos(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  return await res.json();
}

// Anahtar kelime + yıla göre arama
export async function searchMovies(query, year = "") {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&year=${year}`
  );
  return await res.json();
}

// Tür listesini getir
export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return await res.json();
}