import { allBoatsCoordinates } from './battleshipGrid';

const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');
const gameOverScreen = document.querySelector('.game-over-screen');
const remainingAmmo = document.querySelector('.available-ammo');

let remainingBoatsCoordinates = [...allBoatsCoordinates];

export function isAllBoatsSunk(boatCoordinates) {
  remainingBoatsCoordinates = remainingBoatsCoordinates
    .filter((coordinate) => coordinate !== boatCoordinates);
  if (!remainingBoatsCoordinates.length) {
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
  }
}

export function isAmmoOver() {
  const availableAmmoCounter = remainingAmmo.innerText;
  const availableAmmo = parseInt(availableAmmoCounter.substring(0, availableAmmoCounter.indexOf('/')), 10);
  if (availableAmmo === 0) {
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
  }
}
