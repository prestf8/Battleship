import Gameboard from "./Gameboard";

const Player = () => {
  let turn = false;

  let initialization = () => {
    let gameboard = new Gameboard();
    gameboard.initializeArray();
  };

  let toggleTurn = () => {
    turn = !turn;
  }

  return {
    initialization,
    toggleTurn,
  }
};
