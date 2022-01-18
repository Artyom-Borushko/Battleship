/* eslint-disable no-param-reassign */
import BATTLESHIP_HEADERS from '../constants/battleshipHeaders';
import { battleshipGrid } from '../constants/querySelectors';
import missIcon from '../assets/icons/missIcon.png';
import fireIcon from '../assets/icons/fireIcon.png';
import fourCellShipImage from '../assets/shipsImages/4-cell-ship.png';
import threeCellShipImage from '../assets/shipsImages/3-cell-ship.png';
import twoCellShipImage from '../assets/shipsImages/2-cell-ship.png';
import oneCellShipImage from '../assets/shipsImages/1-cell-ship.png';

function initializeBattleshipGrid(columnsCount, rowsCount) {
  for (let column = 0; column <= columnsCount; column++) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add(`column-${column}`);
    columnDiv.classList.add('battleship-column');
    for (let row = 0; row <= rowsCount; row++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add(`cell-${row}`);
      cellDiv.classList.add('battleship-cell');
      columnDiv.appendChild(cellDiv);
      if (column === 0 && row > 0) {
        const rowText = document.createTextNode(row);
        cellDiv.appendChild(rowText);
      }
      if (column > 0 && row === 0) {
        const cellText = document.createTextNode(BATTLESHIP_HEADERS[column - 1]);
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

function columnOccupationLogic(coordinates) {
  const firstPairFirstCoordinate = parseInt(`${coordinates[0]}`.substring(0, `${coordinates[0]}`.indexOf('-')), 10);
  const lastPairSecondCoordinate = parseInt(`${coordinates[coordinates.length - 1]}`
    .substring(`${coordinates[coordinates.length - 1]}`.lastIndexOf('-') + 1), 10);
  const firstPairSecondCoordinate = parseInt(`${coordinates[0]}`.substring(`${coordinates[0]}`.lastIndexOf('-') + 1), 10);
  const arr = [];
  for (let i = firstPairFirstCoordinate - 1; i <= firstPairFirstCoordinate + 1; i++) {
    for (let j = firstPairSecondCoordinate - 1; j <= lastPairSecondCoordinate + 1; j++) {
      arr.push(`${i}-${j}`);
    }
  }
  return arr;
}

function rowOccupationLogic(coordinates) {
  const firstPairFirstCoordinate = parseInt(`${coordinates[0]}`.substring(0, `${coordinates[0]}`.indexOf('-')), 10);
  const lastPairFirstCoordinate = parseInt(`${coordinates[coordinates.length - 1]}`.substring(0, `${coordinates[coordinates.length - 1]}`.indexOf('-')), 10);
  const firstPairSecondCoordinate = parseInt(`${coordinates[0]}`.substring(`${coordinates[0]}`.lastIndexOf('-') + 1), 10);
  const arr = [];
  for (let i = firstPairFirstCoordinate - 1; i <= lastPairFirstCoordinate + 1; i++) {
    for (let j = firstPairSecondCoordinate - 1; j <= firstPairSecondCoordinate + 1; j++) {
      arr.push(`${i}-${j}`);
    }
  }
  return arr;
}

function generateDirection() {
  return Math.round(Math.random());
}

function generatePlaceToStart(emptyCells) {
  let initialCoordinates = Math.round(Math.random() * emptyCells.length) + 1;
  while (initialCoordinates >= emptyCells.length) {
    initialCoordinates = Math.round(Math.random() * emptyCells.length) + 1;
  }
  return emptyCells[initialCoordinates];
}

function generateArrayOfIndexes(columnsCount, rowsCount) {
  const emptyCells = [];
  for (let i = 1; i <= columnsCount; i++) {
    for (let j = 1; j <= rowsCount; j++) {
      emptyCells.push(`${i}-${j}`);
    }
  }
  return emptyCells;
}

function deleteOccupiedCellsFromEmptyCells(occupiedCells, emptyCells) {
  for (let i = 0; i < occupiedCells.length; i++) {
    emptyCells = emptyCells.filter((item) => item !== occupiedCells[i]);
  }
  return emptyCells;
}

function canBoatBePlacedInColumn(boat, columnToStart, rowToStart, emptyCells) {
  let indicator = false;
  for (let i = 0; i < boat.boatLength; i++) {
    if (
      emptyCells.indexOf(`${columnToStart}-${rowToStart + i}`) > -1
      && rowToStart + i < 10
    ) {
      indicator = true;
    } else {
      indicator = false;
      break;
    }
  }
  return indicator;
}

function canBoatBePlacedInRow(boat, columnToStart, rowToStart, emptyCells) {
  let indicator = false;
  for (let i = 0; i < boat.boatLength; i++) {
    if (
      emptyCells.indexOf(`${columnToStart + i}-${rowToStart}`) > -1
      && columnToStart + i < 10
    ) {
      indicator = true;
    } else {
      indicator = false;
      break;
    }
  }
  return indicator;
}

function generateMissImage(e) {
  const missIconImage = new Image();
  missIconImage.src = missIcon;
  e.target.style.position = 'relative';
  e.target.classList.add('miss-image-container');
  missIconImage.classList.add('miss-image');
  return missIconImage;
}

function generateMissImageAroundSunkBoat(cellAroundSunkBoat) {
  const missIconImage = new Image();
  missIconImage.src = missIcon;
  cellAroundSunkBoat.style.position = 'relative';
  cellAroundSunkBoat.classList.add('miss-image-container');
  missIconImage.classList.add('miss-image');
  return missIconImage;
}

function generateHitImage(e) {
  const fireIconImage = new Image();
  fireIconImage.src = fireIcon;
  e.target.style.position = 'relative';
  fireIconImage.classList.add('hit-image');
  return fireIconImage;
}

function generateSunkBoatImage(boatLength, shipLocator) {
  const sunkBoatImage = new Image();
  if (boatLength === 4) sunkBoatImage.src = fourCellShipImage;
  else if (boatLength === 3) sunkBoatImage.src = threeCellShipImage;
  else if (boatLength === 2) sunkBoatImage.src = twoCellShipImage;
  else sunkBoatImage.src = oneCellShipImage;
  shipLocator.style.position = 'relative';
  sunkBoatImage.style.width = `${boatLength * 50}px`;
  sunkBoatImage.classList.add('sunk-boat-image');
  return sunkBoatImage;
}

export {
  initializeBattleshipGrid, columnOccupationLogic, rowOccupationLogic, generateDirection,
  generatePlaceToStart, generateArrayOfIndexes, deleteOccupiedCellsFromEmptyCells,
  generateMissImage, generateHitImage, generateMissImageAroundSunkBoat, generateSunkBoatImage,
  canBoatBePlacedInColumn, canBoatBePlacedInRow,
};
