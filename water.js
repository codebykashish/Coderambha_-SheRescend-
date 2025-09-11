document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("water-container");
  const langToggle = document.getElementById("lang-toggle");
  let currentLang = localStorage.getItem("lang") || "en";

  function renderWater() {
    container.innerHTML = "";
    waterData[currentLang].forEach(topic => {
      const box = document.createElement("div");
      box.classList.add("water-box");

      const title = document.createElement("h2");
      title.innerHTML = `${topic.icon} ${topic.title}`;
      box.appendChild(title);

      topic.steps.forEach((step, index) => {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step");

        const img = document.createElement("img");
        img.src = step.img; // replace with your local images
        img.alt = `Step ${index + 1}`;

        const text = document.createElement("div");
        text.classList.add("step-text");
        text.textContent = `Step ${index + 1}: ${step.text}`;

        stepDiv.appendChild(img);
        stepDiv.appendChild(text);

        box.appendChild(stepDiv);
      });

      container.appendChild(box);
    });
  }

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ne" : "en";
    localStorage.setItem("lang", currentLang);
    langToggle.textContent = currentLang === "en" ? "English" : "नेपाली";
    renderWater();
  });

  // Initial render
  langToggle.textContent = currentLang === "en" ? "English" : "नेपाली";
  renderWater();
});
