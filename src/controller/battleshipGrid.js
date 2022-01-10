/* eslint-disable no-param-reassign */
import BATTLESHIP_HEADERS from '../constants/battleshipHeaders';
import boatsState from '../state/boatsState';
import missIcon from '../assets/icons/missIcon.png';
import fireIcon from '../assets/icons/fireIcon.png';
import fourCellShipImage from '../assets/shipsImages/4-cell-ship.png';
import threeCellShipImage from '../assets/shipsImages/3-cell-ship.png';
import twoCellShipImage from '../assets/shipsImages/2-cell-ship.png';
import oneCellShipImage from '../assets/shipsImages/1-cell-ship.png';

let emptyCells = [];
export const allBoatsCoordinates = [];

const battleshipGrid = document.querySelector('.battleship-panel');

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

function generateDirection() {
  return Math.round(Math.random());
}

function generatePlaceToStart() {
  let initialCoordinates = Math.round(Math.random() * emptyCells.length) + 1;
  while (initialCoordinates >= emptyCells.length) {
    initialCoordinates = Math.round(Math.random() * emptyCells.length) + 1;
  }
  return emptyCells[initialCoordinates];
}

export function generateEmptyCells() {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      emptyCells.push(`${i}-${j}`);
    }
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

export function shipsInitializer(boat) {
  let isPlaced = false;

  while (!isPlaced) {
    const direction = generateDirection();
    const placeToStart = generatePlaceToStart();
    const columnToStart = parseInt(placeToStart.substring(0, placeToStart.indexOf('-')), 10);
    const rowToStart = parseInt(placeToStart.substring(placeToStart.lastIndexOf('-') + 1), 10);

    if (direction === 1) {
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
      if (indicator) {
        const tempOccupation = [];
        for (let i = 0; i < boat.boatLength; i++) {
          tempOccupation.push(`${columnToStart}-${rowToStart + i}`);
          allBoatsCoordinates.push(`${columnToStart}-${rowToStart + i}`);
        }

        boatsState.push(boat);
        boatsState[boatsState.length - 1].spawnCoordinates = tempOccupation;
        const occupiedArr = columnOccupationLogic(tempOccupation);
        boatsState[boatsState.length - 1].occupiedCoordinates = occupiedArr
          .filter((e) => !tempOccupation.includes(e));
        boatsState[boatsState.length - 1].direction = direction;

        for (let i = 0; i < occupiedArr.length; i++) {
          emptyCells = emptyCells.filter((item) => item !== occupiedArr[i]);
        }
        isPlaced = true;
      }
    } else if (direction === 0) {
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
      if (indicator) {
        const tempOccupation = [];
        for (let i = 0; i < boat.boatLength; i++) {
          tempOccupation.push(`${columnToStart + i}-${rowToStart}`);
          allBoatsCoordinates.push(`${columnToStart + i}-${rowToStart}`);
        }

        boatsState.push(boat);
        boatsState[boatsState.length - 1].spawnCoordinates = tempOccupation;
        const occupiedArr = rowOccupationLogic(tempOccupation);
        boatsState[boatsState.length - 1].occupiedCoordinates = occupiedArr
          .filter((e) => !tempOccupation.includes(e));
        boatsState[boatsState.length - 1].direction = direction;

        for (let i = 0; i < occupiedArr.length; i++) {
          emptyCells = emptyCells.filter((item) => item !== occupiedArr[i]);
        }
        isPlaced = true;
      }
    }
  }
}

export function generateMissImage(e) {
  const missIconImage = new Image();
  missIconImage.src = missIcon;
  e.target.style.position = 'relative';
  e.target.classList.add('miss-image-container');
  missIconImage.classList.add('miss-image');
  e.target.appendChild(missIconImage);
}

export function generateMissImageAroundSunkBoat(cellAroundSunkBoat) {
  const missIconImage = new Image();
  missIconImage.src = missIcon;
  cellAroundSunkBoat.style.position = 'relative';
  cellAroundSunkBoat.classList.add('miss-image-container');
  missIconImage.classList.add('miss-image');
  cellAroundSunkBoat.appendChild(missIconImage);
}

export function generateHitImage(e) {
  const fireIconImage = new Image();
  fireIconImage.src = fireIcon;
  e.target.style.position = 'relative';
  fireIconImage.classList.add('hit-image');
  e.target.appendChild(fireIconImage);
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

export function addSunkBoatImageToBattleship({
  spawnCoordinates, id, direction, boatLength,
}) {
  const sunkShipLocator = document.querySelector(`[data-location='${spawnCoordinates[0]}']`);
  const sunkBoatImage = generateSunkBoatImage(boatLength, sunkShipLocator);

  if (direction === 1) {
    switch (id) {
      case 1:
        sunkShipLocator.appendChild(sunkBoatImage);
        sunkBoatImage.style.transform = 'rotate(90deg) translateY(75px) translateX(75px)';
        break;
      case 2:
      case 3:
        sunkShipLocator.appendChild(sunkBoatImage);
        sunkBoatImage.style.transform = 'rotate(90deg) translateY(50px) translateX(50px)';
        break;
      case 4:
      case 5:
      case 6:
        sunkShipLocator.appendChild(sunkBoatImage);
        sunkBoatImage.style.transform = 'rotate(90deg) translateY(25px) translateX(25px)';
        break;
      default:
        sunkShipLocator.appendChild(sunkBoatImage);
        break;
    }
  } else {
    sunkShipLocator.appendChild(sunkBoatImage);
  }
}
