import{c as S,d as A,e as x,s as C,b as k}from"./api-W8kOuucx.js";import{initPagination as M,renderPagination as y}from"./pagination-Det1Vx5E.js";import{b as R}from"./vendor-B5Z-9nsW.js";const l={IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg"};let s,v=null;const d={lastSearch:{input:"",year:"",isSearch:!1},genresCache:[]};function I(e){return e?e.split("-")[0]:"—"}function $(e,t){let r=JSON.parse(localStorage.getItem("library"))||[];r.some(i=>Number(i.id)===Number(e.id))?(r=r.filter(i=>Number(i.id)!==Number(e.id)),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(i=>i.id)),r.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(r))}function E(e){return e?(window.devicePixelRatio>1?l.IMAGE_BASE_URL_2X:l.IMAGE_BASE_URL)+e:l.IMAGE_PLACEHOLDER}function B(e){if(!e)return l.IMAGE_PLACEHOLDER;const t=l.IMAGE_BASE_URL.replace("/w500","/w300")+e,r=l.IMAGE_BASE_URL+e;return`${t} 1x, ${r} 2x`}function U(e){return e?(window.devicePixelRatio>1?l.BACKDROP_BASE_URL_2X:l.BACKDROP_BASE_URL)+e:l.IMAGE_PLACEHOLDER}function f(e,t="error"){const r=document.createElement("div");r.className=`error-message ${t}`,r.textContent=e,r.style.cssText=`
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
  `,document.body.appendChild(r),setTimeout(()=>r.remove(),5e3)}function L(e,t){if(!t)return;const r=e/2,a=Math.floor(r),i=r-a>=.5,g=5-a-(i?1:0);let c="";for(let n=0;n<a;n++)c+='<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';i&&(c+='<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let n=0;n<g;n++)c+='<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';t.innerHTML=c}function _(e){const t=document.getElementById("hero");if(!t)return;const r=e.backdrop_path?U(e.backdrop_path):E(e.poster_path),a=new Image;a.onload=function(){t.style.backgroundImage=`url(${r})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",t.style.backgroundAttachment="fixed",t.style.transition="background-image 0.3s ease"},a.src=r,s.heroContent.innerHTML=`
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
  `;const i=document.getElementById("hero-rating-stars");L(e.vote_average||0,i)}function w(e){if(s.moviesUl.innerHTML="",!e||e.length===0){s.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const t=document.createDocumentFragment();e.forEach(r=>{const a=O(r);t.appendChild(a)}),s.moviesUl.appendChild(t)}function O(e){const t=document.createElement("li");t.className="movie-card",t.dataset.id=e.id,t.style.cursor="pointer";let r="";e.genres&&e.genres.length>0?r=e.genres.map(c=>c.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(r=e.genre_ids.map(n=>{const m=d.genresCache.find(u=>u.id===n);return m?m.name:""}).filter(n=>n!=="").slice(0,2).join(", "));const a=I(e.release_date),i=r?`${r} | ${a}`:a;t.innerHTML=`
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
  `;const g=t.querySelector(".catalog-rating-stars");return L(e.vote_average||0,g),t}async function p(e=1){var t;try{s.movieListRegion.setAttribute("aria-busy","true");const r=await x(e);if(s.heroContent&&e===1){const i=(t=r.results)==null?void 0:t[0];i?_(i):s.heroContent.innerHTML=`
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
        `}const a=r.results||[];w(a),y(e,r.total_pages||1),d.lastSearch={input:"",year:"",isSearch:!1}}catch(r){console.error("Error loading trending movies:",r),f("Failed to load trending movies. Please try again later.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}async function D(e,t="",r=1){if(!e||e.trim()==="")return p();try{s.movieListRegion.setAttribute("aria-busy","true");const a=await C(e.trim(),t,r),i=a.results||[];w(i),y(r,a.total_pages||1),d.lastSearch={input:e,year:t,isSearch:!0}}catch(a){console.error("Error performing search:",a),f("Search failed. Please try again.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}function T(e){d.lastSearch.isSearch?D(d.lastSearch.input,d.lastSearch.year,e):p(e),window.scrollTo({top:0,behavior:"smooth"})}function N(){v&&s.moviesUl.removeEventListener("click",v),v=async e=>{const t=e.target.closest(".movie-card");if(!t)return;const r=t.dataset.id;if(r)try{let u=function(o){o.key==="Escape"&&(m.close(),window.removeEventListener("keydown",u))};const a=await k(r),i=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",g=a.genres.map(o=>o.name).join(", "),n=(JSON.parse(localStorage.getItem("library"))||[]).some(o=>Number(o.id)===Number(a.id)),m=R.create(`
        <div class="weekly-movie-modal">
          <button class="popup-close-btn" aria-label="Close">
            <svg class="icon-close" width="24" height="24">
              <use xlink:href="../../img/icon.svg#icon-close"></use>
            </svg>
          </button>
          <img src="${i}" class="modal-poster" alt="${a.title}">
          <div class="modal-details">
            <h2>${a.title}</h2>
            <p><strong>Vote / Votes:</strong> ${a.vote_average} / ${a.vote_count}</p>
            <p><strong>Popularity:</strong> ${a.popularity}</p>
            <p><strong>Genre:</strong> ${g}</p>
            <h3>ABOUT</h3>
            <p>${a.overview}</p>
            <button class="${n?"remove-from-library":"library-btn-w"}">
              ${n?"Remove from my library":"Add to Library"}
            </button>
          </div>
        </div>
        `,{onShow:o=>{o.element().querySelector(".popup-close-btn").addEventListener("click",()=>o.close());const h=o.element().querySelector("button.remove-from-library, button.library-btn-w");h.addEventListener("click",()=>$(a,h))}});m.show(),window.addEventListener("keydown",u)}catch(a){console.error("Popup açılırken hata:",a)}},s.moviesUl.addEventListener("click",v),document.addEventListener("click",async e=>{const t=e.target.closest(".trailer-btn");if(t){const a=t.dataset.id;a&&await handleTrailerClick(a);return}const r=e.target.closest(".details-btn");if(r){const a=r.dataset.id;a&&await handleDetailsClick(a)}})}async function b(){var e;try{s={moviesUl:document.getElementById("movies-ul"),heroContent:document.getElementById("hero-content"),movieListRegion:document.getElementById("movie-list")},N(),M(T);const t=await S();if(d.genresCache=t.genres||[],s.heroContent){const a=(e=(await A()).results)==null?void 0:e[0];a&&_(a)}await p(1)}catch(t){console.error("Error initializing app:",t),f("Failed to initialize application.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",b):b();
//# sourceMappingURL=catalog-DcJHQ-fI.js.map
