import{b as n}from"./vendor-B5Z-9nsW.js";function i(){try{return JSON.parse(localStorage.getItem("library"))||[]}catch{return[]}}function p(e){localStorage.setItem("library",JSON.stringify(e))}function d(e){return i().some(t=>Number(t.id)===Number(e))}function c(e,a){let t=i();t.some(s=>Number(s.id)===Number(e.id))?(t=t.filter(s=>Number(s.id)!==Number(e.id)),a.textContent="Add to Library",a.classList.remove("app-btn--danger"),a.classList.add("app-btn--primary")):(!e.genre_ids&&e.genres&&(e.genre_ids=e.genres.map(s=>s.id)),t.push(e),a.textContent="Remove from my library",a.classList.remove("app-btn--primary"),a.classList.add("app-btn--danger")),p(t)}let r=null;function l(e,a){r!=null&&r.visible()&&r.close(),r=n.create(e,{onShow:t=>{const o=t.element().querySelector(".app-modal__close");o&&o.addEventListener("click",()=>t.close()),typeof a=="function"&&a(t)}}),r.show()}function b(e){const a=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",t=Array.isArray(e.genres)?e.genres.map(s=>s.name).join(", "):Array.isArray(e.genre_ids)?e.genre_ids.join(", "):"-",o=d(e.id);return`
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
          <div><strong>Vote / Votes:</strong> <span class="vote-box">${e.vote_average??0}</span> <span>/</span> <span class="vote-box">${e.vote_count??0}</span></div>
          <div><strong>Popularity:</strong> ${e.popularity??0}</div>
          <div><strong>Genre:</strong> ${t}</div>
        </div>
        <h3 class="app-section-title">ABOUT</h3>
        <p class="app-modal__about">${e.overview||"No description available."}</p>
        <button class="app-btn ${o?"app-btn--danger":"app-btn--primary"}" data-action="toggle-library">
          ${o?"Remove from my library":"Add to Library"}
        </button>
      </div>
    </div>
  `}const g={renderMovie(e){l(b(e),a=>{const t=a.element().querySelector('[data-action="toggle-library"]');t&&t.addEventListener("click",()=>c(e,t))})},showTrailer(e){l(`
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
    `)},showMessage(e,a="Info"){l(`
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
    `)},openWithHTML:l,close(){r!=null&&r.visible()&&r.close()}};export{g as Modal};
//# sourceMappingURL=modal-hIj8PosX.js.map
