import{f as w,d as k,a as L}from"./api-yrAdrbr0.js";import{b as S}from"./vendor-B5Z-9nsW.js";let c,g,u=[],m=!1;function v(){const e=window.innerWidth;return e<768?1:(e<1280,3)}function $(e){const r=Math.floor(e/2),o=e%2>=1,t=5-r-(o?1:0);let s=[];for(let l=0;l<r;l++)s.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');o&&s.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let l=0;l<t;l++)s.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return s.join("")}function x(e,r){let o=JSON.parse(localStorage.getItem("library"))||[];o.some(s=>Number(s.id)===Number(e.id))?(o=o.filter(s=>Number(s.id)!==Number(e.id)),r.textContent="Add to Library",r.classList.remove("remove-from-library"),r.classList.add("library-btn-w")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(s=>s.id)),o.push(e),r.textContent="Remove from my library",r.classList.remove("library-btn-w"),r.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(o))}async function f(e=v()){try{const[r,o]=await Promise.all([k(),L()]);u=r.results;const t=o.genres.reduce((a,i)=>(a[i.id]=i.name,a),{}),l=u.slice(0,e).map(a=>{const i=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",d=a.genre_ids.map(y=>t[y]).slice(0,1).join(", "),p=a.release_date?a.release_date.slice(0,4):"N/A",n=$(a.vote_average);return`
          <li class="weekly-card" data-id="${a.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${i}" alt="${a.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${a.title.toUpperCase()}</h3>
                <p class="card-info">${d} | ${p}</p>
                <div class="card-rating">${n}</div>
              </div>
            </div>
          </li>
        `}).join("");c.innerHTML=l}catch(r){console.error("Weekly trends fetch error:",r),c.innerHTML="<p>Veriler alınamadı.</p>"}}function b(){if(c=document.querySelector(".weekly-gallery"),g=document.querySelector(".see-all"),!c||!g){console.warn("weekly-gallery veya see-all bulunamadı.");return}g.addEventListener("click",()=>{m=!m;const e=m?u.length:v();f(e)}),c.addEventListener("click",async e=>{const r=e.target.closest(".weekly-card");if(!r)return;const o=r.dataset.id;try{let p=function(n){n.key==="Escape"&&(d.close(),window.removeEventListener("keydown",p))};const t=await w(o),s=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",l=t.genres.map(n=>n.name).join(", "),i=(JSON.parse(localStorage.getItem("library"))||[]).some(n=>Number(n.id)===Number(t.id)),d=S.create(`
        <div class="weekly-movie-modal">
          <button class="popup-close-btn" aria-label="Close">
            <svg class="icon-close" width="24" height="24">
              <use xlink:href="../../img/icon.svg#icon-close"></use>
            </svg>
          </button>
          <img src="${s}" class="modal-poster" alt="${t.title}">
          <div class="modal-details">
            <h2>${t.title}</h2>
            <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
            <p><strong>Popularity:</strong> ${t.popularity}</p>
            <p><strong>Genre:</strong> ${l}</p>
            <h3>ABOUT</h3>
            <p>${t.overview}</p>
            <button class="${i?"remove-from-library":"library-btn-w"}">
              ${i?"Remove from my library":"Add to Library"}
            </button>
          </div>
        </div>
        `,{onShow:n=>{n.element().querySelector(".popup-close-btn").addEventListener("click",()=>n.close());const h=n.element().querySelector("button.remove-from-library, button.library-btn-w");h.addEventListener("click",()=>x(t,h))}});d.show(),window.addEventListener("keydown",p)}catch(t){console.error("Popup açılırken hata:",t)}}),f()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",b,{once:!0}):b();
//# sourceMappingURL=weekly-DOWI8TrC.js.map
