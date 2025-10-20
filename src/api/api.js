const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULTS = { language: 'en-US', region: 'TR' };


function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);

  const all = { ...DEFAULTS, ...params };
  Object.entries(all).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

//tüm sayfalar
export async function fetchPopularMovies(page = 1) {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return res.json();
}

//Günlük trendler
export async function fetchDailyTrending() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    return res.json();
}
//HAftalık trendler
export async function fetchWeeklyMovies() {
    const res =  await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return res.json();
}

//Upcoming
export async function fetchUpcomingMovies() {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    return res.json();
}
//Film detayları
export async function fetchMovieDetails(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return res.json();
}
//film video
export async function fetchMovieVideos(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    return res.json();
}
//anahtar kelimelere göre arama yıla göre filtreleme
export async function searchMovies(query, year = '') {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(query)}&year=${year}`);
    return res.json();
}
//tür listesini getir
export async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&page=${page}`);
    return res.json();
}

export async function fetchMoviesBetween(startDate, endDate, { region = DEFAULTS.region } = {}) {
  const res = await fetch(
    buildUrl('/discover/movie', {
      sort_by: 'popularity.desc',
      with_release_type: '2|3', 
      region,
      'primary_release_date.gte': startDate,
      'primary_release_date.lte': endDate
    })
  );
  return res.json();
}