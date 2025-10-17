
  // footer-modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal-overlay');
  const openBtn = document.querySelector('.goit-students');
  const closeBtn = document.getElementById('closeModal');

  openBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
