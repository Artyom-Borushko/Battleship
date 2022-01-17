function saveNameToLocalStorage(key, objValue) {
  localStorage.setItem(key, JSON.stringify({
    name: objValue,
  }));
}

function removeLocalStorageItem(item) {
  localStorage.removeItem(item);
}

function getLocalStorageItem(item) {
  return localStorage.getItem(item);
}

function updateLocalStorageTime(key, availableAmmo, timeLeft) {
  const currentUserData = getLocalStorageItem(key);
  const parsedUsedData = JSON.parse(currentUserData);
  if (parsedUsedData !== null) {
    localStorage.setItem(key, JSON.stringify({
      name: parsedUsedData.name,
      availableAmmo,
      timeLeft,
    }));
  }
}

function updateLocalStorageAmmo(key, availableAmmo) {
  const currentUserData = getLocalStorageItem(key);
  const parsedUsedData = JSON.parse(currentUserData);
  localStorage.setItem(key, JSON.stringify({
    name: parsedUsedData.name,
    availableAmmo,
  }));
}

export {
  saveNameToLocalStorage, removeLocalStorageItem, getLocalStorageItem,
  updateLocalStorageTime, updateLocalStorageAmmo,
};
