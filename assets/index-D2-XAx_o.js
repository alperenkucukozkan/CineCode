import{b as P}from"./vendor-D_5xFgaM.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".modal-overlay"),t=document.querySelector(".goit-students"),o=document.getElementById("closeModal");t.addEventListener("click",r=>{r.preventDefault(),e.classList.add("active")}),o.addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",r=>{r.target===e&&(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",r=>{r.key==="Escape"&&e.classList.contains("active")&&(e.classList.remove("active"),document.body.style.overflow="")})});document.addEventListener("DOMContentLoaded",()=>{M("#menuLinks","menuLinks:active"),M("#links","menuLinks:active"),V("#menu",".sidebar",".sidebar-backdrop"),F("#toggle",".theme-toggle use",{navbar:"#navbar",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text"})});function M(e,t){var i;const o=document.querySelector(e);if(!o)return;const r=localStorage.getItem(t);if(r){const s=o.querySelector(`a[href="${r}"]`),a=s==null?void 0:s.closest("li");a&&((i=o.querySelector(".active"))==null||i.classList.remove("active"),a.classList.add("active"))}o.addEventListener("click",s=>{var u,m;const a=s.target.closest("li");if(!a||!o.contains(a))return;(u=o.querySelector(".active"))==null||u.classList.remove("active"),a.classList.add("active");const l=(m=a.querySelector("a"))==null?void 0:m.getAttribute("href");l&&localStorage.setItem(t,l)})}function V(e,t,o){const r=document.querySelector(e),i=document.querySelector(t),s=document.querySelector(o);!r||!i||!s||r.addEventListener("click",()=>{const a=i.style.display==="flex";i.style.display=a?"none":"flex",s.style.display=a?"none":"block",r.style.display="";const l=u=>{u.target===s&&(i.style.display="none",s.style.display="none",i.removeEventListener("click",l))};s.addEventListener("click",l)})}function F(e,t,o={}){const r=document.querySelector(e),i=document.querySelector(t),{navbar:s,menuButton:a,modal:l,backdrop:u,links:m,logoText:y}=G(o),v=g=>{document.body.className=g,localStorage.setItem("theme",g);const n=g==="dark-theme";r&&(r.checked=n),a&&(a.style.color=n?"#b7b7b7":"#595959"),s&&(s.style.backgroundColor=n?"#000":"#fff"),l&&(l.style.backgroundColor=n?"#000":"#f8f8f8"),y&&(y.style.color=n?"#fff":"#282828"),m&&m.querySelectorAll("a").forEach(d=>{var c;d.style.color=n?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),l&&l.querySelectorAll("a").forEach(d=>{var c;d.style.color=n?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),u&&(u.style.backgroundColor=n?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",u.style.zIndex="1"),i==null||i.setAttribute("href",`../img/icon.svg#${n?"icon-Vector":"icon-Sun"}`)};v(localStorage.getItem("theme")||"light-theme"),r==null||r.addEventListener("change",()=>v(r.checked?"dark-theme":"light-theme"))}function G(e){const t={};for(const o in e){const r=document.querySelector(e[o]);t[o]=r||null}return t}const H=document.querySelectorAll("button");H.forEach(e=>{e.addEventListener("click",t=>{t.target.classList.add("activeLoading")})});const W="c0fe092c4149192005601ffec65036a5",Y="https://api.themoviedb.org/3",A={language:"en-US",region:"TR"};function w(e,t={}){const o=new URL(`${Y}${e}`);o.searchParams.set("api_key",W);const r={...A,...t};return Object.entries(r).forEach(([i,s])=>{s!=null&&s!==""&&o.searchParams.set(i,s)}),o.toString()}async function K(e=1){return(await fetch(w("/trending/movie/week",{page:e}))).json()}async function D(e){return(await fetch(w(`/movie/${e}`))).json()}async function C(){return(await fetch(w("/genre/movie/list"))).json()}async function z(e,t,{region:o=A.region}={}){return(await fetch(w("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:o,"primary_release_date.gte":e,"primary_release_date.lte":t}))).json()}const N="myLibraryMovies_v1",q=()=>{try{const e=localStorage.getItem(N);return e?JSON.parse(e):{}}catch(e){return console.error("Local Storage okuma hatası:",e),{}}},O=e=>{try{localStorage.setItem(N,JSON.stringify(e))}catch(t){console.error("Local Storage ekleme hatası:",t)}},R=e=>!!q()[e],Q=e=>{if(!e||!e.id)return;const t=q();t[e.id]=e,O(t)},X=e=>{const t=q();t[e]&&(delete t[e],O(t))},p=document.querySelector(".modal"),B=p.querySelector(".close-icon");p.querySelector(".modal-img");p.querySelector(".movie-title");p.querySelector(".votes-puanlama");p.querySelector(".votes-oysayisi");p.querySelector(".popularity-value");p.querySelector(".genre-value");p.querySelector(".about-value");const f=p.querySelector(".modal-add-button");let k=null;const Z=()=>{p&&(p.classList.remove("is-open"),p.setAttribute("aria-hidden","true"),k=null)};B&&B.addEventListener("click",e=>{e.stopPropagation(),Z()});const T=e=>{if(!f)return;const t=R(e);f.textContent=t?"Remove from my Library":"Add to my Library",f.dataset.inLibrary=t?"true":"false",f.dataset.movieId=e};f&&f.addEventListener("click",async e=>{e.preventDefault();const t=f.dataset.movieId||k&&k.id;if(!t)return;if(R(t)){X(t),T(t);return}let r=k;if(!r||String(t)!==String(r.id))try{r=await D(t)}catch(s){console.error("fetchMovieDetails fonksiyonu hatası:",s);return}const i={id:r.id,title:r.title||r.name||"",poster_path:r.poster_path||"",vote_average:r.vote_average??0,vote_count:r.vote_count??0,popularity:r.popularity??0,genres:r.genres??r.genre_ids??[],overview:r.overview||"",savedAt:new Date().toISOString()};Q(i),T(t)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const S=document.getElementById("upcoming-content");if(S){let l=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(n){return l().includes(n)},m=function(n,d){let c=JSON.parse(localStorage.getItem("library"))||[];c.some(h=>h.id===n.id)?(c=c.filter(h=>h.id!==n.id),d.textContent="Add to my library",d.classList.remove("btn-remove"),d.classList.add("btn-add")):(c.push(n),d.textContent="Remove from my library",d.classList.remove("btn-add"),d.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(c))},y=function(n){return n.map(d=>{var c;return(c=a.find(b=>b.id===d))==null?void 0:c.name}).filter(Boolean).join(", ")},v=function(n){var x,I;const d=n.backdrop_path?`https://image.tmdb.org/t/p/original/${n.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",c=u(n.id),b=c?"Remove from my library":"Add to my library",h=c?"btn-remove":"btn-add",J=y(n.genre_ids||[]);S.innerHTML=`
      <div class="upcoming-card">
        <img src="${d}" alt="${n.title}" />
        <div class="info">
          <h3 class="movie-name">${n.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${n.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${((x=n.vote_average)==null?void 0:x.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${n.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((I=n.popularity)==null?void 0:I.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${J||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${n.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${h}">${b}</button>
        </div>
      </div>
    `;const L=document.getElementById("library-btn");L==null||L.addEventListener("click",()=>m(n,L))};const e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),r=new Date(t,e.getMonth()+1,0).getDate(),i=`${t}-${o}-01`,s=`${t}-${o}-${r}`;let a=[];async function g(){try{a=(await C()).genres||[];const c=(await z(i,s,{region:"TR"})).results||[];if(!c.length){S.innerHTML=`<p>${c.length} movies this month.</p>`;return}const b=c[Math.floor(Math.random()*c.length)];v(b)}catch(n){console.error("upcoming init error:",n),S.innerHTML="<p>Error while fetching movie data.</p>"}}g()}const $=document.querySelector(".weekly-gallery"),ee=document.querySelector(".see-all");let _=[],E=!1;function U(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function te(e){const t=Math.floor(e/2),o=e%2>=1,r=5-t-(o?1:0);let i=[];for(let s=0;s<t;s++)i.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');o&&i.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let s=0;s<r;s++)i.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return i.join("")}function re(e,t){let o=JSON.parse(localStorage.getItem("library"))||[];o.includes(e.id)?(o=o.filter(i=>i!==e.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("library-btn-w")):(o.push(e.id),t.textContent="Remove from my library",t.classList.remove("library-btn-w"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(o))}async function j(e=U()){try{const[t,o]=await Promise.all([K(),C()]);_=t.results;const r=o.genres.reduce((a,l)=>(a[l.id]=l.name,a),{}),s=_.slice(0,e).map(a=>{const l=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=a.genre_ids.map(v=>r[v]).slice(0,1).join(", "),m=a.release_date?a.release_date.slice(0,4):"N/A",y=te(a.vote_average);return`
          <li class="weekly-card" data-id="${a.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${l}" alt="${a.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${a.title.toUpperCase()}</h3>
                <p class="card-info">${u} | ${m}</p>
                <div class="card-rating">${y}</div>
              </div>
            </div>
          </li>
        `}).join("");$.innerHTML=s}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}ee.addEventListener("click",()=>{E=!E;const e=E?_.length:U();j(e)});$.addEventListener("click",async e=>{const t=e.target.closest(".weekly-card");if(!t)return;const o=t.dataset.id;try{let m=function(y){y.key==="Escape"&&(u.close(),window.removeEventListener("keydown",m))};const r=await D(o),i=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",s=r.genres.map(y=>y.name).join(", "),l=(JSON.parse(localStorage.getItem("library"))||[]).includes(r.id),u=P.create(`
      <div class="weekly-movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${i}" class="modal-poster" alt="${r.title}">
        <div class="modal-details">
          <h2>${r.title}</h2>
          <p><strong>Vote / Votes:</strong> ${r.vote_average} / ${r.vote_count}</p>
          <p><strong>Popularity:</strong> ${r.popularity}</p>
          <p><strong>Genre:</strong> ${s}</p>
          <h3>ABOUT</h3>
          <p>${r.overview}</p>
          <button class="library-btn-w ${l?"remove-from-library":"library-btn-w"}">
            ${l?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:y=>{y.element().querySelector(".popup-close-btn").addEventListener("click",()=>y.close());const g=y.element().querySelector(".library-btn-w");g.addEventListener("click",()=>re(r,g))}});u.show(),window.addEventListener("keydown",m)}catch(r){console.error("Popup açılırken hata:",r)}});j();
//# sourceMappingURL=index-D2-XAx_o.js.map
