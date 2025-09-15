document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('helpline-container');
  const langToggle = document.getElementById('lang-toggle');
  const titleEl = document.getElementById('helpline-title');

  let currentLang = localStorage.getItem('lang') || 'en';

  function renderHelpline() {
    const data = helplineData[currentLang];
    titleEl.textContent = data.title;
    langToggle.textContent = currentLang === 'en' ? 'नेपाली' : 'English';

    container.innerHTML = `
      <div class="helpline-box">
        <h2>${data.ambulanceTitle}</h2>
        <ul>
          ${data.ambulances.map(a => `<li>${a.name}: <a href="tel:${a.number}">${a.number}</a></li>`).join('')}
        </ul>
      </div>

      <div class="helpline-box">
        <h2>${data.hospitalTitle}</h2>
        <ul>
          ${data.hospitals.map(h => `<li>${h.name}: <a href="tel:${h.number}">${h.number}</a></li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Toggle language
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'np' : 'en';
    localStorage.setItem('lang', currentLang);
    renderHelpline();
  });

  // Sync across tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key === 'lang') {
      currentLang = e.newValue;
      renderHelpline();
    }
  });

  renderHelpline();
});
