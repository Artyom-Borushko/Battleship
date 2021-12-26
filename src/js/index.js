/* eslint-disable camelcase */
import '../styles/style.scss';
import { createBattleshipGrid, generateEmptyCells, shipsInitializer } from './battleshipGrid';
import { countdownTimer } from './infoPanel';

const boat4 = {
  boatLength: 4,
};
const boat3_1 = {
  boatLength: 3,
};
const boat3_2 = {
  boatLength: 3,
};
const boat2_1 = {
  boatLength: 2,
};
const boat2_2 = {
  boatLength: 2,
};
const boat2_3 = {
  boatLength: 2,
};
const boat1_1 = {
  boatLength: 1,
};
const boat1_2 = {
  boatLength: 1,
};
const boat1_3 = {
  boatLength: 1,
};
const boat1_4 = {
  boatLength: 1,
};

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

function onLoginFormSubmit(event) {
  countdownTimer();
  event.preventDefault();
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
}

loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);
