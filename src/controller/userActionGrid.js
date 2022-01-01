import { reduceAmmo, updateAmmoProgressBar } from './infoPanel';

import { isAllBoatsSunk } from './endGameConditions';
import boatsState from '../state/boatsState';

function validateAttack(e) {
  for (let i = 0; i < boatsState.length; i++) {
    const isHitSucceeded = boatsState[i].spawnCoordinates.filter(
      (coordinate) => coordinate === e.target.dataset.location,
    );
    if (!isHitSucceeded.length) {
      e.target.style.backgroundColor = 'grey';
    }
    if (isHitSucceeded.length && boatsState[i].livesCount !== 0) {
      boatsState[i].livesCount--;
      e.target.style.backgroundColor = 'red';
      e.target.classList.remove('battleship-cell-playable');

      if (boatsState[i].livesCount === 0) {
        for (let j = 0; j < boatsState[i].occupiedCoordinates.length; j++) {
          const firstCoordinate = `${boatsState[i].occupiedCoordinates[j]}`.substring(0, `${boatsState[i].occupiedCoordinates[j]}`.indexOf('-'));
          const secondCoordinate = `${boatsState[i].occupiedCoordinates[j]}`.substring(`${boatsState[i].occupiedCoordinates[j]}`.lastIndexOf('-') + 1);
          const cellAroundSunkBoat = document.querySelector(`[data-location='${boatsState[i].occupiedCoordinates[j]}']`);
          if (firstCoordinate < 11 && firstCoordinate > 0
            && secondCoordinate < 11 && secondCoordinate > 0) {
            cellAroundSunkBoat.style.backgroundColor = 'green';
            cellAroundSunkBoat.classList.remove('battleship-cell-playable');
          }
        }
      }
      isAllBoatsSunk(e.target.dataset.location);
      break;
    }
  }
}

function attack(e) {
  reduceAmmo();
  updateAmmoProgressBar();
  validateAttack(e);
}

document.addEventListener('click', (event) => {
  if (event.target.className.includes('battleship-cell-playable')) {
    attack(event);
  }
});
