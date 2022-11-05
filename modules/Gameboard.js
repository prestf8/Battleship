import Ship from "./ShipFactory.js";

const Gameboard = () => {
    let board = [];
    let remainingShips = ["Carrier", "Battleship", "Destroyer", "Submarine", "Patrol Boat"]

    let getBoard = () => {
        return board;
    }

    let getRemainingShips = () => remainingShips;

    let initializeArray = () => {
        for(let i=0; i < 100; i++) {
            board[i] = null;
        }
    }

    let placeShip = (coordinate, ship) => {
        board[coordinate] = ship;
        ship.setLocation(coordinate);
    }

    let removeShip = (ship) => {
        let index = remainingShips.indexOf(ship.getType());
        remainingShips.splice(index, 1);
    }

    let receiveAttack = (coordinate) => {
        if (board[coordinate]) {
            let targetedShip = board[coordinate];

            // sends hit function to the correct ship
            targetedShip.incrementHits();
            
            // // loop through the ships coordinates to see if it has been sunken
            // for(let i of board[coordinate].getCoordinates()) 

            board[coordinate] = "HIT";

            if (targetedShip.isSunk()) {
                removeShip(targetedShip);
            }
            return;
        }

        board[coordinate] = "MISS";
    }

    return {
        getBoard,
        initializeArray,
        placeShip,
        receiveAttack,
        getRemainingShips,
    }   

}

module.exports = Gameboard;