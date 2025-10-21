import"./assets/main-J34Xtx_X.js";import{a as m}from"./assets/vendor-D_5xFgaM.js";async function I(){const e=document.querySelectorAll("load[src]");for(const t of e){const n=t.getAttribute("src");if(n)try{const r=await fetch(n);if(!r.ok){console.error("Partial yüklenemedi:",n,r.status);continue}const a=await r.text(),i=document.createElement("div");i.innerHTML=a,i.querySelectorAll("script").forEach(l=>{const v=document.createElement("script");for(const b of l.attributes)v.setAttribute(b.name,b.value);v.text=l.textContent,l.parentNode.replaceChild(v,l)});const o=document.createDocumentFragment();for(;i.firstChild;)o.appendChild(i.firstChild);t.replaceWith(o)}catch(r){console.error("Partial fetch hatası:",n,r)}}}const c={API_KEY:"0c52aafa16e24577e4a48f6286d3f101",BASE_URL:"https://api.themoviedb.org/3",IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg",DEFAULT_LANGUAGE:"en-US",PAGINATION_MAX_BUTTONS:5,YEAR_SELECT_START:1980};let s;const d={lastSearch:{input:"",year:"",isSearch:!1},currentPage:1,totalPages:1,genresCache:[]};function g(e,t={}){const n=new URL(`${c.BASE_URL}${e}`);return n.searchParams.set("api_key",c.API_KEY),Object.keys(t).forEach(r=>{const a=t[r];a!==""&&a!==null&&a!==void 0&&n.searchParams.set(r,a)}),n.toString()}function A(e){return e?e.split("-")[0]:"—"}function y(e){return e?(window.devicePixelRatio>1?c.IMAGE_BASE_URL_2X:c.IMAGE_BASE_URL)+e:c.IMAGE_PLACEHOLDER}function L(e){if(!e)return c.IMAGE_PLACEHOLDER;const t=c.IMAGE_BASE_URL.replace("/w500","/w300")+e,n=c.IMAGE_BASE_URL+e;return`${t} 1x, ${n} 2x`}function R(e){return e?(window.devicePixelRatio>1?c.BACKDROP_BASE_URL_2X:c.BACKDROP_BASE_URL)+e:c.IMAGE_PLACEHOLDER}function w(){const e=document.getElementById("loading-indicator");e&&(e.style.display="flex",e.setAttribute("aria-hidden","false"))}function S(){const e=document.getElementById("loading-indicator");e&&(e.style.display="none",e.setAttribute("aria-hidden","true"))}function u(e,t="error"){const n=document.createElement("div");n.className=`error-message ${t}`,n.textContent=e,n.style.cssText=`
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
  `,document.body.appendChild(n),setTimeout(()=>n.remove(),5e3)}async function $(){const e=g("/trending/movie/day");return(await m.get(e)).data}async function k(e=1){const t=g("/trending/movie/week",{page:e});return(await m.get(t)).data}async function D(e){const t=g(`/movie/${e}`,{language:c.DEFAULT_LANGUAGE});return(await m.get(t)).data}async function N(){const e=g("/genre/movie/list",{language:c.DEFAULT_LANGUAGE});return(await m.get(e)).data.genres}async function _(e){var t;try{const n=g(`/movie/${e}/videos`,{language:c.DEFAULT_LANGUAGE});return(((t=(await m.get(n)).data)==null?void 0:t.results)||[]).filter(i=>i.site==="YouTube"&&i.type==="Trailer")}catch(n){return console.error("Error fetching movie videos:",n),[]}}async function G(e,t="",n=1){const r=g("/search/movie",{query:e,year:t,page:n,include_adult:!1,language:c.DEFAULT_LANGUAGE});return(await m.get(r)).data}function B(e,t){if(!t)return;const n=e/2,r=Math.floor(n),a=n-r>=.5,i=5-r-(a?1:0);let o="";for(let l=0;l<r;l++)o+='<svg class="icon icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';a&&(o+='<svg class="icon icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let l=0;l<i;l++)o+='<svg class="icon icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';t.innerHTML=o}function C(e){const t=document.getElementById("hero");if(!t)return;const n=e.backdrop_path?R(e.backdrop_path):y(e.poster_path),r=new Image;r.onload=function(){t.style.backgroundImage=`url(${n})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",t.style.backgroundAttachment="fixed",t.style.transition="background-image 0.3s ease"},r.src=n,s.heroContent.innerHTML=`
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
  `;const a=document.getElementById("hero-rating-stars");B(e.vote_average||0,a)}function M(e){if(s.moviesUl.innerHTML="",!e||e.length===0){s.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const t=document.createDocumentFragment();e.forEach(n=>{const r=O(n);t.appendChild(r)}),s.moviesUl.appendChild(t)}function O(e){const t=document.createElement("li");t.className="movie-card";let n="";e.genres&&e.genres.length>0?n=e.genres.map(a=>a.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(n=e.genre_ids.map(i=>{const o=d.genresCache.find(l=>l.id===i);return o?o.name:""}).filter(i=>i!=="").slice(0,2).join(", ")),t.innerHTML=`
    <div class="movie-poster">
      <img src="${y(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${L(e.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${e.title}</div>
        ${n?`<div class="movie-genres">${n}</div>`:""}
        <div class="movie-date">${A(e.release_date)}</div>
      </div>
      <div class="movie-info-right">
        <div class="rating-stars"></div>
      </div>
    </div>
  `;const r=t.querySelector(".rating-stars");return B(e.vote_average||0,r),t}function x(e,t){if(s.paginationUl.innerHTML="",d.totalPages=t,d.currentPage=e,t<=1)return;const n=document.createDocumentFragment();if(e>1){const i=p("‹",!1,"prev");i.querySelector("button").addEventListener("click",()=>f(e-1)),n.appendChild(i)}let r,a;e<=3?(r=1,a=Math.min(5,t)):e>=t-2?(r=Math.max(1,t-4),a=t):(r=e-2,a=e+2);for(let i=r;i<=a;i++){const o=i.toString().padStart(2,"0"),l=p(o,i===e);l.querySelector("button").addEventListener("click",()=>f(i)),n.appendChild(l)}if(a<t-1){n.appendChild(H());const i=t.toString().padStart(2,"0"),o=p(i,e===t);o.querySelector("button").addEventListener("click",()=>f(t)),n.appendChild(o)}else if(a<t){const i=t.toString().padStart(2,"0"),o=p(i,e===t);o.querySelector("button").addEventListener("click",()=>f(t)),n.appendChild(o)}if(e<t){const i=p("›",!1,"next");i.querySelector("button").addEventListener("click",()=>f(e+1)),n.appendChild(i)}s.paginationUl.appendChild(n)}function p(e,t=!1,n="page"){const r=document.createElement("li"),a=document.createElement("button");return a.className=`page-btn ${n}`,t&&a.classList.add("active"),a.textContent=e,r.appendChild(a),r}function H(){const e=document.createElement("li");return e.className="page-ellipsis",e.textContent="...",e}function P(e,t){const n=document.createElement("div");n.className="movie-modal",n.innerHTML=`
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
  `,document.body.appendChild(n),U(n)}async function F(e){var t;try{const[n,r]=await Promise.all([D(e),_(e)]),a=r.length?r[0]:null,i=(t=n.genres)!=null&&t.length?n.genres.map(l=>l.name).join(", "):"—",o=document.createElement("div");o.className="movie-modal",o.innerHTML=`
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${y(n.poster_path)}" 
               alt="${n.title} poster"
               loading="lazy"
               srcset="${L(n.poster_path)}" />

          <div class="modal-info">
            <h2>${n.title}</h2>
            <p><strong>Release:</strong> ${A(n.release_date)}</p>
            <p><strong>Genres:</strong> ${i}</p>
            <p><strong>Rating:</strong> ${n.vote_average?n.vote_average.toFixed(1):"No rating"}</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${n.overview||"No overview available."}</p>

          ${a?`
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${a.key}"
                title="${n.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `:""}
        </div>
      </div>
    `,document.body.appendChild(o),U(o)}catch(n){console.error("Error loading movie details:",n),u("Error loading movie details.")}}function U(e){e.querySelector(".close-modal").addEventListener("click",()=>e.remove()),e.addEventListener("click",n=>{n.target===e&&e.remove()})}async function h(e=1){var t;try{w(),s.movieListRegion.setAttribute("aria-busy","true");const[n]=await Promise.all([k(e),new Promise(a=>setTimeout(a,800))]);if(d.totalPages=n.total_pages||1,e===1){const a=(t=n.results)==null?void 0:t[0];a?C(a):s.heroContent.innerHTML=`
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
        `}const r=n.results||[];M(r),x(e,d.totalPages),d.lastSearch={input:"",year:"",isSearch:!1}}catch(n){console.error("Error loading trending movies:",n),u("Failed to load trending movies. Please try again later.")}finally{S(),s.movieListRegion.removeAttribute("aria-busy")}}async function T(e,t="",n=1){if(!e||e.trim()==="")return h();try{w(),s.movieListRegion.setAttribute("aria-busy","true");const[r]=await Promise.all([G(e.trim(),t,n),new Promise(i=>setTimeout(i,600))]),a=r.results||[];M(a),x(n,r.total_pages||1),d.lastSearch={input:e,year:t,isSearch:!0}}catch(r){console.error("Error performing search:",r),u("Search failed. Please try again.")}finally{S(),s.movieListRegion.removeAttribute("aria-busy")}}function f(e){d.currentPage=e,d.lastSearch.isSearch?T(d.lastSearch.input,d.lastSearch.year,e):h(e),window.scrollTo({top:0,behavior:"smooth"})}async function z(e){try{const t=await _(e);if(!t.length){u("No trailer available for this movie.","warning");return}const n=t[0];P(n.key,n.name||"Trailer")}catch(t){console.error("Error loading trailer:",t),u("Error loading trailer.")}}async function Y(e){try{await F(e)}catch(t){console.error("Error loading movie details:",t),u("Error loading movie details.")}}function q(){const e=new Date().getFullYear();for(let t=e;t>=c.YEAR_SELECT_START;t--){const n=document.createElement("option");n.value=t,n.textContent=t,s.yearSelect.appendChild(n)}}function W(){s.searchForm.addEventListener("submit",e=>{e.preventDefault();const t=s.searchInput.value,n=s.yearSelect.value;T(t,n,1)}),s.searchInput.addEventListener("input",e=>{const t=e.target.value;s.clearBtn.style.display=t.trim()?"flex":"none"}),s.clearBtn.addEventListener("click",()=>{s.searchInput.value="",s.clearBtn.style.display="none",s.yearSelect.value="",h(1)}),document.addEventListener("click",async e=>{const t=e.target.closest(".trailer-btn");if(t){const r=t.dataset.id;r&&await z(r);return}const n=e.target.closest(".details-btn");if(n){const r=n.dataset.id;r&&await Y(r)}})}async function K(){var e;try{s={moviesUl:document.getElementById("movies-ul"),paginationUl:document.getElementById("pagination-ul"),heroContent:document.getElementById("hero-content"),searchForm:document.getElementById("search-form"),searchInput:document.getElementById("search-input"),clearBtn:document.getElementById("clear-btn"),yearSelect:document.getElementById("year-select"),movieListRegion:document.getElementById("movie-list")},q(),W(),d.genresCache=await N();const n=(e=(await $()).results)==null?void 0:e[0];n&&C(n),await h(1)}catch(t){console.error("Error initializing app:",t),u("Failed to initialize application.")}}async function E(){await I(),K()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",E):E();
//# sourceMappingURL=catalog.js.map
