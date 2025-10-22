import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const E="c0fe092c4149192005601ffec65036a5",L="https://api.themoviedb.org/3",A=`${L}/trending/movie/day?api_key=${E}`,C=document.getElementById("hero"),H=document.getElementById("movie-title"),O=document.getElementById("movie-overview"),j=document.getElementById("movie-rating"),U=document.getElementById("hero-buttons"),z=document.getElementById("trailer-btn"),u=document.getElementById("load-more-btn"),m=document.getElementById("trailer-modal"),G=document.getElementById("close-modal"),I=document.getElementById("trailer-frame"),v=document.getElementById("library-list"),B=document.getElementById("empty-library"),s=document.getElementById("genre-filter");let p=0;const J=9;function S(e){const n=e/2;let t="";for(let r=1;r<=5;r++)n>=r?t+='<svg class="star-svg-full" width="20" height="20"><use href="../img/icon.svg#icon-full-star"></svg>':n>=r-.5?t+=`<svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
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
              `:t+='<svg class="star-svg-empty" width="20" height="20"><use href="../img/icon.svg#icon-empty-star"></svg>';return t}async function R(){try{const t=(await(await fetch(A)).json()).results[0];if(!t)return;C.style.backgroundImage=`url("https://image.tmdb.org/t/p/original${t.backdrop_path}")`,H.textContent=t.title,O.textContent=t.overview,j.innerHTML=S(t.vote_average),U.classList.remove("hidden"),z.onclick=async()=>{const r=await q(t.id);r?(I.src=r,m.classList.remove("hidden")):alert("Trailer not available!")}}catch(e){console.error("Trending movie fetch error:",e)}}async function q(e){try{const r=(await(await fetch(`${L}/movie/${e}/videos?api_key=${E}&language=en-US`)).json()).results.find(a=>a.type==="Trailer"&&a.site==="YouTube");return r?`https://www.youtube.com/embed/${r.key}`:null}catch(n){return console.error("Trailer fetch error:",n),null}}function _(){I.src="",m.classList.add("hidden")}G.addEventListener("click",_);m.addEventListener("click",e=>{e.target===m&&_()});let x=[];function f(e,n=!0){n&&(v.innerHTML="",p=0,x=e);const t=e.slice(p,p+J),r=t.map(a=>{var d;const o=a.release_date?a.release_date.slice(0,4):"---",l=((d=a.genre_ids)==null?void 0:d.map(y=>c[y]).join(", "))||"---",b=S(a.vote_average);return a.poster_path&&`
                <li id="${a.id}" class="library-card" style="
                    background-image: url(https://image.tmdb.org/t/p/w500${a.poster_path});
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
                    <h3 style="margin:0; font-size:18px;">${a.title}</h3>
                    <p style="margin:2px 0; font-size:14px;">${l} | ${o}</p>
                    <div id="movie-rating">${b}</div>
                </div>
            </li>
        `}).join("");v.insertAdjacentHTML("beforeend",r),p+=t.length,p<e.length?u.classList.remove("hidden"):u.classList.add("hidden"),F()}u.addEventListener("click",()=>{f(x,!1)});function T(){const e=JSON.parse(localStorage.getItem("library"))||[];if(e.length===0){B.style.display="flex",v.innerHTML="",s.parentElement.style.display="none",u.classList.add("hidden");return}B.style.display="none",s.parentElement.style.display="flex";const n=new Set;e.forEach(t=>{var r;return(r=t.genre_ids)==null?void 0:r.forEach(a=>{c[a]&&n.add(c[a])})}),s.innerHTML='<option value="all">Genre</option>',n.forEach(t=>{s.innerHTML+=`<option value="${t}">${t}</option>`}),f(e)}s.addEventListener("change",e=>{const n=e.target.value,t=JSON.parse(localStorage.getItem("library"))||[];if(n==="all")f(t);else{const r=t.filter(a=>a.genre_ids.some(o=>c[o]===n));f(r)}});if(s){let n=function(o){const l=o.match(/\d+/g).map(Number);return(l[0]*299+l[1]*587+l[2]*114)/1e3};const e=window.getComputedStyle(document.body).backgroundColor,t=n(e),r=t<128?"#fff":"#000";s.style.backgroundColor=e,s.style.color=r,s.style.border=`1px solid ${t<128?"#444":"#ccc"}`,s.querySelectorAll("option").forEach(o=>{o.style.backgroundColor=e,o.style.color=r})}function F(){document.querySelectorAll(".library-card").forEach(e=>{e.removeEventListener("click",e._clickHandler);const n=()=>{const t=parseInt(e.id),a=(JSON.parse(localStorage.getItem("library"))||[]).find(o=>o.id===t);a&&P(a,T)};e.addEventListener("click",n),e._clickHandler=n})}function P(e,n){var k;const t=document.getElementById("movie-detail-modal"),r=`https://image.tmdb.org/t/p/w500${e.poster_path}`,a=((k=e.genre_ids)==null?void 0:k.map(i=>c[i]).join(", "))||"N/A",o=e.vote_average?e.vote_average.toFixed(1):"N/A",l=e.vote_count||"N/A",b=e.popularity?e.popularity.toFixed(1):"N/A";t.innerHTML=`
        <div class="detail-overlay"></div>
        <div class="detail-box" role="dialog" aria-modal="true">
            <button class="close-span-btn-details" aria-label="Close detail">&times;</button>
            <img src="${r}" alt="${e.title}" class="detail-poster"/>
            <div class="detail-content">
                <h2>${e.title}</h2>
                <div class="detail-info">
                    <p><strong>Vote / Votes:</strong> <span>${o}</span> / <span>${l}</span></p>
                    <p><strong>Popularity:</strong> <span>${b}</span></p>
                    <p><strong>Genre:</strong> <span>${a}</span></p>
                </div>
                <p><strong>ABOUT</strong></p>
                <div class="scrollable-description">${e.overview||"No description available."}</div>
                <button class="library-btn" data-id="${e.id}"></button>
            </div>
        </div>
    `,t.classList.add("active");const d=t.querySelector(".library-btn");function y(){const $=(JSON.parse(localStorage.getItem("library"))||[]).some(g=>g.id===e.id);d.textContent=$?"Remove from My Library":"Add to My Library"}y(),d.addEventListener("click",()=>{let i=JSON.parse(localStorage.getItem("library"))||[];i.some(g=>g.id===e.id)?i=i.filter(g=>g.id!==e.id):i.push(e),localStorage.setItem("library",JSON.stringify(i)),y(),typeof n=="function"&&n()});const w=i=>{i.key==="Escape"&&h()};document.addEventListener("keydown",w);const M=t.querySelector(".detail-overlay"),N=t.querySelector(".close-span-btn-details");function h(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",w)}M.addEventListener("click",h),N.addEventListener("click",h)}async function V(){return(await(await fetch(`${L}/genre/movie/list?api_key=${E}&language=en-US`)).json()).genres}async function D(){c=(await V()).reduce((n,t)=>(n[t.id]=t.name,n),{})}let c={};(async function(){await loadPartials(),await D(),R(),T()})();
//# sourceMappingURL=library.js.map
