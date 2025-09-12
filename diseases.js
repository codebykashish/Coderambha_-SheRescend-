const container = document.getElementById("diseases-container");
const langToggle = document.getElementById("lang-toggle");
const title = document.getElementById("diseases-title");

function mapCodeToDataLang(code) { return code === 'np' ? 'nepali' : 'english'; }
function toggleLabel(code) { return code === 'en' ? 'नेपाली' : 'English'; }

let currentLangCode = localStorage.getItem('lang') || 'en';

function renderDiseasesByCode(code) {
  const lang = mapCodeToDataLang(code);
  container.innerHTML = "";
  title.textContent = code === "en" ? "Waterborne Diseases" : "पानीजन्य रोगहरू";

  diseasesData[lang].forEach(disease => {
    const box = document.createElement("div");
    box.className = "disease-box";
    box.innerHTML = `
      <img src="${disease.img}" alt="${disease.name}" />
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
    `;
    container.appendChild(box);
  });

  langToggle.textContent = toggleLabel(code);
}

langToggle.addEventListener("click", () => {
  currentLangCode = currentLangCode === "en" ? "np" : "en";
  localStorage.setItem('lang', currentLangCode);
  renderDiseasesByCode(currentLangCode);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'lang' && e.newValue) {
    currentLangCode = e.newValue;
    renderDiseasesByCode(currentLangCode);
  }
});

// Initial
renderDiseasesByCode(currentLangCode);