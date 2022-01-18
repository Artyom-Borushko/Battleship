const loginFormSelector = document.querySelector('#login-form');
const nameInputSelector = document.querySelector('.name-input');
const startButtonSelector = document.querySelector('.start-button');
const battleshipGrid = document.querySelector('.battleship-panel');
const gameScreen = document.querySelector('.game-screen');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameScreenHeader = document.querySelector('.end-game-header');
const remainingAmmo = document.querySelector('.available-ammo');
const ammoProgressBar = document.querySelector('.ammo-progress-bar-line');
const countDownTimer = document.querySelector('.countdown-timer');
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
const nameColumn = document.querySelector('.end-game-table-name');
const shotsColumn = document.querySelector('.end-game-table-shots');
const timeColumn = document.querySelector('.end-game-table-time');
const playAgainButton = document.querySelector('.play-again-button');

export {
  battleshipGrid, gameScreen, endGameScreen, endGameScreenHeader, remainingAmmo,
  ammoProgressBar, countDownTimer, fourCellShip, firstThreeCellShip,
  secondThreeCellShip, firstTwoCellShip, secondTwoCellShip, thirdTwoCellShip,
  firstOneCellShip, secondOneCellShip, thirdOneCellShip, fourthOneCellShip,
  nameColumn, shotsColumn, timeColumn, playAgainButton, loginFormSelector,
  nameInputSelector, startButtonSelector,
};
