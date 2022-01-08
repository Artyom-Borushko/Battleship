import { reduceAmmo, increaseAmmoProgressBar, addFireIconToInfoPanelBoat } from './infoPanel';
import { isAllBoatsSunk, isAmmoOver } from './endGameConditions';
import boatsState from '../state/boatsState';
import { generateMissImage, generateMissImageAroundSunkBoat, generateHitImage } from './battleshipGrid';

function validateAttack(e) {
  for (let i = 0; i < boatsState.length; i++) {
    const isHitSucceeded = boatsState[i].spawnCoordinates.filter(
      (coordinate) => coordinate === e.target.dataset.location,
    );
    if (!isHitSucceeded.length && i === boatsState.length - 1) {
      reduceAmmo();
      increaseAmmoProgressBar();
      generateMissImage(e);
      isAmmoOver();
      e.target.classList.remove('battleship-cell-playable');
    }
    if (isHitSucceeded.length && boatsState[i].livesCount !== 0) {
      boatsState[i].livesCount--;
      generateHitImage(e);
      e.target.classList.remove('battleship-cell-playable');
      if (boatsState[i].livesCount === 0) {
        for (let j = 0; j < boatsState[i].occupiedCoordinates.length; j++) {
          const firstCoordinate = `${boatsState[i].occupiedCoordinates[j]}`.substring(0, `${boatsState[i].occupiedCoordinates[j]}`.indexOf('-'));
          const secondCoordinate = `${boatsState[i].occupiedCoordinates[j]}`.substring(`${boatsState[i].occupiedCoordinates[j]}`.lastIndexOf('-') + 1);
          const cellAroundSunkBoat = document.querySelector(`[data-location='${boatsState[i].occupiedCoordinates[j]}']`);
          if (firstCoordinate < 11 && firstCoordinate > 0
            && secondCoordinate < 11 && secondCoordinate > 0) {
            if (cellAroundSunkBoat.getElementsByTagName('img').length === 0) {
              generateMissImageAroundSunkBoat(cellAroundSunkBoat);
              cellAroundSunkBoat.classList.remove('battleship-cell-playable');
            }
          }
        }
        addFireIconToInfoPanelBoat(boatsState[i].id);
      }
      isAllBoatsSunk(e.target.dataset.location);
      break;
    }
  }
}

function attack(e) {
  validateAttack(e);
}

document.addEventListener('click', (event) => {
  if (event.target.className.includes('battleship-cell-playable')) {
    attack(event);
  }
});
