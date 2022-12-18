import DOM from "../modules/DOM.js";
import Game from "../modules/Game.js";
import Ship from "./ShipFactory.js";

const Gameboard = () => {
  let name;
  let board = [];
  let remainingShips = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  let getName = () => name;

  let getBoard = () => {
    return board;
  };

  let getRemainingShips = () => remainingShips;

  let initialization = (playerName) => {
    for (let i = 0; i < 100; i++) {
      board[i] = null;
    } 
    name = playerName;
  };

  let checkIfOccupied = (coordinate) => {
    if (board[coordinate-1]) {
      return true;
    }
    return false;
  }


  // plural version of the function above
  let checkIfCoordinatesOccupied = (shipPlacement) => {
    for(let coords of shipPlacement) {
      if (board[parseInt(coords)-1]) {
        return true;
      }
    }

    return false; 
  }

  // CLEANED
  let checkIfHitAlready = (coordinate) => {
    if (board[coordinate-1] == "HIT" || board[coordinate-1] == "MISS") {
      return true; // YES IT HAS ALREADY BEEN HIT 
    }
    return false;
  }

  let placeShip = (shipPlacement, ship) => {
    for(let coords of shipPlacement) {
      board[parseInt(coords)-1] = ship;
      ship.setCoordinates(shipPlacement);
    }
  };

  let removeShip = (ship) => {
    let index = remainingShips.indexOf(ship.getType());
    remainingShips.splice(index, 1);
  };

  function receiveAttack(coordinate) {
    // Runs IF SHIP OBJECT and NOT hit already 
    if (board[coordinate-1] && board[coordinate-1] != "MISS" && board[coordinate-1] != "HIT") {
      let targetedShip = board[coordinate-1];

      // sends hit function to the correct ship
      targetedShip.incrementHits();


      DOM.attackShip(coordinate);

      board[coordinate-1] = "HIT";


      // Remove ship from array   
      if (targetedShip.isSunk()) {
        removeShip(targetedShip);
        Game.hitAround(targetedShip.getCoordinates(), name);
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
  }

  return {
    getName,
    getBoard,
    getRemainingShips,
    initialization,
    printBoard,
    checkIfOccupied,
    checkIfCoordinatesOccupied,
    placeShip,
    receiveAttack,
    isAllSunk,
    checkIfHitAlready,
  };
};

export default Gameboard;
