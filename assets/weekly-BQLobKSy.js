import{b as k,g as w,c as S}from"./api-W8kOuucx.js";import{Modal as M}from"./modal-hIj8PosX.js";import"./vendor-B5Z-9nsW.js";let i,c,u=[],d=!1;function f(){const t=window.innerWidth;return t<768?1:(t<1280,3)}function $(t){const r=Math.floor(t/2),n=t%2>=1,s=5-r-(n?1:0);let l=[];for(let a=0;a<r;a++)l.push('<svg class="icon-full-star"><use xlink:href="../img/icon.svg#icon-full-star"></use></svg>');n&&l.push('<svg class="icon-half-star"><use xlink:href="../img/icon.svg#icon-half-star"></use></svg>');for(let a=0;a<s;a++)l.push('<svg class="icon-empty-star"><use xlink:href="../img/icon.svg#icon-empty-star"></use></svg>');return l.join("")}async function p(t=f()){try{const[r,n]=await Promise.all([w(),S()]);u=r.results;const s=n.genres.reduce((e,o)=>(e[o.id]=o.name,e),{}),a=u.slice(0,t).map(e=>{const o=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",h=e.genre_ids.map(v=>s[v]).slice(0,1).join(", "),m=e.release_date?e.release_date.slice(0,4):"N/A",y=$(e.vote_average);return`
          <li class="weekly-card" data-id="${e.id}">
            <div class="poster-wrapper">
              <img class="card-img" src="${o}" alt="${e.title}" />
              <div class="card-overlay">
                <h3 class="card-title">${e.title.toUpperCase()}</h3>
                <p class="card-info">${h} | ${m}</p>
                <div class="card-rating">${y}</div>
              </div>
            </div>
          </li>
        `}).join("");i.innerHTML=a}catch(r){console.error("Weekly trends fetch error:",r),i.innerHTML="<p>Veriler alınamadı.</p>"}}function g(){if(i=document.querySelector(".weekly-gallery"),c=document.querySelector(".see-all"),!i||!c){console.warn("weekly-gallery veya see-all bulunamadı.");return}c.addEventListener("click",()=>{d=!d;const t=d?u.length:f();p(t)}),i.addEventListener("click",async t=>{const r=t.target.closest(".weekly-card");if(!r)return;const n=r.dataset.id;try{const s=await k(n);M.renderMovie(s)}catch(s){console.error("Popup açılırken hata:",s)}}),p()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g,{once:!0}):g();
//# sourceMappingURL=weekly-BQLobKSy.js.map
