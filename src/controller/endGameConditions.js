import { allBoatsCoordinates } from './battleshipGridController';
import generateEndGameScore from './score';
import { timer } from './infoPanelController';
import {
  gameScreen, endGameScreen, endGameScreenHeader, remainingAmmo,
} from '../constants/querySelectors';
import { removeUserFromLocalStorage } from './localStorageController';

let remainingBoatsCoordinates = [...allBoatsCoordinates];

export function isAllBoatsSunk(boatCoordinates) {
  remainingBoatsCoordinates = remainingBoatsCoordinates
    .filter((coordinate) => coordinate !== boatCoordinates);
  if (!remainingBoatsCoordinates.length) {
    clearInterval(timer);
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
    endGameScreenHeader.innerHTML = 'You Won!!!';
    generateEndGameScore();
  }
}

export function isAmmoOver() {
  const availableAmmoCounter = remainingAmmo.innerText;
  const availableAmmo = parseInt(availableAmmoCounter.substring(0, availableAmmoCounter.indexOf('/')), 10);
  if (availableAmmo === 0) {
    clearInterval(timer);
    removeUserFromLocalStorage();
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
    endGameScreenHeader.innerHTML = 'Game Over';
    generateEndGameScore();
  }
}
