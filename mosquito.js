const container = document.getElementById("mosquito-container");
const langToggle = document.getElementById("lang-toggle");

let currentLang = "english";

// Function to render boxes
function renderMosquito(lang) {
  container.innerHTML = "";
  mosquitoData[lang].forEach(item => {
    const box = document.createElement("div");
    box.className = "mosquito-box";
    box.innerHTML = `
      <div class="icon">${item.icon}</div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(box);
  });
}

// Toggle language
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "english" ? "nepali" : "english";
  langToggle.textContent = currentLang === "english" ? "English" : "नेपाली";
  renderMosquito(currentLang);
});

// Initial render
renderMosquito(currentLang);
