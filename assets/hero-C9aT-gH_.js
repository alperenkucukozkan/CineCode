import{f as l,a as c,b as d}from"./api-W8kOuucx.js";const h="https://image.tmdb.org/t/p/original";async function i(){var r;const o=document.getElementById("hero-x");if(o)try{const e=await l(),t=Array.isArray((r=e==null?void 0:e.data)==null?void 0:r.results)?e.data.results:(e==null?void 0:e.results)||[];if(!t.length){n(o);return}const a=t[Math.floor(Math.random()*t.length)];u(o,a)}catch(e){console.error("Movie init error:",e),n(o)}}function u(o,r){o.innerHTML=`
    <div class="hero-bg" style="background-image:url('${h}${r.backdrop_path||r.poster_path||""}')"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
      <h2 class="hero-title">${r.title??r.name??"Untitled"}</h2>
      <p class="hero-sub">
        ${r.overview||"No description available."}
      </p>

      <div class="hero-ctas">
        <button class="btn-play" id="play-trailer-btn">Play Trailer</button>
        <button class="btn-info" id="more-info-btn">More Info</button>
        <span class="hero-rating">⭐ ${r.vote_average!=null?Number(r.vote_average).toFixed(1):"N/A"}</span>
      </div>
    </div>
  `;const e=o.querySelector("#play-trailer-btn"),t=o.querySelector("#more-info-btn");e==null||e.addEventListener("click",()=>v(r.id)),t==null||t.addEventListener("click",()=>y(r.id))}function n(o){o.innerHTML=`
    <div class="hero-bg" style="background-image:linear-gradient(90deg,#000,#111)"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
      <h2 class="hero-title">Let's Make Your Own Cinema</h2>
      <p class="hero-sub">
        A guide to creating a personalized movie experience.
        Decorate your space, choose your films, and enjoy the show!
      </p>

      <div class="hero-ctas">
        <a href="../catalog.html" class="btn-play">Get Started</a>
      </div>
    </div>
  `}async function v(o){var r;try{const e=await c(o),t=Array.isArray((r=e==null?void 0:e.data)==null?void 0:r.results)?e.data.results:e==null?void 0:e.results,a=t==null?void 0:t.find(s=>s.type==="Trailer"&&s.site==="YouTube");a?Modal.showTrailer(a.key):Modal.showMessage("Trailer not available.","Info")}catch(e){console.error("Play trailer error:",e),Modal.showMessage("Error fetching trailer.","Error")}}async function y(o){try{const r=await d(o),e=(r==null?void 0:r.data)??r;Modal.renderMovie(e)}catch(r){console.error("Movie details error:",r),Modal.showMessage("Movie details could not be loaded.","Error")}}document.readyState==="loading"?document.addEventListener("partials:loaded",i,{once:!0}):i();
//# sourceMappingURL=hero-C9aT-gH_.js.map
