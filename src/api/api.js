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

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(buildUrl('/movie/popular', { page }));
  return res.json();
}

export async function fetchDailyTrending() {
  const res = await fetch(buildUrl('/trending/movie/day'));
  return res.json();
}

export async function fetchWeeklyMovies(page = 1) {
  const res = await fetch(buildUrl('/trending/movie/week', { page }));
  return res.json();
}

export async function fetchUpcomingMovies(page = 1) {
  const res = await fetch(buildUrl('/movie/upcoming', { page }));
  return res.json();
}

export async function fetchMovieDetails(movieId) {
  const res = await fetch(buildUrl(`/movie/${movieId}`));
  return res.json();
}

export async function fetchMovieVideos(movieId) {
  const res = await fetch(buildUrl(`/movie/${movieId}/videos`));
  return res.json();
}

export async function searchMovies(query, year = '', page = 1) {
  const res = await fetch(
    buildUrl('/search/movie', {
      query: encodeURIComponent(query),
      year,
      page,
      include_adult: false,
    })
  );
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(buildUrl('/genre/movie/list'));
  return res.json();
}

export async function fetchMoviesBetween(
  startDate,
  endDate,
  { region = DEFAULTS.region } = {}
) {
  const res = await fetch(
    buildUrl('/discover/movie', {
      sort_by: 'popularity.desc',
      with_release_type: '2|3',
      region,
      'primary_release_date.gte': startDate,
      'primary_release_date.lte': endDate,
    })
  );
  return res.json();
}

export async function fetchTrendingWeek(page = 1) {
  const res = await fetch(buildUrl('/trending/movie/week', { page }));
  return res.json();
}

export async function fetchTrendingDay() {
  const res = await fetch(buildUrl('/trending/movie/day'));
  return res.json();
}
