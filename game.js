document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const langToggle = document.getElementById('lang-toggle');
  const titleEl = document.getElementById('game-title');
  const backBtn = document.getElementById('back-btn');
  const progressEl = document.getElementById('progress');
  const scoreEl = document.getElementById('score');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');

  // Language state (shared via localStorage)
  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    // Header labels
    titleEl.textContent = TRANSLATIONS[lang].gameTitle;
    backBtn.textContent = TRANSLATIONS[lang].backBtn;
    langToggle.textContent = TRANSLATIONS[lang].langToggleTo;
    // Buttons (static labels)
    nextBtn.textContent = TRANSLATIONS[lang].nextBtn;
    restartBtn.textContent = TRANSLATIONS[lang].restartBtn;
    // Re-render current question/progress with new language
    render();
  }

  langToggle.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'np' : 'en';
    applyLang(next);
  });

  // Build a 10-question round preserving indices across languages
  const Q_EN = TRANSLATIONS.en.gameQuestions;
  const Q_NP = TRANSLATIONS.np.gameQuestions;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function newRound() {
    const indices = [...Array(Q_EN.length).keys()];
    shuffle(indices);
    const picked = indices.slice(0, 10);
    return picked.map(idx => {
      const order = [0,1,2,3];
      shuffle(order);
      const correctOriginal = Q_EN[idx].correct; // same for NP
      const correctPos = order.findIndex(o => o === correctOriginal);
      return { idx, order, correctPos };
    });
  }

  let round = newRound();
  let qIndex = 0;
  let score = 0;
  let answered = false;

  function render() {
    const bank = currentLang === 'en' ? Q_EN : Q_NP;
    const item = round[qIndex];
    const qObj = bank[item.idx];

    progressEl.textContent = `${TRANSLATIONS[currentLang].questionLabel} ${qIndex + 1}/10`;
    scoreEl.textContent = `${TRANSLATIONS[currentLang].scoreLabel}: ${score}`;
    questionEl.textContent = qObj.q;

    optionsEl.innerHTML = '';
    item.order.forEach((optIdx, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = qObj.opts[optIdx];
      btn.addEventListener('click', () => onAnswer(i, item.correctPos, btn));
      optionsEl.appendChild(btn);
    });

    nextBtn.disabled = true;
  }

  function onAnswer(choicePos, correctPos, btnEl) {
    if (answered) return;
    answered = true;
    const buttons = [...optionsEl.querySelectorAll('.option-btn')];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correctPos) b.classList.add('correct');
    });

    if (choicePos === correctPos) {
      score += 1;
      btnEl.classList.add('correct');
    } else {
      btnEl.classList.add('incorrect');
    }

    scoreEl.textContent = `${TRANSLATIONS[currentLang].scoreLabel}: ${score}`;
    nextBtn.disabled = false;
  }

  nextBtn.addEventListener('click', () => {
    if (qIndex < 9) {
      qIndex += 1;
      answered = false;
      render();
    } else {
      // End of round
      questionEl.textContent = TRANSLATIONS[currentLang].roundComplete(score);
      optionsEl.innerHTML = '';
      nextBtn.disabled = true;
      restartBtn.classList.remove('hidden');
    }
  });

  restartBtn.addEventListener('click', () => {
    round = newRound();
    qIndex = 0;
    score = 0;
    answered = false;
    restartBtn.classList.add('hidden');
    render();
  });

  // Initialize
  applyLang(currentLang);
});