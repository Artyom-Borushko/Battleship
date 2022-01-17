import {
  saveNameToLocalStorage, removeLocalStorageItem, updateLocalStorageTime,
  updateLocalStorageAmmo, getLocalStorageItem,
} from '../model/localStorageModel';

function saveUserToLocalStorage(name) {
  saveNameToLocalStorage(localStorage.length + 1, name);
}

function removeUserFromLocalStorage() {
  removeLocalStorageItem(localStorage.length);
}

function getUserFromLocalStorage(user) {
  return getLocalStorageItem(user);
}

function updateUserLocalStorageTime(availableAmmo, distance) {
  updateLocalStorageTime(localStorage.length, availableAmmo, distance);
}

function updateUserLocalStorageAmmo(availableAmmo) {
  updateLocalStorageAmmo(localStorage.length, availableAmmo);
}

export {
  saveUserToLocalStorage, removeUserFromLocalStorage, updateUserLocalStorageTime,
  updateUserLocalStorageAmmo, getUserFromLocalStorage,
};
