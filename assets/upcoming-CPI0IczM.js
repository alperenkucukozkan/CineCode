import{a as M,g as x}from"./api-qhkpy8Db.js";const i=document.getElementById("upcoming-content");if(i){let h=function(){return JSON.parse(localStorage.getItem("library"))||[]},u=function(t){return h().includes(t)},v=function(t,a){let e=JSON.parse(localStorage.getItem("library"))||[];e.some(s=>s.id===t.id)?(e=e.filter(s=>s.id!==t.id),a.textContent="Add to my library",a.classList.remove("btn-remove"),a.classList.add("btn-add")):(e.push(t),a.textContent="Remove from my library",a.classList.remove("btn-add"),a.classList.add("btn-remove")),localStorage.setItem("library",JSON.stringify(e))},f=function(t){return t.map(a=>{var e;return(e=p.find(n=>n.id===a))==null?void 0:e.name}).filter(Boolean).join(", ")},$=function(t){var d,g;const a=t.backdrop_path?`https://image.tmdb.org/t/p/original/${t.backdrop_path}`:"https://via.placeholder.com/500x300?text=No+Image",e=u(t.id),n=e?"Remove from my library":"Add to my library",s=e?"btn-remove":"btn-add",w=f(t.genre_ids||[]);i.innerHTML=`
      <div class="upcoming-card">
        <img src="${a}" alt="${t.title}" />
        <div class="info">
          <h3 class="movie-name">${t.title}</h3>
          <div class="details-wrapper">
            <p class="movie-detail">
              <span>Release date</span>
              <span class="highlight">${t.release_date||"Unknown"}</span>
            </p>

            <p class="movie-detail">
              <span>Vote / Votes</span>
         
              <span>
                <span class="vote-box">${((d=t.vote_average)==null?void 0:d.toFixed(1))||"-"}</span>
                <span>/</span>
                <span class="vote-box">${t.vote_count||"-"}</span> 
              </span>
        
            </p>

            <p class="movie-detail">
              <span>Popularity</span>
              <span>${((g=t.popularity)==null?void 0:g.toFixed(1))||"-"}</span>
            </p>

            <p class="movie-detail">
              <span>Genre</span>
              <span>${w||"Unknown"}</span>
            </p>
          </div>
          <h4 class="about-title">ABOUT</h4>
          <p class="movie-overview">${t.overview||"No description available."}</p>

          <button id="library-btn" class="btn-library ${s}">${n}</button>
        </div>
      </div>
    `;const r=document.getElementById("library-btn");r==null||r.addEventListener("click",()=>v(t,r))};const o=new Date,l=o.getFullYear(),c=String(o.getMonth()+1).padStart(2,"0"),m=new Date(l,o.getMonth()+1,0).getDate(),b=`${l}-${c}-01`,y=`${l}-${c}-${m}`;let p=[];async function L(){try{p=(await M()).genres||[];const e=(await x(b,y,{region:"TR"})).results||[];if(!e.length){i.innerHTML=`<p>${e.length} movies this month.</p>`;return}const n=e[Math.floor(Math.random()*e.length)];$(n)}catch(t){console.error("upcoming init error:",t),i.innerHTML="<p>Error while fetching movie data.</p>"}}L()}
//# sourceMappingURL=upcoming-CPI0IczM.js.map
