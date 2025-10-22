import{b as W}from"./vendor-D_5xFgaM.js";const K=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"./img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"./img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"./img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"./img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"./img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Hilmi Şafak",role:"Developer",img:"./img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"./img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"./img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"./img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function Q(){const e=document.createElement("style");e.textContent=`
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

    .modal-title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .modal-overlay {
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

    .modal-overlay.active {
      display: flex;
    }

    .modal-content {
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

    .close-btn {
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
      gap: 20px;
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
      fill: #f87719;
    }
  `,document.head.appendChild(e)}function X(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.name}" />
      <div class="student-info">
        <h3>${e.name}</h3>
        <p>${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank" aria-label="GitHub">
          <svg class="info-icon" width="40" height="40">
            <use href="#icon-github"></use>
          </svg>
        </a>
        ${e.linkedin!=="#"?`
        <a class="footer-icon" href="${e.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="40" height="40">
            <use href="#icon-linkedin"></use>
          </svg>
        </a>`:""}
      </div>
    </li>
  `}function Z(){const e=document.createElement("footer");e.className="footer",e.innerHTML=`
    <p>
      © 2025 | All Rights Reserved | Developed with 🧡 by
      <button class="goit-students" id="openModalBtn">GoIT Students</button>
    </p>
  `,document.body.appendChild(e)}function ee(){const e=document.createElement("div");e.className="modal-overlay",e.id="modal",e.innerHTML=`
    <div class="modal-content">
      <span class="close-btn" id="closeModalBtn">&times;</span>
      <h2 class="modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${K.map(X).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e)}function D(){const e=document.querySelector(".modal-content"),t=document.querySelector(".footer");!e||!t||(window.matchMedia("(max-width: 768px)").matches?(e.style.maxWidth="300px",t.style.paddingBottom="100px"):window.matchMedia("(max-width: 1279px)").matches?(e.style.maxWidth="720px",t.style.paddingBottom="80px"):(e.style.maxWidth="1200px",t.style.paddingBottom="50px"))}function te(){Q(),Z(),ee(),D(),window.addEventListener("resize",D);const e=document.getElementById("modal"),t=e.querySelector(".modal-content"),o=document.getElementById("openModalBtn"),n=document.getElementById("closeModalBtn");o.addEventListener("click",()=>{e.classList.add("active"),document.body.style.overflow="hidden"}),n.addEventListener("click",()=>{e.classList.remove("active"),document.body.style.overflow=""}),e.addEventListener("click",a=>{t.contains(a.target)||(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",a=>{a.key==="Escape"&&(e.classList.remove("active"),document.body.style.overflow="")})}document.addEventListener("DOMContentLoaded",te);function N(){j("#menuLinks","menuLinks:active"),j("#links","menuLinks:active"),ne("#menu",".sidebar",".sidebar-backdrop"),oe("#toggle",".theme-toggle use",{navbar:"header",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text",body:"body"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",N):N();function j(e,t){var a;const o=document.querySelector(e);if(!o)return;const n=localStorage.getItem(t);if(n){const r=o.querySelector(`a[href="${n}"]`),s=r==null?void 0:r.closest("li");s&&((a=o.querySelector(".active"))==null||a.classList.remove("active"),s.classList.add("active"))}o.addEventListener("click",r=>{var u,p;const s=r.target.closest("li");if(!s||!o.contains(s))return;(u=o.querySelector(".active"))==null||u.classList.remove("active"),s.classList.add("active");const d=(p=s.querySelector("a"))==null?void 0:p.getAttribute("href");d&&localStorage.setItem(t,d)})}function ne(e,t,o){const n=document.querySelector(e),a=document.querySelector(t),r=document.querySelector(o);!n||!a||!r||n.addEventListener("click",()=>{console.log("clicked");const s=a.style.display==="flex";a.style.display=s?"none":"flex",r.style.display=s?"none":"block",n.style.display="";const d=u=>{u.target===r&&(a.style.display="none",r.style.display="none",r.removeEventListener("click",d))};r.addEventListener("click",d)})}function oe(e,t,o={}){const n=document.querySelector(e),a=document.querySelector(t),{navbar:r,menuButton:s,modal:d,backdrop:u,links:p,logoText:m,body:y}=re(o),h=i=>{document.body.className=i,localStorage.setItem("theme",i);const c=i==="dark-theme";n&&(n.checked=c),y&&(y.style.backgroundColor=c?"#121212":"#fff"),s&&(s.style.color=c?"#b7b7b7":"#595959"),r&&(r.style.backgroundColor=c?"#000":"#fff"),d&&(d.style.backgroundColor=c?"#000":"#f8f8f8"),m&&(m.style.color=c?"#fff":"#282828"),p&&p.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),d&&d.querySelectorAll("a").forEach(l=>{var g;l.style.color=c?"#fff":"#111",(g=l.closest("li"))!=null&&g.classList.contains("active")&&(l.style.color="#f87719")}),u&&(u.style.backgroundColor=c?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",u.style.zIndex="1"),a==null||a.setAttribute("href",`../img/icon.svg#${c?"icon-Vector":"icon-Sun"}`)};h(localStorage.getItem("theme")||"light-theme"),n==null||n.addEventListener("change",()=>h(n.checked?"dark-theme":"light-theme"))}function re(e){const t={};for(const o in e){const n=document.querySelector(e[o]);t[o]=n||null}return t}const ae=document.querySelectorAll("button");ae.forEach(e=>{e.addEventListener("click",t=>{t.target.classList.add("activeLoading")})});const se="c0fe092c4149192005601ffec65036a5",ie="https://api.themoviedb.org/3",U={language:"en-US",region:"TR"};function E(e,t={}){const o=new URL(`${ie}${e}`);o.searchParams.set("api_key",se);const n={...U,...t};return Object.entries(n).forEach(([a,r])=>{r!=null&&r!==""&&o.searchParams.set(a,r)}),o.toString()}async function le(e=1){return(await fetch(E("/trending/movie/week",{page:e}))).json()}async function H(e){return(await fetch(E(`/movie/${e}`))).json()}async function F(){return(await fetch(E("/genre/movie/list"))).json()}async function ce(e,t,{region:o=U.region}={}){return(await fetch(E("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:o,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const P="myLibraryMovies_v1",I=()=>{try{const e=localStorage.getItem(P);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},z=e=>{try{localStorage.setItem(P,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},J=e=>!!I()[e],de=e=>{if(!e||!e.id)return;const t=I();t[e.id]=e,z(t)},ue=e=>{const t=I();t[e]&&(delete t[e],z(t))},$=document.querySelector(".modal"),R=document.querySelector(".close-icon");document.querySelector(".modal-img");document.querySelector(".movie-title");document.querySelector(".votes-puanlama");document.querySelector(".votes-oysayisi");document.querySelector(".popularity-value");document.querySelector(".genre-value");document.querySelector(".about-value");const f=document.querySelector(".modal-add-button");let S=null;const me=()=>{$&&($.classList.remove("is-open"),$.setAttribute("aria-hidden","true"),S=null)};R&&R.addEventListener("click",e=>{e.stopPropagation(),me()});const O=e=>{if(!f)return;const t=J(e);f.textContent=t?"Remove from my Library":"Add to my Library",f.dataset.inLibrary=t?"true":"false",f.dataset.movieId=e};f&&f.addEventListener("click",async e=>{e.preventDefault();const t=f.dataset.movieId||S&&S.id;if(!t)return;if(J(t)){ue(t),O(t);return}let n=S;if(!n||String(t)!==String(n.id))try{n=await H(t)}catch(r){console.error("fetchMovieDetails fonksiyonu hatası:",r);return}const a={id:n.id,title:n.title||n.name||"",poster_path:n.poster_path||"",vote_average:n.vote_average??0,vote_count:n.vote_count??0,popularity:n.popularity??0,genres:n.genres??n.genre_ids??[],overview:n.overview||"",savedAt:new Date().toISOString()};de(a),O(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const pe="f110e770169ce8b0fb6c62491d2b9ebb",ge="https://api.themoviedb.org/3/search/movie",x=document.querySelector(".catalog-search-input"),ye=document.querySelector(".catalog-search-button"),B=document.getElementById("filmList"),_=document.getElementById("alertMessage"),k=document.createElement("select");k.className="year-select";k.innerHTML='<option value="">Year</option>';for(let e=new Date().getFullYear();e>=1950;e--)k.innerHTML+=`<option value="${e}">${e}</option>`;document.querySelector(".search-container").appendChild(k);const b=document.createElement("button");b.textContent="×";b.className="clear-button";b.style.display="none";document.querySelector(".search-container").appendChild(b);async function he(e,t){const o=`${ge}?api_key=${pe}&query=${encodeURIComponent(e)}${t?`&year=${t}`:""}`,a=await(await fetch(o)).json();B.innerHTML="",a.results&&a.results.length>0?(_.style.display="none",a.results.forEach(r=>{const s=document.createElement("div");s.className="movie-item",s.innerHTML=`
        <h3>${r.title}</h3>
        <p>${r.release_date||"No release date available"}</p>
        <p>${r.overview||"No description available"}</p>
      `,B.appendChild(s)})):_.style.display="block"}ye.addEventListener("click",()=>{const e=x.value.trim(),t=k.value;e&&he(e,t)});b.addEventListener("click",()=>{x.value="",b.style.display="none",B.innerHTML="",_.style.display="none"});x.addEventListener("input",()=>{b.style.display=x.value.trim()?"inline-block":"none"});const w=document.getElementById("upcoming-content");if(w){let d=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(i){return d().includes(i)},p=function(i,c){let l=JSON.parse(localStorage.getItem("library"))||[];l.some(v=>v.id===i.id)?(l=l.filter(v=>v.id!==i.id),c.textContent="Add to my library",c.classList.remove("btn-remove"),c.classList.add("btn-add")):(l.push(i),c.textContent="Remove from my library",c.classList.remove("btn-add"),c.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(l))},m=function(i){return i.map(c=>{var l;return(l=s.find(g=>g.id===c))==null?void 0:l.name}).filter(Boolean).join(", ")},y=function(i){var T,A;const c=i.backdrop_path?`https://image.tmdb.org/t/p/original/${i.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",l=u(i.id),g=l?"Remove from my library":"Add to my library",v=l?"btn-remove":"btn-add",V=m(i.genre_ids||[]);w.innerHTML=`
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
                <span class="vote-box">${((T=i.vote_average)==null?void 0:T.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${i.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((A=i.popularity)==null?void 0:A.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${V||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${i.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${v}">${g}</button>
        </div>
      </div>
    `;const L=document.getElementById("library-btn");L==null||L.addEventListener("click",()=>p(i,L))};const e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=new Date(t,e.getMonth()+1,0).getDate(),a=`${t}-${o}-01`,r=`${t}-${o}-${n}`;let s=[];async function h(){try{s=(await F()).genres||[];const l=(await ce(a,r,{region:"TR"})).results||[];if(!l.length){w.innerHTML=`<p>${l.length} movies this month.</p>`;return}const g=l[Math.floor(Math.random()*l.length)];y(g)}catch(i){console.error("upcoming init error:",i),w.innerHTML="<p>Error while fetching movie data.</p>"}}h()}const C=document.querySelector(".weekly-gallery"),fe=document.querySelector(".see-all");let q=[],M=!1;function G(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function be(e){const t=Math.floor(e/2),o=e%2>=1,n=5-t-(o?1:0);let a=[];for(let r=0;r<t;r++)a.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');o&&a.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let r=0;r<n;r++)a.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return a.join("")}function ve(e,t){let o=JSON.parse(localStorage.getItem("library"))||[];o.some(a=>a.id===e.id)?(o=o.filter(a=>a.id!==e.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(o.push(e),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(o))}async function Y(e=G()){try{const[t,o]=await Promise.all([le(),F()]);q=t.results;const n=o.genres.reduce((s,d)=>(s[d.id]=d.name,s),{}),r=q.slice(0,e).map(s=>{const d=s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=s.genre_ids.map(y=>n[y]).slice(0,1).join(", "),p=s.release_date?s.release_date.slice(0,4):"N/A",m=be(s.vote_average);return`
          <li class="weekly-card" data-id="${s.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${d}" alt="${s.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${s.title.toUpperCase()}</h3>
                <p class="card-info">${u} | ${p}</p>
                <div class="card-rating">${m}</div>
              </div>
            </div>
          </li>
        `}).join("");C.innerHTML=r}catch(t){console.error("Weekly trends fetch error:",t),C.innerHTML="<p>Veriler alınamadı.</p>"}}fe.addEventListener("click",()=>{M=!M;const e=M?q.length:G();Y(e)});C.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const o=t.dataset.id;try{let p=function(m){m.key==="Escape"&&(u.close(),window.removeEventListener("keydown",p))};const n=await H(o),a=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",r=n.genres.map(m=>m.name).join(", "),d=(JSON.parse(localStorage.getItem("library"))||[]).includes(n.id),u=W.create(`
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
      `,{onShow:m=>{m.element().querySelector(".popup-close-btn").addEventListener("click",()=>m.close());const h=m.element().querySelector(".library-btn-w");h.addEventListener("click",()=>ve(n,h))}});u.show(),window.addEventListener("keydown",p)}catch(n){console.error("Popup açılırken hata:",n)}});Y();
//# sourceMappingURL=index-BnXhAsf0.js.map
