import{f as c,a as d,b as h}from"./api-W8kOuucx.js";import{Modal as i}from"./modal-B7i7SvVV.js";import"./vendor-B5Z-9nsW.js";const u="https://image.tmdb.org/t/p/original";async function n(){var r;const s=document.getElementById("hero-x");if(s)try{const e=await c(),t=Array.isArray((r=e==null?void 0:e.data)==null?void 0:r.results)?e.data.results:(e==null?void 0:e.results)||[];if(!t.length){l(s);return}const o=t[Math.floor(Math.random()*t.length)];g(s,o)}catch(e){console.error("Movie init error:",e),l(s)}}function f(s){const r=Math.floor(s/2),e=s%2>=1,t=5-r-(e?1:0);let o=[];for(let a=0;a<r;a++)o.push('<svg class="icon-full-star"><use xlink:href="./img/icon.svg#icon-full-star"></use></svg>');e&&o.push('<svg class="icon-half-star"><use xlink:href="./img/icon.svg#icon-half-star"></use></svg>');for(let a=0;a<t;a++)o.push('<svg class="icon-empty-star"><use xlink:href="./img/icon.svg#icon-empty-star"></use></svg>');return o.join("")}function g(s,r){const e=f(r.vote_average);s.innerHTML=`
    <div class="hero-bg" style="background-image:url('${u}${r.backdrop_path||r.poster_path||""}')"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
    <div class="hero-badge">
      <h2 class="hero-title">${r.title??r.name??"Untitled"}</h2>
      <span class="hero-rating">${e}</span>
      </div>
      <p class="hero-sub">
        ${r.overview||"No description available."}
      </p>

      <div class="hero-ctas">
        <button class="btn-play" id="play-trailer-btn">Watch Trailer</button>
        <button class="btn-info" id="more-info-btn">More Info</button>
      </div>
    </div>
  `;const t=s.querySelector("#play-trailer-btn"),o=s.querySelector("#more-info-btn");t==null||t.addEventListener("click",()=>v(r.id)),o==null||o.addEventListener("click",()=>p(r.id))}function l(s){s.innerHTML=`
    <div class="hero-bg" style="background-image:linear-gradient(90deg,#000,#111)"></div>
    <div class="hero-scrim"></div>

    <div class="hero-inner">
      <h2 class="hero-title">Let's Make Your Own Cinema</h2>
      <p class="hero-sub">
        A guide to creating a personalized movie experience.
        Decorate your space, choose your films, and enjoy the show!
      </p>

      <div class="hero-ctas">
        <a href="./catalog.html" class="btn-play">Get Started</a>
      </div>
    </div>
  `}async function v(s){var r;try{const e=await d(s),t=Array.isArray((r=e==null?void 0:e.data)==null?void 0:r.results)?e.data.results:e==null?void 0:e.results,o=t==null?void 0:t.find(a=>a.type==="Trailer"&&a.site==="YouTube");o?i.showTrailer(o.key):i.showMessage("Trailer not available.","Info")}catch(e){console.error("Play trailer error:",e),i.showMessage("Error fetching trailer.","Error")}}async function p(s){try{const r=await h(s),e=(r==null?void 0:r.data)??r;i.renderMovie(e)}catch(r){console.error("Movie details error:",r),i.showMessage("Movie details could not be loaded.","Error")}}document.readyState==="loading"?document.addEventListener("partials:loaded",n,{once:!0}):n();
//# sourceMappingURL=hero-CCs4s9gc.js.map
