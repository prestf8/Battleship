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
    }


    // COMPUTER STUFF

    let computerGenerateCoordinates = (ship) => {
        let shipPlacement = [];
        while(true) {
            let direction = Math.floor(Math.random() * 2); // random selection 0 (horizontal) or 1 (vertical)
            let randomOneToHundred = Math.floor(Math.random()*100) + 1; // Random Number from 1-100
            let randomCoordinate = (randomOneToHundred < 10) ? ('0' + randomOneToHundred) : String(randomOneToHundred); // Coordinate (STRING)
            let tensDigit = randomCoordinate[0]; 
            let onesDigit = randomCoordinate[1];
            let correspondingTens = parseInt(tensDigit + '9') + 1; // 10, 20..., 100 can be on the same rows as 08, 19, 95, respectively...

            for(let i=0; i < ship.size; i++) {
                let coordinate = direction ? parseInt((parseInt(tensDigit) + i) + onesDigit) : parseInt(randomCoordinate) + i;

                // 01-10
                // 11-20
                // ...
                // 91-100



                if (coordinate <= 100 && direction) { // FOR VERTICAL 
                    shipPlacement.push(coordinate);
                } else if ((coordinate <= 100) && (!direction) && ((String(coordinate)[0] == tensDigit) || (coordinate === correspondingTens))) {
                    shipPlacement.push(coordinate);
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
            let shipObj = Ship(ship.name, ship.size);
            let shipPlacement = computerGenerateCoordinates(ship);
            let cantPlace = computer.getGameboard().checkIfCoordinatesOccupied(shipPlacement);

            while(cantPlace) {
                shipPlacement = computerGenerateCoordinates(ship);
                cantPlace = computer.getGameboard().checkIfCoordinatesOccupied(shipPlacement);
            }

            console.log(shipPlacement);

            for(let coords of shipPlacement) {
                computer.getGameboard().placeShip(parseInt(coords), shipObj);
            }

        }

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