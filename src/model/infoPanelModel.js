import fireIcon from '../assets/icons/fireIcon.png';
import {
  fourCellShip, firstThreeCellShip, secondThreeCellShip, firstTwoCellShip, secondTwoCellShip,
  thirdTwoCellShip, firstOneCellShip, secondOneCellShip, thirdOneCellShip, fourthOneCellShip,
} from '../constants/querySelectors';

function generateFireIconForInfoPanel() {
  const fireIconImage = new Image();
  fireIconImage.src = fireIcon;
  fireIconImage.classList.add('hit-image');
  return fireIconImage;
}

function getSunkBoatImageLocator(boatLength) {
  if (boatLength === 4) {
    return fourCellShip;
  }
  if (boatLength === 3) {
    if (firstThreeCellShip.getElementsByTagName('img').length !== 2) {
      return firstThreeCellShip;
    }
    return secondThreeCellShip;
  }
  if (boatLength === 2) {
    if (firstTwoCellShip.getElementsByTagName('img').length !== 2) {
      return firstTwoCellShip;
    } if (secondTwoCellShip.getElementsByTagName('img').length !== 2) {
      return secondTwoCellShip;
    }
    return thirdTwoCellShip;
  }
  if (boatLength === 1) {
    if (firstOneCellShip.getElementsByTagName('img').length !== 2) {
      return firstOneCellShip;
    } if (secondOneCellShip.getElementsByTagName('img').length !== 2) {
      return secondOneCellShip;
    } if (thirdOneCellShip.getElementsByTagName('img').length !== 2) {
      return thirdOneCellShip;
    }
    return fourthOneCellShip;
  }
  return -1;
}

function calculateMinutesAndSeconds(countDownDate) {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return [distance, minutes, seconds];
}

export { generateFireIconForInfoPanel, getSunkBoatImageLocator, calculateMinutesAndSeconds };
