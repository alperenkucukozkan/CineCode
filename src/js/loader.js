


function showLoader() {
  const loadingIndicator = document.querySelector('.loading');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'flex';
    loadingIndicator.setAttribute('aria-hidden', 'false');
  }
}

function hideLoader() {
  const loadingIndicator = document.querySelector('.loading');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
    loadingIndicator.setAttribute('aria-hidden', 'true');
  }
}