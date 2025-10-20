const API_KEY = 'c0fe092c4149192005601ffec65036a5';
const BASE_URL = 'https://api.themoviedb.org/3';

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