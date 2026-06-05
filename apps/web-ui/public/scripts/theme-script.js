(function() {
  try {
    const theme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (theme === 'dark' || !theme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } catch(e) {}
})();