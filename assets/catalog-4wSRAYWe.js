import{c as A,d as S,e as C,s as R,b as v,a as k}from"./api-W8kOuucx.js";import{initPagination as x,renderPagination as p}from"./pagination-Det1Vx5E.js";import{renderMovieInModal as b,openModal as y}from"./modal-BuyBL24I.js";const o={IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg"};let n,g=null;const c={lastSearch:{input:"",year:"",isSearch:!1},genresCache:[]};function U(e){return e?e.split("-")[0]:"—"}function E(e){return e?(window.devicePixelRatio>1?o.IMAGE_BASE_URL_2X:o.IMAGE_BASE_URL)+e:o.IMAGE_PLACEHOLDER}function B(e){if(!e)return o.IMAGE_PLACEHOLDER;const t=o.IMAGE_BASE_URL.replace("/w500","/w300")+e,r=o.IMAGE_BASE_URL+e;return`${t} 1x, ${r} 2x`}function I(e){return e?(window.devicePixelRatio>1?o.BACKDROP_BASE_URL_2X:o.BACKDROP_BASE_URL)+e:o.IMAGE_PLACEHOLDER}function d(e,t="error"){const r=document.createElement("div");r.className=`error-message ${t}`,r.textContent=e,r.style.cssText=`
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
  `,document.body.appendChild(r),setTimeout(()=>r.remove(),5e3)}function _(e,t){if(!t)return;const r=e/2,a=Math.floor(r),i=r-a>=.5,u=5-a-(i?1:0);let l="";for(let s=0;s<a;s++)l+='<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';i&&(l+='<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let s=0;s<u;s++)l+='<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';t.innerHTML=l}function w(e){const t=document.getElementById("hero");if(!t)return;const r=e.backdrop_path?I(e.backdrop_path):E(e.poster_path),a=new Image;a.onload=function(){t.style.backgroundImage=`url(${r})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",t.style.backgroundAttachment="fixed",t.style.transition="background-image 0.3s ease"},a.src=r,n.heroContent.innerHTML=`
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
  `;const i=document.getElementById("hero-rating-stars");_(e.vote_average||0,i)}function L(e){if(n.moviesUl.innerHTML="",!e||e.length===0){n.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const t=document.createDocumentFragment();e.forEach(r=>{const a=T(r);t.appendChild(a)}),n.moviesUl.appendChild(t)}function T(e){const t=document.createElement("li");t.className="movie-card",t.dataset.id=e.id,t.style.cursor="pointer";let r="";e.genres&&e.genres.length>0?r=e.genres.map(l=>l.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(r=e.genre_ids.map(s=>{const m=c.genresCache.find(M=>M.id===s);return m?m.name:""}).filter(s=>s!=="").slice(0,2).join(", "));const a=U(e.release_date),i=r?`${r} | ${a}`:a;t.innerHTML=`
    <div class="movie-poster">
      <img src="${E(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${B(e.poster_path)}" />
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
  `;const u=t.querySelector(".catalog-rating-stars");return _(e.vote_average||0,u),t}async function f(e=1){var t;try{n.movieListRegion.setAttribute("aria-busy","true");const r=await C(e);if(n.heroContent&&e===1){const i=(t=r.results)==null?void 0:t[0];i?w(i):n.heroContent.innerHTML=`
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
        `}const a=r.results||[];L(a),p(e,r.total_pages||1),c.lastSearch={input:"",year:"",isSearch:!1}}catch(r){console.error("Error loading trending movies:",r),d("Failed to load trending movies. Please try again later.")}finally{n.movieListRegion.removeAttribute("aria-busy")}}async function $(e,t="",r=1){if(!e||e.trim()==="")return f();try{n.movieListRegion.setAttribute("aria-busy","true");const a=await R(e.trim(),t,r),i=a.results||[];L(i),p(r,a.total_pages||1),c.lastSearch={input:e,year:t,isSearch:!0}}catch(a){console.error("Error performing search:",a),d("Search failed. Please try again.")}finally{n.movieListRegion.removeAttribute("aria-busy")}}function D(e){c.lastSearch.isSearch?$(c.lastSearch.input,c.lastSearch.year,e):f(e),window.scrollTo({top:0,behavior:"smooth"})}async function O(e){try{const t=await v(e);b(t),y()}catch(t){console.error(t),d("Movie details could not be loaded.")}}async function H(e){var t;try{const a=(t=(await k(e)).results)==null?void 0:t.find(i=>i.type==="Trailer"&&i.site==="YouTube");a?window.open(`https://www.youtube.com/watch?v=${a.key}`,"_blank"):d("Trailer not available.")}catch(r){console.error(r),d("Error fetching trailer.")}}function P(){g&&n.moviesUl.removeEventListener("click",g),g=async e=>{const t=e.target.closest(".movie-card");if(!t)return;const r=t.dataset.id;if(r)try{const a=await v(r);b(a),y()}catch(a){console.error("Modal açılırken hata:",a),d("Film detayları yüklenemedi.")}},n.moviesUl.addEventListener("click",g),document.addEventListener("click",async e=>{const t=e.target.closest(".trailer-btn");if(t)return H(t.dataset.id);const r=e.target.closest(".details-btn");if(r)return O(r.dataset.id)})}async function h(){var e;try{n={moviesUl:document.getElementById("movies-ul"),heroContent:document.getElementById("hero-content"),movieListRegion:document.getElementById("movie-list")},P(),x(D);const t=await A();if(c.genresCache=t.genres||[],n.heroContent){const a=(e=(await S()).results)==null?void 0:e[0];a&&w(a)}await f(1)}catch(t){console.error("Error initializing app:",t),d("Failed to initialize application.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h();
//# sourceMappingURL=catalog-4wSRAYWe.js.map
