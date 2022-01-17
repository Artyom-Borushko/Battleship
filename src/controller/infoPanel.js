/* eslint-disable import/no-mutable-exports */
import generateEndGameScore from './score';
import fireIcon from '../assets/icons/fireIcon.png';
import {
  gameScreen, endGameScreen, endGameScreenHeader, ammoProgressBar, countDownTimer,
  remainingAmmo as ammoInfo,
  fourCellShip, firstThreeCellShip, secondThreeCellShip, firstTwoCellShip, secondTwoCellShip,
  thirdTwoCellShip, firstOneCellShip, secondOneCellShip, thirdOneCellShip, fourthOneCellShip,
} from '../constants/querySelectors';

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
  fireIconImage.classList.add('hit-image');
  return fireIconImage;
}

export function addFireIconToInfoPanelBoat(boatLength) {
  const fireIconImage = generateFireIconForInfoPanel();

  if (boatLength === 4) {
    fourCellShip.appendChild(fireIconImage);
  }
  if (boatLength === 3) {
    if (firstThreeCellShip.getElementsByTagName('img').length !== 2) {
      firstThreeCellShip.appendChild(fireIconImage);
    } else {
      secondThreeCellShip.appendChild(fireIconImage);
    }
  }
  if (boatLength === 2) {
    if (firstTwoCellShip.getElementsByTagName('img').length !== 2) {
      firstTwoCellShip.appendChild(fireIconImage);
    } else if (secondTwoCellShip.getElementsByTagName('img').length !== 2) {
      secondTwoCellShip.appendChild(fireIconImage);
    } else {
      thirdTwoCellShip.appendChild(fireIconImage);
    }
  }
  if (boatLength === 1) {
    if (firstOneCellShip.getElementsByTagName('img').length !== 2) {
      firstOneCellShip.appendChild(fireIconImage);
    } else if (secondOneCellShip.getElementsByTagName('img').length !== 2) {
      secondOneCellShip.appendChild(fireIconImage);
    } else if (thirdOneCellShip.getElementsByTagName('img').length !== 2) {
      thirdOneCellShip.appendChild(fireIconImage);
    } else {
      fourthOneCellShip.appendChild(fireIconImage);
    }
  }
}
