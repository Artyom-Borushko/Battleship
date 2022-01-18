import { allBoatsCoordinates } from './battleshipGridController';
import { timer } from './infoPanelController';
import {
  gameScreen, endGameScreen, endGameScreenHeader,
} from '../constants/querySelectors';
import { removeUserFromLocalStorage } from './localStorageController';
import { isGameOver, generateEndGameScore } from '../model/gameModel';

let remainingBoatsCoordinates = [...allBoatsCoordinates];

export default function isGameCompleted(boatCoordinates = undefined) {
  if (boatCoordinates !== undefined) {
    remainingBoatsCoordinates = remainingBoatsCoordinates
      .filter((coordinate) => coordinate !== boatCoordinates);
  }
  const [gameOver, reason] = isGameOver(remainingBoatsCoordinates);
  if (reason === 'allBoatsSunk') {
    endGameScreenHeader.innerHTML = 'You Won!!!';
  }
  if (reason === 'ammoOver') {
    removeUserFromLocalStorage();
    endGameScreenHeader.innerHTML = 'Game Over';
  }
  if (gameOver) {
    clearInterval(timer);
    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
    generateEndGameScore(10);
  }
}
