import{b as G}from"./vendor-C_84-fT4.js";const V=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"../img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Furkan Çelik",role:"Developer",img:"../img/furkan.jpg",github:"https://github.com/furkangoit",linkedin:"https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function W(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.name}" />
      <div class="student-info">
        <h3>${e.name}</h3>
        <p>${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank" aria-label="GitHub">
          <svg class="icon-github" width="40" height="40">
            <use xlink:href="../img/icon.svg#icon-github"></use>
          </svg>
        </a>
        ${e.linkedin!=="#"?`
        <a class="footer-icon" href="${e.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="40" height="40">
            <use xlink:href="../img/icon.svg#icon-linkedin"></use>
          </svg>
        </a>`:""}
      </div>
    </li>
  `}function z(){let e=document.querySelector("footer.footer");return e?e.classList.add("goit-footer"):(e=document.createElement("footer"),e.className="footer goit-footer",document.body.appendChild(e)),e.innerHTML=`
    <p class="footer-description">
      © 2025 | All Rights Reserved | Developed with <span aria-label="love">🧡</span> by
      <button class="goit-students" id="openFooterModalBtn" type="button">GoIT Students</button>
    </p>
  `,e}function K(){let e=document.getElementById("footerModal");return e||(e=document.createElement("div"),e.className="footer-modal-overlay",e.id="footerModal",e.innerHTML=`
    <div class="footer-modal-content">
      <span class="footer-modal-close-btn" id="closeFooterModalBtn">&times;</span>
      <h2 class="footer-modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${V.map(W).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e),e)}function C(){const e=document.querySelector(".footer-modal-content"),t=document.querySelector(".footer");!e||!t||(window.matchMedia("(max-width: 768px)").matches?(e.style.maxWidth="300px",t.style.paddingBottom="100px"):window.matchMedia("(max-width: 1279px)").matches?(e.style.maxWidth="720px",t.style.paddingBottom="80px"):(e.style.maxWidth="1200px",t.style.paddingBottom="50px"))}function q(){z();const e=K(),t=e.querySelector(".footer-modal-content"),n=document.getElementById("openFooterModalBtn"),o=document.getElementById("closeFooterModalBtn");if(!n||!o){console.warn("Modal tetikleyici veya kapatma butonu bulunamadı.");return}n.addEventListener("click",()=>{e.classList.add("active"),document.body.style.overflow="hidden"}),o.addEventListener("click",()=>{e.classList.remove("active"),document.body.style.overflow=""}),e.addEventListener("click",r=>{t.contains(r.target)||(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",r=>{r.key==="Escape"&&(e.classList.remove("active"),document.body.style.overflow="")}),C(),window.addEventListener("resize",C)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q,{once:!0}):q();function I(){T("#menuLinks","menuLinks:active"),T("#links","menuLinks:active"),Y("#menu",".sidebar",".sidebar-backdrop"),Q("#toggle",".theme-toggle use",{navbar:"header",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text",body:"body"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",I):I();function T(e,t){var r;const n=document.querySelector(e);if(!n)return;const o=localStorage.getItem(t);if(o){const a=n.querySelector(`a[href="${o}"]`),i=a==null?void 0:a.closest("li");i&&((r=n.querySelector(".active"))==null||r.classList.remove("active"),i.classList.add("active"))}n.addEventListener("click",a=>{var m,p;const i=a.target.closest("li");if(!i||!n.contains(i))return;(m=n.querySelector(".active"))==null||m.classList.remove("active"),i.classList.add("active");const d=(p=i.querySelector("a"))==null?void 0:p.getAttribute("href");d&&localStorage.setItem(t,d)})}function Y(e,t,n){const o=document.querySelector(e),r=document.querySelector(t),a=document.querySelector(n);!o||!r||!a||o.addEventListener("click",()=>{console.log("clicked");const i=r.style.display==="flex";r.style.display=i?"none":"flex",a.style.display=i?"none":"block",o.style.display="";const d=m=>{m.target===a&&(r.style.display="none",a.style.display="none",a.removeEventListener("click",d))};a.addEventListener("click",d)})}function Q(e,t,n={}){const o=document.querySelector(e),r=document.querySelector(t),{navbar:a,menuButton:i,modal:d,backdrop:m,links:p,logoText:u,body:y}=X(n),f=s=>{document.body.className=s,localStorage.setItem("theme",s);const c=s==="dark-theme";o&&(o.checked=c),y&&(y.style.backgroundColor=c?"#121212":"#fff"),i&&(i.style.color=c?"#b7b7b7":"#595959"),a&&(a.style.backgroundColor=c?"#000":"#fff"),d&&(d.style.backgroundColor=c?"#000":"#f8f8f8"),u&&(u.style.color=c?"#fff":"#282828"),p&&p.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),d&&d.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),m&&(m.style.backgroundColor=c?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",m.style.zIndex="1"),r==null||r.setAttribute("href",`../img/icon.svg#${c?"icon-Vector":"icon-Sun"}`)};f(localStorage.getItem("theme")||"light-theme"),o==null||o.addEventListener("change",()=>f(o.checked?"dark-theme":"light-theme"))}function X(e){const t={};for(const n in e){const o=document.querySelector(e[n]);t[n]=o||null}return t}const Z="c0fe092c4149192005601ffec65036a5",ee="https://api.themoviedb.org/3",N={language:"en-US",region:"TR"};function S(e,t={}){const n=new URL(`${ee}${e}`);n.searchParams.set("api_key",Z);const o={...N,...t};return Object.entries(o).forEach(([r,a])=>{a!=null&&a!==""&&n.searchParams.set(r,a)}),n.toString()}async function te(e=1){return(await fetch(S("/trending/movie/week",{page:e}))).json()}async function R(e){return(await fetch(S(`/movie/${e}`))).json()}async function j(){return(await fetch(S("/genre/movie/list"))).json()}async function oe(e,t,{region:n=N.region}={}){return(await fetch(S("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:n,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const O="myLibraryMovies_v1",M=()=>{try{const e=localStorage.getItem(O);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},F=e=>{try{localStorage.setItem(O,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},U=e=>!!M()[e],ne=e=>{if(!e||!e.id)return;const t=M();t[e.id]=e,F(t)},re=e=>{const t=M();t[e]&&(delete t[e],F(t))},w=document.querySelector(".modal"),A=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const h=document.querySelector(".modal-add-button");let L=null;const ae=()=>{w&&(w.classList.remove("is-open"),w.setAttribute("aria-hidden","true"),L=null)};A&&A.addEventListener("click",e=>{e.stopPropagation(),ae()});const D=e=>{if(!h)return;const t=U(e);h.textContent=t?"Remove from my Library":"Add to my Library",h.dataset.inLibrary=t?"true":"false",h.dataset.movieId=e};h&&h.addEventListener("click",async e=>{e.preventDefault();const t=h.dataset.movieId||L&&L.id;if(!t)return;if(U(t)){re(t),D(t);return}let o=L;if(!o||String(t)!==String(o.id))try{o=await R(t)}catch(a){console.error("fetchMovieDetails fonksiyonu hatası:",a);return}const r={id:o.id,title:o.title||o.name||"",poster_path:o.poster_path||"",vote_average:o.vote_average??0,vote_count:o.vote_count??0,popularity:o.popularity??0,genres:o.genres??o.genre_ids??[],overview:o.overview||"",savedAt:new Date().toISOString()};ne(r),D(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const k=document.getElementById("upcoming-content");if(k){let d=function(){return JSON.parse(localStorage.getItem("library"))||[]},m=function(s){return d().includes(s)},p=function(s,c){let l=JSON.parse(localStorage.getItem("library"))||[];l.some(b=>b.id===s.id)?(l=l.filter(b=>b.id!==s.id),c.textContent="Add to my library",c.classList.remove("btn-remove"),c.classList.add("btn-add")):(l.push(s),c.textContent="Remove from my library",c.classList.remove("btn-add"),c.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(l))},u=function(s){return s.map(c=>{var l;return(l=i.find(g=>g.id===c))==null?void 0:l.name}).filter(Boolean).join(", ")},y=function(s){var _,B;const c=s.backdrop_path?`https://image.tmdb.org/t/p/original/${s.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",l=m(s.id),g=l?"Remove from my library":"Add to my library",b=l?"btn-remove":"btn-add",P=u(s.genre_ids||[]);k.innerHTML=`
      <div class="upcoming-card">
        <img src="${c}" alt="${s.title}" />
        <div class="info">
          <h3 class="movie-name">${s.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${s.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${((_=s.vote_average)==null?void 0:_.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${s.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((B=s.popularity)==null?void 0:B.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${P||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${s.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${b}">${g}</button>
        </div>
      </div>
    `;const v=document.getElementById("library-btn");v==null||v.addEventListener("click",()=>p(s,v))};const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=new Date(t,e.getMonth()+1,0).getDate(),r=`${t}-${n}-01`,a=`${t}-${n}-${o}`;let i=[];async function f(){try{i=(await j()).genres||[];const l=(await oe(r,a,{region:"TR"})).results||[];if(!l.length){k.innerHTML=`<p>${l.length} movies this month.</p>`;return}const g=l[Math.floor(Math.random()*l.length)];y(g)}catch(s){console.error("upcoming init error:",s),k.innerHTML="<p>Error while fetching movie data.</p>"}}f()}const $=document.querySelector(".weekly-gallery"),ie=document.querySelector(".see-all");let x=[],E=!1;function H(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function se(e){const t=Math.floor(e/2),n=e%2>=1,o=5-t-(n?1:0);let r=[];for(let a=0;a<t;a++)r.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');n&&r.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let a=0;a<o;a++)r.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return r.join("")}function le(e,t){let n=JSON.parse(localStorage.getItem("library"))||[];n.some(r=>Number(r.id)===Number(e.id))?(n=n.filter(r=>Number(r.id)!==Number(e.id)),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(r=>r.id)),n.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}async function J(e=H()){try{const[t,n]=await Promise.all([te(),j()]);x=t.results;const o=n.genres.reduce((i,d)=>(i[d.id]=d.name,i),{}),a=x.slice(0,e).map(i=>{const d=i.poster_path?`https://image.tmdb.org/t/p/w500${i.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",m=i.genre_ids.map(y=>o[y]).slice(0,1).join(", "),p=i.release_date?i.release_date.slice(0,4):"N/A",u=se(i.vote_average);return`
          <li class="weekly-card" data-id="${i.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${d}" alt="${i.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${i.title.toUpperCase()}</h3>
                <p class="card-info">${m} | ${p}</p>
                <div class="card-rating">${u}</div>
              </div>
            </div>
          </li>
        `}).join("");$.innerHTML=a}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}ie.addEventListener("click",()=>{E=!E;const e=E?x.length:H();J(e)});$.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{let p=function(u){u.key==="Escape"&&(m.close(),window.removeEventListener("keydown",p))};const o=await R(n),r=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",a=o.genres.map(u=>u.name).join(", "),d=(JSON.parse(localStorage.getItem("library"))||[]).some(u=>Number(u.id)===Number(o.id)),m=G.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${r}" class="modal-poster" alt="${o.title}">
        <div class="modal-details">
          <h2>${o.title}</h2>
          <p><strong>Vote / Votes:</strong> ${o.vote_average} / ${o.vote_count}</p>
          <p><strong>Popularity:</strong> ${o.popularity}</p>
          <p><strong>Genre:</strong> ${a}</p>
          <h3>ABOUT</h3>
          <p>${o.overview}</p>
          <button class="${d?"remove-from-library":"library-btn-w"}">
            ${d?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close());const f=u.element().querySelector("button.remove-from-library, button.library-btn-w");f.addEventListener("click",()=>le(o,f))}});m.show(),window.addEventListener("keydown",p)}catch(o){console.error("Popup açılırken hata:",o)}});J();
//# sourceMappingURL=index-hWkDkjBu.js.map
