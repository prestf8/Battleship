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

  let playerAttack = (coordinate, receivingPlayer) => {
    
    
  }

  return {
    initialization,
    toggleTurn,
  }
};
