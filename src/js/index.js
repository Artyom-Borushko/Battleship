import { createBattleshipGrid } from "./battleshipGrid.js";
import { countdownTimer } from "./infoPanel.js";

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
  
  // TODO - add user name to storage

}



