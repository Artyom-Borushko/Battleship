import { reduceAmmo, updateAmmoProgressBar } from "./infoPanel.js";

const cellHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'M']

const battleshipGrid = document.querySelector('.battleship-panel');

document.addEventListener('click', function(event){
  if (event.target.className.includes('battleship-cell-playable')) {
    attack(event);
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
        cellDiv.dataset.location = `${column}-${row}`;
      }
    }
    battleshipGrid.appendChild(columnDiv);
  }
}

function attack(e) {
  reduceAmmo();
  updateAmmoProgressBar();
  highlightHit(e);
}

let emptyCells = [];
const occupiedStorage = [];

function highlightHit(e) {
  let mapper = occupiedStorage.filter(element => element === e.target.dataset.location);
  if (mapper.length) {
    e.target.style.backgroundColor = 'red';
  }
}

function generateDirection() {
  return Math.round(Math.random());
}

function generatePlaceToStart() {
  const initialCoordinates = Math.round(Math.random() * emptyCells.length) + 1;
  return emptyCells[initialCoordinates];
}

export function generateEmptyCells() {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      emptyCells.push(`${i}-${j}`);
    }
  }
}

export function shipsInitializer(boat) {
  let isPlaced = false;
  
  while (!isPlaced) {
    const direction = generateDirection();
    const placeToStart = generatePlaceToStart();
    const columnToStart = parseInt(placeToStart.substring(0, placeToStart.indexOf('-')));
    const rowToStart = parseInt(placeToStart.substring(placeToStart.lastIndexOf('-') + 1));

    if (direction === 1) {
      let indicator = false;
      for (let i = 0; i < boat.boatLength; i++) {
        if (emptyCells.indexOf(`${columnToStart}-${rowToStart + i}`) > -1 && rowToStart + i < 10) {
          indicator = true;
        } else {
          indicator = false;
          break;
        } 
      }
      if (indicator) {
        const tempOccupation = []
        for (let i = 0; i < boat.boatLength; i++) {
          tempOccupation.push(`${columnToStart}-${rowToStart + i}`);
          occupiedStorage.push(`${columnToStart}-${rowToStart + i}`);
        }
        const occupiedArr = columnOccupationLogic(tempOccupation);
        for (let i = 0; i < occupiedArr.length; i++) {
          emptyCells = emptyCells.filter(item => item !== occupiedArr[i]);
        }
        isPlaced = true;
      }
    } else if (direction === 0) {
      let indicator = false;
      for (let i = 0; i < boat.boatLength; i++) {
        if (emptyCells.indexOf(`${columnToStart + i}-${rowToStart}`) > -1 && columnToStart + i < 10) {
          indicator = true;
        } else {
          indicator = false;
          break
        } 
      }
      if (indicator) {
        const tempOccupation = []
        for (let i = 0; i < boat.boatLength; i++) {
          tempOccupation.push(`${columnToStart + i}-${rowToStart}`);
          occupiedStorage.push(`${columnToStart + i}-${rowToStart}`);
        }
        const occupiedArr = rowOccupationLogic(tempOccupation);
        for (let i = 0; i < occupiedArr.length; i++) {
          emptyCells = emptyCells.filter(item => item !== occupiedArr[i]);
        }
        isPlaced = true;
      }
    }
  }   
}

function columnOccupationLogic(coordinates) {
  const firstPairFirstCoordinate = parseInt(`${coordinates[0]}`.substring(0, `${coordinates[0]}`.indexOf('-')));
  const lastPairSecondCoordinate = parseInt(`${coordinates[coordinates.length - 1]}`.substring(`${coordinates[coordinates.length - 1]}`.lastIndexOf('-') + 1));
  const firstPairSecondCoordinate = parseInt(`${coordinates[0]}`.substring(`${coordinates[0]}`.lastIndexOf('-') + 1));
  let arr = [];
  for (let i = firstPairFirstCoordinate - 1; i <= firstPairFirstCoordinate + 1; i++) {
    for (let j = firstPairSecondCoordinate - 1; j <= lastPairSecondCoordinate + 1; j++) {
      arr.push(`${i}-${j}`);
    }
  }
  return arr;
}

function rowOccupationLogic(coordinates) {
  const firstPairFirstCoordinate = parseInt(`${coordinates[0]}`.substring(0, `${coordinates[0]}`.indexOf('-')));
  const lastPairFirstCoordinate = parseInt(`${coordinates[coordinates.length - 1]}`.substring(0, `${coordinates[coordinates.length - 1]}`.indexOf('-')));
  const firstPairSecondCoordinate = parseInt(`${coordinates[0]}`.substring(`${coordinates[0]}`.lastIndexOf('-') + 1));
  const arr = [];
  for (let i = firstPairFirstCoordinate - 1; i <= lastPairFirstCoordinate + 1; i++) {
    for (let j = firstPairSecondCoordinate - 1; j <= firstPairSecondCoordinate + 1; j++) {
      arr.push(`${i}-${j}`);
    }
  }
  return arr;
}
