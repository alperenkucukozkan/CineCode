import{c as b}from"./api-W8kOuucx.js";import{Modal as v}from"./modal-hIj8PosX.js";import"./vendor-B5Z-9nsW.js";const g=document.getElementById("library-list"),p=document.getElementById("empty-library"),s=document.getElementById("genre-filter"),o=document.getElementById("load-more-btn");let c={},d=[],l=0;const E=9;function k(r){const t=(Number(r)||0)/2;let e="";for(let n=1;n<=5;n++)t>=n?e+=`
        <svg class="star-svg-full" width="20" height="20">
          <use xlink:href="./img/icon.svg#icon-full-star"></use>
        </svg>`:t>=n-.5?e+=`
        <svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
          <path fill="none" stroke="#f87719" stroke-linejoin="round" stroke-linecap="butt"
                stroke-miterlimit="4" stroke-width="2"
                d="M30 13h-10.75l-3.25-10-3.25 10h-10.75l8.75 6-3.375 10 8.625-6.25 8.625 6.25-3.375-10 8.75-6z"></path>
          <path d="M16 3v19.75l-8.625 6.25 3.375-10-8.75-6h10.75l3.25-10z" fill="#f87719"></path>
        </svg>`:e+=`
        <svg class="star-svg-empty" width="20" height="20">
          <use xlink:href="./img/icon.svg#icon-empty-star"></use>
        </svg>`;return e}function L(r){const t=r.match(/\d+/g);if(!t)return 255;const[e,n,i]=t.map(Number);return(e*299+n*587+i*114)/1e3}function f(r,t=!0){t&&(g.innerHTML="",l=0,d=Array.isArray(r)?r:[]);const e=d.slice(l,l+E),n=e.map(i=>{if(!i.poster_path)return"";const a=i.release_date?i.release_date.slice(0,4):"—",y=(i.genre_ids||[]).map(h=>c[h]).filter(Boolean).join(", ")||"—",m=k(i.vote_average);return`
      <li id="${i.id}" class="library-card"
          style="
            background-image:url(https://image.tmdb.org/t/p/w500${i.poster_path});
            background-size:cover;background-position:center;
            width:100%;max-width:395px;aspect-ratio:395/574;border-radius:12px;overflow:hidden;position:relative;">
        <div class="library-card-content"
             style="position:absolute;bottom:0;width:100%;
                    background:linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
                    color:#fff;padding:10px;box-sizing:border-box;">
          <h3 style="margin:0;font-size:18px;">${i.title}</h3>
          <p style="margin:2px 0;font-size:14px; color: #fff;">${y} | ${a}</p>
          <div>${m}</div>
        </div>
      </li>`}).join("");g.insertAdjacentHTML("beforeend",n),l+=e.length,l<d.length?o.classList.remove("hidden"):o.classList.add("hidden"),x()}function u(){const r=JSON.parse(localStorage.getItem("library"))||[];if(!r.length){p.style.display="flex",g.innerHTML="",s!=null&&s.parentElement&&(s.parentElement.style.display="none"),o==null||o.classList.add("hidden");return}p.style.display="none",s!=null&&s.parentElement&&(s.parentElement.style.display="flex");const t=new Set;r.forEach(e=>(e.genre_ids||[]).forEach(n=>c[n]&&t.add(c[n]))),s&&(s.innerHTML='<option value="all">Genre</option>'+[...t].map(e=>`<option value="${e}">${e}</option>`).join("")),f(r)}function x(){document.querySelectorAll(".library-card").forEach(r=>{r.removeEventListener("click",r._clickHandler);const t=()=>{const e=Number(r.id),i=(JSON.parse(localStorage.getItem("library"))||[]).find(a=>Number(a.id)===e);i&&v.renderMovie(i)};r._clickHandler=t,r.addEventListener("click",t)})}document.addEventListener("click",r=>{var t,e;(e=(t=r.target)==null?void 0:t.matches)!=null&&e.call(t,'[data-action="toggle-library"]')&&setTimeout(()=>u(),0)});o==null||o.addEventListener("click",()=>f(d,!1));s==null||s.addEventListener("change",r=>{const t=r.target.value,e=JSON.parse(localStorage.getItem("library"))||[];if(t==="all")return f(e);const n=e.filter(i=>(i.genre_ids||[]).some(a=>c[a]===t));f(n)});(function(){if(!s)return;const t=window.getComputedStyle(document.body).backgroundColor,e=L(t),n=e<128?"#fff":"#000";s.style.backgroundColor=t,s.style.color=n,s.style.border=`1px solid ${e<128?"#fff":"#000"}`})();(async function(){try{const t=await b();c=((t==null?void 0:t.genres)||[]).reduce((n,i)=>(n[i.id]=i.name,n),{}),u()}catch(t){console.error("Library init error:",t)}})();
//# sourceMappingURL=library-Dn0V8E9h.js.map
