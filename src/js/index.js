import { createBattleshipGrid } from "./battleshipGrid.js";
import { countdownTimer } from "./infoPanel.js";
import { initializeShips } from "./battleshipGrid.js";

const boat4 = {
  boatLength: 4,
}
const boat3_1 = {
  boatLength: 3,
}
const boat3_2 = {
  boatLength: 3,
}
const boat2_1 = {
  boatLength: 2,
}
const boat2_2 = {
  boatLength: 2,
}
const boat2_3 = {
  boatLength: 2,
}
const boat1_1 = {
  boatLength: 1,
}
const boat1_2 = {
  boatLength: 1,
}
const boat1_3 = {
  boatLength: 1,
}
const boat1_4 = {
  boatLength: 1,
}

const loginFormSelector = document.querySelector('#login-form');
const nameInputSelector = document.querySelector('.name-input');
const startButtonSelector = document.querySelector('.start-button');
const gameScreenSelector = document.querySelector('.game-screen');


loginFormSelector.addEventListener('submit', onLoginFormSubmit);
nameInputSelector.addEventListener('keyup', loginButtonEnabler);


function loginButtonEnabler(event) {
  if (event.key) {
    startButtonSelector.style.cursor = "pointer"
    startButtonSelector.disabled = false;
  }
  else {
    startButtonSelector.disabled = true;
  }
}

function onLoginFormSubmit(event) {
  countdownTimer();
  event.preventDefault();
  loginFormSelector.style.display = "none";
  gameScreenSelector.style.display = "block";  
  createBattleshipGrid();
  initializeShips(boat4);
  initializeShips(boat3_1);
  initializeShips(boat3_2);
  // initializeShips(boat2_1);
  // initializeShips(boat2_2);
  // initializeShips(boat2_3);
  // initializeShips(boat1_1);
  // initializeShips(boat1_2);
  // initializeShips(boat1_3);
  // initializeShips(boat1_4);

  
  // TODO - add user name to storage

}



