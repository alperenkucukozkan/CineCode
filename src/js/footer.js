const students = [
  {
    name: "Alperen Küçüközkan",
    role: "Team Lead",
    img: "../img/alperen.jpg",
    github: "https://github.com/alperenkucukozkan",
    linkedin: "https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"
  },
  {
    name: "Tuğba Bostancı",
    role: "Scrum Master",
    img: "../img/tugba.jpg",
    github: "https://github.com/tugbabostanci",
    linkedin: "https://linkedin.com/in/tuğba-bostancı-040900115"
  },
  {
    name: "Esra Aras",
    role: "Developer",
    img: "../img/esra.jpg",
    github: "https://github.com/Esraras",
    linkedin: "https://linkedin.com/in/esraaras/"
  },
  {
    name: "Nurgül Çoksağlamdemir",
    role: "Developer",
    img: "../img/nurgul.jpg",
    github: "https://github.com/nurgul4261",
    linkedin: "https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"
  },
  {
    name: "Yunus Sarı",
    role: "Developer",
    img: "../img/yunus.jpg",
    github: "https://github.com/yunsari",
    linkedin: "https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"
  },
  {
    name: "Furkan Çelik",
    role: "Developer",
    img: "../img/furkan.jpg",
    github: "https://github.com/furkangoit",
    linkedin: "https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"
  },
  {
    name: "Hilmi Şafak",
    role: "Developer",
    img: "../img/hilmi.jpg",
    github: "https://github.com/hilmisafak",
    linkedin: "https://linkedin.com/in/hilmi-safak/"
  },
  {
    name: "Baran Taşçı",
    role: "Developer",
    img: "../img/baran.jpg",
    github: "https://github.com/BaranTascii",
    linkedin: "https://www.linkedin.com/in/baran-tasci/"
  },
  {
    name: "Emre Ürün",
    role: "Developer",
    img: "../img/emre.jpg",
    github: "https://github.com/Emre-Urun",
    linkedin: "#"
  },
  {
    name: "Ali Kemal Demir",
    role: "Developer",
    img: "../img/alikemal.jpg",
    github: "https://github.com/Tirnerf",
    linkedin: "https://linkedin.com/in/akdemir77/"
  }
];

function createStudentItem(student) {
  return `
    <li class="student-item">
      <img class="student-photo" src="${student.img}" alt="${student.name}" />
      <div class="student-info">
        <h3>${student.name}</h3>
        <p>${student.role}</p>
        <a class="footer-icon" href="${student.github}" target="_blank" aria-label="GitHub">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-github"></use>
          </svg>
        </a>
        ${student.linkedin !== "#" ? `
        <a class="footer-icon" href="${student.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="30" height="30">
            <use xlink:href="../img/icon.svg#icon-linkedin"></use>
          </svg>
        </a>` : ""}
      </div>
    </li>
  `;
}

function ensureFooter() {
  let footer = document.querySelector('footer.footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'footer goit-footer';
    document.body.appendChild(footer);
  } else {
    footer.classList.add('goit-footer');
  }
  footer.innerHTML = `
    <p class="footer-description">
      © 2025 | All Rights Reserved | Developed with <span aria-label="love">🧡</span> by <button class="goit-students" id="openFooterModalBtn" type="button">GoIT Students</button>
    </p>
  `;
  return footer;
}

function renderFooterModal() {
  let modal = document.getElementById("footerModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "footer-modal-overlay";
  modal.id = "footerModal";
  modal.innerHTML = `
    <div class="footer-modal-content">
      <span class="footer-modal-close-btn" id="closeFooterModalBtn">&times;</span>
      <h2 class="footer-modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${students.map(createStudentItem).join("")}
      </ul>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function applyFooterModalResponsiveStyles() {
  const modalContent = document.querySelector(".footer-modal-content");
  const footer = document.querySelector(".footer");
  if (!modalContent || !footer) return;
  if (window.matchMedia("(max-width: 768px)").matches) {
    modalContent.style.maxWidth = "300px";
    footer.style.paddingBottom = "100px";
  } else if (window.matchMedia("(max-width: 1279px)").matches) {
    modalContent.style.maxWidth = "720px";
    footer.style.paddingBottom = "80px";
  } else {
    modalContent.style.maxWidth = "1200px";
    footer.style.paddingBottom = "50px";
  }
}

function initFooterModal() {
  ensureFooter();
  const modal = renderFooterModal();
  const modalContent = modal.querySelector(".footer-modal-content");
  const openBtn = document.getElementById("openFooterModalBtn");
  const closeBtn = document.getElementById("closeFooterModalBtn");

  if (!openBtn || !closeBtn) {
    console.warn("Modal tetikleyici veya kapatma butonu bulunamadı.");
    return;
  }

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  applyFooterModalResponsiveStyles();
  window.addEventListener("resize", applyFooterModalResponsiveStyles);
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initFooterModal, { once: true });
} else {
  initFooterModal();
}