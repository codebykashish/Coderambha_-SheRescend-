document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const titleEl = document.getElementById('game-title');
  const backBtn = document.getElementById('back-btn');
  const progressEl = document.getElementById('progress');
  const scoreEl = document.getElementById('score');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');

  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    titleEl.textContent = TRANSLATIONS[lang].gameTitle;
    backBtn.textContent = TRANSLATIONS[lang].backBtn;
    langToggle.textContent = TRANSLATIONS[lang].langToggleTo;
    nextBtn.textContent = TRANSLATIONS[lang].nextBtn;
    restartBtn.textContent = TRANSLATIONS[lang].restartBtn;
    render();
  }

  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'np' : 'en');
  });

  // Generate a random round of 10 questions
  function getRandomQuestions() {
    const questions = [...TRANSLATIONS[currentLang].gameQuestions];
    const selected = [];
    while (selected.length < 10 && questions.length) {
      const idx = Math.floor(Math.random() * questions.length);
      selected.push(questions.splice(idx, 1)[0]);
    }
    return selected;
  }

  let round = getRandomQuestions();
  let qIndex = 0;
  let score = 0;
  let answered = false;

  function render() {
    if (!round[qIndex]) return;

    const qObj = round[qIndex];
    progressEl.textContent = `${TRANSLATIONS[currentLang].questionLabel} ${qIndex + 1}/10`;
    scoreEl.textContent = `${TRANSLATIONS[currentLang].scoreLabel}: ${score}`;
    questionEl.textContent = qObj.q;

    optionsEl.innerHTML = '';
    qObj.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => onAnswer(i, qObj.correct, btn));
      optionsEl.appendChild(btn);
    });

    nextBtn.disabled = true;
  }

  function onAnswer(choice, correct, btnEl) {
    if (answered) return;
    answered = true;
    const buttons = [...optionsEl.querySelectorAll('.option-btn')];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) b.classList.add('correct');
    });

    if (choice === correct) {
      score++;
      btnEl.classList.add('correct');
    } else {
      btnEl.classList.add('incorrect');
    }

    scoreEl.textContent = `${TRANSLATIONS[currentLang].scoreLabel}: ${score}`;
    nextBtn.disabled = false;
  }

  nextBtn.addEventListener('click', () => {
    qIndex++;
    answered = false;
    if (qIndex < round.length) {
      render();
    } else {
      questionEl.textContent = TRANSLATIONS[currentLang].roundComplete(score);
      optionsEl.innerHTML = '';
      nextBtn.disabled = true;
      restartBtn.classList.remove('hidden');
    }
  });

  restartBtn.addEventListener('click', () => {
    round = getRandomQuestions();
    qIndex = 0;
    score = 0;
    answered = false;
    restartBtn.classList.add('hidden');
    render();
  });

  applyLang(currentLang);
});
