import boatsState from '../state/boatsState';
import {
  initializeBattleshipGrid, columnOccupationLogic, rowOccupationLogic,
  generateDirection, generatePlaceToStart, generateArrayOfIndexes,
  generateMissImage, generateHitImage, generateMissImageAroundSunkBoat,
  generateSunkBoatImage, deleteOccupiedCellsFromEmptyCells,
  canBoatBePlacedInColumn, canBoatBePlacedInRow,
} from '../model/battleshipGridModel';

let emptyCells = [];
export const allBoatsCoordinates = [];

export function createBattleshipGrid(columnsCount, rowsCount) {
  initializeBattleshipGrid(columnsCount, rowsCount);
}

export function generateEmptyCells(columnsCount, rowsCount) {
  emptyCells = generateArrayOfIndexes(columnsCount, rowsCount);
}

export function shipPlacement(boat) {
  let isPlaced = false;

  while (!isPlaced) {
    const direction = generateDirection();
    const placeToStart = generatePlaceToStart(emptyCells);
    const columnToStart = parseInt(placeToStart.substring(0, placeToStart.indexOf('-')), 10);
    const rowToStart = parseInt(placeToStart.substring(placeToStart.lastIndexOf('-') + 1), 10);

    if (direction === 1) {
      const boatCanBePlaced = canBoatBePlacedInColumn(boat, columnToStart, rowToStart, emptyCells);
      if (boatCanBePlaced) {
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

        emptyCells = deleteOccupiedCellsFromEmptyCells(occupiedArr, emptyCells);
        isPlaced = true;
      }
    } else if (direction === 0) {
      const boatCanBePlaced = canBoatBePlacedInRow(boat, columnToStart, rowToStart, emptyCells);
      if (boatCanBePlaced) {
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

        emptyCells = deleteOccupiedCellsFromEmptyCells(occupiedArr, emptyCells);
        isPlaced = true;
      }
    }
  }
}

export function addMissImage(e) {
  const missIconImage = generateMissImage(e);
  e.target.appendChild(missIconImage);
}

export function addMissImageAroundSunkBoat(cellAroundSunkBoat) {
  const missIconImage = generateMissImageAroundSunkBoat(cellAroundSunkBoat);
  cellAroundSunkBoat.appendChild(missIconImage);
}

export function addHitImage(e) {
  const fireIconImage = generateHitImage(e);
  e.target.appendChild(fireIconImage);
}

export function addSunkBoatImageToBattleship({
  spawnCoordinates, direction, boatLength,
}) {
  const sunkShipLocator = document.querySelector(`[data-location='${spawnCoordinates[0]}']`);
  const sunkBoatImage = generateSunkBoatImage(boatLength, sunkShipLocator);

  if (direction === 1) {
    switch (boatLength) {
      case 4:
        sunkShipLocator.appendChild(sunkBoatImage);
        sunkBoatImage.style.transform = 'rotate(90deg) translateY(75px) translateX(75px)';
        break;
      case 3:
        sunkShipLocator.appendChild(sunkBoatImage);
        sunkBoatImage.style.transform = 'rotate(90deg) translateY(50px) translateX(50px)';
        break;
      case 2:
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
