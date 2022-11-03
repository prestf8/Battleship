import Ship from "./ShipFactory.js";

const Gameboard = () => {
    let board = [];

    let getBoard = () => {
        return board;
    }

    let initializeArray = () => {
        for(let i=0; i < 100; i++) {
            board[i] = null;
        }
    }

    let placeShip = (coordinate, ship) => {
        board[coordinate] = ship;
        ship.setLocation(coordinate);
    }

    let receiveAttack = (coordinate) => {
        if (board[coordinate]) {
            // sends hit function to the correct ship
            board[coordinate].incrementHits();
            board[coordinate] = "HIT";
            return;
        }

        board[i] = "MISS";
    }

    return {
        getBoard,
        initializeArray,
        placeShip,
        receiveAttack,
    }   

}

module.exports = Gameboard;