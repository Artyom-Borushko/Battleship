import { allBoatsCoordinates } from './battleshipGrid';

const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');

let remainingBoatsCoordinates = [...allBoatsCoordinates];

export function isAllBoatsSunk(boatCoordinates) {
  remainingBoatsCoordinates = remainingBoatsCoordinates
    .filter((coordinate) => coordinate !== boatCoordinates);
  if (!remainingBoatsCoordinates.length) {
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
  }
}

export const test = '123';
