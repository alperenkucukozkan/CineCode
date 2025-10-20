import{b as A}from"./vendor-CAXQE2hQ.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".modal-overlay"),s=document.querySelector(".goit-students"),r=document.getElementById("closeModal");s.addEventListener("click",t=>{t.preventDefault(),e.classList.add("active")}),r.addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",t=>{t.target===e&&(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",t=>{t.key==="Escape"&&e.classList.contains("active")&&(e.classList.remove("active"),document.body.style.overflow="")})});document.addEventListener("DOMContentLoaded",()=>{x("#menuLinks","menuLinks:active"),x("#links","menuLinks:active"),B("#menu",".sidebar",".sidebar-backdrop"),C("#toggle",".theme-toggle use",{navbar:"#navbar",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text"})});function x(e,s){var i;const r=document.querySelector(e);if(!r)return;const t=localStorage.getItem(s);if(t){const n=r.querySelector(`a[href="${t}"]`),a=n==null?void 0:n.closest("li");a&&((i=r.querySelector(".active"))==null||i.classList.remove("active"),a.classList.add("active"))}r.addEventListener("click",n=>{var u,m;const a=n.target.closest("li");if(!a||!r.contains(a))return;(u=r.querySelector(".active"))==null||u.classList.remove("active"),a.classList.add("active");const l=(m=a.querySelector("a"))==null?void 0:m.getAttribute("href");l&&localStorage.setItem(s,l)})}function B(e,s,r){const t=document.querySelector(e),i=document.querySelector(s),n=document.querySelector(r);!t||!i||!n||t.addEventListener("click",()=>{const a=i.style.display==="flex";i.style.display=a?"none":"flex",n.style.display=a?"none":"block",t.style.display="";const l=u=>{u.target===n&&(i.style.display="none",n.style.display="none",i.removeEventListener("click",l))};n.addEventListener("click",l)})}function C(e,s,r={}){const t=document.querySelector(e),i=document.querySelector(s),{navbar:n,menuButton:a,modal:l,backdrop:u,links:m,logoText:p}=N(r),g=y=>{document.body.className=y,localStorage.setItem("theme",y);const o=y==="dark-theme";t&&(t.checked=o),a&&(a.style.color=o?"#b7b7b7":"#595959"),n&&(n.style.backgroundColor=o?"#000":"#fff"),l&&(l.style.backgroundColor=o?"#000":"#f8f8f8"),p&&(p.style.color=o?"#fff":"#282828"),m&&m.querySelectorAll("a").forEach(d=>{var c;d.style.color=o?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),l&&l.querySelectorAll("a").forEach(d=>{var c;d.style.color=o?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),u&&(u.style.backgroundColor=o?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",u.style.zIndex="1"),i==null||i.setAttribute("href",`../img/icon.svg#${o?"icon-Vector":"icon-Sun"}`)};g(localStorage.getItem("theme")||"light-theme"),t==null||t.addEventListener("change",()=>g(t.checked?"dark-theme":"light-theme"))}function N(e){const s={};for(const r in e){const t=document.querySelector(e[r]);s[r]=t||null}return s}const D=document.querySelectorAll("button");D.forEach(e=>{e.addEventListener("click",s=>{s.target.classList.add("activeLoading")})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const O="c0fe092c4149192005601ffec65036a5",R="https://api.themoviedb.org/3",_={language:"en-US",region:"TR"};function b(e,s={}){const r=new URL(`${R}${e}`);r.searchParams.set("api_key",O);const t={..._,...s};return Object.entries(t).forEach(([i,n])=>{n!=null&&n!==""&&r.searchParams.set(i,n)}),r.toString()}async function U(e=1){return(await fetch(b("/trending/movie/week",{page:e}))).json()}async function j(e){return(await fetch(b(`/movie/${e}`))).json()}async function I(){return(await fetch(b("/genre/movie/list"))).json()}async function P(e,s,{region:r=_.region}={}){return(await fetch(b("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:r,"primary_release_date.gte":e,"primary_release_date.lte":s}))).json()}const h=document.getElementById("upcoming-content");if(h){let l=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(o){return l().includes(o)},m=function(o,d){let c=l();c.includes(o)?(c=c.filter(L=>L!==o),d.textContent="Add to my library",d.classList.remove("btn-remove"),d.classList.add("btn-add")):(c.push(o),d.textContent="Remove from my library",d.classList.remove("btn-add"),d.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(c))},p=function(o){return o.map(d=>{var c;return(c=a.find(f=>f.id===d))==null?void 0:c.name}).filter(Boolean).join(", ")},g=function(o){var $,E;const d=o.backdrop_path?`https://image.tmdb.org/t/p/original/${o.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",c=u(o.id),f=c?"Remove from my library":"Add to my library",L=c?"btn-remove":"btn-add",T=p(o.genre_ids||[]);h.innerHTML=`
      <div class="upcoming-card">
        <img src="${d}" alt="${o.title}" />
        <div class="info">
          <h3 class="movie-name">${o.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${o.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${(($=o.vote_average)==null?void 0:$.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${o.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((E=o.popularity)==null?void 0:E.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${T||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${o.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${L}">${f}</button>
        </div>
      </div>
    `;const v=document.getElementById("library-btn");v==null||v.addEventListener("click",()=>m(o.id,v))};const e=new Date,s=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),t=new Date(s,e.getMonth()+1,0).getDate(),i=`${s}-${r}-01`,n=`${s}-${r}-${t}`;let a=[];async function y(){try{a=(await I()).genres||[];const c=(await P(i,n,{region:"TR"})).results||[];if(!c.length){h.innerHTML=`<p>${c.length} movies this month.</p>`;return}const f=c[Math.floor(Math.random()*c.length)];g(f)}catch(o){console.error("upcoming init error:",o),h.innerHTML="<p>Error while fetching movie data.</p>"}}y()}const S=document.querySelector(".weekly-gallery"),V=document.querySelector(".see-all");let w=[],k=!1;function M(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function H(e){const s=Math.floor(e/2),r=e%2>=1,t=5-s-(r?1:0);let i=[];for(let n=0;n<s;n++)i.push('<svg class="icon icon-full-star"><use xlink:href="../../img/icon.svg#icon-full-star"></use></svg>');r&&i.push('<svg class="icon icon-half-star"><use xlink:href="../../img/icon.svg#icon-half-star"></use></svg>');for(let n=0;n<t;n++)i.push('<svg class="icon icon-empty-star"><use xlink:href="../../img/icon.svg#icon-empty-star"></use></svg>');return i.join("")}async function q(e=M()){try{const[s,r]=await Promise.all([U(),I()]);w=s.results;const t=r.genres.reduce((a,l)=>(a[l.id]=l.name,a),{}),n=w.slice(0,e).map(a=>{const l=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=a.genre_ids.map(g=>t[g]).slice(0,1).join(", "),m=a.release_date?a.release_date.slice(0,4):"N/A",p=H(a.vote_average);return`
          <li class="weekly-card" data-id="${a.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${l}" alt="${a.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${a.title.toUpperCase()}</h3>
                <p class="card-info">${u} | ${m}</p>
                <div class="card-rating">${p}</div>
              </div>
            </div>
          </li>
        `}).join("");S.innerHTML=n}catch(s){console.error("Weekly trends fetch error:",s),S.innerHTML="<p>Veriler alınamadı.</p>"}}function J(e,s){(JSON.parse(localStorage.getItem("library"))||[]).includes(e.id)?(s.textContent="Remove from Library",s.classList.add("added")):(s.textContent="Add to Library",s.classList.remove("added")),s.onclick=()=>{let i=JSON.parse(localStorage.getItem("library"))||[];i.includes(e.id)?(i=i.filter(n=>n!==e.id),s.textContent="Add to Library",s.classList.remove("added")):(i.push(e.id),s.textContent="Remove from Library",s.classList.add("added")),localStorage.setItem("library",JSON.stringify(i))}}V.addEventListener("click",()=>{k=!k;const e=k?w.length:M();q(e)});S.addEventListener("click",async e=>{const s=e.target.closest(".weekly-card");if(!s)return;const r=s.dataset.id;try{let m=function(p){p.key==="Escape"&&(u.close(),window.removeEventListener("keydown",m))};const t=await j(r),i=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",n=t.genres.map(p=>p.name).join(", "),l=(JSON.parse(localStorage.getItem("library"))||[]).includes(t.id),u=A.create(`
      <div class="movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon icon-close" width="24" height="24"><use xlink:href="../../img/icon.svg#icon-close"></use></svg>
        </button>

        <img src="${i}" class="modal-poster" alt="${t.title}">
        <div class="modal-details">
          <h2>${t.title}</h2>
          <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
          <p><strong>Popularity:</strong> ${t.popularity}</p>
          <p><strong>Genre:</strong> ${n}</p>
          <h3>ABOUT</h3>
          <p>${t.overview}</p>
          <button class="library-btn ${l?"added":""}">
            ${l?"Added to Library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close());const y=p.element().querySelector(".library-btn");J(t,y)}});u.show(),window.addEventListener("keydown",m)}catch(t){console.error("Popup açılırken hata:",t)}});q();
//# sourceMappingURL=index-BPg716ah.js.map
