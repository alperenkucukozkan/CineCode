import{b as J}from"./vendor-C_84-fT4.js";const P=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"../img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Furkan Çelik",role:"Developer",img:"../img/furkan.jpg",github:"https://github.com/furkangoit",linkedin:"https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function G(){const e=document.createElement("style");e.textContent=`
    .footer {
      width: 100%;
      text-align: center;
      padding: 20px;
      color: #111;
    }

    .goit-students {
      color: #111;
      cursor: pointer;
      background: none;
      border: none;
      font-size: 16px;
    }

    .footer-modal-title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .footer-modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.8);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 999;
      padding: 40px 20px;
    }

    .footer-modal-overlay.active {
      display: flex;
    }

    .footer-modal-content {
      background-color: #111;
      color: #f87719;
      border-radius: 10px;
      padding: 20px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: inset 0 0 10px 5px #f57302e8;
      position: relative;
    }

    .footer-modal-close-btn {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 30px;
      color: #f87719;
      cursor: pointer;
    }

    .student-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0;
      gap: 15px;
    }

    .student-item {
      text-align: center;
      transition: transform 250ms ease-in-out;
    }

    .student-item:hover {
      transform: scale(1.05);
    }

    .student-photo {
      width: 200px;
      height: 260px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: transform 250ms ease-in-out;
    }

    .student-info {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .footer-icon {
      margin: 0 5px;
    }

    .info-icon {
      fill: #B7B7B7;
    }
  `,document.head.appendChild(e)}function V(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.name}" />
      <div class="student-info">
        <h3>${e.name}</h3>
        <p>${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank" aria-label="GitHub">
          <svg class="icon-github">
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
  `}function W(){const e=document.createElement("footer");e.className="footer",e.innerHTML=`
    <p>
      © 2025 | All Rights Reserved | Developed with 🧡 by
      <button class="goit-students" id="openFooterModalBtn">GoIT Students</button>
    </p>
  `,document.body.appendChild(e)}function K(){const e=document.createElement("div");e.className="footer-modal-overlay",e.id="footerModal",e.innerHTML=`
    <div class="footer-modal-content">
      <span class="footer-modal-close-btn" id="closeFooterModalBtn">&times;</span>
      <h2 class="footer-modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${P.map(V).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e)}function C(){const e=document.querySelector(".footer-modal-content"),t=document.querySelector(".footer");!e||!t||(window.matchMedia("(max-width: 768px)").matches?(e.style.maxWidth="300px",t.style.paddingBottom="100px"):window.matchMedia("(max-width: 1279px)").matches?(e.style.maxWidth="720px",t.style.paddingBottom="80px"):(e.style.maxWidth="1200px",t.style.paddingBottom="50px"))}function Y(){G(),W(),K(),C(),window.addEventListener("resize",C);const e=document.getElementById("footerModal"),t=e.querySelector(".footer-modal-content"),n=document.getElementById("openFooterModalBtn"),o=document.getElementById("closeFooterModalBtn");n.addEventListener("click",()=>{e.classList.add("active"),document.body.style.overflow="hidden"}),o.addEventListener("click",()=>{e.classList.remove("active"),document.body.style.overflow=""}),e.addEventListener("click",i=>{t.contains(i.target)||(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",i=>{i.key==="Escape"&&(e.classList.remove("active"),document.body.style.overflow="")})}document.addEventListener("DOMContentLoaded",Y);function I(){T("#menuLinks","menuLinks:active"),T("#links","menuLinks:active"),Q("#menu",".sidebar",".sidebar-backdrop"),X("#toggle",".theme-toggle use",{navbar:"header",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text",body:"body"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",I):I();function T(e,t){var i;const n=document.querySelector(e);if(!n)return;const o=localStorage.getItem(t);if(o){const r=n.querySelector(`a[href="${o}"]`),a=r==null?void 0:r.closest("li");a&&((i=n.querySelector(".active"))==null||i.classList.remove("active"),a.classList.add("active"))}n.addEventListener("click",r=>{var m,p;const a=r.target.closest("li");if(!a||!n.contains(a))return;(m=n.querySelector(".active"))==null||m.classList.remove("active"),a.classList.add("active");const d=(p=a.querySelector("a"))==null?void 0:p.getAttribute("href");d&&localStorage.setItem(t,d)})}function Q(e,t,n){const o=document.querySelector(e),i=document.querySelector(t),r=document.querySelector(n);!o||!i||!r||o.addEventListener("click",()=>{console.log("clicked");const a=i.style.display==="flex";i.style.display=a?"none":"flex",r.style.display=a?"none":"block",o.style.display="";const d=m=>{m.target===r&&(i.style.display="none",r.style.display="none",r.removeEventListener("click",d))};r.addEventListener("click",d)})}function X(e,t,n={}){const o=document.querySelector(e),i=document.querySelector(t),{navbar:r,menuButton:a,modal:d,backdrop:m,links:p,logoText:u,body:f}=Z(n),y=s=>{document.body.className=s,localStorage.setItem("theme",s);const c=s==="dark-theme";o&&(o.checked=c),f&&(f.style.backgroundColor=c?"#121212":"#fff"),a&&(a.style.color=c?"#b7b7b7":"#595959"),r&&(r.style.backgroundColor=c?"#000":"#fff"),d&&(d.style.backgroundColor=c?"#000":"#f8f8f8"),u&&(u.style.color=c?"#fff":"#282828"),p&&p.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),d&&d.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),m&&(m.style.backgroundColor=c?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",m.style.zIndex="1"),i==null||i.setAttribute("href",`../img/icon.svg#${c?"icon-Vector":"icon-Sun"}`)};y(localStorage.getItem("theme")||"light-theme"),o==null||o.addEventListener("change",()=>y(o.checked?"dark-theme":"light-theme"))}function Z(e){const t={};for(const n in e){const o=document.querySelector(e[n]);t[n]=o||null}return t}const ee="c0fe092c4149192005601ffec65036a5",te="https://api.themoviedb.org/3",D={language:"en-US",region:"TR"};function w(e,t={}){const n=new URL(`${te}${e}`);n.searchParams.set("api_key",ee);const o={...D,...t};return Object.entries(o).forEach(([i,r])=>{r!=null&&r!==""&&n.searchParams.set(i,r)}),n.toString()}async function oe(e=1){return(await fetch(w("/trending/movie/week",{page:e}))).json()}async function j(e){return(await fetch(w(`/movie/${e}`))).json()}async function N(){return(await fetch(w("/genre/movie/list"))).json()}async function ne(e,t,{region:n=D.region}={}){return(await fetch(w("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:n,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const R="myLibraryMovies_v1",B=()=>{try{const e=localStorage.getItem(R);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},F=e=>{try{localStorage.setItem(R,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},O=e=>!!B()[e],re=e=>{if(!e||!e.id)return;const t=B();t[e.id]=e,F(t)},ie=e=>{const t=B();t[e]&&(delete t[e],F(t))},S=document.querySelector(".modal"),q=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const h=document.querySelector(".modal-add-button");let L=null;const ae=()=>{S&&(S.classList.remove("is-open"),S.setAttribute("aria-hidden","true"),L=null)};q&&q.addEventListener("click",e=>{e.stopPropagation(),ae()});const A=e=>{if(!h)return;const t=O(e);h.textContent=t?"Remove from my Library":"Add to my Library",h.dataset.inLibrary=t?"true":"false",h.dataset.movieId=e};h&&h.addEventListener("click",async e=>{e.preventDefault();const t=h.dataset.movieId||L&&L.id;if(!t)return;if(O(t)){ie(t),A(t);return}let o=L;if(!o||String(t)!==String(o.id))try{o=await j(t)}catch(r){console.error("fetchMovieDetails fonksiyonu hatası:",r);return}const i={id:o.id,title:o.title||o.name||"",poster_path:o.poster_path||"",vote_average:o.vote_average??0,vote_count:o.vote_count??0,popularity:o.popularity??0,genres:o.genres??o.genre_ids??[],overview:o.overview||"",savedAt:new Date().toISOString()};re(i),A(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const k=document.getElementById("upcoming-content");if(k){let d=function(){return JSON.parse(localStorage.getItem("library"))||[]},m=function(s){return d().includes(s)},p=function(s,c){let l=JSON.parse(localStorage.getItem("library"))||[];l.some(b=>b.id===s.id)?(l=l.filter(b=>b.id!==s.id),c.textContent="Add to my library",c.classList.remove("btn-remove"),c.classList.add("btn-add")):(l.push(s),c.textContent="Remove from my library",c.classList.remove("btn-add"),c.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(l))},u=function(s){return s.map(c=>{var l;return(l=a.find(g=>g.id===c))==null?void 0:l.name}).filter(Boolean).join(", ")},f=function(s){var M,_;const c=s.backdrop_path?`https://image.tmdb.org/t/p/original/${s.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",l=m(s.id),g=l?"Remove from my library":"Add to my library",b=l?"btn-remove":"btn-add",z=u(s.genre_ids||[]);k.innerHTML=`
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
                <span class="vote-box">${((M=s.vote_average)==null?void 0:M.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${s.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((_=s.popularity)==null?void 0:_.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${z||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${s.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${b}">${g}</button>
        </div>
      </div>
    `;const v=document.getElementById("library-btn");v==null||v.addEventListener("click",()=>p(s,v))};const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),o=new Date(t,e.getMonth()+1,0).getDate(),i=`${t}-${n}-01`,r=`${t}-${n}-${o}`;let a=[];async function y(){try{a=(await N()).genres||[];const l=(await ne(i,r,{region:"TR"})).results||[];if(!l.length){k.innerHTML=`<p>${l.length} movies this month.</p>`;return}const g=l[Math.floor(Math.random()*l.length)];f(g)}catch(s){console.error("upcoming init error:",s),k.innerHTML="<p>Error while fetching movie data.</p>"}}y()}const E=document.querySelector(".weekly-gallery"),se=document.querySelector(".see-all");let $=[],x=!1;function U(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function le(e){const t=Math.floor(e/2),n=e%2>=1,o=5-t-(n?1:0);let i=[];for(let r=0;r<t;r++)i.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');n&&i.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let r=0;r<o;r++)i.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return i.join("")}function ce(e,t){let n=JSON.parse(localStorage.getItem("library"))||[];n.some(i=>i.id===e.id)?(n=n.filter(i=>i.id!==e.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(n.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}async function H(e=U()){try{const[t,n]=await Promise.all([oe(),N()]);$=t.results;const o=n.genres.reduce((a,d)=>(a[d.id]=d.name,a),{}),r=$.slice(0,e).map(a=>{const d=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",m=a.genre_ids.map(f=>o[f]).slice(0,1).join(", "),p=a.release_date?a.release_date.slice(0,4):"N/A",u=le(a.vote_average);return`
          <li class="weekly-card" data-id="${a.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${d}" alt="${a.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${a.title.toUpperCase()}</h3>
                <p class="card-info">${m} | ${p}</p>
                <div class="card-rating">${u}</div>
              </div>
            </div>
          </li>
        `}).join("");E.innerHTML=r}catch(t){console.error("Weekly trends fetch error:",t),E.innerHTML="<p>Veriler alınamadı.</p>"}}se.addEventListener("click",()=>{x=!x;const e=x?$.length:U();H(e)});E.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{let p=function(u){u.key==="Escape"&&(m.close(),window.removeEventListener("keydown",p))};const o=await j(n),i=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",r=o.genres.map(u=>u.name).join(", "),d=(JSON.parse(localStorage.getItem("library"))||[]).includes(o.id),m=J.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${i}" class="modal-poster" alt="${o.title}">
        <div class="modal-details">
          <h2>${o.title}</h2>
          <p><strong>Vote / Votes:</strong> ${o.vote_average} / ${o.vote_count}</p>
          <p><strong>Popularity:</strong> ${o.popularity}</p>
          <p><strong>Genre:</strong> ${r}</p>
          <h3>ABOUT</h3>
          <p>${o.overview}</p>
          <button class="library-btn-w ${d?"remove-from-library":"library-btn-w"}">
            ${d?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close());const y=u.element().querySelector(".library-btn-w");y.addEventListener("click",()=>ce(o,y))}});m.show(),window.addEventListener("keydown",p)}catch(o){console.error("Popup açılırken hata:",o)}});H();
//# sourceMappingURL=index-aQCUEyeH.js.map
