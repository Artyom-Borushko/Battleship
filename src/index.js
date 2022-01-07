/* eslint-disable camelcase */
import './styles/style.scss';
import { createBattleshipGrid, generateEmptyCells, shipsInitializer } from './controller/battleshipGrid';
import { startCountdownTimer } from './controller/infoPanel';
import {
  boat4, boat3_1, boat3_2, boat2_1, boat2_2, boat2_3, boat1_1, boat1_2, boat1_3, boat1_4,
} from './constants/ships';

const loginFormSelector = document.querySelector('#login-form');
const nameInputSelector = document.querySelector('.name-input');
const startButtonSelector = document.querySelector('.start-button');
const gameScreenSelector = document.querySelector('.game-screen');

function loginButtonEnabler(event) {
  if (event.key) {
    startButtonSelector.style.cursor = 'pointer';
    startButtonSelector.disabled = false;
  } else {
    startButtonSelector.disabled = true;
  }
}

function saveUserToLocalStorage() {
  localStorage.setItem(localStorage.length + 1, JSON.stringify({
    name: nameInputSelector.value,
  }));
}

async function onLoginFormSubmit(event) {
  event.preventDefault();
  saveUserToLocalStorage();
  loginFormSelector.style.display = 'none';
  gameScreenSelector.style.display = 'block';
  createBattleshipGrid();
  generateEmptyCells();
  shipsInitializer(boat4);
  shipsInitializer(boat3_1);
  shipsInitializer(boat3_2);
  shipsInitializer(boat2_1);
  shipsInitializer(boat2_2);
  shipsInitializer(boat2_3);
  shipsInitializer(boat1_1);
  shipsInitializer(boat1_2);
  shipsInitializer(boat1_3);
  shipsInitializer(boat1_4);
  startCountdownTimer();
  await import('./controller/userActionGrid');
}

loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);
