import boatsState from '../state/boatsState';

export default function shipsBuilder(...shipsLengths) {
  shipsLengths.forEach((shipLength) => {
    boatsState.push({
      boatLength: shipLength,
      livesCount: shipLength,
      id: Math.floor(Math.random() * 101),
    });
  });
}
