import{b as ge,a as S}from"./vendor-BbdapVcf.js";import"./library-lE9xi72S.js";const pe=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"../img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Furkan Çelik",role:"Developer",img:"../img/furkan.jpg",github:"https://github.com/furkangoit",linkedin:"https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function fe(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.name}" />
      <div class="student-info">
        <h3>${e.name}</h3>
        <p>${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank" aria-label="GitHub">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-github"></use>
          </svg>
        </a>
        ${e.linkedin!=="#"?`
        <a class="footer-icon" href="${e.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-linkedin"></use>
          </svg>
        </a>`:""}
      </div>
    </li>
  `}function he(){let e=document.querySelector("footer.footer");return e?e.classList.add("goit-footer"):(e=document.createElement("footer"),e.className="footer goit-footer",document.body.appendChild(e)),e.innerHTML=`
    <p class="footer-description">
      © 2025 | All Rights Reserved | Developed with <span aria-label="love">🧡</span> by <button class="goit-students" id="openFooterModalBtn" type="button">GoIT Students</button>
    </p>
  `,e}function ve(){let e=document.getElementById("footerModal");return e||(e=document.createElement("div"),e.className="footer-modal-overlay",e.id="footerModal",e.innerHTML=`
    <div class="footer-modal-content">
      <span class="footer-modal-close-btn" id="closeFooterModalBtn">&times;</span>
      <h2 class="footer-modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${pe.map(fe).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e),e)}function F(){const e=document.querySelector(".footer-modal-content"),t=document.querySelector(".footer");!e||!t||(window.matchMedia("(max-width: 768px)").matches?(e.style.maxWidth="300px",t.style.paddingBottom="100px"):window.matchMedia("(max-width: 1279px)").matches?(e.style.maxWidth="720px",t.style.paddingBottom="80px"):(e.style.maxWidth="1200px",t.style.paddingBottom="50px"))}function G(){he();const e=ve(),t=e.querySelector(".footer-modal-content"),n=document.getElementById("openFooterModalBtn"),r=document.getElementById("closeFooterModalBtn");if(!n||!r){console.warn("Modal tetikleyici veya kapatma butonu bulunamadı.");return}n.addEventListener("click",()=>{e.classList.add("active"),document.body.style.overflow="hidden"}),r.addEventListener("click",()=>{e.classList.remove("active"),document.body.style.overflow=""}),e.addEventListener("click",o=>{t.contains(o.target)||(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",o=>{o.key==="Escape"&&(e.classList.remove("active"),document.body.style.overflow="")}),F(),window.addEventListener("resize",F)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",G,{once:!0}):G();function H(){P("#menuLinks","menuLinks:active"),P("#links","menuLinks:active"),ye("#menu",".sidebar",".sidebar-backdrop"),be("#toggle",".theme-toggle use",{navbar:"header",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text",body:"body"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H();function P(e,t){var o;const n=document.querySelector(e);if(!n)return;const r=localStorage.getItem(t);if(r){const a=n.querySelector(`a[href="${r}"]`),i=a==null?void 0:a.closest("li");i&&((o=n.querySelector(".active"))==null||o.classList.remove("active"),i.classList.add("active"))}n.addEventListener("click",a=>{var u,g;const i=a.target.closest("li");if(!i||!n.contains(i))return;(u=n.querySelector(".active"))==null||u.classList.remove("active"),i.classList.add("active");const s=(g=i.querySelector("a"))==null?void 0:g.getAttribute("href");s&&localStorage.setItem(t,s)})}function ye(e,t,n){const r=document.querySelector(e),o=document.querySelector(t),a=document.querySelector(n);!r||!o||!a||r.addEventListener("click",()=>{console.log("clicked");const i=o.style.display==="flex";o.style.display=i?"none":"flex",a.style.display=i?"none":"block",r.style.display="";const s=u=>{u.target===a&&(o.style.display="none",a.style.display="none",a.removeEventListener("click",s))};a.addEventListener("click",s)})}function be(e,t,n={}){const r=document.querySelector(e),o=document.querySelector(t),{navbar:a,menuButton:i,modal:s,backdrop:u,links:g,logoText:p,body:y}=Le(n),b=c=>{document.body.className=c,localStorage.setItem("theme",c);const m=c==="dark-theme";r&&(r.checked=m),y&&(y.style.backgroundColor=m?"#121212":"#fff"),i&&(i.style.color=m?"#b7b7b7":"#595959"),a&&(a.style.backgroundColor=m?"#000":"#fff"),s&&(s.style.backgroundColor=m?"#000":"#f8f8f8"),p&&(p.style.color=m?"#fff":"#282828"),g&&g.querySelectorAll("a").forEach(d=>{var h;d.style.color=m?"#fff":"#111",(h=d.closest("li"))!=null&&h.classList.contains("active")&&(d.style.color="#f87719")}),s&&s.querySelectorAll("a").forEach(d=>{var h;d.style.color=m?"#fff":"#111",(h=d.closest("li"))!=null&&h.classList.contains("active")&&(d.style.color="#f87719")}),u&&(u.style.backgroundColor=m?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",u.style.zIndex="1"),o==null||o.setAttribute("href",`../img/icon.svg#${m?"icon-Vector":"icon-Sun"}`)};b(localStorage.getItem("theme")||"light-theme"),r==null||r.addEventListener("change",()=>b(r.checked?"dark-theme":"light-theme"))}function Le(e){const t={};for(const n in e){const r=document.querySelector(e[n]);t[n]=r||null}return t}const Ee="c0fe092c4149192005601ffec65036a5",Se="https://api.themoviedb.org/3",W={language:"en-US",region:"TR"};function x(e,t={}){const n=new URL(`${Se}${e}`);n.searchParams.set("api_key",Ee);const r={...W,...t};return Object.entries(r).forEach(([o,a])=>{a!=null&&a!==""&&n.searchParams.set(o,a)}),n.toString()}async function ke(e=1){return(await fetch(x("/trending/movie/week",{page:e}))).json()}async function K(e){return(await fetch(x(`/movie/${e}`))).json()}async function J(){return(await fetch(x("/genre/movie/list"))).json()}async function we(e,t,{region:n=W.region}={}){return(await fetch(x("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:n,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const V="myLibraryMovies_v1",D=()=>{try{const e=localStorage.getItem(V);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},X=e=>{try{localStorage.setItem(V,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},Q=e=>!!D()[e],_e=e=>{if(!e||!e.id)return;const t=D();t[e.id]=e,X(t)},Ae=e=>{const t=D();t[e]&&(delete t[e],X(t))},T=document.querySelector(".modal"),j=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const L=document.querySelector(".modal-add-button");let $=null;const Be=()=>{T&&(T.classList.remove("is-open"),T.setAttribute("aria-hidden","true"),$=null)};j&&j.addEventListener("click",e=>{e.stopPropagation(),Be()});const Y=e=>{if(!L)return;const t=Q(e);L.textContent=t?"Remove from my Library":"Add to my Library",L.dataset.inLibrary=t?"true":"false",L.dataset.movieId=e};L&&L.addEventListener("click",async e=>{e.preventDefault();const t=L.dataset.movieId||$&&$.id;if(!t)return;if(Q(t)){Ae(t),Y(t);return}let r=$;if(!r||String(t)!==String(r.id))try{r=await K(t)}catch(a){console.error("fetchMovieDetails fonksiyonu hatası:",a);return}const o={id:r.id,title:r.title||r.name||"",poster_path:r.poster_path||"",vote_average:r.vote_average??0,vote_count:r.vote_count??0,popularity:r.popularity??0,genres:r.genres??r.genre_ids??[],overview:r.overview||"",savedAt:new Date().toISOString()};_e(o),Y(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const C=document.getElementById("upcoming-content");if(C){let s=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(c){return s().includes(c)},g=function(c,m){let d=JSON.parse(localStorage.getItem("library"))||[];d.some(w=>w.id===c.id)?(d=d.filter(w=>w.id!==c.id),m.textContent="Add to my library",m.classList.remove("btn-remove"),m.classList.add("btn-add")):(d.push(c),m.textContent="Remove from my library",m.classList.remove("btn-add"),m.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(d))},p=function(c){return c.map(m=>{var d;return(d=i.find(h=>h.id===m))==null?void 0:d.name}).filter(Boolean).join(", ")},y=function(c){var q,O;const m=c.backdrop_path?`https://image.tmdb.org/t/p/original/${c.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",d=u(c.id),h=d?"Remove from my library":"Add to my library",w=d?"btn-remove":"btn-add",me=p(c.genre_ids||[]);C.innerHTML=`
      <div class="upcoming-card">
        <img src="${m}" alt="${c.title}" />
        <div class="info">
          <h3 class="movie-name">${c.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${c.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${((q=c.vote_average)==null?void 0:q.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${c.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((O=c.popularity)==null?void 0:O.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${me||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${c.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${w}">${h}</button>
        </div>
      </div>
    `;const B=document.getElementById("library-btn");B==null||B.addEventListener("click",()=>g(c,B))};const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=new Date(t,e.getMonth()+1,0).getDate(),o=`${t}-${n}-01`,a=`${t}-${n}-${r}`;let i=[];async function b(){try{i=(await J()).genres||[];const d=(await we(o,a,{region:"TR"})).results||[];if(!d.length){C.innerHTML=`<p>${d.length} movies this month.</p>`;return}const h=d[Math.floor(Math.random()*d.length)];y(h)}catch(c){console.error("upcoming init error:",c),C.innerHTML="<p>Error while fetching movie data.</p>"}}b()}const U=document.querySelector(".weekly-gallery"),Ce=document.querySelector(".see-all");let R=[],I=!1;function Z(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function $e(e){const t=Math.floor(e/2),n=e%2>=1,r=5-t-(n?1:0);let o=[];for(let a=0;a<t;a++)o.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');n&&o.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let a=0;a<r;a++)o.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return o.join("")}function xe(e,t){let n=JSON.parse(localStorage.getItem("library"))||[];n.some(o=>Number(o.id)===Number(e.id))?(n=n.filter(o=>Number(o.id)!==Number(e.id)),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(o=>o.id)),n.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}async function ee(e=Z()){try{const[t,n]=await Promise.all([ke(),J()]);R=t.results;const r=n.genres.reduce((i,s)=>(i[s.id]=s.name,i),{}),a=R.slice(0,e).map(i=>{const s=i.poster_path?`https://image.tmdb.org/t/p/w500${i.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=i.genre_ids.map(y=>r[y]).slice(0,1).join(", "),g=i.release_date?i.release_date.slice(0,4):"N/A",p=$e(i.vote_average);return`
          <li class="weekly-card" data-id="${i.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${s}" alt="${i.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${i.title.toUpperCase()}</h3>
                <p class="card-info">${u} | ${g}</p>
                <div class="card-rating">${p}</div>
              </div>
            </div>
          </li>
        `}).join("");U.innerHTML=a}catch(t){console.error("Weekly trends fetch error:",t),U.innerHTML="<p>Veriler alınamadı.</p>"}}Ce.addEventListener("click",()=>{I=!I;const e=I?R.length:Z();ee(e)});U.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{let g=function(p){p.key==="Escape"&&(u.close(),window.removeEventListener("keydown",g))};const r=await K(n),o=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",a=r.genres.map(p=>p.name).join(", "),s=(JSON.parse(localStorage.getItem("library"))||[]).some(p=>Number(p.id)===Number(r.id)),u=ge.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${o}" class="modal-poster" alt="${r.title}">
        <div class="modal-details">
          <h2>${r.title}</h2>
          <p><strong>Vote / Votes:</strong> ${r.vote_average} / ${r.vote_count}</p>
          <p><strong>Popularity:</strong> ${r.popularity}</p>
          <p><strong>Genre:</strong> ${a}</p>
          <h3>ABOUT</h3>
          <p>${r.overview}</p>
          <button class="${s?"remove-from-library":"library-btn-w"}">
            ${s?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close());const b=p.element().querySelector("button.remove-from-library, button.library-btn-w");b.addEventListener("click",()=>xe(r,b))}});u.show(),window.addEventListener("keydown",g)}catch(r){console.error("Popup açılırken hata:",r)}});ee();async function Me(){const e=document.querySelectorAll("load[src]");for(const t of e){const n=t.getAttribute("src");if(n)try{const r=await fetch(n);if(!r.ok){console.error("Partial yüklenemedi:",n,r.status);continue}const o=await r.text(),a=document.createElement("div");a.innerHTML=o,a.querySelectorAll("script").forEach(s=>{const u=document.createElement("script");for(const g of s.attributes)u.setAttribute(g.name,g.value);u.text=s.textContent,s.parentNode.replaceChild(u,s)});const i=document.createDocumentFragment();for(;a.firstChild;)i.appendChild(a.firstChild);t.replaceWith(i)}catch(r){console.error("Partial fetch hatası:",n,r)}}}const f={API_KEY:"0c52aafa16e24577e4a48f6286d3f101",BASE_URL:"https://api.themoviedb.org/3",IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",IMAGE_BASE_URL_2X:"https://image.tmdb.org/t/p/w780",BACKDROP_BASE_URL:"https://image.tmdb.org/t/p/w1280",BACKDROP_BASE_URL_2X:"https://image.tmdb.org/t/p/w1920",IMAGE_PLACEHOLDER:"src/images/no-poster.svg",DEFAULT_LANGUAGE:"en-US",PAGINATION_MAX_BUTTONS:5,YEAR_SELECT_START:1980};let l;const v={lastSearch:{input:"",year:"",isSearch:!1},currentPage:1,totalPages:1,genresCache:[]};function k(e,t={}){const n=new URL(`${f.BASE_URL}${e}`);return n.searchParams.set("api_key",f.API_KEY),Object.keys(t).forEach(r=>{const o=t[r];o!==""&&o!==null&&o!==void 0&&n.searchParams.set(r,o)}),n.toString()}function te(e){return e?e.split("-")[0]:"—"}function N(e){return e?(window.devicePixelRatio>1?f.IMAGE_BASE_URL_2X:f.IMAGE_BASE_URL)+e:f.IMAGE_PLACEHOLDER}function ne(e){if(!e)return f.IMAGE_PLACEHOLDER;const t=f.IMAGE_BASE_URL.replace("/w500","/w300")+e,n=f.IMAGE_BASE_URL+e;return`${t} 1x, ${n} 2x`}function Te(e){return e?(window.devicePixelRatio>1?f.BACKDROP_BASE_URL_2X:f.BACKDROP_BASE_URL)+e:f.IMAGE_PLACEHOLDER}function re(){const e=document.getElementById("loading-indicator");e&&(e.style.display="flex",e.setAttribute("aria-hidden","false"))}function oe(){const e=document.getElementById("loading-indicator");e&&(e.style.display="none",e.setAttribute("aria-hidden","true"))}function E(e,t="error"){const n=document.createElement("div");n.className=`error-message ${t}`,n.textContent=e,n.style.cssText=`
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
  `,document.body.appendChild(n),setTimeout(()=>n.remove(),5e3)}async function Ie(){const e=k("/trending/movie/day");return(await S.get(e)).data}async function Ue(e=1){const t=k("/trending/movie/week",{page:e});return(await S.get(t)).data}async function Re(e){const t=k(`/movie/${e}`,{language:f.DEFAULT_LANGUAGE});return(await S.get(t)).data}async function De(){const e=k("/genre/movie/list",{language:f.DEFAULT_LANGUAGE});return(await S.get(e)).data.genres}async function ae(e){var t;try{const n=k(`/movie/${e}/videos`,{language:f.DEFAULT_LANGUAGE});return(((t=(await S.get(n)).data)==null?void 0:t.results)||[]).filter(a=>a.site==="YouTube"&&a.type==="Trailer")}catch(n){return console.error("Error fetching movie videos:",n),[]}}async function Ne(e,t="",n=1){const r=k("/search/movie",{query:e,year:t,page:n,include_adult:!1,language:f.DEFAULT_LANGUAGE});return(await S.get(r)).data}function ie(e,t){if(!t)return;const n=e/2,r=Math.floor(n),o=n-r>=.5,a=5-r-(o?1:0);let i="";for(let s=0;s<r;s++)i+='<svg class="catalog-icon catalog-icon-star"><use xlink:href="../images/symbol-defs.svg#icon-star"></use></svg>';o&&(i+='<svg class="catalog-icon catalog-icon-star-half"><use xlink:href="../images/symbol-defs.svg#icon-star-half"></use></svg>');for(let s=0;s<a;s++)i+='<svg class="catalog-icon catalog-icon-star-empty"><use xlink:href="../images/symbol-defs.svg#icon-star-empty"></use></svg>';t.innerHTML=i}function se(e){const t=document.getElementById("hero");if(!t)return;const n=e.backdrop_path?Te(e.backdrop_path):N(e.poster_path),r=new Image;r.onload=function(){t.style.backgroundImage=`url(${n})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",t.style.backgroundAttachment="fixed",t.style.transition="background-image 0.3s ease"},r.src=n,l.heroContent.innerHTML=`
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
  `;const o=document.getElementById("hero-rating-stars");ie(e.vote_average||0,o)}function le(e){if(l.moviesUl.innerHTML="",!e||e.length===0){l.moviesUl.innerHTML=`
    <li></li>
      <li class="message" role="status">
        <div class="error-message-content">
          <div>OOPS...</div>
          <div>We are very sorry!</div>
          <div>We don't have any results matching your search.</div>
        </div>
      </li>
    `;return}const t=document.createDocumentFragment();e.forEach(n=>{const r=qe(n);t.appendChild(r)}),l.moviesUl.appendChild(t)}function qe(e){const t=document.createElement("li");t.className="movie-card";let n="";e.genres&&e.genres.length>0?n=e.genres.map(i=>i.name).join(", "):e.genre_ids&&e.genre_ids.length>0&&(n=e.genre_ids.map(s=>{const u=v.genresCache.find(g=>g.id===s);return u?u.name:""}).filter(s=>s!=="").slice(0,2).join(", "));const r=te(e.release_date),o=n?`${n} | ${r}`:r;t.innerHTML=`
    <div class="movie-poster">
      <img src="${N(e.poster_path)}"
           alt="${e.title} poster"
           loading="lazy"
           srcset="${ne(e.poster_path)}" />
    </div>
    <div class="movie-info">
      <div class="movie-info-left">
        <div class="movie-title">${e.title}</div>
        <div class="movie-meta">${o}</div>
      </div>
      <div class="movie-info-right">
        <div class="catalog-rating-stars"></div>
      </div>
    </div>
  `;const a=t.querySelector(".catalog-rating-stars");return ie(e.vote_average||0,a),t}function ce(e,t){if(!l.paginationUl||(l.paginationUl.innerHTML="",v.totalPages=t,v.currentPage=e,t<=1))return;const n=document.createDocumentFragment();if(e>1){const a=_("‹",!1,"prev");a.querySelector("button").addEventListener("click",()=>A(e-1)),n.appendChild(a)}let r,o;e<=3?(r=1,o=Math.min(5,t)):e>=t-2?(r=Math.max(1,t-4),o=t):(r=e-2,o=e+2);for(let a=r;a<=o;a++){const i=a.toString().padStart(2,"0"),s=_(i,a===e);s.querySelector("button").addEventListener("click",()=>A(a)),n.appendChild(s)}if(o<t-1){n.appendChild(Oe());const a=t.toString().padStart(2,"0"),i=_(a,e===t);i.querySelector("button").addEventListener("click",()=>A(t)),n.appendChild(i)}else if(o<t){const a=t.toString().padStart(2,"0"),i=_(a,e===t);i.querySelector("button").addEventListener("click",()=>A(t)),n.appendChild(i)}if(e<t){const a=_("›",!1,"next");a.querySelector("button").addEventListener("click",()=>A(e+1)),n.appendChild(a)}l.paginationUl.appendChild(n)}function _(e,t=!1,n="page"){const r=document.createElement("li"),o=document.createElement("button");return o.className=`page-btn ${n}`,t&&o.classList.add("active"),o.textContent=e,r.appendChild(o),r}function Oe(){const e=document.createElement("li");return e.className="page-ellipsis",e.textContent="...",e}function Fe(e,t){const n=document.createElement("div");n.className="movie-modal",n.innerHTML=`
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
  `,document.body.appendChild(n),de(n)}async function Ge(e){var t;try{const[n,r]=await Promise.all([Re(e),ae(e)]),o=r.length?r[0]:null,a=(t=n.genres)!=null&&t.length?n.genres.map(s=>s.name).join(", "):"—",i=document.createElement("div");i.className="movie-modal",i.innerHTML=`
      <div class="modal-content">
        <span class="close-modal" aria-label="Close modal">&times;</span>

        <div class="modal-header">
          <img src="${N(n.poster_path)}" 
               alt="${n.title} poster"
               loading="lazy"
               srcset="${ne(n.poster_path)}" />

          <div class="modal-info">
            <h2>${n.title}</h2>
            <p><strong>Release:</strong> ${te(n.release_date)}</p>
            <p><strong>Genres:</strong> ${a}</p>
            <p><strong>Rating:</strong> ${n.vote_average?n.vote_average.toFixed(1):"No rating"}</p>
          </div>
        </div>

        <div class="modal-body">
          <h3>Overview</h3>
          <p>${n.overview||"No overview available."}</p>

          ${o?`
            <div class="trailer-container">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/${o.key}"
                title="${n.title} trailer"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          `:""}
        </div>
      </div>
    `,document.body.appendChild(i),de(i)}catch(n){console.error("Error loading movie details:",n),E("Error loading movie details.")}}function de(e){e.querySelector(".close-modal").addEventListener("click",()=>e.remove()),e.addEventListener("click",n=>{n.target===e&&e.remove()})}async function M(e=1){var t;try{re(),l.movieListRegion.setAttribute("aria-busy","true");const[n]=await Promise.all([Ue(e),new Promise(o=>setTimeout(o,800))]);if(v.totalPages=n.total_pages||1,l.heroContent&&e===1){const o=(t=n.results)==null?void 0:t[0];o?se(o):l.heroContent.innerHTML=`
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
        `}const r=n.results||[];le(r),ce(e,v.totalPages),v.lastSearch={input:"",year:"",isSearch:!1}}catch(n){console.error("Error loading trending movies:",n),E("Failed to load trending movies. Please try again later.")}finally{oe(),l.movieListRegion.removeAttribute("aria-busy")}}async function ue(e,t="",n=1){if(!e||e.trim()==="")return M();try{re(),l.movieListRegion.setAttribute("aria-busy","true");const[r]=await Promise.all([Ne(e.trim(),t,n),new Promise(a=>setTimeout(a,600))]),o=r.results||[];le(o),ce(n,r.total_pages||1),v.lastSearch={input:e,year:t,isSearch:!0}}catch(r){console.error("Error performing search:",r),E("Search failed. Please try again.")}finally{oe(),l.movieListRegion.removeAttribute("aria-busy")}}function A(e){v.currentPage=e,v.lastSearch.isSearch?ue(v.lastSearch.input,v.lastSearch.year,e):M(e),window.scrollTo({top:0,behavior:"smooth"})}async function He(e){try{const t=await ae(e);if(!t.length){E("No trailer available for this movie.","warning");return}const n=t[0];Fe(n.key,n.name||"Trailer")}catch(t){console.error("Error loading trailer:",t),E("Error loading trailer.")}}async function Pe(e){try{await Ge(e)}catch(t){console.error("Error loading movie details:",t),E("Error loading movie details.")}}function je(){if(!l.yearSelect)return;const e=new Date().getFullYear();for(let t=e;t>=f.YEAR_SELECT_START;t--){const n=document.createElement("option");n.value=t,n.textContent=t,l.yearSelect.appendChild(n)}}function Ye(){l.searchForm&&l.searchInput&&l.yearSelect&&l.clearBtn&&(l.searchForm.addEventListener("submit",e=>{e.preventDefault();const t=l.searchInput.value,n=l.yearSelect.value;ue(t,n,1)}),l.searchInput.addEventListener("input",e=>{const t=e.target.value;l.clearBtn.style.display=t.trim()?"flex":"none"}),l.clearBtn.addEventListener("click",()=>{l.searchInput.value="",l.clearBtn.style.display="none",l.yearSelect.value="",M(1)})),document.addEventListener("click",async e=>{const t=e.target.closest(".trailer-btn");if(t){const r=t.dataset.id;r&&await He(r);return}const n=e.target.closest(".details-btn");if(n){const r=n.dataset.id;r&&await Pe(r)}})}async function ze(){var e;try{if(l={moviesUl:document.getElementById("movies-ul"),paginationUl:document.getElementById("pagination-ul"),heroContent:document.getElementById("hero-content"),searchForm:document.getElementById("search-form"),searchInput:document.getElementById("search-input"),clearBtn:document.getElementById("clear-btn"),yearSelect:document.getElementById("year-select"),movieListRegion:document.getElementById("movie-list")},Ye(),l.yearSelect&&je(),v.genresCache=await De(),l.heroContent){const n=(e=(await Ie()).results)==null?void 0:e[0];n&&se(n)}await M(1)}catch(t){console.error("Error initializing app:",t),E("Failed to initialize application.")}}async function z(){await Me(),ze()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",z):z();
//# sourceMappingURL=index-BpMsh4o-.js.map
