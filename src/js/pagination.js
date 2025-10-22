function renderPagination(currentPage, totalPages) {
  if (DOM.paginationUl) return;
  DOM.paginationUl.innerHTML = '';
  AppState.totalPages = totalPages;
  AppState.currentPage = currentPage;
  if (totalPages <= 1) return;
  const fragment = document.createDocumentFragment();
  // Previous button
  if (currentPage > 1) {
    const prevBtn = createPaginationButton('‹', false, 'prev');
    const prevButton = prevBtn.querySelector('button');
    prevButton.addEventListener('click', () =>
      handlePageChange(currentPage - 1)
    );
    fragment.appendChild(prevBtn);
  }
  // Calculate page range to show
  let startPage, endPage;
  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }
  // Render page numbers
  for (let page = startPage; page <= endPage; page++) {
    const pageNumber = page.toString().padStart(2, '0');
    const pageBtn = createPaginationButton(pageNumber, page === currentPage);
    const button = pageBtn.querySelector('button');
    button.addEventListener('click', () => handlePageChange(page));
    fragment.appendChild(pageBtn);
  }
  // Show ellipsis and last page if there's a gap
  if (endPage < totalPages - 1) {
    fragment.appendChild(createPaginationDots());
    const lastPageNumber = totalPages.toString().padStart(2, '0');
    const lastPageBtn = createPaginationButton(
      lastPageNumber,
      currentPage === totalPages
    );
    const lastButton = lastPageBtn.querySelector('button');
    lastButton.addEventListener('click', () => handlePageChange(totalPages));
    fragment.appendChild(lastPageBtn);
  } else if (endPage < totalPages) {
    const lastPageNumber = totalPages.toString().padStart(2, '0');
    const lastPageBtn = createPaginationButton(
      lastPageNumber,
      currentPage === totalPages
    );
    const lastButton = lastPageBtn.querySelector('button');
    lastButton.addEventListener('click', () => handlePageChange(totalPages));
    fragment.appendChild(lastPageBtn);
  }
  // Next button
  if (currentPage < totalPages) {
    const nextBtn = createPaginationButton('›', false, 'next');
    const nextButton = nextBtn.querySelector('button');
    nextButton.addEventListener('click', () =>
      handlePageChange(currentPage + 1)
    );
    fragment.appendChild(nextBtn);
  }
  DOM.paginationUl.appendChild(fragment);
}
function createPaginationButton(page, isActive = false, type = 'page') {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = page-btn`${type}`;
  if (isActive) button.classList.add('active');
  button.textContent = page;
  li.appendChild(button);
  return li;
}
function createPaginationDots() {
  const li = document.createElement('li');
  li.className = 'page-ellipsis';
  li.textContent = '...';
  return li;
}