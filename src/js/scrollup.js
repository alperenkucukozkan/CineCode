
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.querySelector('.button-up');
      
     
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
      
      
      
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
