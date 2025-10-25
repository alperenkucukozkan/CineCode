import{c as k,f as w,a as L,b as x}from"./api-W8kOuucx.js";import{Modal as y}from"./modal-hIj8PosX.js";import"./vendor-B5Z-9nsW.js";const h=document.getElementById("hero"),B=document.getElementById("movie-title"),I=document.getElementById("movie-overview"),T=document.getElementById("movie-rating"),_=document.getElementById("hero-buttons"),S=document.getElementById("trailer-btn"),f=document.getElementById("library-list"),p=document.getElementById("empty-library"),o=document.getElementById("genre-filter"),a=document.getElementById("load-more-btn");let d={},m=[],c=0;const C=9;function b(r){const e=(Number(r)||0)/2;let t="";for(let i=1;i<=5;i++)e>=i?t+=`
        <svg class="star-svg-full" width="20" height="20">
          <use xlink:href="../img/icon.svg#icon-full-star"></use>
        </svg>`:e>=i-.5?t+=`
        <svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
          <path fill="none" stroke="#f87719" stroke-linejoin="round" stroke-linecap="butt"
                stroke-miterlimit="4" stroke-width="2"
                d="M30 13h-10.75l-3.25-10-3.25 10h-10.75l8.75 6-3.375 10 8.625-6.25 8.625 6.25-3.375-10 8.75-6z"></path>
          <path d="M16 3v19.75l-8.625 6.25 3.375-10-8.75-6h10.75l3.25-10z" fill="#f87719"></path>
        </svg>`:t+=`
        <svg class="star-svg-empty" width="20" height="20">
          <use xlink:href="../img/icon.svg#icon-empty-star"></use>
        </svg>`;return t}function H(r){const e=r.match(/\d+/g);if(!e)return 255;const[t,i,n]=e.map(Number);return(t*299+i*587+n*114)/1e3}async function N(){var r;try{const e=await w(),t=(r=e==null?void 0:e.results)==null?void 0:r[0];if(!t)return;const i=t.backdrop_path||t.poster_path||"";h.style.backgroundImage=`url("https://image.tmdb.org/t/p/original${i}")`,B.textContent=t.title||t.name||"—",I.textContent=t.overview||"No description available.",T.innerHTML=b(t.vote_average),_.classList.remove("hidden"),S.onclick=async()=>{var n;try{const s=await L(t.id),l=(n=s==null?void 0:s.results)==null?void 0:n.find(g=>g.type==="Trailer"&&g.site==="YouTube");l!=null&&l.key?y.showTrailer(l.key):alert("Trailer not available!")}catch(s){console.error("Trailer fetch error:",s)}},h.addEventListener("click",async()=>{try{const n=await x(t.id);y.renderMovie(n)}catch(n){console.error("Hero modal error:",n)}})}catch(e){console.error("Hero init error:",e)}}function u(r,e=!0){e&&(f.innerHTML="",c=0,m=Array.isArray(r)?r:[]);const t=m.slice(c,c+C),i=t.map(n=>{if(!n.poster_path)return"";const s=n.release_date?n.release_date.slice(0,4):"—",l=(n.genre_ids||[]).map(E=>d[E]).filter(Boolean).join(", ")||"—",g=b(n.vote_average);return`
      <li id="${n.id}" class="library-card"
          style="
            background-image:url(https://image.tmdb.org/t/p/w500${n.poster_path});
            background-size:cover;background-position:center;
            width:100%;max-width:395px;aspect-ratio:395/574;border-radius:12px;overflow:hidden;position:relative;">
        <div class="library-card-content"
             style="position:absolute;bottom:0;width:100%;
                    background:linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
                    color:#fff;padding:10px;box-sizing:border-box;">
          <h3 style="margin:0;font-size:18px;">${n.title}</h3>
          <p style="margin:2px 0;font-size:14px; color: #fff;">${l} | ${s}</p>
          <div>${g}</div>
        </div>
      </li>`}).join("");f.insertAdjacentHTML("beforeend",i),c+=t.length,c<m.length?a.classList.remove("hidden"):a.classList.add("hidden"),$()}function v(){const r=JSON.parse(localStorage.getItem("library"))||[];if(!r.length){p.style.display="flex",f.innerHTML="",o!=null&&o.parentElement&&(o.parentElement.style.display="none"),a==null||a.classList.add("hidden");return}p.style.display="none",o!=null&&o.parentElement&&(o.parentElement.style.display="flex");const e=new Set;r.forEach(t=>(t.genre_ids||[]).forEach(i=>d[i]&&e.add(d[i]))),o&&(o.innerHTML='<option value="all">Genre</option>'+[...e].map(t=>`<option value="${t}">${t}</option>`).join("")),u(r)}function $(){document.querySelectorAll(".library-card").forEach(r=>{r.removeEventListener("click",r._clickHandler);const e=()=>{const t=Number(r.id),n=(JSON.parse(localStorage.getItem("library"))||[]).find(s=>Number(s.id)===t);n&&y.renderMovie(n)};r._clickHandler=e,r.addEventListener("click",e)})}document.addEventListener("click",r=>{var e,t;(t=(e=r.target)==null?void 0:e.matches)!=null&&t.call(e,'[data-action="toggle-library"]')&&setTimeout(()=>v(),0)});a==null||a.addEventListener("click",()=>u(m,!1));o==null||o.addEventListener("change",r=>{const e=r.target.value,t=JSON.parse(localStorage.getItem("library"))||[];if(e==="all")return u(t);const i=t.filter(n=>(n.genre_ids||[]).some(s=>d[s]===e));u(i)});(function(){if(!o)return;const e=window.getComputedStyle(document.body).backgroundColor,t=H(e),i=t<128?"#fff":"#000";o.style.backgroundColor=e,o.style.color=i,o.style.border=`1px solid ${t<128?"#000":"#fff"}`})();(async function(){try{const e=await k();d=((e==null?void 0:e.genres)||[]).reduce((i,n)=>(i[n.id]=n.name,i),{}),await N(),v()}catch(e){console.error("Library init error:",e)}})();
//# sourceMappingURL=library-CZ5J9Y5E.js.map
