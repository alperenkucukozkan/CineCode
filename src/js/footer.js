
  // footer-modal
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
      <img class="student-photo" src="${student.img}" alt="${student.role}" width="200" height="260" />
      <div class="student-info">
        <h3 class="team-person">${student.name}</h3>
        <p class="team-role">${student.role}</p>
        <a class="footer-icon" href="${student.github}" target="_blank">
          <svg class="info-icon" width="40" height="40">
            <use href="../img/svg#icon-github"></use>
          </svg>
        </a>
        <a class="footer-icon" href="${student.linkedin}" target="_blank">
          <svg class="info-icon" width="40" height="40">
            <use href="../img/svg#icon-linkedin"></use>
          </svg>
        </a>
      </div>
    </li>
  `;
}

function renderModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" id="closeModal">&times;</span>
      <h2 class="modal-title">PROJECT TEAM</h2>
      <ul class="student-list">
        ${students.map(createStudentItem).join("")}
      </ul>
    </div>
  `;
  document.body.appendChild(modal);
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="container">
      <p class="footer-description">
        © 2025 | All Rights Reserved | Developed with <span>🧡</span> by
        <a class="goit-students" href="#" id="openModalLink"> GoIT Students </a>
      </p>
    </div>
  `;
  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  renderModal();

  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const openLink = document.getElementById("openModalLink");

  openLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      modal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
});
