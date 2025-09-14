document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('flood-container');
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('lang') || 'en';

  function renderMethods() {
    container.innerHTML = '';
    const methods = floodData[currentLang];
    methods.forEach(method => {
      const box = document.createElement('div');
      box.className = 'method-box';
      box.innerHTML = `<h2>${method.icon} ${method.title}</h2>
        <div class="steps">
          ${method.steps.map(s => `
            <div class="step">
              <p>${s.text}</p>
            </div>
          `).join('')}
        </div>`;
      container.appendChild(box);
    });
  }

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ne' : 'en';
    localStorage.setItem('lang', currentLang);
    langToggle.innerText = currentLang === 'en' ? 'English' : 'नेपाली';
    renderMethods();
  });

  langToggle.innerText = currentLang === 'en' ? 'English' : 'नेपाली';
  renderMethods();
});
