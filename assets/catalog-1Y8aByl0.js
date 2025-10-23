import{a as S,b as A,c as C,s as R,d as p,f as $}from"./api-qhkpy8Db.js";import{initPagination as x,renderPagination as b}from"./pagination-Det1Vx5E.js";const c={IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg"};let s;const g={lastSearch:{input:"",year:"",isSearch:!1},genresCache:[]};function y(e){return e?e.split("-")[0]:"—"}function u(e){return e?(window.devicePixelRatio>1?c.IMAGE_BASE_URL_2X:c.IMAGE_BASE_URL)+e:c.IMAGE_PLACEHOLDER}function E(e){if(!e)return c.IMAGE_PLACEHOLDER;const r=c.IMAGE_BASE_URL.replace("/w500","/w300")+e,t=c.IMAGE_BASE_URL+e;return`${r} 1x, ${t} 2x`}function T(e){return e?(window.devicePixelRatio>1?c.BACKDROP_BASE_URL_2X:c.BACKDROP_BASE_URL)+e:c.IMAGE_PLACEHOLDER}function m(e,r="error"){const t=document.createElement("div");t.className=`error-message ${r}`,t.textContent=e,t.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 500;
  `,document.body.appendChild(t),setTimeout(()=>t.remove(),5e3)}function w(e,r){if(!r)return;const t=e/2,a=Math.floor(t),i=t-a>=.5,l=5-a-(i?1:0);let o="";for(let n=0;n<a;n++)o+='<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';i&&(o+='<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let n=0;n<l;n++)o+='<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';r.innerHTML=o}function _(e){const r=document.getElementById("hero");if(!r)return;const t=e.backdrop_path?T(e.backdrop_path):u(e.poster_path),a=new Image;a.onload=function(){r.style.backgroundImage=`url(${t})`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.style.backgroundRepeat="no-repeat",r.style.backgroundAttachment="fixed",r.style.transition="background-image 0.3s ease"},a.src=t,s.heroContent.innerHTML=`
    <div class="hero-info">
      <h2 class="hero-title">${e.title}</h2>
      <div class="rating-stars" id="hero-rating-stars"></div>
      <p class="hero-overview">${e.overview||"No overview available."}</p>
      <div class="hero-actions">
        <button class="btn trailer-btn" data-id="${e.id}" aria-label="Trailer for ${e.title}">
          Watch trailer
        </button>
        <button class="btn details-btn" data-id="${e.id}" aria-label="More details for ${e.title}">
          More details
        </button>
      </div>
    </div>
  `;const i=document.getElementById("hero-rating-stars");w(e.vote_average||0,i)}function L(e){if(s.moviesUl.innerHTML="",!e||e.length===0){s.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const r=document.createDocumentFragment();e.forEach(t=>{const a=k(t);r.appendChild(a)}),s.moviesUl.appendChild(r)}function k(e){const r=document.createElement("li");r.className="movie-card";let t="";e.genres&&e.genres.length>0?t=e.genres.map(o=>o.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(t=e.genre_ids.map(n=>{const d=g.genresCache.find(v=>v.id===n);return d?d.name:""}).filter(n=>n!=="").slice(0,2).join(", "));const a=y(e.release_date),i=t?`${t} | ${a}`:a;r.innerHTML=`
    <div class="movie-poster">
      <img src="${u(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${E(e.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${e.title}</div>
        <div class="movie-meta">${i}</div>
      </div>
      <div class="movie-info-right">
        <div class="catalog-rating-stars"></div>
      </div>
    </div>
  `;const l=r.querySelector(".catalog-rating-stars");return w(e.vote_average||0,l),r}function B(e,r){const t=document.createElement("div");t.className="movie-modal",t.innerHTML=`
    <div class="modal-content">
      <span class="close-modal" aria-label="Close modal">&times;</span>
      <div class="trailer-container">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${e}?autoplay=1"
          title="${r} trailer"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `,document.body.appendChild(t),M(t)}async function U(e){var r;try{const[t,a]=await Promise.all([$(e),p(e)]),l=((a==null?void 0:a.results)||[]).filter(v=>v.site==="YouTube"&&v.type==="Trailer"),o=l.length?l[0]:null,n=(r=t.genres)!=null&&r.length?t.genres.map(v=>v.name).join(", "):"—",d=document.createElement("div");d.className="movie-modal",d.innerHTML=`
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${u(t.poster_path)}" 
               alt="${t.title} poster"
               loading="lazy"
               srcset="${E(t.poster_path)}" />

          <div class="modal-info">
            <h2>${t.title}</h2>
            <p><strong>Release:</strong> ${y(t.release_date)}</p>
            <p><strong>Genres:</strong> ${n}</p>
            <p><strong>Rating:</strong> ${t.vote_average?t.vote_average.toFixed(1):"No rating"}</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${t.overview||"No overview available."}</p>

          ${o?`
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${o.key}"
                title="${t.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `:""}
        </div>
      </div>
    `,document.body.appendChild(d),M(d)}catch(t){console.error("Error loading movie details:",t),m("Error loading movie details.")}}function M(e){e.querySelector(".close-modal").addEventListener("click",()=>e.remove()),e.addEventListener("click",t=>{t.target===e&&e.remove()})}async function f(e=1){var r;try{s.movieListRegion.setAttribute("aria-busy","true");const t=await C(e);if(s.heroContent&&e===1){const i=(r=t.results)==null?void 0:r[0];i?_(i):s.heroContent.innerHTML=`
          <div class="hero-fall-back" style="
            text-align: center; 
            padding: 4rem 2rem; 
            background: rgba(0, 0, 0, 0.8); 
            color: #ffffff; 
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          ">
            <div style="font-size: 1.5rem; font-weight: 400; margin-bottom: 0.5rem;">OOPS...</div>
            <div style="font-size: 1.2rem; font-weight: 400; margin-bottom: 0.5rem;">We are very sorry!</div>
            <div style="font-size: 1rem; font-weight: 300; opacity: 0.9;">We don't have any results matching your search.</div>
          </div>
        `}const a=t.results||[];L(a),b(e,t.total_pages||1),g.lastSearch={input:"",year:"",isSearch:!1}}catch(t){console.error("Error loading trending movies:",t),m("Failed to load trending movies. Please try again later.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}async function I(e,r="",t=1){if(!e||e.trim()==="")return f();try{s.movieListRegion.setAttribute("aria-busy","true");const a=await R(e.trim(),r,t),i=a.results||[];L(i),b(t,a.total_pages||1),g.lastSearch={input:e,year:r,isSearch:!0}}catch(a){console.error("Error performing search:",a),m("Search failed. Please try again.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}function D(e){g.lastSearch.isSearch?I(g.lastSearch.input,g.lastSearch.year,e):f(e),window.scrollTo({top:0,behavior:"smooth"})}async function O(e){try{const r=await p(e),a=((r==null?void 0:r.results)||[]).filter(l=>l.site==="YouTube"&&l.type==="Trailer");if(!a.length){m("No trailer available for this movie.","warning");return}const i=a[0];B(i.key,i.name||"Trailer")}catch(r){console.error("Error loading trailer:",r),m("Error loading trailer.")}}async function H(e){try{await U(e)}catch(r){console.error("Error loading movie details:",r),m("Error loading movie details.")}}function P(){document.addEventListener("click",async e=>{const r=e.target.closest(".trailer-btn");if(r){const a=r.dataset.id;a&&await O(a);return}const t=e.target.closest(".details-btn");if(t){const a=t.dataset.id;a&&await H(a)}})}async function h(){var e;try{s={moviesUl:document.getElementById("movies-ul"),heroContent:document.getElementById("hero-content"),movieListRegion:document.getElementById("movie-list")},P(),x(D);const r=await S();if(g.genresCache=r.genres||[],s.heroContent){const a=(e=(await A()).results)==null?void 0:e[0];a&&_(a)}await f(1)}catch(r){console.error("Error initializing app:",r),m("Failed to initialize application.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h();
//# sourceMappingURL=catalog-1Y8aByl0.js.map
