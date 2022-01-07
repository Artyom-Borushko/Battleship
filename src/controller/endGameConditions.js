import { allBoatsCoordinates } from './battleshipGrid';
import generateEndGameScore from './score';
import { timer } from './infoPanel';

const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameScreenHeader = document.querySelector('.end-game-header');
const remainingAmmo = document.querySelector('.available-ammo');

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
    localStorage.removeItem(localStorage.length);
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
    endGameScreenHeader.innerHTML = 'Game Over';
    generateEndGameScore();
  }
}
