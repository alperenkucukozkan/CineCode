import{b as P}from"./vendor-D_5xFgaM.js";const F=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"./img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function G(e){return`
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
  `}function V(){const e=document.createElement("div");e.className="modal-overlay",e.id="modal",e.innerHTML=`
    <div class="modal-content">
      <span class="close-btn" id="closeModal">&times;</span>
      <h2 class="modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${F.map(G).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e)}function K(){const e=document.createElement("footer");e.className="footer",e.innerHTML=`
    <div class="container">
      <p class="footer-description">
        © 2025 | All Rights Reserved | Developed with <span>🧡</span> by
        <a class="goit-students" href="#" id="openModalLink"> GoIT Students </a>
      </p>
    </div>
  `,document.body.appendChild(e)}document.addEventListener("DOMContentLoaded",()=>{K(),V();const e=document.getElementById("modal"),t=document.getElementById("closeModal");document.getElementById("openModalLink").addEventListener("click",n=>{n.preventDefault(),e.classList.add("active")}),t.addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",n=>{modalContent.contains(n.target)||e.classList.remove("active")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.remove("active")})});function B(){I("#menuLinks","menuLinks:active"),I("#links","menuLinks:active"),Y("#menu",".sidebar",".sidebar-backdrop"),z("#toggle",".theme-toggle use",{navbar:"header",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text",body:"body"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B):B();function I(e,t){var a;const o=document.querySelector(e);if(!o)return;const n=localStorage.getItem(t);if(n){const r=o.querySelector(`a[href="${n}"]`),s=r==null?void 0:r.closest("li");s&&((a=o.querySelector(".active"))==null||a.classList.remove("active"),s.classList.add("active"))}o.addEventListener("click",r=>{var m,g;const s=r.target.closest("li");if(!s||!o.contains(s))return;(m=o.querySelector(".active"))==null||m.classList.remove("active"),s.classList.add("active");const d=(g=s.querySelector("a"))==null?void 0:g.getAttribute("href");d&&localStorage.setItem(t,d)})}function Y(e,t,o){const n=document.querySelector(e),a=document.querySelector(t),r=document.querySelector(o);!n||!a||!r||n.addEventListener("click",()=>{console.log("clicked");const s=a.style.display==="flex";a.style.display=s?"none":"flex",r.style.display=s?"none":"block",n.style.display="";const d=m=>{m.target===r&&(a.style.display="none",r.style.display="none",r.removeEventListener("click",d))};r.addEventListener("click",d)})}function z(e,t,o={}){const n=document.querySelector(e),a=document.querySelector(t),{navbar:r,menuButton:s,modal:d,backdrop:m,links:g,logoText:u,body:y}=W(o),h=i=>{document.body.className=i,localStorage.setItem("theme",i);const c=i==="dark-theme";n&&(n.checked=c),y&&(y.style.backgroundColor=c?"#121212":"#fff"),s&&(s.style.color=c?"#b7b7b7":"#595959"),r&&(r.style.backgroundColor=c?"#000":"#fff"),d&&(d.style.backgroundColor=c?"#000":"#f8f8f8"),u&&(u.style.color=c?"#fff":"#282828"),g&&g.querySelectorAll("a").forEach(l=>{var p;l.style.color=c?"#fff":"#111",(p=l.closest("li"))!=null&&p.classList.contains("active")&&(l.style.color="#f87719")}),d&&d.querySelectorAll("a").forEach(l=>{var p;l.style.color=c?"#fff":"#111",(p=l.closest("li"))!=null&&p.classList.contains("active")&&(l.style.color="#f87719")}),m&&(m.style.backgroundColor=c?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",m.style.zIndex="1"),a==null||a.setAttribute("href",`../img/icon.svg#${c?"icon-Vector":"icon-Sun"}`)};h(localStorage.getItem("theme")||"light-theme"),n==null||n.addEventListener("change",()=>h(n.checked?"dark-theme":"light-theme"))}function W(e){const t={};for(const o in e){const n=document.querySelector(e[o]);t[o]=n||null}return t}const Q=document.querySelectorAll("button");Q.forEach(e=>{e.addEventListener("click",t=>{t.target.classList.add("activeLoading")})});const X="c0fe092c4149192005601ffec65036a5",Z="https://api.themoviedb.org/3",A={language:"en-US",region:"TR"};function S(e,t={}){const o=new URL(`${Z}${e}`);o.searchParams.set("api_key",X);const n={...A,...t};return Object.entries(n).forEach(([a,r])=>{r!=null&&r!==""&&o.searchParams.set(a,r)}),o.toString()}async function ee(e=1){return(await fetch(S("/trending/movie/week",{page:e}))).json()}async function D(e){return(await fetch(S(`/movie/${e}`))).json()}async function N(){return(await fetch(S("/genre/movie/list"))).json()}async function te(e,t,{region:o=A.region}={}){return(await fetch(S("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:o,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const R="myLibraryMovies_v1",C=()=>{try{const e=localStorage.getItem(R);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},j=e=>{try{localStorage.setItem(R,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},O=e=>!!C()[e],ne=e=>{if(!e||!e.id)return;const t=C();t[e.id]=e,j(t)},oe=e=>{const t=C();t[e]&&(delete t[e],j(t))},w=document.querySelector(".modal"),q=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const f=document.querySelector(".modal-add-button");let L=null;const re=()=>{w&&(w.classList.remove("is-open"),w.setAttribute("aria-hidden","true"),L=null)};q&&q.addEventListener("click",e=>{e.stopPropagation(),re()});const x=e=>{if(!f)return;const t=O(e);f.textContent=t?"Remove from my Library":"Add to my Library",f.dataset.inLibrary=t?"true":"false",f.dataset.movieId=e};f&&f.addEventListener("click",async e=>{e.preventDefault();const t=f.dataset.movieId||L&&L.id;if(!t)return;if(O(t)){oe(t),x(t);return}let n=L;if(!n||String(t)!==String(n.id))try{n=await D(t)}catch(r){console.error("fetchMovieDetails fonksiyonu hatası:",r);return}const a={id:n.id,title:n.title||n.name||"",poster_path:n.poster_path||"",vote_average:n.vote_average??0,vote_count:n.vote_count??0,popularity:n.popularity??0,genres:n.genres??n.genre_ids??[],overview:n.overview||"",savedAt:new Date().toISOString()};ne(a),x(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const k=document.getElementById("upcoming-content");if(k){let d=function(){return JSON.parse(localStorage.getItem("library"))||[]},m=function(i){return d().includes(i)},g=function(i,c){let l=JSON.parse(localStorage.getItem("library"))||[];l.some(v=>v.id===i.id)?(l=l.filter(v=>v.id!==i.id),c.textContent="Add to my library",c.classList.remove("btn-remove"),c.classList.add("btn-add")):(l.push(i),c.textContent="Remove from my library",c.classList.remove("btn-add"),c.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(l))},u=function(i){return i.map(c=>{var l;return(l=s.find(p=>p.id===c))==null?void 0:l.name}).filter(Boolean).join(", ")},y=function(i){var M,T;const c=i.backdrop_path?`https://image.tmdb.org/t/p/original/${i.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",l=m(i.id),p=l?"Remove from my library":"Add to my library",v=l?"btn-remove":"btn-add",J=u(i.genre_ids||[]);k.innerHTML=`
      <div class="upcoming-card">
        <img src="${c}" alt="${i.title}" />
        <div class="info">
          <h3 class="movie-name">${i.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${i.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${((M=i.vote_average)==null?void 0:M.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${i.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((T=i.popularity)==null?void 0:T.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${J||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${i.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${v}">${p}</button>
        </div>
      </div>
    `;const b=document.getElementById("library-btn");b==null||b.addEventListener("click",()=>g(i,b))};const e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=new Date(t,e.getMonth()+1,0).getDate(),a=`${t}-${o}-01`,r=`${t}-${o}-${n}`;let s=[];async function h(){try{s=(await N()).genres||[];const l=(await te(a,r,{region:"TR"})).results||[];if(!l.length){k.innerHTML=`<p>${l.length} movies this month.</p>`;return}const p=l[Math.floor(Math.random()*l.length)];y(p)}catch(i){console.error("upcoming init error:",i),k.innerHTML="<p>Error while fetching movie data.</p>"}}h()}const $=document.querySelector(".weekly-gallery"),se=document.querySelector(".see-all");let _=[],E=!1;function U(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function ae(e){const t=Math.floor(e/2),o=e%2>=1,n=5-t-(o?1:0);let a=[];for(let r=0;r<t;r++)a.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');o&&a.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let r=0;r<n;r++)a.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return a.join("")}function ie(e,t){let o=JSON.parse(localStorage.getItem("library"))||[];o.some(a=>a.id===e.id)?(o=o.filter(a=>a.id!==e.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(o.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(o))}async function H(e=U()){try{const[t,o]=await Promise.all([ee(),N()]);_=t.results;const n=o.genres.reduce((s,d)=>(s[d.id]=d.name,s),{}),r=_.slice(0,e).map(s=>{const d=s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",m=s.genre_ids.map(y=>n[y]).slice(0,1).join(", "),g=s.release_date?s.release_date.slice(0,4):"N/A",u=ae(s.vote_average);return`
          <li class="weekly-card" data-id="${s.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${d}" alt="${s.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${s.title.toUpperCase()}</h3>
                <p class="card-info">${m} | ${g}</p>
                <div class="card-rating">${u}</div>
              </div>
            </div>
          </li>
        `}).join("");$.innerHTML=r}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}se.addEventListener("click",()=>{E=!E;const e=E?_.length:U();H(e)});$.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const o=t.dataset.id;try{let g=function(u){u.key==="Escape"&&(m.close(),window.removeEventListener("keydown",g))};const n=await D(o),a=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",r=n.genres.map(u=>u.name).join(", "),d=(JSON.parse(localStorage.getItem("library"))||[]).includes(n.id),m=P.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${a}" class="modal-poster" alt="${n.title}">
        <div class="modal-details">
          <h2>${n.title}</h2>
          <p><strong>Vote / Votes:</strong> ${n.vote_average} / ${n.vote_count}</p>
          <p><strong>Popularity:</strong> ${n.popularity}</p>
          <p><strong>Genre:</strong> ${r}</p>
          <h3>ABOUT</h3>
          <p>${n.overview}</p>
          <button class="library-btn-w ${d?"remove-from-library":"library-btn-w"}">
            ${d?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close());const h=u.element().querySelector(".library-btn-w");h.addEventListener("click",()=>ie(n,h))}});m.show(),window.addEventListener("keydown",g)}catch(n){console.error("Popup açılırken hata:",n)}});H();
//# sourceMappingURL=index-CigY48JR.js.map
