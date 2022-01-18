import { generateEndGameScore } from '../model/gameModel';
import {
  gameScreen, endGameScreen, endGameScreenHeader, ammoProgressBar, countDownTimer,
  remainingAmmo as ammoInfo,
} from '../constants/querySelectors';
import { updateUserLocalStorageTime, removeUserFromLocalStorage, updateUserLocalStorageAmmo } from './localStorageController';
import { generateFireIconForInfoPanel, getSunkBoatImageLocator, calculateMinutesAndSeconds } from '../model/infoPanelModel';

let availableAmmo = 30;
let defaultAmmo = 0;
// eslint-disable-next-line import/no-mutable-exports
export let timer;

export function startCountdownTimer(timerTime) {
  const countDownDate = new Date(Date.now() + timerTime * 60000);
  timer = setInterval(() => {
    const [distance, minutes, seconds] = calculateMinutesAndSeconds(countDownDate);
    if (seconds.toString().length < 2) {
      countDownTimer.innerHTML = `${minutes}:0${seconds}`;
    } else {
      countDownTimer.innerHTML = `${minutes}:${seconds}`;
    }
    updateUserLocalStorageTime(availableAmmo, distance);
    if (distance < 0) {
      clearInterval(timer);
      removeUserFromLocalStorage();
      gameScreen.style.display = 'none';
      endGameScreen.style.display = 'block';
      endGameScreenHeader.innerHTML = 'Game Over';
      generateEndGameScore();
    }
  }, 1000);
}

export function reduceAmmo() {
  availableAmmo--;
  ammoInfo.innerHTML = `${availableAmmo}/30`;
  updateUserLocalStorageAmmo(availableAmmo);
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

export function addFireIconToInfoPanelBoat(boatLength) {
  const fireIconImage = generateFireIconForInfoPanel();
  const sunkBoatLocator = getSunkBoatImageLocator(boatLength);
  sunkBoatLocator.appendChild(fireIconImage);
}
