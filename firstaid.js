document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('firstaid-container');
  const langToggle = document.getElementById('lang-toggle');

  // Map shared code -> data keys
  function mapCodeToDataLang(code) { return code === 'np' ? 'ne' : 'en'; }
  function toggleLabel(code) { return code === 'en' ? 'नेपाली' : 'English'; }

  let currentLangCode = localStorage.getItem('lang') || 'en';

  // Build all topic boxes once (from EN structure for stable indexing)
  firstAidData.en.forEach((topic, idx) => {
    const box = document.createElement('div');
    box.className = 'topic-box';
    box.dataset.index = idx;

    const title = document.createElement('h2');
    title.innerHTML = `${topic.icon} <span class="topic-title">${topic.title}</span>`;
    box.appendChild(title);

    topic.steps.forEach((step, i) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'step';
      stepDiv.dataset.stepIndex = i;

      const img = document.createElement('img');
      img.src = step.img;
      img.alt = `Step ${i+1}`;
      stepDiv.appendChild(img);

      const p = document.createElement('p');
      p.className = 'step-text';
      p.textContent = `Step ${i+1}: ${step.text}`;
      stepDiv.appendChild(p);

      box.appendChild(stepDiv);
    });

    container.appendChild(box);
  });

  // Switch language text using code -> data key mapping
  function switchLanguage(langCode) {
    const dataLang = mapCodeToDataLang(langCode);
    const boxes = document.querySelectorAll('.topic-box');

    boxes.forEach(box => {
      const idx = Number(box.dataset.index);
      const topic = firstAidData[dataLang][idx];

      box.querySelector('.topic-title').textContent = topic.title;

      topic.steps.forEach((step, i) => {
        const stepDiv = box.querySelector(`.step[data-step-index='${i}']`);
        stepDiv.querySelector('.step-text').textContent = `Step ${i+1}: ${step.text}`;
      });
    });

    langToggle.textContent = toggleLabel(langCode);
    localStorage.setItem('lang', langCode);
  }

  // Initialize with saved language
  switchLanguage(currentLangCode);

  // Toggle button (single handler)
  langToggle.addEventListener('click', () => {
    currentLangCode = currentLangCode === 'en' ? 'np' : 'en';
    switchLanguage(currentLangCode);
  });

  // Optional: sync if changed from another page/tab
  window.addEventListener('storage', (e) => {
    if (e.key === 'lang' && e.newValue) {
      currentLangCode = e.newValue;
      switchLanguage(currentLangCode);
    }
  });
});