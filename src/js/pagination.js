let pageChangeCallback = null;
let paginationContainer = null;

export function initPagination(callback) {
  pageChangeCallback = callback;
  paginationContainer = document.getElementById('pagination-ul');
}

export function renderPagination(currentPage, totalPages) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';
  if (!totalPages || totalPages <= 0) return;

  const frag = document.createDocumentFragment();

  frag.appendChild(
    makeBtn('‹', 'prev', currentPage === 1, () => {
      if (currentPage > 1) pageChangeCallback(currentPage - 1);
    })
  );

  const windowSize = 3;
  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);

  if (start > 1) {
    frag.appendChild(makePage(1, currentPage));
    if (start > 2) frag.appendChild(makeDots());
  }

  for (let p = start; p <= end; p++) {
    frag.appendChild(makePage(p, currentPage));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) frag.appendChild(makeDots());
    frag.appendChild(makePage(totalPages, currentPage));
  }

  frag.appendChild(
    makeBtn('›', 'next', currentPage === totalPages, () => {
      if (currentPage < totalPages) pageChangeCallback(currentPage + 1);
    })
  );

  paginationContainer.appendChild(frag);
}

function makePage(n, current) {
  const label = String(n).padStart(2, '0');
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.className = 'page-btn page';
  if (n === current) btn.classList.add('active');
  btn.textContent = label;
  btn.addEventListener('click', () => pageChangeCallback(n));
  li.appendChild(btn);
  return li;
}
function makeBtn(text, kind, disabled, onClick) {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.className = `page-btn ${kind}`;
  btn.textContent = text;
  btn.disabled = !!disabled;
  if (!disabled) btn.addEventListener('click', onClick);
  li.appendChild(btn);
  return li;
}
function makeDots() {
  const li = document.createElement('li');
  li.className = 'page-ellipsis';
  li.textContent = '...';
  return li;
}
