import Gameboard from "./Gameboard";

const Player = () => {
  let turn = false;
  let gameboard;

  let initialization = () => {
    gameboard = new Gameboard();
    gameboard.initializeArray();
  };

  let toggleTurn = () => {
    turn = !turn;
  }

  let getGameboard = () => gameboard;

  let playerAttack = (coordinate, receivingPlayer) => {
    let coordsHitAlready = receivingPlayer.getGameboard().checkIfHitAlready(coordinate);

    if (coordsHitAlready) {
      return "Already hit. Try a different spot.";
    }

    receivingPlayer.getGameboard().receiveAttack(coordinate);
  }

  return {
    playerAttack,
    initialization,
    toggleTurn,
    getGameboard,
  }
};

module.exports = Player;