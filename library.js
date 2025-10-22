import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const v="c0fe092c4149192005601ffec65036a5",E="https://api.themoviedb.org/3",N=`${E}/trending/movie/day?api_key=${v}`,A=document.getElementById("hero"),C=document.getElementById("movie-title"),H=document.getElementById("movie-overview"),O=document.getElementById("movie-rating"),j=document.getElementById("hero-buttons"),U=document.getElementById("trailer-btn"),y=document.getElementById("load-more-btn"),m=document.getElementById("trailer-modal"),z=document.getElementById("close-modal"),I=document.getElementById("trailer-frame"),h=document.getElementById("library-list"),B=document.getElementById("empty-library"),i=document.getElementById("genre-filter");let p=0;const G=9;function S(e){const n=e/2;let t="";for(let r=1;r<=5;r++)n>=r?t+='<svg class="star-svg-full" width="20" height="20"><use href="../img/icon.svg#icon-full-star"></svg>':n>=r-.5?t+=`<svg class="star-svg-half" width="20" height="20" viewBox="0 0 32 32">
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
              `:t+='<svg class="star-svg-empty" width="20" height="20"><use href="../img/icon.svg#icon-empty-star"></svg>';return t}async function J(){try{const t=(await(await fetch(N)).json()).results[0];if(!t)return;A.style.backgroundImage=`url("https://image.tmdb.org/t/p/original${t.backdrop_path}")`,C.textContent=t.title,H.textContent=t.overview,O.innerHTML=S(t.vote_average),j.classList.remove("hidden"),U.onclick=async()=>{const r=await R(t.id);r?(I.src=r,m.classList.remove("hidden")):alert("Trailer not available!")}}catch(e){console.error("Trending movie fetch error:",e)}}async function R(e){try{const r=(await(await fetch(`${E}/movie/${e}/videos?api_key=${v}&language=en-US`)).json()).results.find(o=>o.type==="Trailer"&&o.site==="YouTube");return r?`https://www.youtube.com/embed/${r.key}`:null}catch(n){return console.error("Trailer fetch error:",n),null}}function _(){I.src="",m.classList.add("hidden")}z.addEventListener("click",_);m.addEventListener("click",e=>{e.target===m&&_()});let x=[];function f(e,n=!0){n&&(h.innerHTML="",p=0,x=e);const t=e.slice(p,p+G),r=t.map(o=>{var d;const a=o.release_date?o.release_date.slice(0,4):"---",l=((d=o.genre_ids)==null?void 0:d.map(u=>c[u]).join(", "))||"---",b=S(o.vote_average);return o.poster_path&&`
                <li id="${o.id}" class="library-card" style="
                    background-image: url(https://image.tmdb.org/t/p/w500${o.poster_path});
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
                    <h3 style="margin:0; font-size:18px;">${o.title}</h3>
                    <p style="margin:2px 0; font-size:14px;">${l} | ${a}</p>
                    <div id="movie-rating">${b}</div>
                </div>
            </li>
        `}).join("");h.insertAdjacentHTML("beforeend",r),p+=t.length,p<e.length?y.classList.remove("hidden"):y.classList.add("hidden"),q()}y.addEventListener("click",()=>{f(x,!1)});function T(){const e=JSON.parse(localStorage.getItem("library"))||[];if(e.length===0){B.style.display="flex",h.innerHTML="",i.parentElement.style.display="none",y.classList.add("hidden");return}B.style.display="none",i.parentElement.style.display="flex";const n=new Set;e.forEach(t=>{var r;return(r=t.genre_ids)==null?void 0:r.forEach(o=>{c[o]&&n.add(c[o])})}),i.innerHTML='<option value="all">Genre</option>',n.forEach(t=>{i.innerHTML+=`<option value="${t}">${t}</option>`}),f(e)}i.addEventListener("change",e=>{const n=e.target.value,t=JSON.parse(localStorage.getItem("library"))||[];if(n==="all")f(t);else{const r=t.filter(o=>o.genre_ids.some(a=>c[a]===n));f(r)}});if(i){let n=function(a){const l=a.match(/\d+/g).map(Number);return(l[0]*299+l[1]*587+l[2]*114)/1e3};const e=window.getComputedStyle(document.body).backgroundColor,t=n(e),r=t<128?"#fff":"#000";i.style.backgroundColor=e,i.style.color=r,i.style.border=`1px solid ${t<128?"#444":"#ccc"}`,i.querySelectorAll("option").forEach(a=>{a.style.backgroundColor=e,a.style.color=r})}function q(){document.querySelectorAll(".library-card").forEach(e=>{e.removeEventListener("click",e._clickHandler);const n=()=>{const t=parseInt(e.id),o=(JSON.parse(localStorage.getItem("library"))||[]).find(a=>a.id===t);o&&F(o,T)};e.addEventListener("click",n),e._clickHandler=n})}function F(e,n){var k;const t=document.getElementById("movie-detail-modal"),r=`https://image.tmdb.org/t/p/w500${e.poster_path}`,o=((k=e.genre_ids)==null?void 0:k.map(s=>c[s]).join(", "))||"N/A",a=e.vote_average?e.vote_average.toFixed(1):"N/A",l=e.vote_count||"N/A",b=e.popularity?e.popularity.toFixed(1):"N/A";t.innerHTML=`
        <div class="detail-box" role="dialog" aria-modal="true">
            <button class="close-span-btn-details" aria-label="Close detail">&times;</button>
            <img src="${r}" alt="${e.title}" class="detail-poster"/>
            <div class="detail-content">
                <h2>${e.title}</h2>
                <p><strong>Vote / Votes:</strong> <span>${a}</span> / <span>${l}</span></p>
                <p><strong>Popularity:</strong> <span>${b}</span></p>
                <p><strong>Genre:</strong> <span>${o}</span></p>
                <p><strong>ABOUT</strong></p>
                <div class="scrollable-description">${e.overview||"No description available."}</div>
                <button class="library-btn" data-id="${e.id}"></button>
            </div>
        </div>
        `,t.classList.add("active");const d=t.querySelector(".library-btn");function u(){const $=(JSON.parse(localStorage.getItem("library"))||[]).some(g=>g.id===e.id);d.textContent=$?"Remove from My Library":"Add to My Library"}u(),d.addEventListener("click",()=>{let s=JSON.parse(localStorage.getItem("library"))||[];s.some(g=>g.id===e.id)?s=s.filter(g=>g.id!==e.id):s.push(e),localStorage.setItem("library",JSON.stringify(s)),u(),typeof n=="function"&&n()});const L=s=>{s.key==="Escape"&&w()};document.addEventListener("keydown",L);const M=t.querySelector(".close-span-btn-details");function w(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",L)}M.addEventListener("click",w)}async function P(){return(await(await fetch(`${E}/genre/movie/list?api_key=${v}&language=en-US`)).json()).genres}async function V(){c=(await P()).reduce((n,t)=>(n[t.id]=t.name,n),{})}let c={};(async function(){await loadPartials(),await V(),J(),T()})();
//# sourceMappingURL=library.js.map
