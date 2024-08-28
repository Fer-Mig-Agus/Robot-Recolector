const validationType = (rows, cols) => {
  if (isNaN(rows)) return false;
  if (isNaN(cols)) return false;
  return true
}

const validationRange = (rows, cols) => {
  if (window.screen.width < 560) {
    if (rows < 1 || rows > 7) return false;
    if (cols < 1 || cols > 7) return false;
    
  } else {
    if (rows < 1 || rows > 10) return false;
    if (cols < 1 || cols > 10) return false;
  }

  return true
}

document.getElementById("createField").addEventListener("click", function () {

  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  if (!validationType(rows, cols)) {
    return alert("Debes de colocar valores validos");
  }
  if (!validationRange(rows, cols)) {
    if (window.screen.width < 560) {
      return alert("Debes colocar valores entre 1 y 7    :)");
    }else{
      return alert("Debes colocar valores entre 1 y 10    :)");
    }

  }
  createField(rows, cols);
});

const Reload = document.querySelector("#reload");
const Controls = document.querySelector("#controls");
const Actions = document.querySelector("#actions")
const Trees = document.querySelector("#trees");


Reload.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
})

let robotPosition = { x: 0, y: 0 };

function createField(rows, cols) {
  Controls.style.display = "none";
  Actions.style.display = "flex";
  Trees.style.display = "flex";
  const field = document.getElementById("field");
  field.style.display = "grid";
  field.innerHTML = "";
  field.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  field.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", function () {
        if (cell.classList.contains("fruit")) {
          cell.classList.remove("fruit");
        } else {
          cell.classList.add("fruit");
        }
      });

      field.appendChild(cell);
    }
  }

  robotPosition = { x: 0, y: 0 };
  updateRobotPosition();
}

document.getElementById("startRobot").addEventListener("click", function () {
  const fruits = Array.from(document.querySelectorAll(".cell.fruit"));
  if (fruits.length === 0) {
    alert("No hay frutas en el campo.");
    return;
  }

  let interval = setInterval(function () {
    const nextCell = fruits.shift();
    if (!nextCell) {
      clearInterval(interval);
      alert("¡Robot ha recogido todas las frutas!");
      window.location.reload();
      return;
    }

    moveRobotTo(nextCell.dataset.row, nextCell.dataset.col);
  }, 500);
});

function updateRobotPosition() {
  const previousCell = document.querySelector(".cell.robot");
  if (previousCell) {
    previousCell.classList.remove("robot");
  }

  const newCell = document.querySelector(
    `.cell[data-row="${robotPosition.x}"][data-col="${robotPosition.y}"]`
  );
  if (newCell) {
    newCell.classList.add("robot");
  }
}

function moveRobotTo(row, col) {
  robotPosition.x = parseInt(row);
  robotPosition.y = parseInt(col);
  updateRobotPosition();
}
