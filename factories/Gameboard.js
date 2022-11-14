import Ship from "./ShipFactory.js";

const Gameboard = () => {
  let board = [];
  let remainingShips = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  let getBoard = () => {
    return board;
  };

  let getRemainingShips = () => remainingShips;

  let initializeArray = () => {
    for (let i = 0; i < 100; i++) {
      board[i] = null;
    } 
  };

  let checkIfOccupied = (coordinate) => {
    if (board[coordinate]) {
      return true;
    }
    return false;
  }

  let checkIfHitAlready = (coordinate) => {
    if (board[coordinate] == "HIT" || board[coordinate] == "MISS") {
      return true;
    }
    return false;
  }

  let placeShip = (coordinate, ship) => {
    board[coordinate] = ship;
    ship.setLocation(coordinate);
  };

  let removeShip = (ship) => {
    let index = remainingShips.indexOf(ship.getType());
    remainingShips.splice(index, 1);
  };

  let receiveAttack = (coordinate) => {
    if (board[coordinate]) {
      let targetedShip = board[coordinate];

      // sends hit function to the correct ship
      targetedShip.incrementHits();

      board[coordinate] = "HIT";

      if (targetedShip.isSunk()) {
        removeShip(targetedShip);
      }
      return;
    }

    board[coordinate] = "MISS";
  };

  let isAllSunk = () => remainingShips.length === 0;

  return {
    checkIfOccupied,
    getBoard,
    initializeArray,
    placeShip,
    receiveAttack,
    getRemainingShips,
    isAllSunk,
    checkIfHitAlready,
  };
};

export default Gameboard;
