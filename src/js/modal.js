// API'den film detaylarını alma
import { fetchMovieDetails } from '../api/api.js';

// Local Storage için kullanılacak anahtar ismi
const LOCAL_STORAGE_KEY = 'myLibraryMovies_v1';

// TMDB API'den gelen görsellerin temel URL'si
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Oy veya popülerlik değerlerini yuvarlama fonk
const roundOneDecimal = value => {
  const n = Number(value);
  if (Number.isNaN(n)) return 0.0;
  return Math.round(n * 10) / 10;
};

// Local Storage'dan kayıtlı veriyi okuma fonk
const readLibraryFromStorage = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return {}; // Eğer veri yoksa boş obje döner
    return JSON.parse(raw);
  } catch (error) {
    console.error('Local Storage okuma hatası:', error);
    return {};
  }
};

// Local Storage'a yeni film ekleme fonk
const writeLibraryToStorage = obj => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
  } catch (error) {
    console.error('Local Storage ekleme hatası:', error);
  }
};

// Bir film kütüphanede var mı kontrol eden fonk (id üzerinden)
const isInLibrary = movieId => {
  const lib = readLibraryFromStorage();
  return Boolean(lib[movieId]);
};

// Yeni bir filmi kütüphaneye ekleme fonk
const addToLibrary = movieObj => {
  if (!movieObj || !movieObj.id) return;
  const lib = readLibraryFromStorage();
  lib[movieObj.id] = movieObj;
  writeLibraryToStorage(lib);
};

// filmi kütüphaneden kaldırma fonk
const removeFromLibrary = movieId => {
  const lib = readLibraryFromStorage();
  if (lib[movieId]) {
    delete lib[movieId];
    writeLibraryToStorage(lib);
  }
};

// Film posteri için URL oluşturma
const buildImageUrl = path => {
  if (!path) return '';
  return `${IMAGE_BASE}${path}`;
};

// DOM ELEMANLARINI SEÇME

const modalEl = document.querySelector('.modal');
const closeBtnEl = modalEl.querySelector('.close-icon');
const posterImgEl = modalEl.querySelector('.modal-img');
const titleEl = modalEl.querySelector('.movie-title');
const votesPuanEl = modalEl.querySelector('.votes-puanlama');
const votesCountEl = modalEl.querySelector('.votes-oysayisi');
const popularityEl = modalEl.querySelector('.popularity-value');
const genreEl = modalEl.querySelector('.genre-value');
const aboutEl = modalEl.querySelector('.about-value');
const libraryBtn = modalEl.querySelector('.modal-add-button');

//  Modal Aç/Kapat İşlemleri

let escHandler = null;
let backdropHandler = null;
let currentMovieData = null; // Şu anda açık olan filmin detayları

// Modal açma fonksiyonu
export const openModal = () => {
  if (!modalEl) return;
  modalEl.classList.add('is-open');
  modalEl.setAttribute('aria-hidden', 'false');

  // ESC tuşuna basıldığında modal kapansın
  escHandler = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  document.addEventListener('keydown', escHandler);

  // modal dışında bir yere tıklanırsa modal kapansın
  backdropHandler = e => {
    if (e.target === modalEl) {
      closeModal();
    }
  };
  modalEl.addEventListener('click', backdropHandler);
};

// Modal kapama fonk
export const closeModal = () => {
  if (!modalEl) return;
  modalEl.classList.remove('is-open');
  modalEl.setAttribute('aria-hidden', 'true');
  currentMovieData = null;

  // ESC ve tıklama eventlerini temizleme
  if (escHandler) document.removeEventListener('keydown', escHandler);
  if (backdropHandler) modalEl.removeEventListener('click', backdropHandler);
};

// Kapatma ikonuna tıklanırsa modal kapanır
if (closeBtnEl) {
  closeBtnEl.addEventListener('click', e => {
    e.stopPropagation();
    closeModal();
  });
}

// --------------------Modal İçeriğini Güncelleme-------------------

// Kütüphaneye ekleme/kaldırma butonunun metnini güncelleme
const updateLibraryButton = movieId => {
  if (!libraryBtn) return;
  const inLib = isInLibrary(movieId);
  libraryBtn.textContent = inLib
    ? 'Remove from my Library'
    : 'Add to my Library';
  libraryBtn.dataset.inLibrary = inLib ? 'true' : 'false';
  libraryBtn.dataset.movieId = movieId;
};

// Ana render fonksiyonu — film bilgilerini modal içine yerleştirme
export const renderMovieInModal = movie => {
  if (!movie) return;
  currentMovieData = movie;

  // Poster alanı
  const posterPath = movie.poster_path || movie.backdrop_path || '';
  const posterUrl = buildImageUrl(posterPath);
  if (posterImgEl) {
    if (posterUrl) {
      posterImgEl.src = posterUrl;
      posterImgEl.alt = movie.title || movie.name || 'Movie Poster';
    } else {
      posterImgEl.src = '';
      posterImgEl.alt = 'Poster not available';
    }
  }

  //  Film başlığı
  if (titleEl) titleEl.textContent = movie.title || movie.name || 'No title';

  //  Oy ortalaması
  if (votesPuanEl) {
    const rounded = roundOneDecimal(movie.vote_average ?? 0);
    votesPuanEl.textContent = rounded.toFixed(1);
  }

  //  Toplam oy sayısı
  if (votesCountEl) votesCountEl.textContent = movie.vote_count ?? 0;

  //  Popülerlik değeri
  if (popularityEl) {
    const roundedPop = roundOneDecimal(movie.popularity ?? 0);
    popularityEl.textContent = roundedPop.toFixed(1);
  }

  //  Tür bilgisi
  if (genreEl) {
    let genreText = '-';
    if (Array.isArray(movie.genres) && movie.genres.length > 0) {
      genreText = movie.genres
        .map(g => g.name)
        .slice(0, 3)
        .join(', ');
    } else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      genreText = movie.genre_ids.join(', ');
    }
    genreEl.textContent = genreText;
  }

  // Film özeti (about)
  if (aboutEl) {
    aboutEl.textContent =
      movie.overview || movie.description || 'No description available.';
  }

  // Library butonunu güncelle
  updateLibraryButton(movie.id);
};

// Library Buton Tıklaması

if (libraryBtn) {
  libraryBtn.addEventListener('click', async e => {
    e.preventDefault();

    const movieId =
      libraryBtn.dataset.movieId || (currentMovieData && currentMovieData.id);
    if (!movieId) return;

    const inLib = isInLibrary(movieId);

    // Eğer film zaten kütüphanedeyse kaldır
    if (inLib) {
      removeFromLibrary(movieId);
      updateLibraryButton(movieId);
      return;
    }

    // Eğer film detayları eksikse API'den çek
    let movie = currentMovieData;
    if (!movie || String(movieId) !== String(movie.id)) {
      try {
        movie = await fetchMovieDetails(movieId);
      } catch (error) {
        console.error('fetchMovieDetails fonksiyonu hatası:', error);
        return;
      }
    }

    // Kaydedilecek film objesini hazırlama
    const toStore = {
      id: movie.id,
      title: movie.title || movie.name || '',
      poster_path: movie.poster_path || '',
      vote_average: movie.vote_average ?? 0,
      vote_count: movie.vote_count ?? 0,
      popularity: movie.popularity ?? 0,
      genres: movie.genres ?? movie.genre_ids ?? [],
      overview: movie.overview || '',
      savedAt: new Date().toISOString(),
    };

    // Local Storage’a ekle ve butonu güncelle
    addToLibrary(toStore);
    updateLibraryButton(movieId);
  });
}
