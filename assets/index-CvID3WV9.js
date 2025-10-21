import{b as B}from"./vendor-D_5xFgaM.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".modal-overlay"),s=document.querySelector(".goit-students"),n=document.getElementById("closeModal");s.addEventListener("click",t=>{t.preventDefault(),e.classList.add("active")}),n.addEventListener("click",()=>{e.classList.remove("active")}),e.addEventListener("click",t=>{t.target===e&&(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",t=>{t.key==="Escape"&&e.classList.contains("active")&&(e.classList.remove("active"),document.body.style.overflow="")})});document.addEventListener("DOMContentLoaded",()=>{x("#menuLinks","menuLinks:active"),x("#links","menuLinks:active"),A("#menu",".sidebar",".sidebar-backdrop"),C("#toggle",".theme-toggle use",{navbar:"#navbar",menuButton:"#menu",modal:".sidebar",backdrop:".sidebar-backdrop",links:"#links",logoText:".logo-text"})});function x(e,s){var i;const n=document.querySelector(e);if(!n)return;const t=localStorage.getItem(s);if(t){const r=n.querySelector(`a[href="${t}"]`),a=r==null?void 0:r.closest("li");a&&((i=n.querySelector(".active"))==null||i.classList.remove("active"),a.classList.add("active"))}n.addEventListener("click",r=>{var u,m;const a=r.target.closest("li");if(!a||!n.contains(a))return;(u=n.querySelector(".active"))==null||u.classList.remove("active"),a.classList.add("active");const l=(m=a.querySelector("a"))==null?void 0:m.getAttribute("href");l&&localStorage.setItem(s,l)})}function A(e,s,n){const t=document.querySelector(e),i=document.querySelector(s),r=document.querySelector(n);!t||!i||!r||t.addEventListener("click",()=>{const a=i.style.display==="flex";i.style.display=a?"none":"flex",r.style.display=a?"none":"block",t.style.display="";const l=u=>{u.target===r&&(i.style.display="none",r.style.display="none",i.removeEventListener("click",l))};r.addEventListener("click",l)})}function C(e,s,n={}){const t=document.querySelector(e),i=document.querySelector(s),{navbar:r,menuButton:a,modal:l,backdrop:u,links:m,logoText:p}=D(n),g=y=>{document.body.className=y,localStorage.setItem("theme",y);const o=y==="dark-theme";t&&(t.checked=o),a&&(a.style.color=o?"#b7b7b7":"#595959"),r&&(r.style.backgroundColor=o?"#000":"#fff"),l&&(l.style.backgroundColor=o?"#000":"#f8f8f8"),p&&(p.style.color=o?"#fff":"#282828"),m&&m.querySelectorAll("a").forEach(d=>{var c;d.style.color=o?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),l&&l.querySelectorAll("a").forEach(d=>{var c;d.style.color=o?"#fff":"#111",(c=d.closest("li"))!=null&&c.classList.contains("active")&&(d.style.color="#f87719")}),u&&(u.style.backgroundColor=o?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",u.style.zIndex="1"),i==null||i.setAttribute("href",`../img/icon.svg#${o?"icon-Vector":"icon-Sun"}`)};g(localStorage.getItem("theme")||"light-theme"),t==null||t.addEventListener("change",()=>g(t.checked?"dark-theme":"light-theme"))}function D(e){const s={};for(const n in e){const t=document.querySelector(e[n]);s[n]=t||null}return s}const N=document.querySelectorAll("button");N.forEach(e=>{e.addEventListener("click",s=>{s.target.classList.add("activeLoading")})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".button-up");window.addEventListener("scroll",()=>{window.pageYOffset>300?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})});const R="c0fe092c4149192005601ffec65036a5",U="https://api.themoviedb.org/3",_={language:"en-US",region:"TR"};function h(e,s={}){const n=new URL(`${U}${e}`);n.searchParams.set("api_key",R);const t={..._,...s};return Object.entries(t).forEach(([i,r])=>{r!=null&&r!==""&&n.searchParams.set(i,r)}),n.toString()}async function O(e=1){return(await fetch(h("/trending/movie/week",{page:e}))).json()}async function j(e){return(await fetch(h(`/movie/${e}`))).json()}async function M(){return(await fetch(h("/genre/movie/list"))).json()}async function P(e,s,{region:n=_.region}={}){return(await fetch(h("/discover/movie",{sort_by:"popularity.desc",with_release_type:"2|3",region:n,"primary_release_date.gte":e,"primary_release_date.lte":s}))).json()}const b=document.getElementById("upcoming-content");if(b){let l=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(o){return l().includes(o)},m=function(o,d){let c=l();c.includes(o)?(c=c.filter(L=>L!==o),d.textContent="Add to my library",d.classList.remove("btn-remove"),d.classList.add("btn-add")):(c.push(o),d.textContent="Remove from my library",d.classList.remove("btn-add"),d.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(c))},p=function(o){return o.map(d=>{var c;return(c=a.find(f=>f.id===d))==null?void 0:c.name}).filter(Boolean).join(", ")},g=function(o){var $,E;const d=o.backdrop_path?`https://image.tmdb.org/t/p/original/${o.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",c=u(o.id),f=c?"Remove from my library":"Add to my library",L=c?"btn-remove":"btn-add",T=p(o.genre_ids||[]);b.innerHTML=`
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
    `;const v=document.getElementById("library-btn");v==null||v.addEventListener("click",()=>m(o.id,v))};const e=new Date,s=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),t=new Date(s,e.getMonth()+1,0).getDate(),i=`${s}-${n}-01`,r=`${s}-${n}-${t}`;let a=[];async function y(){try{a=(await M()).genres||[];const c=(await P(i,r,{region:"TR"})).results||[];if(!c.length){b.innerHTML=`<p>${c.length} movies this month.</p>`;return}const f=c[Math.floor(Math.random()*c.length)];g(f)}catch(o){console.error("upcoming init error:",o),b.innerHTML="<p>Error while fetching movie data.</p>"}}y()}const w=document.querySelector(".weekly-gallery"),V=document.querySelector(".see-all");let S=[],k=!1;function q(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function H(e){const s=Math.floor(e/2),n=e%2>=1,t=5-s-(n?1:0);let i=[];for(let r=0;r<s;r++)i.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');n&&i.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let r=0;r<t;r++)i.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return i.join("")}function G(e,s){let n=JSON.parse(localStorage.getItem("library"))||[];n.includes(e.id)?(n=n.filter(i=>i!==e.id),s.textContent="Add to Library",s.classList.remove("remove-from-library"),s.classList.add("library-btn-w")):(n.push(e.id),s.textContent="Remove from my library",s.classList.remove("library-btn-w"),s.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}async function I(e=q()){try{const[s,n]=await Promise.all([O(),M()]);S=s.results;const t=n.genres.reduce((a,l)=>(a[l.id]=l.name,a),{}),r=S.slice(0,e).map(a=>{const l=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=a.genre_ids.map(g=>t[g]).slice(0,1).join(", "),m=a.release_date?a.release_date.slice(0,4):"N/A",p=H(a.vote_average);return`
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
        `}).join("");w.innerHTML=r}catch(s){console.error("Weekly trends fetch error:",s),w.innerHTML="<p>Veriler alınamadı.</p>"}}V.addEventListener("click",()=>{k=!k;const e=k?S.length:q();I(e)});w.addEventListener("click",async e=>{const s=e.target.closest(".weekly-card");if(!s)return;const n=s.dataset.id;try{let m=function(p){p.key==="Escape"&&(u.close(),window.removeEventListener("keydown",m))};const t=await j(n),i=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",r=t.genres.map(p=>p.name).join(", "),l=(JSON.parse(localStorage.getItem("library"))||[]).includes(t.id),u=B.create(`
      <div class="movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="icon-close" width="24" height="24">
            <use xlink:href="../../img/icon.svg#icon-close"></use>
          </svg>
        </button>

        <img src="${i}" class="modal-poster" alt="${t.title}">
        <div class="modal-details">
          <h2>${t.title}</h2>
          <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
          <p><strong>Popularity:</strong> ${t.popularity}</p>
          <p><strong>Genre:</strong> ${r}</p>
          <h3>ABOUT</h3>
          <p>${t.overview}</p>
          <button class="library-btn-w ${l?"remove-from-library":"library-btn-w"}">
            ${l?"Remove from my library":"Add to Library"}
          </button>
        </div>
      </div>
      `,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close());const y=p.element().querySelector(".library-btn-w");y.addEventListener("click",()=>G(t,y))}});u.show(),window.addEventListener("keydown",m)}catch(t){console.error("Popup açılırken hata:",t)}});I();
//# sourceMappingURL=index-CvID3WV9.js.map
