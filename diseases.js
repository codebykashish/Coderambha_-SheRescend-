const container = document.getElementById("diseases-container");
const langToggle = document.getElementById("lang-toggle");
const title = document.getElementById("diseases-title");

let currentLang = "english";

// Mapping disease names to their pages
const pageMap = {
  Cholera: "cholera.html",
  "होलेरा (Cholera)": "cholera.html",
  Diarrhea: "diarrhea.html",
  "झाडापखाला (Diarrhea)": "diarrhea.html",
  Typhoid: "typhoid.html",
  "टाइफाइड (Typhoid)": "typhoid.html",
  "Hepatitis A": "hepatitis.html",
  "हेपाटाइटिस A (Hepatitis A)": "hepatitis.html"
};

// Render diseases
function renderDiseases(language) {
  container.innerHTML = "";
  title.textContent = language === "english" ? "Waterborne Diseases" : "पानीजन्य रोगहरू";

  diseasesData[language].forEach(disease => {
    const box = document.createElement("div");
    box.className = "disease-box";
    box.innerHTML = `
      <img src="${disease.img}" alt="${disease.name}" />
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
    `;

    // ✅ Make each box clickable to open its page
    box.addEventListener("click", () => {
      const page = pageMap[disease.name];
      if (page) {
        window.location.href = page;
      }
    });

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
