import './styles/style.scss';
import { createBattleshipGrid, generateEmptyCells, shipPlacement } from './controller/battleshipGridController';
import { startCountdownTimer } from './controller/infoPanelController';
import shipBuilder from './utils/shipBuilder';
import {
  loginFormSelector, nameInputSelector, startButtonSelector, gameScreen,
} from './constants/querySelectors';
import { saveUserToLocalStorage } from './controller/localStorageController';

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
  shipPlacement(shipBuilder(4));
  shipPlacement(shipBuilder(3));
  shipPlacement(shipBuilder(3));
  shipPlacement(shipBuilder(2));
  shipPlacement(shipBuilder(2));
  shipPlacement(shipBuilder(2));
  shipPlacement(shipBuilder(1));
  shipPlacement(shipBuilder(1));
  shipPlacement(shipBuilder(1));
  shipPlacement(shipBuilder(1));
  startCountdownTimer(15);
  await import('./controller/userActionGrid');
}

loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);
