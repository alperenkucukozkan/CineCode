import{a as k,b as x,c as R,s as B,d as w,f as E}from"./api-qhkpy8Db.js";import{initPagination as I,renderPagination as L}from"./pagination-Det1Vx5E.js";import{b as U}from"./vendor-B5Z-9nsW.js";const m={IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg"};let s,p=null;const v={lastSearch:{input:"",year:"",isSearch:!1},genresCache:[]};function _(e){return e?e.split("-")[0]:"—"}function T(e,r){let t=JSON.parse(localStorage.getItem("library"))||[];t.some(i=>Number(i.id)===Number(e.id))?(t=t.filter(i=>Number(i.id)!==Number(e.id)),r.textContent="Add to Library",r.classList.remove("remove-from-library"),r.classList.add("library-btn-w")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(i=>i.id)),t.push(e),r.textContent="Remove from my library",r.classList.remove("library-btn-w"),r.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(t))}function h(e){return e?(window.devicePixelRatio>1?m.IMAGE_BASE_URL_2X:m.IMAGE_BASE_URL)+e:m.IMAGE_PLACEHOLDER}function S(e){if(!e)return m.IMAGE_PLACEHOLDER;const r=m.IMAGE_BASE_URL.replace("/w500","/w300")+e,t=m.IMAGE_BASE_URL+e;return`${r} 1x, ${t} 2x`}function N(e){return e?(window.devicePixelRatio>1?m.BACKDROP_BASE_URL_2X:m.BACKDROP_BASE_URL)+e:m.IMAGE_PLACEHOLDER}function u(e,r="error"){const t=document.createElement("div");t.className=`error-message ${r}`,t.textContent=e,t.style.cssText=`
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
  `,document.body.appendChild(t),setTimeout(()=>t.remove(),5e3)}function $(e,r){if(!r)return;const t=e/2,a=Math.floor(t),i=t-a>=.5,n=5-a-(i?1:0);let l="";for(let o=0;o<a;o++)l+='<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';i&&(l+='<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let o=0;o<n;o++)l+='<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';r.innerHTML=l}function A(e){const r=document.getElementById("hero");if(!r)return;const t=e.backdrop_path?N(e.backdrop_path):h(e.poster_path),a=new Image;a.onload=function(){r.style.backgroundImage=`url(${t})`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.style.backgroundRepeat="no-repeat",r.style.backgroundAttachment="fixed",r.style.transition="background-image 0.3s ease"},a.src=t,s.heroContent.innerHTML=`
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
  `;const i=document.getElementById("hero-rating-stars");$(e.vote_average||0,i)}function C(e){if(s.moviesUl.innerHTML="",!e||e.length===0){s.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const r=document.createDocumentFragment();e.forEach(t=>{const a=O(t);r.appendChild(a)}),s.moviesUl.appendChild(r)}function O(e){const r=document.createElement("li");r.className="movie-card",r.dataset.id=e.id,r.style.cursor="pointer";let t="";e.genres&&e.genres.length>0?t=e.genres.map(l=>l.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(t=e.genre_ids.map(o=>{const c=v.genresCache.find(d=>d.id===o);return c?c.name:""}).filter(o=>o!=="").slice(0,2).join(", "));const a=_(e.release_date),i=t?`${t} | ${a}`:a;r.innerHTML=`
    <div class="movie-poster">
      <img src="${h(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${S(e.poster_path)}" />
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
  `;const n=r.querySelector(".catalog-rating-stars");return $(e.vote_average||0,n),r}function P(e,r){const t=document.createElement("div");t.className="movie-modal",t.innerHTML=`
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
  `,document.body.appendChild(t),M(t)}async function D(e){var r;try{const[t,a]=await Promise.all([E(e),w(e)]),n=((a==null?void 0:a.results)||[]).filter(d=>d.site==="YouTube"&&d.type==="Trailer"),l=n.length?n[0]:null,o=(r=t.genres)!=null&&r.length?t.genres.map(d=>d.name).join(", "):"—",c=document.createElement("div");c.className="movie-modal",c.innerHTML=`
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${h(t.poster_path)}" 
               alt="${t.title} poster"
               loading="lazy"
               srcset="${S(t.poster_path)}" />

          <div class="modal-info">
            <h2>${t.title}</h2>
            <p><strong>Release:</strong> ${_(t.release_date)}</p>
            <p><strong>Genres:</strong> ${o}</p>
            <p><strong>Rating:</strong> ${t.vote_average?t.vote_average.toFixed(1):"No rating"}</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${t.overview||"No overview available."}</p>

          ${l?`
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${l.key}"
                title="${t.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `:""}
        </div>
      </div>
    `,document.body.appendChild(c),M(c)}catch(t){console.error("Error loading movie details:",t),u("Error loading movie details.")}}function M(e){e.querySelector(".close-modal").addEventListener("click",()=>e.remove()),e.addEventListener("click",t=>{t.target===e&&e.remove()})}async function f(e=1){var r;try{s.movieListRegion.setAttribute("aria-busy","true");const t=await R(e);if(s.heroContent&&e===1){const i=(r=t.results)==null?void 0:r[0];i?A(i):s.heroContent.innerHTML=`
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
        `}const a=t.results||[];C(a),L(e,t.total_pages||1),v.lastSearch={input:"",year:"",isSearch:!1}}catch(t){console.error("Error loading trending movies:",t),u("Failed to load trending movies. Please try again later.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}async function H(e,r="",t=1){if(!e||e.trim()==="")return f();try{s.movieListRegion.setAttribute("aria-busy","true");const a=await B(e.trim(),r,t),i=a.results||[];C(i),L(t,a.total_pages||1),v.lastSearch={input:e,year:r,isSearch:!0}}catch(a){console.error("Error performing search:",a),u("Search failed. Please try again.")}finally{s.movieListRegion.removeAttribute("aria-busy")}}function G(e){v.lastSearch.isSearch?H(v.lastSearch.input,v.lastSearch.year,e):f(e),window.scrollTo({top:0,behavior:"smooth"})}async function z(e){try{const r=await w(e),a=((r==null?void 0:r.results)||[]).filter(n=>n.site==="YouTube"&&n.type==="Trailer");if(!a.length){u("No trailer available for this movie.","warning");return}const i=a[0];P(i.key,i.name||"Trailer")}catch(r){console.error("Error loading trailer:",r),u("Error loading trailer.")}}async function W(e){try{await D(e)}catch(r){console.error("Error loading movie details:",r),u("Error loading movie details.")}}function F(){p&&s.moviesUl.removeEventListener("click",p),p=async e=>{const r=e.target.closest(".movie-card");if(!r)return;const t=r.dataset.id;if(t)try{let d=function(g){g.key==="Escape"&&(c.close(),window.removeEventListener("keydown",d))};const a=await E(t),i=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",n=a.genres.map(g=>g.name).join(", "),o=(JSON.parse(localStorage.getItem("library"))||[]).some(g=>Number(g.id)===Number(a.id)),c=U.create(`
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
            <p><strong>Genre:</strong> ${n}</p>
            <h3>ABOUT</h3>
            <p>${a.overview}</p>
            <button class="${o?"remove-from-library":"library-btn-w"}">
              ${o?"Remove from my library":"Add to Library"}
            </button>
          </div>
        </div>
        `,{onShow:g=>{g.element().querySelector(".popup-close-btn").addEventListener("click",()=>g.close());const b=g.element().querySelector("button.remove-from-library, button.library-btn-w");b.addEventListener("click",()=>T(a,b))}});c.show(),window.addEventListener("keydown",d)}catch(a){console.error("Popup açılırken hata:",a)}},s.moviesUl.addEventListener("click",p),document.addEventListener("click",async e=>{const r=e.target.closest(".trailer-btn");if(r){const a=r.dataset.id;a&&await z(a);return}const t=e.target.closest(".details-btn");if(t){const a=t.dataset.id;a&&await W(a)}})}async function y(){var e;try{s={moviesUl:document.getElementById("movies-ul"),heroContent:document.getElementById("hero-content"),movieListRegion:document.getElementById("movie-list")},F(),I(G);const r=await k();if(v.genresCache=r.genres||[],s.heroContent){const a=(e=(await x()).results)==null?void 0:e[0];a&&A(a)}await f(1)}catch(r){console.error("Error initializing app:",r),u("Failed to initialize application.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y();
//# sourceMappingURL=catalog-CGMXmL0J.js.map
