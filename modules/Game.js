import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";

const Game = (() => {

    let player, computer;
    let stage = "place";

    let shipsToBePlaced = [
        {
            name: "Carrier",
            size: 5,
        },
        {
            name: "Battleship",
            size: 4,
        },
        {
            name: "Destroyer",
            size: 3,
        },
        {
            name: "Submarine",
            size: 3,
        },
        {
            name: "Patrol Boat",
            size: 2,
        }
    ];

    let computerShipsToBePlaced = [
        {
            name: "Carrier",
            size: 5,
        },
        {
            name: "Battleship",
            size: 4,
        },
        {
            name: "Destroyer",
            size: 3,
        },
        {
            name: "Submarine",
            size: 3,
        },
        {
            name: "Patrol Boat",
            size: 2,
        }
    ];

    let initialization = () => {
        // Initialize DOM
        DOM.initialization();

        // Initialize Player
        player = Player();
        player.initialization();

        // Initialize Opponent
        computer = Player();
        computer.initialization();
    }


    let checkIfCanPlaceDownShip = (shipPlacement) => {
        // Condition: Placement cannot be already occupied
        for(let placement of shipPlacement) {
            if (player.getGameboard().checkIfOccupied(parseInt(placement))) {
                return;
            }
        }

        // Condition: Placement cannot be off the board
        if (shipPlacement.length !== DOM.getPlaceShipLength()) {
            return;
        }

        // If these two conditions pass then you can place down ship
        return true;
    }
    
    let placeDownShip = (shipPlacement) => {
        
        // Can't place down ship if stage is over
        if (stage !== "place") {
            return;
        }
        
        // Current Ship (to be placed down)
        let currentShipData = shipsToBePlaced.shift();
        let playerGameboard = player.getGameboard();

        // ship object to be placed
        let shipToBePlaced = Ship(currentShipData.name, currentShipData.size);

        // Place down ship onto corresponding gameboard
        for(let coords of shipPlacement) {
            playerGameboard.placeShip(parseInt(coords), shipToBePlaced);
        }
        
        // If no more ships to place down, begin next stage
        if (shipsToBePlaced.length == 0) {
            stage = "combat";
            DOM.beginCombatStage();
            return;
        }

        // Alter place ship label and change length of the next ship to be placed
        DOM.setPlaceShipLabel(shipsToBePlaced[0].name);
        DOM.setPlaceShipLength(shipsToBePlaced[0].size);

    }

    let beginGameCombatStage = () => {
        player.getGameboard().

    }


    // COMPUTER STUFF

    let computerGenerateCoordinates = (ship) => {
        let shipPlacement = [];
        while(true) {
            let direction = Math.floor(Math.random() * 2); // random 0 or 1
            let randomCoordinate = Math.floor(Math.random() * 100) + 1; // Random 1-100;

            if (randomCoordinate < 10) {
                randomCoordinate = '0' + randomCoordinate;                
            }


            if (direction) { // "1" is Vertical
                for(let i=0; i < ship.size; i++) {
                    let onesDigit = randomCoordinate % 10;
                    let coordinate = String(parseInt(String(randomCoordinate)[0]) + i) + onesDigit;
                    
                    if (parseInt(coordinate) < 100) { 
                        shipPlacement.push(parseInt(coordinate));
                    }
                }
            } else { // Direction is "0" which is Horizontal
                for(let i=0; i < ship.size; i++) {

                    let coordinate;

                    if (typeof randomCoordinate === "string") { // only string values are those less than 10
                        coordinate = parseInt(randomCoordinate) + i;    
                    } else {
                        coordinate = randomCoordinate + i;
                    }

                    let coordRow = parseInt(String(randomCoordinate)[0]);

                    

                    if (parseInt(coordinate) < 100 && parseInt(String(coordinate)[0]) == coordRow) {
                        shipPlacement.push(coordinate);
                    }
                }
            }

            if (shipPlacement.length == ship.size) {
                break; // hopefully breaks out of while loop;
            }

            shipPlacement = [];
        }
        return shipPlacement;
    } 

    // PLACE DOWN STAGE FOR COMPUTER
    let computerPlaceStage = () => {
        for(let ship of computerShipsToBePlaced) {
            let computerShip = Ship(ship.name, ship.size);
            let shipPlacement = computerGenerateCoordinates(ship);
            let cantPlace = computer.getGameboard().checkIfCoordinatesOccupied(shipPlacement);

            while(cantPlace) {
                shipPlacement = computerGenerateCoordinates(ship);
                cantPlace = computer.getGameboard().checkIfCoordinatesOccupied(shipPlacement);
            }

            console.log(shipPlacement);

            for(let coords of shipPlacement) {
                computer.getGameboard().placeShip(parseInt(coords), computerShip);
            }

        }

        // NOW CHECK TO SEE IF COORDINATE HAS A SHIP ALREADY
        // CHANGE FUNCTION NAME AND CALL THIS FUNCTION IN A COMPUTER INITIALIZATION


        // for every ship: 
            // randomize ship orientation placement
            // randomize and select board unit
            // check to see if, current ship can fit on board and hasn't been placed, check both directions
            // if can be placed then put it in computer object's data
            

            computer.getGameboard().printBoard();
    }

    return {
        beginGameCombatStage,
        computerPlaceStage,
        placeDownShip,
        initialization,
        checkIfCanPlaceDownShip
    }

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM