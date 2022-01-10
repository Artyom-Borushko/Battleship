/* eslint-disable import/no-mutable-exports */
import generateEndGameScore from './score';
import fireIcon from '../assets/icons/fireIcon.png';

const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameScreenHeader = document.querySelector('.end-game-header');

const ammoProgressBar = document.querySelector('.ammo-progress-bar-line');
const countDownTimer = document.querySelector('.countdown-timer');
const ammoInfo = document.querySelector('.available-ammo');

const fourCellShip = document.querySelector('.four-cell-ship');
const firstThreeCellShip = document.querySelector('.first-three-cells-ship');
const secondThreeCellShip = document.querySelector('.second-three-cells-ship');
const firstTwoCellShip = document.querySelector('.first-two-cells-ship');
const secondTwoCellShip = document.querySelector('.second-two-cells-ship');
const thirdTwoCellShip = document.querySelector('.third-two-cells-ship');
const firstOneCellShip = document.querySelector('.first-one-cell-ship');
const secondOneCellShip = document.querySelector('.second-one-cell-ship');
const thirdOneCellShip = document.querySelector('.third-one-cell-ship');
const fourthOneCellShip = document.querySelector('.fourth-one-cell-ship');

let availableAmmo = 30;
let defaultAmmo = 0;
export let timer;

function updateLocalStorageTime(timeLeft) {
  const currentUserData = localStorage.getItem(localStorage.length);
  const parsedUsedData = JSON.parse(currentUserData);
  if (parsedUsedData !== null) {
    localStorage.setItem(localStorage.length, JSON.stringify({
      name: parsedUsedData.name,
      availableAmmo,
      timeLeft,
    }));
  }
}

export function startCountdownTimer() {
  const countDownDate = new Date(Date.now() + 15 * 60000);
  timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds.toString().length < 2) {
      countDownTimer.innerHTML = `${minutes}:0${seconds}`;
    } else {
      countDownTimer.innerHTML = `${minutes}:${seconds}`;
    }
    updateLocalStorageTime(distance);
    if (distance < 0) {
      clearInterval(timer);
      localStorage.removeItem(localStorage.length);
      gameScreen.style.display = 'none';
      endGameScreen.style.display = 'block';
      endGameScreenHeader.innerHTML = 'Game Over';
      generateEndGameScore();
    }
  }, 1000);
}

function updateLocalStorageAmmo() {
  const currentUserData = localStorage.getItem(localStorage.length);
  const parsedUsedData = JSON.parse(currentUserData);
  localStorage.setItem(localStorage.length, JSON.stringify({
    name: parsedUsedData.name,
    availableAmmo,
  }));
}

export function reduceAmmo() {
  availableAmmo--;
  ammoInfo.innerHTML = `${availableAmmo}/30`;
  updateLocalStorageAmmo();
}

export function increaseAmmoProgressBar() {
  defaultAmmo += 5;
  if (defaultAmmo <= 150) {
    ammoProgressBar.style.width = `${defaultAmmo}px`;
  }
  if (defaultAmmo >= 145 && defaultAmmo <= 150) {
    ammoProgressBar.style.borderBottomRightRadius = '20px';
    ammoProgressBar.style.borderTopRightRadius = '20px';
    ammoProgressBar.style.width = `${defaultAmmo}px`;
  }
}

function generateFireIconForInfoPanel() {
  const fireIconImage = new Image();
  fireIconImage.src = fireIcon;
  fireIconImage.style.maxWidth = '100%';
  fireIconImage.style.maxHeight = '100%';
  fireIconImage.style.position = 'absolute';
  fireIconImage.style.left = '50%';
  fireIconImage.style.top = '50%';
  fireIconImage.style.transform = 'translate(-50%, -50%)';
  return fireIconImage;
}

export function addFireIconToInfoPanelBoat(id) {
  const fireIconImage = generateFireIconForInfoPanel();

  switch (id) {
    case 1:
      fourCellShip.appendChild(fireIconImage);
      break;
    case 2:
      firstThreeCellShip.appendChild(fireIconImage);
      break;
    case 3:
      secondThreeCellShip.appendChild(fireIconImage);
      break;
    case 4:
      firstTwoCellShip.appendChild(fireIconImage);
      break;
    case 5:
      secondTwoCellShip.appendChild(fireIconImage);
      break;
    case 6:
      thirdTwoCellShip.appendChild(fireIconImage);
      break;
    case 7:
      firstOneCellShip.appendChild(fireIconImage);
      break;
    case 8:
      secondOneCellShip.appendChild(fireIconImage);
      break;
    case 9:
      thirdOneCellShip.appendChild(fireIconImage);
      break;
    case 10:
      fourthOneCellShip.appendChild(fireIconImage);
      break;
    default:
      break;
  }
}
