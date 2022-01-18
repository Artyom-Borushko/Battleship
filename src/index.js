import './styles/style.scss';
import { createBattleshipGrid, generateEmptyCells, shipsInitializer } from './controller/battleshipGrid';
import { startCountdownTimer } from './controller/infoPanel';
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
  createBattleshipGrid();
  generateEmptyCells();
  shipsInitializer(shipBuilder(4));
  shipsInitializer(shipBuilder(3));
  shipsInitializer(shipBuilder(3));
  shipsInitializer(shipBuilder(2));
  shipsInitializer(shipBuilder(2));
  shipsInitializer(shipBuilder(2));
  shipsInitializer(shipBuilder(1));
  shipsInitializer(shipBuilder(1));
  shipsInitializer(shipBuilder(1));
  shipsInitializer(shipBuilder(1));
  startCountdownTimer();
  await import('./controller/userActionGrid');
}

loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);
