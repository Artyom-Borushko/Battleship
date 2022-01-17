import { nameColumn, shotsColumn, timeColumn } from '../constants/querySelectors';
import { getUserFromLocalStorage } from './localStorageController';

const sortedArrayOfUsers = [];

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function calculateAndAppendUsedTime(user) {
  const userTimeContainer = document.createElement('p');
  const availableTime = 15 * 60000;
  const usedTime = availableTime - user.timeLeft;
  const convertedUsedTime = millisToMinutesAndSeconds(usedTime);
  userTimeContainer.innerHTML = convertedUsedTime;
  timeColumn.appendChild(userTimeContainer);
}

function calculateAndAppendUsedShots(user) {
  const userShotsContainer = document.createElement('p');
  const usedShots = 30 - user.availableAmmo;
  userShotsContainer.innerHTML = usedShots;
  shotsColumn.appendChild(userShotsContainer);
}

function appendUserName(user) {
  const userNameContainer = document.createElement('p');
  userNameContainer.innerHTML = user.name;
  nameColumn.appendChild(userNameContainer);
}

function appendDataToScoreTable(numberOfLines) {
  let numberOfTableLines;
  if (sortedArrayOfUsers.length < numberOfLines) {
    numberOfTableLines = sortedArrayOfUsers.length;
  } else {
    numberOfTableLines = numberOfLines;
  }

  for (let i = 0; i < numberOfTableLines; i++) {
    appendUserName(sortedArrayOfUsers[i]);
    calculateAndAppendUsedShots(sortedArrayOfUsers[i]);
    calculateAndAppendUsedTime(sortedArrayOfUsers[i]);
  }
}

function compare(a, b) {
  if (a.availableAmmo === b.availableAmmo) {
    return b.timeLeft - a.timeLeft;
  }
  return a.availableAmmo > b.availableAmmo ? -1 : 1;
}

function sortLocalStorageUsers() {
  for (let i = 1; i < localStorage.length + 1; i++) {
    const iterationUserData = JSON.parse(getUserFromLocalStorage(i));
    sortedArrayOfUsers.push(iterationUserData);
  }
  sortedArrayOfUsers.sort(compare);
}

export default function generateEndGameScore() {
  sortLocalStorageUsers();
  appendDataToScoreTable(10);
}
