import{b as J}from"./vendor-D_5xFgaM.js";const P=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"./img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function F(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.role}" width="200" height="260" />
      <div class="student-info">
        <h3 class="team-person">${e.name}</h3>
        <p class="team-role">${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank">
          <svg class="info-icon" width="40" height="40">
            <use href="../img/svg#icon-github"></use>
          </svg>
        </a>
        <a class="footer-icon" href="${e.linkedin}" target="_blank">
          <svg class="info-icon" width="40" height="40">
            <use href="../img/svg#icon-linkedin"></use>
          </svg>
        </a>
      </div>
    </li>
  `}function G(){const e=document.createElement("div");e.className="modal-overlay",e.id="modal",e.innerHTML=`
    <div class="modal-content">
      <span class="close-btn" id="closeModal">&times;</span>
      <h2 class="modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${P.map(F).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e)}function V(){const e=document.createElement("footer");e.className="footer",e.innerHTML=`
    <div class="container">
      <p class="footer-description">
        © 2025 | All Rights Reserved | Developed with <span>🧡</span> by
        <a class="goit-students" href="#" id="openModalLink"> GoIT Students </a>
      </p>
    </div>
  `,document.body.appendChild(e)}document.addEventListener("DOMContentLoaded",()=>{V(),G();const e=document.getElementById("modal"),t=document.getElementById("closeModal");document.getElementById("openModalLink").addEventListener("click",n=>{n.preventDefault(),e.classList.add("active")}),t.addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",n=>{modalContent.contains(n.target)||e.classList.remove("active")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.remove("active")})});document.addEventListener("DOMContentLoaded",()=>{B("#menuLinks","menuLinks:active"),B("#links","menuLinks:active"),K("#menu",".sidebar",".sidebar-backdrop"),Y("#toggle",".theme-toggle use",{navbar:"#navbar",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text"})});function B(e,t){var i;const r=document.querySelector(e);if(!r)return;const n=localStorage.getItem(t);if(n){const o=r.querySelector(`a[href="${n}"]`),a=o==null?void 0:o.closest("li");a&&((i=r.querySelector(".active"))==null||i.classList.remove("active"),a.classList.add("active"))}r.addEventListener("click",o=>{var m,p;const a=o.target.closest("li");if(!a||!r.contains(a))return;(m=r.querySelector(".active"))==null||m.classList.remove("active"),a.classList.add("active");const c=(p=a.querySelector("a"))==null?void 0:p.getAttribute("href");c&&localStorage.setItem(t,c)})}function K(e,t,r){const n=document.querySelector(e),i=document.querySelector(t),o=document.querySelector(r);!n||!i||!o||n.addEventListener("click",()=>{const a=i.style.display==="flex";i.style.display=a?"none":"flex",o.style.display=a?"none":"block",n.style.display="";const c=m=>{m.target===o&&(i.style.display="none",o.style.display="none",i.removeEventListener("click",c))};o.addEventListener("click",c)})}function Y(e,t,r={}){const n=document.querySelector(e),i=document.querySelector(t),{navbar:o,menuButton:a,modal:c,backdrop:m,links:p,logoText:u}=z(r),y=g=>{document.body.className=g,localStorage.setItem("theme",g);const s=g==="dark-theme";n&&(n.checked=s),a&&(a.style.color=s?"#b7b7b7":"#595959"),o&&(o.style.backgroundColor=s?"#000":"#fff"),c&&(c.style.backgroundColor=s?"#000":"#f8f8f8"),u&&(u.style.color=s?"#fff":"#282828"),p&&p.querySelectorAll("a").forEach(d=>{var l;d.style.color=s?"#fff":"#111",(l=d.closest("li"))!=null&&l.classList.contains("active")&&(d.style.color="#f87719")}),c&&c.querySelectorAll("a").forEach(d=>{var l;d.style.color=s?"#fff":"#111",(l=d.closest("li"))!=null&&l.classList.contains("active")&&(d.style.color="#f87719")}),m&&(m.style.backgroundColor=s?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",m.style.zIndex="1"),i==null||i.setAttribute("href",`../img/icon.svg#${s?"icon-Vector":"icon-Sun"}`)};y(localStorage.getItem("theme")||"light-theme"),n==null||n.addEventListener("change",()=>y(n.checked?"dark-theme":"light-theme"))}function z(e){const t={};for(const r in e){const n=document.querySelector(e[r]);t[r]=n||null}return t}const W=document.querySelectorAll("button");W.forEach(e=>{e.addEventListener("click",t=>{t.target.classList.add("activeLoading")})});const Q="c0fe092c4149192005601ffec65036a5",X="https://api.themoviedb.org/3",x={language:"en-US",region:"TR"};function S(e,t={}){const r=new URL(`${X}${e}`);r.searchParams.set("api_key",Q);const n={...x,...t};return Object.entries(n).forEach(([i,o])=>{o!=null&&o!==""&&r.searchParams.set(i,o)}),r.toString()}async function Z(e=1){return(await fetch(S("/trending/movie/week",{page:e}))).json()}async function A(e){return(await fetch(S(`/movie/${e}`))).json()}async function D(){return(await fetch(S("/genre/movie/list"))).json()}async function ee(e,t,{region:r=x.region}={}){return(await fetch(S("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:r,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const N="myLibraryMovies_v1",M=()=>{try{const e=localStorage.getItem(N);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},R=e=>{try{localStorage.setItem(N,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},j=e=>!!M()[e],te=e=>{if(!e||!e.id)return;const t=M();t[e.id]=e,R(t)},ne=e=>{const t=M();t[e]&&(delete t[e],R(t))},w=document.querySelector(".modal"),I=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const h=document.querySelector(".modal-add-button");let L=null;const re=()=>{w&&(w.classList.remove("is-open"),w.setAttribute("aria-hidden","true"),L=null)};I&&I.addEventListener("click",e=>{e.stopPropagation(),re()});const q=e=>{if(!h)return;const t=j(e);h.textContent=t?"Remove from my Library":"Add to my Library",h.dataset.inLibrary=t?"true":"false",h.dataset.movieId=e};h&&h.addEventListener("click",async e=>{e.preventDefault();const t=h.dataset.movieId||L&&L.id;if(!t)return;if(j(t)){ne(t),q(t);return}let n=L;if(!n||String(t)!==String(n.id))try{n=await A(t)}catch(o){console.error("fetchMovieDetails fonksiyonu hatası:",o);return}const i={id:n.id,title:n.title||n.name||"",poster_path:n.poster_path||"",vote_average:n.vote_average??0,vote_count:n.vote_count??0,popularity:n.popularity??0,genres:n.genres??n.genre_ids??[],overview:n.overview||"",savedAt:new Date().toISOString()};te(i),q(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const k=document.getElementById("upcoming-content");if(k){let c=function(){return JSON.parse(localStorage.getItem("library"))||[]},m=function(s){return c().includes(s)},p=function(s,d){let l=JSON.parse(localStorage.getItem("library"))||[];l.some(f=>f.id===s.id)?(l=l.filter(f=>f.id!==s.id),d.textContent="Add to my library",d.classList.remove("btn-remove"),d.classList.add("btn-add")):(l.push(s),d.textContent="Remove from my library",d.classList.remove("btn-add"),d.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(l))},u=function(s){return s.map(d=>{var l;return(l=a.find(v=>v.id===d))==null?void 0:l.name}).filter(Boolean).join(", ")},y=function(s){var C,T;const d=s.backdrop_path?`https://image.tmdb.org/t/p/original/${s.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",l=m(s.id),v=l?"Remove from my library":"Add to my library",f=l?"btn-remove":"btn-add",H=u(s.genre_ids||[]);k.innerHTML=`
      <div class="upcoming-card">
        <img src="${d}" alt="${s.title}" />
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
                <span class="vote-box">${((C=s.vote_average)==null?void 0:C.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${s.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((T=s.popularity)==null?void 0:T.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${H||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${s.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${f}">${v}</button>
        </div>
      </div>
    `;const b=document.getElementById("library-btn");b==null||b.addEventListener("click",()=>p(s,b))};const e=new Date,t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=new Date(t,e.getMonth()+1,0).getDate(),i=`${t}-${r}-01`,o=`${t}-${r}-${n}`;let a=[];async function g(){try{a=(await D()).genres||[];const l=(await ee(i,o,{region:"TR"})).results||[];if(!l.length){k.innerHTML=`<p>${l.length} movies this month.</p>`;return}const v=l[Math.floor(Math.random()*l.length)];y(v)}catch(s){console.error("upcoming init error:",s),k.innerHTML="<p>Error while fetching movie data.</p>"}}g()}const $=document.querySelector(".weekly-gallery"),oe=document.querySelector(".see-all");let _=[],E=!1;function O(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function se(e){const t=Math.floor(e/2),r=e%2>=1,n=5-t-(r?1:0);let i=[];for(let o=0;o<t;o++)i.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');r&&i.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let o=0;o<n;o++)i.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return i.join("")}function ae(e,t){let r=JSON.parse(localStorage.getItem("library"))||[];r.some(i=>i.id===e.id)?(r=r.filter(i=>i.id!==e.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(r.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(r))}async function U(e=O()){try{const[t,r]=await Promise.all([Z(),D()]);_=t.results;const n=r.genres.reduce((a,c)=>(a[c.id]=c.name,a),{}),o=_.slice(0,e).map(a=>{const c=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",m=a.genre_ids.map(y=>n[y]).slice(0,1).join(", "),p=a.release_date?a.release_date.slice(0,4):"N/A",u=se(a.vote_average);return`
          <li class="weekly-card" data-id="${a.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${c}" alt="${a.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${a.title.toUpperCase()}</h3>
                <p class="card-info">${m} | ${p}</p>
                <div class="card-rating">${u}</div>
              </div>
            </div>
          </li>
        `}).join("");$.innerHTML=o}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}oe.addEventListener("click",()=>{E=!E;const e=E?_.length:O();U(e)});$.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const r=t.dataset.id;try{let p=function(u){u.key==="Escape"&&(m.close(),window.removeEventListener("keydown",p))};const n=await A(r),i=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",o=n.genres.map(u=>u.name).join(", "),c=(JSON.parse(localStorage.getItem("library"))||[]).includes(n.id),m=J.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${i}" class="modal-poster" alt="${n.title}">
        <div class="modal-details">
          <h2>${n.title}</h2>
          <p><strong>Vote / Votes:</strong> ${n.vote_average} / ${n.vote_count}</p>
          <p><strong>Popularity:</strong> ${n.popularity}</p>
          <p><strong>Genre:</strong> ${o}</p>
          <h3>ABOUT</h3>
          <p>${n.overview}</p>
          <button class="library-btn-w ${c?"remove-from-library":"library-btn-w"}">
            ${c?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close());const g=u.element().querySelector(".library-btn-w");g.addEventListener("click",()=>ae(n,g))}});m.show(),window.addEventListener("keydown",p)}catch(n){console.error("Popup açılırken hata:",n)}});U();
//# sourceMappingURL=index-5kqpkSPw.js.map
