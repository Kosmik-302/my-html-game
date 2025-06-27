
const planetData = [
  { id: "mercury", name: "Меркурий" },
  { id: "venus", name: "Венера" },
  { id: "earth", name: "Земля" },
  { id: "mars", name: "Марс" },
  { id: "jupiter", name: "Юпитер" },
  { id: "saturn", name: "Сатурн" },
  { id: "uranus", name: "Уран" },
  { id: "neptune", name: "Нептун" },
];

for (let i = planetData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [planetData[i], planetData[j]] = [planetData[j], planetData[i]];
}

const panel = document.getElementById("planets-panel");
planetData.forEach((planet) => {
  const el = document.createElement("div");
  el.className = "planet";
  el.id = planet.id;
  el.draggable = true;
  el.style.backgroundImage = `url('images/${planet.id}.png')`;
  el.title = planet.name;
  panel.appendChild(el);
});

const orbits = document.querySelectorAll('.orbit');
orbits.forEach(orbit => {
  orbit.addEventListener('dragover', e => e.preventDefault());
  orbit.addEventListener('drop', function(e) {
    const id = e.dataTransfer.getData('text/plain');
    const planet = document.getElementById(id);
    if (this.dataset.planet === id) {
      this.textContent = '';
      this.appendChild(planet);
      checkResult();
    }
  });
});

document.addEventListener("dragstart", function(e) {
  if (e.target.classList.contains("planet")) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
});

function checkResult() {
  const allPlaced = [...orbits].every(orbit =>
    orbit.children.length > 0 && orbit.children[0].id === orbit.dataset.planet
  );
  if (allPlaced) {
    document.getElementById("result-message").textContent = "Ты справился, молодец! 🚀";
  }
}
