document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('firstaid-container');
  const langToggle = document.getElementById('lang-toggle');
  const backBtn = document.querySelector('.back-btn');

  // Map shared code -> data keys
  function mapCodeToDataLang(code) { return code === 'np' ? 'ne' : 'en'; }
  function toggleLabel(code) { return code === 'en' ? 'नेपाली' : 'English'; }

  let currentLangCode = localStorage.getItem('lang') || 'en';
  let currentSpeech = null; // Track current speech
  let currentAudio = null;  // Track current CPR audio

  // Text-to-speech function
  function speakText(text, lang) {
    // Stop any current speech
    if (currentSpeech) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Set language based on current language
    if (lang === 'np') {
      utterance.lang = 'ne-NP'; // Nepali
    } else {
      utterance.lang = 'en-US'; // English
    }

    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Store reference to current speech
    currentSpeech = utterance;

    utterance.onend = () => {
      currentSpeech = null;
    };

    speechSynthesis.speak(utterance);
  }

  // Play CPR audio (only Nepali CPR)
  function playCprAudio(stepIndex) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(`${stepIndex + 1}.mp3`); // files: 1.mp3 ... 5.mp3
    currentAudio = audio;
    audio.play();
  }

  // Build all topic boxes once (from EN structure for stable indexing)
  firstAidData.en.forEach((topic, idx) => {
    const box = document.createElement('div');
    box.className = 'topic-box';
    box.dataset.index = idx;
    box.dataset.id = topic.id;

    const title = document.createElement('h2');
    title.innerHTML = `${topic.icon} <span class="topic-title">${topic.title}</span>`;
    box.appendChild(title);

    // Create steps container
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'steps-container';

    topic.steps.forEach((step, i) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'step';
      stepDiv.dataset.stepIndex = i;

      const img = document.createElement('img');
      img.src = step.img;
      img.alt = `Step ${i+1}`;
      img.style.cursor = 'pointer'; // Show it's clickable
      img.title = 'Tap to hear text'; // Tooltip

      // Add click event to speak or play audio
      img.addEventListener('click', () => {
        const boxId = box.dataset.id;
        const stepText = stepDiv.querySelector('.step-text').textContent;

        // If Nepali CPR, play audio instead of TTS
        if (currentLangCode === 'np' && boxId === 'cpr') {
          playCprAudio(i);
        } else {
          speakText(stepText, currentLangCode);
        }
      });

      stepDiv.appendChild(img);

      const p = document.createElement('p');
      p.className = 'step-text';
      p.textContent = `Step ${i+1}: ${step.text}`;
      stepDiv.appendChild(p);

      stepsContainer.appendChild(stepDiv);
    });

    box.appendChild(stepsContainer);
    container.appendChild(box);
  });

  // Switch language text using code -> data key mapping
  function switchLanguage(langCode) {
    const dataLang = mapCodeToDataLang(langCode);
    const boxes = document.querySelectorAll('.topic-box');

    // Update back button
    if (backBtn) {
      backBtn.textContent = langCode === 'en' ? '⬅ Back' : '⬅ पछाडि';
    }

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
