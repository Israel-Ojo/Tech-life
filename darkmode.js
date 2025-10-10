// Check and apply theme from localStorage
 window.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
      }
    });
