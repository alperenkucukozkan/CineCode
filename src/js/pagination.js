// ===== MODULE STATE =====
let pageChangeCallback = null;
let paginationContainer = null;

// ===== INITIALIZATION =====
export function initPagination(callback) {
  pageChangeCallback = callback;
  paginationContainer = document.getElementById('pagination-ul');
}

// ===== RENDER PAGINATION =====
export function renderPagination(currentPage, totalPages) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';

  if (totalPages <= 1) return;

  const fragment = document.createDocumentFragment();

  // Previous button
  if (currentPage > 1) {
    const prevBtn = createPaginationButton('‹ Önceki', false, 'prev');
    const prevButton = prevBtn.querySelector('button');
    prevButton.addEventListener('click', () =>
      pageChangeCallback(currentPage - 1)
    );
    fragment.appendChild(prevBtn);
  }

  // Calculate page range to show
  let startPage, endPage;
  const maxPagesToShow = 5;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(maxPagesToShow, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  // First page + ellipsis
  if (startPage > 1) {
    const firstPageBtn = createPaginationButton('01', currentPage === 1);
    const button = firstPageBtn.querySelector('button');
    button.addEventListener('click', () => pageChangeCallback(1));
    fragment.appendChild(firstPageBtn);

    if (startPage > 2) {
      fragment.appendChild(createPaginationDots());
    }
  }

  // Render page numbers
  for (let page = startPage; page <= endPage; page++) {
    const pageNumber = page.toString().padStart(2, '0');
    const pageBtn = createPaginationButton(pageNumber, page === currentPage);
    const button = pageBtn.querySelector('button');
    button.addEventListener('click', () => pageChangeCallback(page));
    fragment.appendChild(pageBtn);
  }

  // Ellipsis + last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      fragment.appendChild(createPaginationDots());
    }

    const lastPageNumber = totalPages.toString().padStart(2, '0');
    const lastPageBtn = createPaginationButton(
      lastPageNumber,
      currentPage === totalPages
    );
    const lastButton = lastPageBtn.querySelector('button');
    lastButton.addEventListener('click', () => pageChangeCallback(totalPages));
    fragment.appendChild(lastPageBtn);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = createPaginationButton('Sonraki ›', false, 'next');
    const nextButton = nextBtn.querySelector('button');
    nextButton.addEventListener('click', () =>
      pageChangeCallback(currentPage + 1)
    );
    fragment.appendChild(nextBtn);
  }

  paginationContainer.appendChild(fragment);
}

// ===== HELPER FUNCTIONS =====
function createPaginationButton(text, isActive = false, type = 'page') {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = `page-btn ${type}`;
  if (isActive) button.classList.add('active');
  button.textContent = text;
  li.appendChild(button);
  return li;
}

function createPaginationDots() {
  const li = document.createElement('li');
  li.className = 'page-ellipsis';
  li.textContent = '...';
  return li;
}