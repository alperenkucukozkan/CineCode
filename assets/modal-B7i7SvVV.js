import{b as p}from"./vendor-B5Z-9nsW.js";function l(){try{return JSON.parse(localStorage.getItem("library"))||[]}catch{return[]}}function d(e){localStorage.setItem("library",JSON.stringify(e))}function c(e){return l().some(t=>Number(t.id)===Number(e))}function u(e,a){let t=l();t.some(r=>Number(r.id)===Number(e.id))?(t=t.filter(r=>Number(r.id)!==Number(e.id)),a.textContent="Add to Library",a.classList.remove("app-btn--danger"),a.classList.add("app-btn--primary")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(r=>r.id)),t.push(e),a.textContent="Remove from my library",a.classList.remove("app-btn--primary"),a.classList.add("app-btn--danger")),d(t)}let o=null;function i(e,a){o!=null&&o.visible()&&o.close(),o=p.create(e,{onShow:t=>{const s=t.element().querySelector(".app-modal__close");s&&s.addEventListener("click",()=>t.close());function r(n){n.key==="Escape"&&(t.close(),document.removeEventListener("keydown",r))}document.addEventListener("keydown",r),typeof a=="function"&&a(t)}}),o.show()}function b(e){const a=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",t=Array.isArray(e.genres)?e.genres.map(r=>r.name).join(", "):Array.isArray(e.genre_ids)?e.genre_ids.join(", "):"-",s=c(e.id);return`
    <div class="app-modal" role="dialog" aria-modal="true">
      <button class="app-modal__close" type="button" aria-label="Close">
        <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
          <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="${a}" class="app-modal__poster" alt="${e.title||e.name||"Movie"}"/>
      <div class="app-modal__details">
        <h2 class="app-modal__title">${e.title||e.name||"Untitled"}</h2>
        <div class="app-meta">
          <div><strong>Vote / Votes:</strong> 
            <span class="vote-box">${(e.vote_average??0).toFixed(1)}</span> 
            <span>/</span> 
            <span class="vote-box">${e.vote_count??0}</span>
          </div>
          <div><strong>Popularity:</strong> ${(e.popularity??0).toFixed(1)}</div>
          <div><strong>Genre:</strong> ${t}</div>
        </div>
        <h3 class="app-section-title">ABOUT</h3>
        <p class="app-modal__about">${e.overview||"No description available."}</p>
        <button class="app-btn ${s?"app-btn--danger":"app-btn--primary"}" data-action="toggle-library">
          ${s?"Remove from my library":"Add to Library"}
        </button>
      </div>
    </div>
  `}const m={renderMovie(e){i(b(e),a=>{const t=a.element().querySelector('[data-action="toggle-library"]');t&&t.addEventListener("click",()=>u(e,t))})},showTrailer(e){i(`
      <div class="app-modal app-modal--wide">
        <button class="app-modal__close" type="button" aria-label="Close">
          <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
            <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="app-modal__player">
          <iframe
            src="https://www.youtube.com/embed/${e}"
            width="100%" height="100%" frameborder="0" allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
        </div>
      </div>
    `)},showMessage(e,a="Info"){i(`
      <div class="app-modal">
        <button class="app-modal__close" type="button" aria-label="Close">
          <svg class="app-icon" width="24" height="24" viewBox="0 0 12 12">
            <path d="M11 11L0.5 0.5M11 0.5L0.5 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="app-modal__details">
          <h2 class="app-modal__title">${a}</h2>
          <p class="app-modal__about">${e}</p>
        </div>
      </div>
    `)},openWithHTML:i,close(){o!=null&&o.visible()&&o.close()}};export{m as Modal};
//# sourceMappingURL=modal-B7i7SvVV.js.map
