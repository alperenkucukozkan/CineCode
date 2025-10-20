const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchJSON(path) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${path}${sep}api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} - ${url}`
    );
  return res.json();
}

// tüm sayfalar
export async function fetchPopularMovies(page = 1) {
  return fetchJSON(`/movie/popular?page=${page}`);
}

// Günlük trendler
export async function fetchDailyTrending(page = 1) {
  return fetchJSON(`/trending/movie/day?page=${page}`);
}

// Haftalık trendler
export async function fetchWeeklyMovies(page = 1) {
  return fetchJSON(`/trending/movie/week?page=${page}`);
}

// Upcoming
export async function fetchUpcomingMovies(page = 1) {
  return fetchJSON(`/movie/upcoming?page=${page}`);
}

// Film detayları
export async function fetchMovieDetails(movieId) {
  if (!movieId) throw new Error('movieId gerekli');
  return fetchJSON(`/movie/${movieId}`);
}

// film video
export async function fetchMovieVideos(movieId) {
  if (!movieId) throw new Error('movieId gerekli');
  return fetchJSON(`/movie/${movieId}/videos`);
}

// anahtar kelimelere göre arama, sayfa ve yıl filtreleme
export async function searchMovies(query, page = 1, year = '') {
  if (!query) return { results: [] };
  const yearParam = year ? `&year=${encodeURIComponent(year)}` : '';
  return fetchJSON(
    `/search/movie?page=${page}&query=${encodeURIComponent(query)}${yearParam}`
  );
}

// tür listesini getir
export async function fetchGenres() {
  return fetchJSON(`/genre/movie/list`);
}
