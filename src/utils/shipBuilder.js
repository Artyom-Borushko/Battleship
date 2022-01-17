export default function shipBuilder(lengthOfShip) {
  return ({
    boatLength: lengthOfShip,
    livesCount: lengthOfShip,
    id: Math.floor(Math.random() * 101),
  });
}
