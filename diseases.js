const container = document.getElementById("diseases-container");
const langToggle = document.getElementById("lang-toggle");
const title = document.getElementById("diseases-title");

let currentLang = "english";

// Function to render diseases
function renderDiseases(language) {
  container.innerHTML = "";

  // Update page title
  title.textContent = language === "english" ? "Waterborne Diseases" : "पानीजन्य रोगहरू";

  diseasesData[language].forEach(disease => {
    const box = document.createElement("div");
    box.className = "disease-box";
    box.innerHTML = `
      <img src="${disease.img}" alt="${disease.name}" />
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
    `;
    container.appendChild(box);
  });
}

// Toggle language
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "english" ? "nepali" : "english";
  langToggle.textContent = currentLang === "english" ? "English" : "नेपाली";
  renderDiseases(currentLang);
});

// Initial load
renderDiseases(currentLang);
