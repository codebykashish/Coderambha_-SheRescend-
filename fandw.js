const container = document.getElementById("fandw-container");
const langToggle = document.getElementById("lang-toggle");

let currentLang = "english";

function renderBoxes(language) {
  container.innerHTML = "";
  fandwData[language].forEach(item => {
    const box = document.createElement("div");
    box.className = "fandw-box";
    box.innerHTML = `
      <div class="icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(box);
  });
}

// Language toggle
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "english" ? "nepali" : "english";
  langToggle.textContent = currentLang === "english" ? "English" : "नेपाली";
  renderBoxes(currentLang);
});

// Initial load
renderBoxes(currentLang);
