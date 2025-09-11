document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const langToggle = document.getElementById('lang-toggle');
  const guideTitle = document.getElementById('guide-title');
  const backBtn = document.querySelector('.back-btn');
  const catFirst = document.getElementById('cat-firstaid');
  const catWater = document.getElementById('cat-water');
  const catFlood = document.getElementById('cat-flood');
  const catDiseases = document.getElementById('cat-diseases');
  const catMosquito = document.getElementById('cat-mosquito');
  const catFood = document.getElementById('cat-food');

  const descFirst = document.getElementById('desc-firstaid');
  const descWater = document.getElementById('desc-water');
  const descFlood = document.getElementById('desc-flood');
  const descDiseases = document.getElementById('desc-diseases');
  const descMosquito = document.getElementById('desc-mosquito');
  const descFood = document.getElementById('desc-food');

  // translations
  const translations = {
    en: {
      guideTitle: 'Emergency Survival Guide',
      back: '⬅ Back',
      first: 'First Aid',
      descFirst: 'Quick help for injuries and emergencies.',
      water: 'Water Purification',
      descWater: 'Methods to make water safe to drink.',
      flood: 'Flood Safety',
      descFlood: 'Tips to stay safe during floods.',
      diseases: 'Water-borne Diseases',
      descDiseases: 'Prevention and care for common illnesses.',
      mosquito: 'Mosquito Prevention',
      descMosquito: 'How to protect yourself from bites.',
      food: 'Food & Water Safety',
      descFood: 'Safe handling of food and clean water.',
      toggleLabel: 'नेपाली'
    },
    np: {
      guideTitle: 'आपतकालीन जीवन रक्षा मार्गदर्शन',
      back: '⬅ पछाडि',
      first: 'प्राथमिक उपचार',
      descFirst: 'घाउ र आपतकालीन अवस्थामा छिटो सहयोग।',
      water: 'पानी शुद्धीकरण',
      descWater: 'पिउन योग्य बनाउन पानी शुद्ध गर्ने तरिका।',
      flood: 'बाढी सुरक्षा',
      descFlood: 'बाढीको समयमा सुरक्षित रहने सल्लाह।',
      diseases: 'जलजन्य रोगहरू',
      descDiseases: 'सामान्य पानीजन्य रोगहरूको रोकथाम र उपचार।',
      mosquito: 'मच्छर रोकथाम',
      descMosquito: 'मच्छरको टोकाइबाट कसरी जोगिने।',
      food: 'खाना र पानी सुरक्षा',
      descFood: 'खाना र सफा पानीको सुरक्षित व्यवस्थापन।',
      toggleLabel: 'English'
    }
  };

  // read saved language or default to English
  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;

    // header
    if (guideTitle) guideTitle.textContent = translations[lang].guideTitle;
    if (backBtn) backBtn.textContent = translations[lang].back;

    // categories
    if (catFirst) catFirst.textContent = translations[lang].first;
    if (catWater) catWater.textContent = translations[lang].water;
    if (catFlood) catFlood.textContent = translations[lang].flood;
    if (catDiseases) catDiseases.textContent = translations[lang].diseases;
    if (catMosquito) catMosquito.textContent = translations[lang].mosquito;
    if (catFood) catFood.textContent = translations[lang].food;

    // descriptions
    if (descFirst) descFirst.textContent = translations[lang].descFirst;
    if (descWater) descWater.textContent = translations[lang].descWater;
    if (descFlood) descFlood.textContent = translations[lang].descFlood;
    if (descDiseases) descDiseases.textContent = translations[lang].descDiseases;
    if (descMosquito) descMosquito.textContent = translations[lang].descMosquito;
    if (descFood) descFood.textContent = translations[lang].descFood;

    // toggle button shows the *other* language name (pressing it switches)
    if (langToggle) langToggle.textContent = translations[lang].toggleLabel;

    // persist
    localStorage.setItem('lang', lang);
  }

  // toggle handler
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = (localStorage.getItem('lang') || currentLang) === 'en' ? 'np' : 'en';
      applyLang(next);
      // some pages listen for the storage event — setting localStorage will notify other tabs/windows
      // (no extra action required)
    });
  }

  // listen for changes from other tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key === 'lang') {
      const newLang = e.newValue || 'en';
      applyLang(newLang);
    }
  });

  // initial
  applyLang(currentLang);
});
