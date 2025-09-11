document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('firstaid-container');
  const langToggle = document.getElementById('lang-toggle');

  let currentLang = localStorage.getItem('lang') || 'en';

  // Generate all topic boxes once
  firstAidData.en.forEach((topic, idx) => {
    const box = document.createElement('div');
    box.className = 'topic-box';
    box.dataset.index = idx; // store index for language switching

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

  // Function to switch language text
  function switchLanguage(lang) {
    const boxes = document.querySelectorAll('.topic-box');
    boxes.forEach(box => {
      const idx = box.dataset.index;
      const topic = firstAidData[lang][idx];

      box.querySelector('.topic-title').textContent = topic.title;

      topic.steps.forEach((step, i) => {
        const stepDiv = box.querySelector(`.step[data-step-index='${i}']`);
        stepDiv.querySelector('.step-text').textContent = `Step ${i+1}: ${step.text}`;
      });
    });

    langToggle.textContent = lang === 'en' ? 'नेपाली' : 'English';
    localStorage.setItem('lang', lang);
  }

  // Initialize with saved language
  switchLanguage(currentLang);

  // Toggle button
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ne' : 'en';
    switchLanguage(currentLang);
  });
});
