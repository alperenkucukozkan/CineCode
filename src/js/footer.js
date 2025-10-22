const students = [
  {
    name: "Alperen Küçüközkan",
    role: "Team Lead",
    img: "./img/alperen.jpg",
    github: "https://github.com/alperenkucukozkan",
    linkedin: "https://www.linkedin.com/in/alperen-k%C3%BC%C3%A7%C3%BCk%C3%B6zkan-b9b30625a/"
  },
  {
    name: "Tuğba Bostancı",
    role: "Scrum Master",
    img: "./img/tugba.jpg",
    github: "https://github.com/tugbabostanci",
    linkedin: "https://linkedin.com/in/tuğba-bostancı-040900115"
  },
  {
    name: "Esra Aras",
    role: "Developer",
    img: "./img/esra.jpg",
    github: "https://github.com/Esraras",
    linkedin: "https://linkedin.com/in/esraaras/"
  },
  {
    name: "Nurgül Çoksağlamdemir",
    role: "Developer",
    img: "./img/nurgul.jpg",
    github: "https://github.com/nurgul4261",
    linkedin: "https://linkedin.com/in/nurg%C3%BCl-%C3%A7oksa%C4%9Flamdemir-423b0a382/"
  },
  {
    name: "Yunus Sarı",
    role: "Developer",
    img: "./img/yunus.jpg",
    github: "https://github.com/yunsari",
    linkedin: "https://linkedin.com/in/yunus-sar%C4%B1-3713a9242/"
  },
  {
    name: "Furkan Çelik",
    role: "Developer",
    img: "./img/furkan.jpg",
    github: "https://github.com/furkangoit",
    linkedin: "https://linkedin.com/in/furkan-%C3%A7elik-a6399632b/"
  },
  {
    name: "Hilmi Şafak",
    role: "Developer",
    img: "./img/hilmi.jpg",
    github: "https://github.com/hilmisafak",
    linkedin: "https://linkedin.com/in/hilmi-safak/"
  },
  {
    name: "Baran Taşçı",
    role: "Developer",
    img:"./img/baran.jpg",
    github: "https://github.com/BaranTascii",
    linkedin: "https://www.linkedin.com/in/baran-tasci/"
  },
  {
    name: "Emre Ürün",
    role: "Developer",
    img: "./img/emre.jpg",
    github: "https://github.com/Emre-Urun",
    linkedin: "#"
  },
  {
    name: "Ali Kemal Demir",
    role: "Developer",
    img: "./img/alikemal.jpg",
    github: "https://github.com/Tirnerf",
    linkedin: "https://linkedin.com/in/akdemir77/"
  }
];

function createStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .footer {
      width: 100%;
      text-align: center;
      padding: 20px;
      color: #111;
    }

    .goit-students {
      color: #111;
      cursor: pointer;
      background: none;
      border: none;
      font-size: 16px;
    }

    .modal-title {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.8);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 999;
      padding: 40px 20px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-content {
      background-color: #111;
      color: #f87719;
      border-radius: 10px;
      padding: 20px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: inset 0 0 10px 5px #f57302e8;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 30px;
      color: #f87719;
      cursor: pointer;
    }

    .student-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0;
      gap: 20px;
    }

    .student-item {
      text-align: center;
      transition: transform 250ms ease-in-out;
    }

    .student-item:hover {
      transform: scale(1.05);
    }

    .student-photo {
      width: 200px;
      height: 260px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: transform 250ms ease-in-out;
    }

    .student-info {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .footer-icon {
      margin: 0 5px;
    }

    .info-icon {
      fill: #f87719;
    }
  `;
  document.head.appendChild(style);
}

function createStudentItem(student) {
  return `
    <li class="student-item">
      <img class="student-photo" src="${student.img}" alt="${student.name}" />
      <div class="student-info">
        <h3>${student.name}</h3>
        <p>${student.role}</p>
        <a class="footer-icon" href="${student.github}" target="_blank" aria-label="GitHub">
          <svg class="icon-github">
            <use xlink:href="../img/icon.svg#icon-github"></use>
          </svg>
        </a>
        ${student.linkedin !== "#" ? `
        <a class="footer-icon" href="${student.linkedin}" target="_blank" aria-label="LinkedIn">
          <svg class="info-icon" width="40" height="40">
            <use xlink:href="../img/icon.svg#icon-linkedin"></use>
          </svg>
        </a>` : ""}
      </div>
    </li>
  `;
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>
      © 2025 | All Rights Reserved | Developed with 🧡 by
      <button class="goit-students" id="openModalBtn">GoIT Students</button>
    </p>
  `;
  document.body.appendChild(footer);
}

function renderModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" id="closeModalBtn">&times;</span>
      <h2 class="modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${students.map(createStudentItem).join("")}
      </ul>
    </div>
  `;
  document.body.appendChild(modal);
}

function applyResponsiveStyles() {
  const modalContent = document.querySelector(".modal-content");
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
  createStyles();
  renderFooter();
  renderModal();
  applyResponsiveStyles();
  window.addEventListener("resize", applyResponsiveStyles);

  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");

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
}

document.addEventListener("DOMContentLoaded", initFooterModal);
