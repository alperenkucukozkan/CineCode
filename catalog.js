(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const l={API_KEY:"0c52aafa16e24577e4a48f6286d3f101",BASE_URL:"https://api.themoviedb.org/3",IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg",DEFAULT_LANGUAGE:"en-US",PAGINATION_MAX_BUTTONS:5,YEAR_SELECT_START:1980},s={moviesUl:document.getElementById("movies-ul"),paginationUl:document.getElementById("pagination-ul"),heroContent:document.getElementById("hero-content"),searchForm:document.getElementById("search-form"),searchInput:document.getElementById("search-input"),clearBtn:document.getElementById("clear-btn"),yearSelect:document.getElementById("year-select"),movieListRegion:document.getElementById("movie-list")},d={lastSearch:{input:"",year:"",isSearch:!1},currentPage:1,totalPages:1,genresCache:[]};function m(e,t={}){const n=new URL(`${l.BASE_URL}${e}`);return n.searchParams.set("api_key",l.API_KEY),Object.keys(t).forEach(a=>{const r=t[a];r!==""&&r!==null&&r!==void 0&&n.searchParams.set(a,r)}),n.toString()}function y(e){return e?e.split("-")[0]:"—"}function v(e){return e?(window.devicePixelRatio>1?l.IMAGE_BASE_URL_2X:l.IMAGE_BASE_URL)+e:l.IMAGE_PLACEHOLDER}function b(e){if(!e)return l.IMAGE_PLACEHOLDER;const t=l.IMAGE_BASE_URL.replace("/w500","/w300")+e,n=l.IMAGE_BASE_URL+e;return`${t} 1x, ${n} 2x`}function M(e){return e?(window.devicePixelRatio>1?l.BACKDROP_BASE_URL_2X:l.BACKDROP_BASE_URL)+e:l.IMAGE_PLACEHOLDER}function E(){const e=document.getElementById("loading-indicator");e&&(e.style.display="flex",e.setAttribute("aria-hidden","false"))}function L(){const e=document.getElementById("loading-indicator");e&&(e.style.display="none",e.setAttribute("aria-hidden","true"))}function u(e,t="error"){const n=document.createElement("div");n.className=`error-message ${t}`,n.textContent=e,n.style.cssText=`
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
  `,document.body.appendChild(n),setTimeout(()=>n.remove(),5e3)}async function U(){const e=m("/trending/movie/day");return(await axios.get(e)).data}async function T(e=1){const t=m("/trending/movie/week",{page:e});return(await axios.get(t)).data}async function I(e){const t=m(`/movie/${e}`,{language:l.DEFAULT_LANGUAGE});return(await axios.get(t)).data}async function R(){const e=m("/genre/movie/list",{language:l.DEFAULT_LANGUAGE});return(await axios.get(e)).data.genres}async function A(e){var t;try{const n=m(`/movie/${e}/videos`,{language:l.DEFAULT_LANGUAGE});return(((t=(await axios.get(n)).data)==null?void 0:t.results)||[]).filter(i=>i.site==="YouTube"&&i.type==="Trailer")}catch(n){return console.error("Error fetching movie videos:",n),[]}}async function $(e,t="",n=1){const a=m("/search/movie",{query:e,year:t,page:n,include_adult:!1,language:l.DEFAULT_LANGUAGE});return(await axios.get(a)).data}function S(e,t){if(!t)return;const n=e/2,a=Math.floor(n),r=n-a>=.5,i=5-a-(r?1:0);let o="";for(let c=0;c<a;c++)o+='<svg class="icon icon-star"><use xlink:href="./images/symbol-defs.svg#icon-star"></use></svg>';r&&(o+='<svg class="icon icon-star-half"><use xlink:href="./images/symbol-defs.svg#icon-star-half"></use></svg>');for(let c=0;c<i;c++)o+='<svg class="icon icon-star-empty"><use xlink:href="./images/symbol-defs.svg#icon-star-empty"></use></svg>';t.innerHTML=o}function _(e){const t=document.getElementById("hero");if(!t)return;const n=e.backdrop_path?M(e.backdrop_path):v(e.poster_path),a=new Image;a.onload=function(){t.style.backgroundImage=`url(${n})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",t.style.backgroundAttachment="fixed",t.style.transition="background-image 0.3s ease"},a.src=n,s.heroContent.innerHTML=`
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
  `;const r=document.getElementById("hero-rating-stars");S(e.vote_average||0,r)}function w(e){if(s.moviesUl.innerHTML="",!e||e.length===0){s.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const t=document.createDocumentFragment();e.forEach(n=>{const a=k(n);t.appendChild(a)}),s.moviesUl.appendChild(t)}function k(e){const t=document.createElement("li");t.className="movie-card";let n="";e.genres&&e.genres.length>0?n=e.genres.map(r=>r.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(n=e.genre_ids.map(i=>{const o=d.genresCache.find(c=>c.id===i);return o?o.name:""}).filter(i=>i!=="").slice(0,2).join(", ")),t.innerHTML=`
    <div class="movie-poster">
      <img src="${v(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${b(e.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${e.title}</div>
        ${n?`<div class="movie-genres">${n}</div>`:""}
        <div class="movie-date">${y(e.release_date)}</div>
      </div>
      <div class="movie-info-right">
        <div class="rating-stars"></div>
      </div>
    </div>
  `;const a=t.querySelector(".rating-stars");return S(e.vote_average||0,a),t}function B(e,t){if(s.paginationUl.innerHTML="",d.totalPages=t,d.currentPage=e,t<=1)return;const n=document.createDocumentFragment();if(e>1){const i=g("‹",!1,"prev");i.querySelector("button").addEventListener("click",()=>p(e-1)),n.appendChild(i)}let a,r;e<=3?(a=1,r=Math.min(5,t)):e>=t-2?(a=Math.max(1,t-4),r=t):(a=e-2,r=e+2);for(let i=a;i<=r;i++){const o=i.toString().padStart(2,"0"),c=g(o,i===e);c.querySelector("button").addEventListener("click",()=>p(i)),n.appendChild(c)}if(r<t-1){n.appendChild(N());const i=t.toString().padStart(2,"0"),o=g(i,e===t);o.querySelector("button").addEventListener("click",()=>p(t)),n.appendChild(o)}else if(r<t){const i=t.toString().padStart(2,"0"),o=g(i,e===t);o.querySelector("button").addEventListener("click",()=>p(t)),n.appendChild(o)}if(e<t){const i=g("›",!1,"next");i.querySelector("button").addEventListener("click",()=>p(e+1)),n.appendChild(i)}s.paginationUl.appendChild(n)}function g(e,t=!1,n="page"){const a=document.createElement("li"),r=document.createElement("button");return r.className=`page-btn ${n}`,t&&r.classList.add("active"),r.textContent=e,a.appendChild(r),a}function N(){const e=document.createElement("li");return e.className="page-ellipsis",e.textContent="...",e}function D(e,t){const n=document.createElement("div");n.className="movie-modal",n.innerHTML=`
    <div class="modal-content">
      <span class="close-modal" aria-label="Close modal">&times;</span>
      <div class="trailer-container">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${e}?autoplay=1"
          title="${t} trailer"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `,document.body.appendChild(n),C(n)}async function O(e){var t;try{const[n,a]=await Promise.all([I(e),A(e)]),r=a.length?a[0]:null,i=(t=n.genres)!=null&&t.length?n.genres.map(c=>c.name).join(", "):"—",o=document.createElement("div");o.className="movie-modal",o.innerHTML=`
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${v(n.poster_path)}" 
               alt="${n.title} poster"
               loading="lazy"
               srcset="${b(n.poster_path)}" />

          <div class="modal-info">
            <h2>${n.title}</h2>
            <p><strong>Release:</strong> ${y(n.release_date)}</p>
            <p><strong>Genres:</strong> ${i}</p>
            <p><strong>Rating:</strong> ${n.vote_average?n.vote_average.toFixed(1):"No rating"}</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${n.overview||"No overview available."}</p>

          ${r?`
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${r.key}"
                title="${n.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `:""}
        </div>
      </div>
    `,document.body.appendChild(o),C(o)}catch(n){console.error("Error loading movie details:",n),u("Error loading movie details.")}}function C(e){e.querySelector(".close-modal").addEventListener("click",()=>e.remove()),e.addEventListener("click",n=>{n.target===e&&e.remove()})}async function f(e=1){var t;try{E(),s.movieListRegion.setAttribute("aria-busy","true");const[n]=await Promise.all([T(e),new Promise(r=>setTimeout(r,800))]);if(d.totalPages=n.total_pages||1,e===1){const r=(t=n.results)==null?void 0:t[0];r?_(r):s.heroContent.innerHTML=`
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
        `}const a=n.results||[];w(a),B(e,d.totalPages),d.lastSearch={input:"",year:"",isSearch:!1}}catch(n){console.error("Error loading trending movies:",n),u("Failed to load trending movies. Please try again later.")}finally{L(),s.movieListRegion.removeAttribute("aria-busy")}}async function x(e,t="",n=1){if(!e||e.trim()==="")return f();try{E(),s.movieListRegion.setAttribute("aria-busy","true");const[a]=await Promise.all([$(e.trim(),t,n),new Promise(i=>setTimeout(i,600))]),r=a.results||[];w(r),B(n,a.total_pages||1),d.lastSearch={input:e,year:t,isSearch:!0}}catch(a){console.error("Error performing search:",a),u("Search failed. Please try again.")}finally{L(),s.movieListRegion.removeAttribute("aria-busy")}}function p(e){d.currentPage=e,d.lastSearch.isSearch?x(d.lastSearch.input,d.lastSearch.year,e):f(e),window.scrollTo({top:0,behavior:"smooth"})}async function G(e){try{const t=await A(e);if(!t.length){u("No trailer available for this movie.","warning");return}const n=t[0];D(n.key,n.name||"Trailer")}catch(t){console.error("Error loading trailer:",t),u("Error loading trailer.")}}async function P(e){try{await O(e)}catch(t){console.error("Error loading movie details:",t),u("Error loading movie details.")}}function H(){const e=new Date().getFullYear();for(let t=e;t>=l.YEAR_SELECT_START;t--){const n=document.createElement("option");n.value=t,n.textContent=t,s.yearSelect.appendChild(n)}}function F(){s.searchForm.addEventListener("submit",e=>{e.preventDefault();const t=s.searchInput.value,n=s.yearSelect.value;x(t,n,1)}),s.searchInput.addEventListener("input",e=>{const t=e.target.value;s.clearBtn.style.display=t.trim()?"flex":"none"}),s.clearBtn.addEventListener("click",()=>{s.searchInput.value="",s.clearBtn.style.display="none",s.yearSelect.value="",f(1)}),document.addEventListener("click",async e=>{const t=e.target.closest(".trailer-btn");if(t){const a=t.dataset.id;a&&await G(a);return}const n=e.target.closest(".details-btn");if(n){const a=n.dataset.id;a&&await P(a)}})}async function h(){var e;try{H(),F(),d.genresCache=await R();const n=(e=(await U()).results)==null?void 0:e[0];n&&_(n),await f(1)}catch(t){console.error("Error initializing app:",t),u("Failed to initialize application.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h();
//# sourceMappingURL=catalog.js.map
