/* eslint-disable import/no-mutable-exports */
import generateEndGameScore from './score';

const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameScreenHeader = document.querySelector('.end-game-header');

const ammoProgressBar = document.querySelector('.ammo-progress-bar-line');
const countDownTimer = document.querySelector('.countdown-timer');
const ammoInfo = document.querySelector('.available-ammo');

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
}
