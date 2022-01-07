const nameColumn = document.querySelector('.end-game-table-name');
const shotsColumn = document.querySelector('.end-game-table-shots');
const timeColumn = document.querySelector('.end-game-table-time');

function appendUserName() {
  for (let i = 1; i < localStorage.length + 1; i++) {
    const userNameContainer = document.createElement('p');
    const iterationUserData = JSON.parse(localStorage.getItem(i));
    userNameContainer.innerHTML = iterationUserData.name;
    nameColumn.appendChild(userNameContainer);
  }
}

function calculateAndAppendUsedShots() {
  for (let i = 1; i < localStorage.length + 1; i++) {
    const userShotsContainer = document.createElement('p');
    const iterationUserData = JSON.parse(localStorage.getItem(i));
    const usedShots = 30 - iterationUserData.availableAmmo;
    userShotsContainer.innerHTML = usedShots;
    shotsColumn.appendChild(userShotsContainer);
  }
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function calculateAndAppendUsedTime() {
  for (let i = 1; i < localStorage.length + 1; i++) {
    const userTimeContainer = document.createElement('p');
    const iterationUserData = JSON.parse(localStorage.getItem(i));
    const availableTime = 15 * 60000;
    const usedTime = availableTime - iterationUserData.timeLeft;
    const convertedUsedTime = millisToMinutesAndSeconds(usedTime);
    userTimeContainer.innerHTML = convertedUsedTime;
    timeColumn.appendChild(userTimeContainer);
  }
}

export default function generateEndGameScore() {
  appendUserName();
  calculateAndAppendUsedShots();
  calculateAndAppendUsedTime();
}
