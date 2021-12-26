const ammoProgressBar = document.querySelector('.ammo-progress-bar-line');
const countDownTimer = document.querySelector('.countdown-timer');
const ammoInfo = document.querySelector('.available-ammo');

let availableAmmo = 30;
let defaultAmmo = 0;

export function countdownTimer() {
  const countDownDate = new Date(Date.now() + 15 * 60000);
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countDownTimer.innerHTML = `${minutes}:${seconds}`;

    if (distance < 0) {
      clearInterval(timer);
      countDownTimer.innerHTML = 'EXPIRED';
      // TODO - implement end game logic
    }
  }, 1000);
}

export function reduceAmmo() {
  availableAmmo--;
  ammoInfo.innerHTML = `${availableAmmo}/30`;
  if (availableAmmo <= 0) {
    ammoInfo.innerHTML = 'EMPTY';
    // TODO - implement end game logic
  }
}

export function updateAmmoProgressBar() {
  defaultAmmo += 5;
  if (defaultAmmo <= 150) {
    ammoProgressBar.style.width = `${defaultAmmo}px`;
  }
}
