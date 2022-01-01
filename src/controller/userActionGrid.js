import { reduceAmmo, updateAmmoProgressBar } from './infoPanel';
import { occupiedStorage } from './battleshipGrid';

function highlightHit(e) {
  const mapper = occupiedStorage.filter(
    (element) => element === e.target.dataset.location,
  );
  if (mapper.length) {
    e.target.style.backgroundColor = 'red';
  }
}

function attack(e) {
  reduceAmmo();
  updateAmmoProgressBar();
  highlightHit(e);
}

document.addEventListener('click', (event) => {
  if (event.target.className.includes('battleship-cell-playable')) {
    attack(event);
  }
});
