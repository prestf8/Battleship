import DOM from "../modules/DOM.js";
import Game from "../modules/Game.js";
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

  // plural version of the function above
  let checkIfCoordinatesOccupied = (shipPlacement) => {
    for(let coords of shipPlacement) {
      coords = parseInt(coords);

      if (board[coords-1]) {
        return true;
      }
    }

    return false; 
  }

  let checkIfHitAlready = (coordinate) => {
    if (board[coordinate-1] == "HIT" || board[coordinate-1] == "MISS") {
      console.log(board[coordinate-1]);
      return true; // YES IT HAS ALREADY BEEN HIT 
    }
    return false;
  }

  let placeShip = (coordinate, ship) => {
    board[coordinate-1] = ship;
    ship.setLocation(coordinate);
  };

  let removeShip = (ship) => {
    let index = remainingShips.indexOf(ship.getType());
    remainingShips.splice(index, 1);
  };

  let receiveAttack = (coordinate) => {
    // console.log(board);
    // "MISS", "HIT", "Ship object"

    // For those that are Ship objects, coordinates cannot be repeatedly attacked
    if (board[coordinate-1] && board[coordinate-1] != "MISS" && board[coordinate-1] != "HIT") {
      let targetedShip = board[coordinate-1];

      // sends hit function to the correct ship
      targetedShip.incrementHits();

      DOM.attackShip(coordinate);

      board[coordinate-1] = "HIT";


      if (targetedShip.isSunk()) {
        removeShip(targetedShip);
      }
      return;
    }

    // For those that don't have a ship and haven't been attacked yet
    if (!board[coordinate-1]) {
      DOM.attackNothing(coordinate);
      board[coordinate-1] = "MISS";
    }
  };

  let isAllSunk = () => remainingShips.length === 0;

  let printBoard = () => {
    let result = '';
    for(let i=0; i < 10; i++) {
      let row = '';
      for(let j=0; j < 10; j++) {
        if (board[i*10+j]) {
          let ship = board[i*10+j];
          let shipType = ship.getType();
          if (shipType == "Carrier") {
            row += ' | ' + 'C';
          } else if (shipType == "Battleship") {
            row += ' | ' + 'B';
          } else if (shipType == "Destroyer") {
            row += ' | ' + 'D';
          } else if (shipType == "Submarine") {
            row += ' | ' + 'S';
          } else if (shipType == "Patrol Boat") {
            row += ' | ' + 'P';
          }


        } else {
          row += ' | ' + 'N';
        }
        // board[]
      }
      row += '\n';  
      result += row;
    }
    console.log(result);
    // for(let coords of board) {
      // console.log(coords);
    // }
  }

  return {
    printBoard,
    checkIfOccupied,
    checkIfCoordinatesOccupied,
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
