import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";

const Game = (() => {

    let player, computer;
    let stage = "place";
    let turn = "player";
    let horizontal = true;

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

    let getHorizontal = () => horizontal;


    // toggle direction of place ship 
    let toggleHorizontal = () => {
            horizontal = !horizontal;
    }

    
    let getShipsToBePlaced = () => shipsToBePlaced;

    let getTurn = () => turn;

    let toggleTurn = () => {
        if (turn === "player") {
            turn = "computer";
        } else if (turn === "computer") {
            turn = "player";
        }
    }


    let checkIfCanPlaceDownShip = (shipPlacement) => {
        // Condition: Placement cannot be already occupied
        for(let placement of shipPlacement) {
            if (player.getGameboard().checkIfOccupied(parseInt(placement))) {
                return;
            }
        }

        // Condition: Placement cannot be off the board
        if (shipPlacement.length !== (shipsToBePlaced[0].size)) {
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
            Game.computerPlaceStage(); // Autogenerate COMPUTER placing ship
            stage = "combat";
            beginCombatStage();
            return;
        }

        // Alter place ship label 
        DOM.setPlaceShipLabel(shipsToBePlaced[0].name);

    }

    let beginCombatStage = () => {
        DOM.beginCombatStage(); // Setup DOM initialization for the combat stage
    }

    
    // IN THE WORKS (COMBINED getShipPlacementH AND getShipPlacementV)
    let playerGenerateCoordinates = (boardUnit) => {
        let generatedCoords = [];
        let placeShipLength = (getShipsToBePlaced()[0]).size; // Length of current ship to place 
        let baseCoordinate = boardUnit.getAttribute("data-coordinate");
        let tensDigit = baseCoordinate[0];
        let onesDigit = baseCoordinate[1];
        let correspondingTens = parseInt(tensDigit + '9') + 1; // 10, 20..., 100 can be on the same rows as 08, 19, 95, respectively...
        
        // MODULUS % 10 == 0
        if (parseInt(baseCoordinate) % 10 === 0 && horizontal) {
            return [parseInt(baseCoordinate)];
        }

        for(let i=0; i < placeShipLength; i++) {
            let generatedCoordinate = horizontal ?  (parseInt(baseCoordinate) + i) : (parseInt((parseInt(tensDigit) + i) + onesDigit));

            // FOR COORD EQUAL or UNDER 10 and HORIZONTAL PLACEMENT
            if (parseInt(baseCoordinate) <= 10 && horizontal) {
                for(let i=0; i < placeShipLength; i++) {
                    // placement must be on the same row
                    if (parseInt(baseCoordinate)+i < 10) { // for generated coordinates under 10
                        generatedCoords.push('0'+(parseInt(baseCoordinate)+i));
                    } else if (parseInt(baseCoordinate)+i == 10) { // for generated coordinate 10
                        generatedCoords.push(parseInt(baseCoordinate)+i);
                    }
                }
                return generatedCoords;
            }


            if (generatedCoordinate <= 100 && !horizontal) { // FOR VERTICAL 
                if (generatedCoordinate < 10) {
                    generatedCoordinate = '0' + generatedCoordinate;
                }
                generatedCoords.push(generatedCoordinate);
            } else if ((generatedCoordinate <= 100) && (horizontal) && ((String(generatedCoordinate)[0] == tensDigit) || (generatedCoordinate === correspondingTens))) {
                generatedCoords.push(generatedCoordinate);
            }
        }
        return generatedCoords;
    }

    let playerAttack = (boardUnit) => {
        let coordinate = parseInt(boardUnit.getAttribute("data-coordinate"));
        computer.getGameboard().receiveAttack(coordinate);
        
        let result = computer.getGameboard().checkIfHitAlready(coordinate);
        console.log(result);
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

            // console.log(shipPlacement);

            for(let coords of shipPlacement) {
                computer.getGameboard().placeShip(parseInt(coords), shipObj);
            }

            
        }
        
        console.log("Player: ")
        player.getGameboard().printBoard();
        console.log(player.getGameboard().getBoard());
        console.log("Computer: ");
        computer.getGameboard().printBoard();
        console.log(computer.getGameboard().getBoard());
    }

    return {
        playerGenerateCoordinates,
        playerAttack,
        getTurn,
        toggleTurn,
        getShipsToBePlaced,
        beginCombatStage,
        computerPlaceStage,
        placeDownShip,
        initialization,
        checkIfCanPlaceDownShip
    }

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM