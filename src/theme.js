document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  localStorage.theme = dark ? 'dark' : 'light';
});
