import { reduceAmmo, updateAmmoProgressBar } from "./infoPanel.js";

const cellHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'M'];

const battleshipGrid = document.querySelector('.battleship-panel');

document.addEventListener('click', function(event){
  if (event.target.className.includes('battleship-cell-playable')) {
    attack();
  }
})

export function createBattleshipGrid() {
  for (let column = 0; column <= 10; column++) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add(`column-${column}`);
    columnDiv.classList.add('battleship-column');
    for (let row = 0; row < 11; row++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add(`cell-${row}`);
      cellDiv.classList.add('battleship-cell');
      columnDiv.appendChild(cellDiv);
      if (column === 0 && row > 0) {
        const rowText = document.createTextNode(row);
        cellDiv.appendChild(rowText);
      }
      if (column > 0 && row === 0) {
        const cellText = document.createTextNode(cellHeaders[column - 1]);
        cellDiv.appendChild(cellText);
      }
      if (column > 0 && row > 0) {
        cellDiv.classList.add('battleship-cell-playable');
      }
    }
    battleshipGrid.appendChild(columnDiv);
  }
}

function attack() {
  reduceAmmo();
  updateAmmoProgressBar();
}
