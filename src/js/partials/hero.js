
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzRkODljNTVlZDMxNTRhMmEwNTc2Y2M4ZDNkYjlhYiIsIm5iZiI6MTc2MDgwNDg3NC4zMiwic3ViIjoiNjhmM2MwMGE2Y2Y4MGI4ZGYxODljNzgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.R-RB4BAUuMot_a9me2xF8v0UdKMNBpzNhYKYYCf30vE'; // dikkat: prod için env kullan
const BASE_URL = 'https://api.themoviedb.org/3';

const defaultHeaders = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8',
};

// DOM elemanlarını kesin olarak tanımla (titleE1 gibi yazım hatalarından kaçın)
const heroContent = document.querySelector('.hero-content');
const titleEl = document.querySelector('.hero-title');
const ratingEl = document.querySelector('.hero-rating');
const descEl = document.querySelector('.hero-description');
const watchBtn = document.querySelector('.hero-button-watch');
const detailsBtn = document.querySelector('.hero-button-more-details');
const trailerModal = document.querySelector('.trailer-modal');
const trailerOverlay = document.querySelector('.trailer-overlay');
const trailerClose = document.querySelector('.trailer-close');
const trailerIframe = document.querySelector('.trailer-iframe');
const trailerWrapper = document.querySelector('.trailer-wrapper');

const originalWrapperHTML = trailerWrapper ? trailerWrapper.innerHTML : null;

function showNoTrailerModal() {
  if (!trailerModal || !trailerWrapper) return;


  if (trailerIframe) trailerIframe.src = '';

  trailerWrapper.innerHTML = `
    <div class="no-trailer-content" style="display:flex;gap:28px;align-items:center;padding:28px;color:#fff;">
      <img src="./images/opps.png" alt="OOPS" style="width:260px;max-width:40%;height:auto;object-fit:contain;border-radius:8px;box-shadow:0 8px 30px rgba(105, 61, 3, 0.6);" />
      <div style="max-width:60%">
        <h2 style="margin:0 0 12px;font-size:28px;">OOPS...</h2>
        <p style="margin:0;font-size:18px;line-height:1.4;">
          We are very sorry!<br />
          But we couldn't find the trailer.
        </p>
      </div>
    </div>
  `;

  trailerModal.removeAttribute('hidden');
  requestAnimationFrame(() => trailerModal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  trailerClose?.focus();
}

function restoreTrailerWrapper() {
  if (!trailerWrapper) return;
  if (originalWrapperHTML !== null) {
    trailerWrapper.innerHTML = originalWrapperHTML;   
    trailerIframe = document.querySelector('.trailer-iframe');
  }
}

function openTrailer(videoKey) {
  if (!trailerModal || !trailerIframe) return;
  // embed URL: autoplay, no related videos, modest branding
  const embed = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`;
  trailerIframe.src = embed;
  trailerModal.removeAttribute('hidden');
  // allow CSS transition by toggling class
  requestAnimationFrame(() => trailerModal.classList.add('open'));
  // prevent body scroll while modal open
  document.body.style.overflow = 'hidden';
  // focus management
  trailerClose?.focus();
}

function closeTrailer() {
  if (!trailerModal) return;
  trailerModal.classList.remove('open');
  setTimeout(() => {
    trailerModal.setAttribute('hidden', '');
    // restore original wrapper (ve iframe) — böylece sonraki açış normal çalışır
    restoreTrailerWrapper();
    document.body.style.overflow = '';
  }, 200);
}

// overlay and close button handlers
trailerOverlay?.addEventListener('click', closeTrailer);
trailerClose?.addEventListener('click', closeTrailer);

// close on ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeTrailer();
});

function truncate(text, max = 220) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

async function fetchTrending() {
  const url = `${BASE_URL}/trending/movie/day?language=en-US`;
  const res = await fetch(url, { headers: defaultHeaders });
  if (!res.ok) {
    if (res.status === 401) {
      console.error('Unauthorized (401). Check your TMDB token.');
    } else {
      console.error('Trending fetch failed', res.status, await res.text());
    }
    throw new Error('Failed to fetch trending movies');
  }
  const data = await res.json();
  return data.results || [];
}

function pickRandom(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function setHeroBackground(path) {
  const imageUrl = path
    ? `https://image.tmdb.org/t/p/original/${path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';
  if (heroContent) {    
    heroContent.style.backgroundImage = `linear-gradient(to right, #111111 30%, rgba(40,40,40,0.0) 90%), url("${imageUrl}")`;
    heroContent.style.backgroundSize = 'cover';
    heroContent.style.backgroundPosition = '70% center';
    heroContent.style.backgroundRepeat = 'no-repeat';
  }
}

function renderHero(movie) {
  if (!movie) return;
  if (titleEl) titleEl.textContent = movie.title || movie.name || 'Untitled';
  if (ratingEl) ratingEl.textContent = `⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : '—'}`;
  if (descEl) descEl.textContent = truncate(movie.overview || 'No description available.', 155);
  setHeroBackground(movie.backdrop_path || movie.poster_path);
 
  // Watch trailer

async function fetchVideosForMovie(movieId) {
  const urls = [
    `${BASE_URL}/movie/${movieId}/videos`, 
    `${BASE_URL}/movie/${movieId}/videos?language=en-US`, 
    `${BASE_URL}/movie/${movieId}/videos?language=tr-TR`, 
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: defaultHeaders });
      if (!res.ok) {
        console.debug('videos fetch failed', res.status, url, await res.text());
        continue;
      }
      const data = await res.json();
      console.debug('videos fetched from', url, data);
      if (data && Array.isArray(data.results) && data.results.length) {
        return data.results;
      }
    } catch (err) {
      console.debug('videos fetch error', err, url);
    }
  }
  return [];
}

    if (watchBtn) {
  watchBtn.onclick = async () => {
    try {
      const videos = await fetchVideosForMovie(movie.id);
      if (!videos.length) {
        
        const q = encodeURIComponent((movie.title || movie.name || '') + ' trailer');
        window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank');
        return;
      }

      
      const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
        || videos.find(v => v.site === 'YouTube')
        || videos[0];

      if (trailer && trailer.site === 'YouTube' && trailer.key) {
        openTrailer(trailer.key);
      } else {
        
        console.debug('No YouTube trailer found in videos:', videos);
        const q = encodeURIComponent((movie.title || movie.name || '') + ' trailer');
        window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank');
      }
    } catch (err) {
      console.error(err);
      alert('Trailer açılamıyor');
    }
  };
}

  // More details
  if (detailsBtn) {
    detailsBtn.onclick = () => {
      window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
    };
  }
}

(async function initHero() {
  try {
    const movies = await fetchTrending();
    if (!movies.length) {
      if (titleEl) titleEl.textContent = 'Bugün için içerik yok';
      if (descEl) descEl.textContent = '';
      return;
    }
    const movie = pickRandom(movies);
    renderHero(movie);
  } catch (err) {
    console.error(err);
    if (titleEl) titleEl.textContent = 'Veri yüklenemedi';
    if (descEl) descEl.textContent = '';
  }
})();
