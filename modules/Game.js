import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";

const Game = (() => {

    let player, computer;
    let stage = "place";
    let turn = "player";
    let horizontal = true;

    let getTurn = () => turn;

    let getShipsToBePlaced = () => shipsToBePlaced;

    let getPlayer = () => player;

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
        player.setName("player");

        // Initialize Opponent
        computer = Player();
        computer.initialization();
        computer.setName("computer");
    }


    // toggle direction of place ship 
    let toggleHorizontal = () => {
        horizontal = !horizontal;
    }

    let toggleTurn = () => {
        if (turn === "player") {
            turn = "computer";
        } else if (turn === "computer") {
            turn = "player";
        }
    }


    // RETURN TRUE = Invalid ship placement; ShipPlacement is near other ships
    // RETURN FALSE = Valid ship placement; ShipPlacement is not near other ships 
    let checkShipPlacementNear = (shipPlacement, user, horizontal) => {
        // console.log(shipPlacement, user, horizontal);
        let nearOther;

        if (horizontal) {
            nearOther = checkHorShipPlacementNear(shipPlacement, user);
        } else if (!horizontal) {
            nearOther = checkVerShipPlacementNear(shipPlacement, user);
        }
        return nearOther;
    }

    let checkHorShipPlacementNear = (shipPlacement, user) => {
        let numShipPlacement = shipPlacement.map((coordinate) => parseInt(coordinate));
        let strShipPlacement = shipPlacement.map((coordinate) => {
            if (parseInt(coordinate) < 10) {
                return '0' + parseInt(coordinate);
            } else {
                return String(coordinate);
            }
        });

        let gameboard = user.getGameboard().getBoard();

        for(let coordIndex = 0; coordIndex < shipPlacement.length; coordIndex++) {
            let row = parseInt(strShipPlacement[coordIndex][0]);
            let rowUp = String(row - 1);
            let rowDown = String(row + 1);
            let col = parseInt(strShipPlacement[coordIndex][1]);
            let colRight = col + 1;
            let colLeft = col - 1;

            let nearbyCoordinates = {
                "left": numShipPlacement[coordIndex] - 2, //  -1 because index starts at 0, -1 to get left coordinate
                "right": numShipPlacement[coordIndex], // -1 because index starts at 0, +1 to get right coordinate
                "up": parseInt(rowUp + col) - 1, // -1 because index starts at 0
                "down": parseInt(rowDown+col) - 1, // -1 because index starts at 0
                "diagonal-left-up": parseInt(rowUp + colLeft) - 1, // -1 because index starts at 0
                "diagonal-left-down": parseInt(rowDown + colLeft) - 1, // -1 because index starts at 0
                "diagonal-right-up": parseInt(rowUp + colRight) - 1, // -1 because index starts at 0
                "diagonal-right-down": parseInt(rowDown + colRight) - 1, // -1 because index starts at 0
            }

            // console.log(row, col);

            if ((coordIndex === 0) && 
            ((gameboard[nearbyCoordinates.left]) || 
            (gameboard[nearbyCoordinates.up]) ||  
            (gameboard[nearbyCoordinates.down]) ||  
            (gameboard[nearbyCoordinates["diagonal-left-down"]]) || 
            (gameboard[nearbyCoordinates["diagonal-left-up"]]))) {
                return true; 
            }
            
            if (((coordIndex > 0) && (coordIndex < shipPlacement.length-1)) && 
            ((gameboard[nearbyCoordinates.up]) || (gameboard[nearbyCoordinates.down]))) {
                return true;
            } 
            
            if ((coordIndex === shipPlacement.length-1) && 
            ((gameboard[nearbyCoordinates.right]) || 
            (gameboard[nearbyCoordinates.up]) || 
            (gameboard[nearbyCoordinates.down]) ||
            (gameboard[nearbyCoordinates["diagonal-right-down"]]) || 
            (gameboard[nearbyCoordinates["diagonal-right-up"]]))) {
                return true;
            }
        }
        return false;
    }
    
    let checkVerShipPlacementNear = (shipPlacement, user) => {

        let numShipPlacement = shipPlacement.map((coordinate) => parseInt(coordinate));
        let strShipPlacement = shipPlacement.map((coordinate) => {
            if (parseInt(coordinate) < 10) {
                return '0' + parseInt(coordinate);
            } else {
                return String(coordinate);
            }
        });
        for(let coordIndex = 0; coordIndex < shipPlacement.length; coordIndex++) {
            let row = parseInt(strShipPlacement[coordIndex][0]);
            let rowUp = String(row - 1);
            let rowDown = String(row + 1);
            let col = parseInt(strShipPlacement[coordIndex][1]);
            let colRight = col + 1;
            let colLeft = col - 1;

            let gameboard = user.getGameboard().getBoard();

            let nearbyCoordinates = {
                "left": numShipPlacement[coordIndex] - 2, //  -1 because index starts at 0, -1 to get left coordinate
                "right": numShipPlacement[coordIndex], // -1 because index starts at 0, +1 to get right coordinate
                "up": parseInt(rowUp + col) - 1, // -1 because index starts at 0
                "down": parseInt(rowDown+col) - 1, // -1 because index starts at 0
                "diagonal-left-up": parseInt(rowUp + colLeft) - 1, // -1 because index starts at 0
                "diagonal-left-down": parseInt(rowDown + colLeft) - 1, // -1 because index starts at 0
                "diagonal-right-up": parseInt(rowUp + colRight) - 1, // -1 because index starts at 0
                "diagonal-right-down": parseInt(rowDown + colRight) - 1, // -1 because index starts at 0
            }

            
            if ((coordIndex === 0) && 
            ((gameboard[nearbyCoordinates.left]) || 
            (gameboard[nearbyCoordinates.right]) ||  
            (gameboard[nearbyCoordinates.up]) ||  
            (gameboard[nearbyCoordinates["diagonal-left-up"]]) || 
            (gameboard[nearbyCoordinates["diagonal-right-up"]]))) {
                return true; 
            }
            
            if (((coordIndex > 0) && (coordIndex < shipPlacement.length-1)) && 
            ((gameboard[nearbyCoordinates.left]) || (gameboard[nearbyCoordinates.right]))) {
                return true;
            } 
            
            if ((coordIndex === shipPlacement.length-1) && 
            ((gameboard[nearbyCoordinates.right]) || 
            (gameboard[nearbyCoordinates.left]) || 
            (gameboard[nearbyCoordinates.down]) ||
            (gameboard[nearbyCoordinates["diagonal-left-down"]]) || 
            (gameboard[nearbyCoordinates["diagonal-right-down"]]))) {
                return true;
            }
        }
    }


    // IN GENERAL FUNCTION THAT SHOWS IF YOU CAN PLACE DOWN SHIP:
        // TRUE if YES can place down ship
        // FALSE if CAN't place down ship
    let checkIfCanPlaceDownShip = (shipPlacement, user, horizontal) => {

        // EXTENSION: Can't place ships near other ships
        if (checkShipPlacementNear(shipPlacement, user, horizontal)) {
            console.log("1")
            return;
        }

        // Condition: Placement cannot be already occupied
        if (user.getGameboard().checkIfCoordinatesOccupied(shipPlacement)) {
            console.log("2")

            return;
        }

        // Condition: PLAYER Placement cannot be off the board
        if (user.getName() === "player" && shipPlacement.length !== (shipsToBePlaced[0].size)) {
            console.log("3")

            return;
        }

        // Condition: COMPUTER Placement cannot be off the board
        if (user.getName() === "computer" && shipPlacement.length !== (computerShipsToBePlaced[0].size)) {
            console.log("4")

            return;
        }

        // If conditions pass 
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

    
    // Generate PLAYER ship placement
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
        let result = computer.getGameboard().checkIfHitAlready(coordinate);

        // IF TILE HAS NOT BEEN ATTACKED ALREADY
        if (!result) {
            computer.getGameboard().receiveAttack(coordinate);

            turn="computer"; // CHANGE THIS LATER
        }

        if(turn === "computer") {
            computerAttack();
        }
    }
    

    let computerAttack = () => {
        processingComputerAttack = true;
        let randomCoordinate = Math.floor(Math.random()*100)+1;
        let result = player.getGameboard().checkIfHitAlready(randomCoordinate);

        // regenerate coordinate if coordinate already hit
        while(result) {
            randomCoordinate = Math.floor(Math.random()*100) + 1;
            result = player.getGameboard().checkIfHitAlready(randomCoordinate);
        }

        player.getGameboard().receiveAttack(randomCoordinate);
        processingComputerAttack = false;
        turn = "player";    
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


            if (checkIfCanPlaceDownShip(shipPlacement, computer, direction)) {
                break; // breaks out of while loop IF can place down ship
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

            console.log("Computer Ship Placement: ", shipPlacement)

            for(let coords of shipPlacement) {
                computer.getGameboard().placeShip(parseInt(coords), shipObj);
            }
        }
        
        console.log("Player: ");
        console.log(player.getGameboard().getBoard());
        console.log("Computer: ");
        computer.getGameboard().printBoard();
        console.log(computer.getGameboard().getBoard());
    }

    return {
        getPlayer,
        playerGenerateCoordinates,
        playerAttack,
        getTurn,
        toggleTurn,
        toggleHorizontal,
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