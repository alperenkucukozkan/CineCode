const s=[{name:"Alperen Küçüközkan",role:"Team Lead",img:"../img/alperen.jpg",github:"https://github.com/alperenkucukozkan",linkedin:"https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"},{name:"Tuğba Bostancı",role:"Scrum Master",img:"../img/tugba.jpg",github:"https://github.com/tugbabostanci",linkedin:"https://linkedin.com/in/tuğba-bostancı-040900115"},{name:"Esra Aras",role:"Developer",img:"../img/esra.jpg",github:"https://github.com/Esraras",linkedin:"https://linkedin.com/in/esraaras/"},{name:"Nurgül Çoksağlamdemir",role:"Developer",img:"../img/nurgul.jpg",github:"https://github.com/nurgul4261",linkedin:"https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"},{name:"Yunus Sarı",role:"Developer",img:"../img/yunus.jpg",github:"https://github.com/yunsari",linkedin:"https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"},{name:"Furkan Çelik",role:"Developer",img:"../img/furkan.jpg",github:"https://github.com/furkangoit",linkedin:"https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"},{name:"Hilmi Şafak",role:"Developer",img:"../img/hilmi.jpg",github:"https://github.com/hilmisafak",linkedin:"https://linkedin.com/in/hilmi-safak/"},{name:"Baran Taşçı",role:"Developer",img:"../img/baran.jpg",github:"https://github.com/BaranTascii",linkedin:"https://www.linkedin.com/in/baran-tasci/"},{name:"Emre Ürün",role:"Developer",img:"../img/emre.jpg",github:"https://github.com/Emre-Urun",linkedin:"#"},{name:"Ali Kemal Demir",role:"Developer",img:"../img/alikemal.jpg",github:"https://github.com/Tirnerf",linkedin:"https://linkedin.com/in/akdemir77/"}];function r(e){return`
    <li class="student-item">
      <img class="student-photo" src="${e.img}" alt="${e.name}" />
      <div class="student-info">
        <h3>${e.name}</h3>
        <p>${e.role}</p>
        <a class="footer-icon" href="${e.github}" target="_blank" aria-label="GitHub">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-github"></use>
          </svg>
        </a>
        ${e.linkedin!=="#"?`
        <a class="footer-icon" href="${e.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-linkedin"></use>
          </svg>
        </a>`:""}
      </div>
    </li>
  `}function d(){let e=document.querySelector("footer.footer");return e?e.classList.add("goit-footer"):(e=document.createElement("footer"),e.className="footer goit-footer",document.body.appendChild(e)),e.innerHTML=`
    <p class="footer-description">
      © 2025 | All Rights Reserved | Developed with <span aria-label="love">🧡</span> by <button class="goit-students" id="openFooterModalBtn" type="button">GoIT Students</button>
    </p>
  `,e}function m(){let e=document.getElementById("footerModal");return e||(e=document.createElement("div"),e.className="footer-modal-overlay",e.id="footerModal",e.innerHTML=`
    <div class="footer-modal-content">
      <span class="footer-modal-close-btn" id="closeFooterModalBtn">&times;</span>
      <h2 class="footer-modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${s.map(r).join("")}
      </ul>
    </div>
  `,document.body.appendChild(e),e)}function a(){const e=document.querySelector(".footer-modal-content"),t=document.querySelector(".footer");!e||!t||(window.matchMedia("(max-width: 768px)").matches?(e.style.maxWidth="300px",t.style.paddingBottom="100px",modalTitle.style.fontSize="25px"):window.matchMedia("(max-width: 1279px)").matches?(e.style.maxWidth="720px",t.style.paddingBottom="80px",modalTitle.style.fontSize="28px"):(e.style.maxWidth="1200px",t.style.paddingBottom="50px",modalTitle.style.fontSize="36px"))}function l(){d();const e=m(),t=e.querySelector(".footer-modal-content"),i=document.getElementById("openFooterModalBtn"),n=document.getElementById("closeFooterModalBtn");if(!i||!n){console.warn("Modal tetikleyici veya kapatma butonu bulunamadı.");return}i.addEventListener("click",()=>{e.classList.add("active"),document.body.style.overflow="hidden"}),n.addEventListener("click",()=>{e.classList.remove("active"),document.body.style.overflow=""}),e.addEventListener("click",o=>{t.contains(o.target)||(e.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",o=>{o.key==="Escape"&&(e.classList.remove("active"),document.body.style.overflow="")}),a(),window.addEventListener("resize",a)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l,{once:!0}):l();
//# sourceMappingURL=footer-DuqN7TY8.js.map
