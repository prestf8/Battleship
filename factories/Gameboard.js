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
      return true;
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
    if (board[coordinate-1]) {
      let targetedShip = board[coordinate-1];

      // sends hit function to the correct ship
      targetedShip.incrementHits();

      board[coordinate-1] = "HIT";

      if (targetedShip.isSunk()) {
        removeShip(targetedShip);
      }
      return;
    }

    board[coordinate-1] = "MISS";
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
