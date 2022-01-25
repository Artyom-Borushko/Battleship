import './styles/style.scss';
import { createBattleshipGrid, generateEmptyCells, shipPlacement } from './controller/battleshipGridController';
import { startCountdownTimer } from './controller/infoPanelController';
import shipsBuilder from './utils/shipBuilder';
import {
  loginFormSelector, nameInputSelector, startButtonSelector, gameScreen,
} from './constants/querySelectors';
import { saveUserToLocalStorage } from './controller/localStorageController';
import boatsState from './state/boatsState';

function loginButtonEnabler(event) {
  if (event.key) {
    startButtonSelector.style.cursor = 'pointer';
    startButtonSelector.disabled = false;
  } else {
    startButtonSelector.disabled = true;
  }
}

async function onLoginFormSubmit(event) {
  event.preventDefault();
  saveUserToLocalStorage(nameInputSelector.value);
  loginFormSelector.style.display = 'none';
  gameScreen.style.display = 'block';
  createBattleshipGrid(10, 10);
  generateEmptyCells(10, 10);
  shipsBuilder(4, 3, 3, 2, 2, 2, 1, 1, 1, 1);
  boatsState.forEach((boat) => {
    shipPlacement(boat);
  });
  startCountdownTimer(15);
  await import('./controller/userActionGrid');
}

loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);
