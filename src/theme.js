document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  localStorage.theme = dark ? 'dark' : 'light';
});

class BackLink extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '/';
    const label = this.getAttribute('label') || 'All examples';
    this.innerHTML = `
      <nav>
        <a href="${href}" class="back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          ${label}
        </a>
      </nav>
    `;
  }
}
customElements.define('back-link', BackLink);
