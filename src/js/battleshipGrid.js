import { reduceAmmo, updateAmmoProgressBar } from "./infoPanel.js";

const cellHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'M']
const locatorStorage = [];
const occupiedCoordinatesStorage = []; // mb replace to set

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
  testInfo(e);
}

// ship spawn logic
// const boat4 = {
//   boatLength: 4,
// }
// const boat3_1 = {
//   boatLength: 3,
// }
// const boat3_2 = {
//   boatLength: 3,
// }

function testInfo(e) {
  // const testInfo = document.querySelectorAll('.battleship-cell-playable');
  // console.log(testInfo)
  
  // reallyHardLogic(boat4);
  // reallyHardLogic(boat3_1);
  // reallyHardLogic(boat3_2);

  // generateEmptyCells()
  // console.log(emptyCells, 'empty space')

  let mapper = locatorStorage.filter(element => element === e.target.dataset.location);
  if (mapper.length) {
    e.target.style.backgroundColor = 'red';
  }
}

function generateDirection() {
  return Math.round(Math.random());
}

function generateColumnToStart() {
  return Math.round(Math.random() * 10) + 1;
}


// const emptyCells = new Set();

// function generateEmptyCells() {
//   for (let i = 1; i <= 10; i++) {
//     for (let j = 1; j <= 10; j++) {
//       // emptyCells.push(`${i}-${j}`)
//       emptyCells.add(`${i}-${j}`);
//     }
//   }
// }

// function anotherInitializeShips(boat) {
//   let isPlaced = false;
  
//   while (!isPlaced) {
//     const direction = generateDirection();
//     const columnToStart = generateColumnToStart();
//     if (direction === 1 && columnToStart + boat.boatLength - 1 > 10) {
//       continue
//     } else if (direction === 1 && emptyCells.has(`${columnToStart}-${columnToStart + boat.boatLength}`)) {

//     }
//   }   
// }



const occupiedStorage = [];
let iterations = 0;

export function initializeShips(boat3) {
  let isPlaced = false;
  
  while (!isPlaced) {
    const direction = generateDirection();
    const columnToStart = generateColumnToStart();
    
    console.log(direction, 'direction')
  // 1 - column, 0 - row
    if (direction === 1) {
      // console.log(iterations, 'iterations upper')
      if (columnToStart + boat3.boatLength - 1 > 10) continue;
      if (iterations === 0) {
        ++iterations;
        // console.log(iterations, 'iterations')
        for (let i = 0; i < boat3.boatLength; i++) {
          locatorStorage.push(`${columnToStart}-${columnToStart + i}`);
        }
        columnOccupationLogic(locatorStorage);
        isPlaced = true;
      } else {
        let testOccupiedVerification = [];
        for (let i = 0; i < boat3.boatLength; i++) {
          testOccupiedVerification.push(`${columnToStart}-${columnToStart + i}`);
        }
        console.log(testOccupiedVerification, 'test occupied verification to debug')
        console.log(occupiedCoordinatesStorage, 'occupied coordinates to debug')
          const intersection = occupiedCoordinatesStorage.filter(element => testOccupiedVerification.includes(element));
          console.log(intersection, 'this is an intersection')
          // occupiedCoordinatesStorage
          // locatorStorage
          if (intersection.length) {
            continue
          } else {
            locatorStorage.push(...testOccupiedVerification);
            columnOccupationLogic(testOccupiedVerification);
            isPlaced = true;
          }
        }
      console.log(locatorStorage, 'locator in column logic')
      // columnOccupationLogic(locatorStorage)
      // break;
    }
    
    if (direction === 0) {
      // console.log(iterations, 'iterations upper')
      if (columnToStart + boat3.boatLength - 1 > 10) continue;
      if (iterations === 0) {
        ++iterations;
        // console.log(iterations, 'iterations')
        for (let i = 0; i < boat3.boatLength; i++) {
          locatorStorage.push(`${columnToStart + i}-${columnToStart}`);
        }
        rowOccupationLogic(locatorStorage);
        isPlaced = true;
      } else {
        let testOccupiedVerification = [];
        for (let i = 0; i < boat3.boatLength; i++) {
          testOccupiedVerification.push(`${columnToStart + i}-${columnToStart}`);
        }
        // console.log(testOccupiedVerification, 'test occupied verification to debug')
        // console.log(occupiedCoordinatesStorage, 'occupied coordinates to debug')
          const intersection = occupiedCoordinatesStorage.filter(element => testOccupiedVerification.includes(element));
          console.log(intersection, 'this is an intersection')
          // occupiedCoordinatesStorage
          // locatorStorage
          if (intersection.length) {
            continue
          } else {
            locatorStorage.push(...testOccupiedVerification);
            rowOccupationLogic(testOccupiedVerification);
            isPlaced = true;
            // break
          }
      }
      console.log(locatorStorage, 'locator in row logic')
    }


    // old realization
    // if (direction === 0) {
    //   console.log('row workflow')
    //   if (columnToStart + boat3.boatLength - 1 > 10) continue;
    //   for (let i = 0; i < boat3.boatLength; i++) {
    //     // const element = [i];
    //     locatorStorage.push(`${columnToStart + i}-${columnToStart}`);
        
    //   }
    //   console.log(locatorStorage, 'locator in row logic')
    //   rowOccupationLogic(locatorStorage)
    //   break;
    // }
  }
  

}


function columnOccupationLogic(coordinates) {
  let first1 = `${coordinates[0]}`;
  first1 = first1.substring(0, first1.indexOf('-'));
  let last1 = `${coordinates[coordinates.length - 1]}`;
  last1 = last1.substring(last1.lastIndexOf('-') + 1);
  let first = parseInt(first1);
  let last = parseInt(last1);
  // console.log(first, 'first')
  // console.log(last, 'last')
  for (let i = first - 1; i <= first + 1; i++) {
    for (let j = first - 1; j <= last + 1; j++) {
      // console.log(`${i}-${j}`, 'HAHAHAHA')
      occupiedCoordinatesStorage.push(`${i}-${j}`);
    }
  }
  console.log(occupiedCoordinatesStorage, 'resulting column occupied coordinates')
}

function rowOccupationLogic(coordinates) {
  let first1 = `${coordinates[0]}`;
  first1 = first1.substring(0, first1.indexOf('-'));
  let first = parseInt(first1);
  let lastColumn1 = `${coordinates[coordinates.length - 1]}`
  lastColumn1 = lastColumn1.substring(0, lastColumn1.indexOf('-'))
  let lastColumn = parseInt(lastColumn1);
  for (let i = first - 1; i <= lastColumn + 1; i++) {
    for (let j = first - 1; j <= first + 1; j++) {
      // console.log(`${i}-${j}`, 'HAHAHAHA')
      occupiedCoordinatesStorage.push(`${i}-${j}`);
    }
    
  }
  console.log(occupiedCoordinatesStorage, 'resulting row occupied coordinates')
}
