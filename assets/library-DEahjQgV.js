const L="c0fe092c4149192005601ffec65036a5",k="https://api.themoviedb.org/3",A=`${k}/trending/movie/day?api_key=${L}`,H=document.getElementById("hero"),F=document.getElementById("movie-title"),O=document.getElementById("movie-overview"),j=document.getElementById("movie-rating"),U=document.getElementById("hero-buttons"),z=document.getElementById("trailer-btn"),f=document.getElementById("load-more-btn"),b=document.getElementById("trailer-modal"),G=document.getElementById("close-modal"),_=document.getElementById("trailer-frame"),E=document.getElementById("library-list"),S=document.getElementById("empty-library"),i=document.getElementById("genre-filter");let p=0;const J=9;function C(e){const o=e/2;let t="";for(let n=1;n<=5;n++)o>=n?t+='<svg class="star-svg-full" width="20" height="20"><use href="../img/icon.svg#icon-full-star"></svg>':o>=n-.5?t+=`<svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
                    <path
                      fill="none"
                      stroke="#f87719"
                      stroke-linejoin="round"
                      stroke-linecap="butt"
                      stroke-miterlimit="4"
                      stroke-width="2"
                      d="M30 13h-10.75l-3.25-10-3.25 10h-10.75l8.75 6-3.375 10 8.625-6.25 8.625 6.25-3.375-10 8.75-6z">
                    </path>

                    <path
                      d="M16 3v19.75l-8.625 6.25 3.375-10-8.75-6h10.75l3.25-10z"
                      fill="#f87719">
                    </path>
                </svg>
              `:t+='<svg class="star-svg-empty" width="20" height="20"><use href="../img/icon.svg#icon-empty-star"></svg>';return t}async function R(){try{const t=(await(await fetch(A)).json()).results[0];if(!t)return;H.style.backgroundImage=`url("https://image.tmdb.org/t/p/original${t.backdrop_path}")`,F.textContent=t.title,O.textContent=t.overview,j.innerHTML=C(t.vote_average),U.classList.remove("hidden"),z.onclick=async()=>{const n=await V(t.id);n?(_.src=n,b.classList.remove("hidden")):alert("Trailer not available!")}}catch(e){console.error("Trending movie fetch error:",e)}}async function V(e){try{const n=(await(await fetch(`${k}/movie/${e}/videos?api_key=${L}&language=en-US`)).json()).results.find(s=>s.type==="Trailer"&&s.site==="YouTube");return n?`https://www.youtube.com/embed/${n.key}`:null}catch(o){return console.error("Trailer fetch error:",o),null}}function T(){_.src="",b.classList.add("hidden")}G.addEventListener("click",T);b.addEventListener("click",e=>{e.target===b&&T()});let M=[];function m(e,o=!0){o&&(E.innerHTML="",p=0,M=e);const t=e.slice(p,p+J),n=t.map(s=>{var r;const l=s.release_date?s.release_date.slice(0,4):"---",c=((r=s.genre_ids)==null?void 0:r.map(h=>y[h]).join(", "))||"---",d=C(s.vote_average);return s.poster_path&&`
                <li id="${s.id}" class="library-card" style="
                    background-image: url(https://image.tmdb.org/t/p/w500${s.poster_path});
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    max-width: 395px;
                    aspect-ratio: 395 / 574;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                ">
                <div class="library-card-content" style="
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
                    color: #fff;
                    padding: 10px;
                    box-sizing: border-box;
                ">
                    <h3 style="margin:0; font-size:18px;">${s.title}</h3>
                    <p style="margin:2px 0; font-size:14px; color: #fff;">${c} | ${l}</p>
                    <div id="movie-rating">${d}</div>
                </div>
            </li>
        `}).join("");E.insertAdjacentHTML("beforeend",n),p+=t.length,p<e.length?f.classList.remove("hidden"):f.classList.add("hidden"),q()}f.addEventListener("click",()=>{m(M,!1)});function N(){const e=JSON.parse(localStorage.getItem("library"))||[];if(e.length===0){S.style.display="flex",E.innerHTML="",i.parentElement.style.display="none",f.classList.add("hidden");return}S.style.display="none",i.parentElement.style.display="flex";const o=new Set;e.forEach(t=>{var n;return(n=t.genre_ids)==null?void 0:n.forEach(s=>{y[s]&&o.add(y[s])})}),i.innerHTML='<option value="all">Genre</option>',o.forEach(t=>{i.innerHTML+=`<option value="${t}">${t}</option>`}),m(e)}i.addEventListener("change",e=>{const o=e.target.value,t=JSON.parse(localStorage.getItem("library"))||[];if(o==="all")m(t);else{const n=t.filter(s=>s.genre_ids.some(l=>y[l]===o));m(n)}});if(i){let o=function(l){const c=l.match(/\d+/g).map(Number);return(c[0]*299+c[1]*587+c[2]*114)/1e3};const e=window.getComputedStyle(document.body).backgroundColor,t=o(e),n=t<128?"#fff":"#000";i.style.backgroundColor=e,i.style.color=n,i.style.border=`1px solid ${t<128?"#000":"#fff"}`,i.querySelectorAll("option").forEach(l=>{l.style.backgroundColor=e,l.style.color=n})}function q(){document.querySelectorAll(".library-card").forEach(e=>{e.removeEventListener("click",e._clickHandler);const o=()=>{const t=parseInt(e.id),s=(JSON.parse(localStorage.getItem("library"))||[]).find(l=>l.id===t);s&&D(s,N)};e.addEventListener("click",o),e._clickHandler=o})}function D(e,o){var x,B,I;const t=document.getElementById("movie-detail-modal"),n=window.getComputedStyle(document.body).backgroundColor;function s(a){const g=a.match(/\d+/g).map(Number);return(g[0]*299+g[1]*587+g[2]*114)/1e3}const l=s(n),c=l<128?"#fff":"#000";t.innerHTML=`
        <div class="detail-box" role="dialog" aria-modal="true" style="background-color: ${n}; color: ${c};">
            <button class="close-span-btn-details" aria-label="Close detail">&times;</button>
            <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" class="detail-poster"/>
            <div class="detail-content">
                <h2>${e.title}</h2>
                <p><strong>Vote / Votes:</strong> <span>${((x=e.vote_average)==null?void 0:x.toFixed(1))||"N/A"}</span> / <span>${e.vote_count||"N/A"}</span></p>
                <p><strong>Popularity:</strong> <span>${((B=e.popularity)==null?void 0:B.toFixed(1))||"N/A"}</span></p>
                <p><strong>Genre:</strong> <span>${((I=e.genre_ids)==null?void 0:I.map(a=>y[a]).join(", "))||"N/A"}</span></p>
                <p><strong>ABOUT</strong></p>
                <div class="scrollable-description">${e.overview||"No description available."}</div>
                <button class="library-btn" data-id="${e.id}"></button>
            </div>
        </div>
    `,t.classList.add("active");const d=t.querySelector(".close-span-btn-details");d.style.color=c,d.addEventListener("mouseenter",()=>d.style.color="#F87719"),d.addEventListener("mouseleave",()=>d.style.color=c),d.addEventListener("click",v);const r=t.querySelector(".library-btn");function h(){l>128?(r.style.backgroundImage="none",r.style.backgroundColor="#fff",r.style.color="#000",r.style.border="1px solid #F84119",r.onmouseenter=()=>{r.style.backgroundColor="#000",r.style.color="#F87719",r.style.border="1px solid #000"},r.onmouseleave=()=>{r.style.backgroundColor="#fff",r.style.color="#000",r.style.border="1px solid #f84119"}):(r.style.backgroundImage="none",r.style.backgroundColor="#000",r.style.color="#fff",r.style.border="1px solid #F87719",r.onmouseenter=()=>{r.style.backgroundColor="#fff",r.style.color="#F87719",r.style.border="1px solid #F87719"},r.onmouseleave=()=>{r.style.backgroundColor="#000",r.style.color="#fff",r.style.border="1px solid #F87719"})}h();function w(){const g=(JSON.parse(localStorage.getItem("library"))||[]).some(u=>u.id===e.id);r.textContent=g?"Remove from My Library":"Add to My Library"}w(),r.addEventListener("click",()=>{let a=JSON.parse(localStorage.getItem("library"))||[];a=a.some(u=>u.id===e.id)?a.filter(u=>u.id!==e.id):[...a,e],localStorage.setItem("library",JSON.stringify(a)),w(),typeof o=="function"&&o()});const $=a=>{a.key==="Escape"&&v()};document.addEventListener("keydown",$),t.addEventListener("click",a=>{a.target===t&&v()});function v(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",$)}}async function P(){return(await(await fetch(`${k}/genre/movie/list?api_key=${L}&language=en-US`)).json()).genres}async function Y(){y=(await P()).reduce((o,t)=>(o[t.id]=t.name,o),{})}let y={};document.addEventListener("DOMContentLoaded",async()=>{await loadPartials(),await Y(),R(),N()});export{P as fetchGenres};
//# sourceMappingURL=library-DEahjQgV.js.map
