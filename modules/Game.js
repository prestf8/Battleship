import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";
import Gameboard from "../factories/Gameboard.js";

const Game = (() => {

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

    let player, computer;
    let stage = "place";
    let turn = "player";
    let horizontal = true;
    let processingComputerAttack;

    let getTurn = () => turn;

    let getShipsToBePlaced = () => shipsToBePlaced;

    let getPlayer = () => player;

    let getHorizontal = () => horizontal;

    let initialization = () => {
        // Initialize DOM
        DOM.initialization();

        // Initialize Player
        player = Player();
        player.setName("player");
        player.initialization();

        // Initialize Opponent
        computer = Player();
        computer.setName("computer");
        computer.initialization();
    }

    let beginPlaceDownStage = () => {
        DOM.beginPlaceDownStage();
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
    // CLEANED
    let checkShipPlacementNear = (shipPlacement, user, horizontal) => {
        let nearOther;

        if (horizontal) {
            nearOther = checkHorShipPlacementNear(shipPlacement, user);
        } else if (!horizontal) {
            nearOther = checkVerShipPlacementNear(shipPlacement, user);
        }
        return nearOther;
    }

    // CLEANED
    let checkHorShipPlacementNear = (shipPlacement, user) => {
        let numShipPlacement = shipPlacement.map((coordinate) => parseInt(coordinate));
        let gameboard = user.getGameboard();

        for(let coordIndex = 0; coordIndex < shipPlacement.length; coordIndex++) {
            let rowUp = String(parseInt(shipPlacement[coordIndex][0]) - 1);
            let rowDown = String(parseInt(shipPlacement[coordIndex][0]) + 1);
            let colRight = String(parseInt(shipPlacement[coordIndex][1]) + 1);
            let colLeft = String(parseInt(shipPlacement[coordIndex][1]) - 1);

            let nearbyCoordinates = {
                "left": numShipPlacement[coordIndex] - 1, 
                "right": numShipPlacement[coordIndex] + 1,
                "up": parseInt(rowUp + shipPlacement[coordIndex][1]), 
                "down": parseInt(rowDown + shipPlacement[coordIndex][1]), 
                "diagonal-left-up": parseInt(rowUp + colLeft),
                "diagonal-left-down": parseInt(rowDown + colLeft),
                "diagonal-right-up": parseInt(rowUp + colRight), 
                "diagonal-right-down": parseInt(rowDown + colRight), 
            }

            if ((coordIndex === 0) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.left)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.up)) ||  
            (gameboard.checkIfOccupied(nearbyCoordinates.down)) ||  
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-left-down"])) || 
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-left-up"])))) {
                return true; 
            }
            
            if (((coordIndex > 0) && (coordIndex < shipPlacement.length-1)) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.up)) || (gameboard.checkIfOccupied(nearbyCoordinates.down)))) {
                return true;
            } 
            
            if ((coordIndex === shipPlacement.length-1) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.right)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.up)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.down)) ||
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-right-down"])) || 
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-right-up"])))) {
                return true;
            }
        }
        return false;
    }
    
    // CLEANED
    let checkVerShipPlacementNear = (shipPlacement, user) => {

        let numShipPlacement = shipPlacement.map((coordinate) => parseInt(coordinate));
        let gameboard = user.getGameboard();

        for(let coordIndex = 0; coordIndex < shipPlacement.length; coordIndex++) {
            let rowUp = String(parseInt(shipPlacement[coordIndex][0]) - 1);
            let rowDown = String(parseInt(shipPlacement[coordIndex][0]) + 1);
            let colRight = String(parseInt(shipPlacement[coordIndex][1]) + 1);
            let colLeft = String(parseInt(shipPlacement[coordIndex][1]) - 1);

            let nearbyCoordinates = {
                "left": numShipPlacement[coordIndex] - 1, 
                "right": numShipPlacement[coordIndex] + 1,
                "up": parseInt(rowUp + shipPlacement[coordIndex][1]), 
                "down": parseInt(rowDown + shipPlacement[coordIndex][1]), 
                "diagonal-left-up": parseInt(rowUp + colLeft),
                "diagonal-left-down": parseInt(rowDown + colLeft),
                "diagonal-right-up": parseInt(rowUp + colRight), 
                "diagonal-right-down": parseInt(rowDown + colRight), 
            }

            
            if ((coordIndex === 0) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.left)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.right)) ||  
            (gameboard.checkIfOccupied(nearbyCoordinates.up)) ||  
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-left-up"])) || 
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-right-up"])))) {
                return true; 
            }
            
            if (((coordIndex > 0) && (coordIndex < shipPlacement.length-1)) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.left)) || (gameboard.checkIfOccupied(nearbyCoordinates.right)))) {
                return true;
            } 
            
            if ((coordIndex === shipPlacement.length-1) && 
            ((gameboard.checkIfOccupied(nearbyCoordinates.right)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.left)) || 
            (gameboard.checkIfOccupied(nearbyCoordinates.down)) ||
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-left-down"])) || 
            (gameboard.checkIfOccupied(nearbyCoordinates["diagonal-right-down"])))) {
                return true;
            }
        }
        return false;
    }


    // IN GENERAL FUNCTION THAT SHOWS IF YOU CAN PLACE DOWN SHIP:
        // TRUE if YES can place down ship
        // FALSE if CAN't place down ship
    // CLEANED
    let checkIfCanPlaceDownShip = (shipPlacement, user, horizontal) => {

        let username = user.getName();

        if (username === "player" && shipPlacement.length !== (shipsToBePlaced[0].size)) {
            return;
        }

        if (username === "computer" && shipPlacement.length !== (computerShipsToBePlaced[0].size)) {

            return;
        }

        // EXTENSION: Can't place ships near other ships
        if (checkShipPlacementNear(shipPlacement, user, horizontal)) {
            return;
        }


        // Condition: Placement cannot be already occupied
        if (user.getGameboard().checkIfCoordinatesOccupied(shipPlacement)) {
            return;
        }

        // If conditions pass 
        return true;
    }
    
    let playerPlaceShip = (shipPlacement) => {
        // // Can't place down ship if stage is over
        // if (stage !== "place") {
        //     return;
        // }
        
        // Current Ship (to be placed down)
        let currentShipData = shipsToBePlaced.shift();
        let playerGameboard = player.getGameboard();
        let ship = Ship(currentShipData.name, currentShipData.size);

        // Place down ship onto corresponding gameboard
        playerGameboard.placeShip(shipPlacement, ship);

        
        // If no more ships to place down, begin next stage
        if (shipsToBePlaced.length == 0) {
            stage = "combat";
            beginCombatStage();
            Game.computerPlaceStage(); // Autogenerate COMPUTER placing ship
        }

        // filter for now
        if (stage == "place") {
            // Alter place ship label 
            DOM.setPlaceShipLabel(shipsToBePlaced[0].name);
        }

    }

    let beginCombatStage = () => {
        DOM.beginCombatStage(); // Setup DOM initialization for the combat stage
    }



    let attackForComputer = (boardUnit) => {
        let coordinate = parseInt(boardUnit.getAttribute("data-coordinate"));
        let gameboard = computer.getGameboard();
        
        let result = gameboard.checkIfHitAlready(coordinate); // TRUE = already hit, FALSE = not hit

        // IF TILE HAS NOT BEEN ATTACKED ALREADY
        if (!result) {
            gameboard.receiveAttack(coordinate);

            turn="computer"; 
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


    // Generate PLAYER ship placement
    // INPUT: DOM board unit
    // OUTPUT: Array of ship coordinates in string
    // CLEANED
    let playerGenerateCoordinates = (boardUnit) => {
        let generatedCoords = [];
        let shipSize = (shipsToBePlaced[0]).size; // Length of current ship to place 

        let coordData = {
            baseCoordinate: parseInt(boardUnit.getAttribute("data-coordinate")), // base coordinate is now in numerical form
            onesDigit: parseInt(boardUnit.getAttribute("data-coordinate")[1]),
            tensDigit: parseInt(boardUnit.getAttribute("data-coordinate")[0]),
            correspondingTens: parseInt(parseInt(boardUnit.getAttribute("data-coordinate")[0]) + '9') + 1,
        }

        // FOR hovered/clicked coordinates that are 10, 20, 30, 40, 50...
        if (coordData.baseCoordinate % 10 === 0 && horizontal) {
            return [String(coordData.baseCoordinate)];
        }

        // FOR coordinate 100 REGARDless of direction of ship Placement;
        if (coordData.baseCoordinate === 100) {
            return [String(coordData.baseCoordinate)];
        }

        // FOR hovered/click coordinates that are less than 10, and HORIZONTAL placement
        if (coordData.baseCoordinate < 10 && horizontal) {
            for(let j=0; j < shipSize; j++) {
                let generatedCoordinate = coordData.baseCoordinate + j;

                if (generatedCoordinate < 10) {
                    generatedCoordinate = '0' + generatedCoordinate;
                }

                // number has to be within the grid (less than or equal to 10) to be considered a valid generated coordinate
                if (parseInt(generatedCoordinate) <= 10) {
                    generatedCoords.push(String(generatedCoordinate));
                }
            }

            return generatedCoords;
        }

        for(let i=0; i < shipSize; i++) {
            let generatedCoordinate = horizontal ?  (parseInt(coordData.baseCoordinate) + i) : (String(coordData.tensDigit + i) + coordData.onesDigit);


            if (!horizontal && generatedCoordinate <= 100) { // FOR VERTICAL 
                generatedCoords.push(String(generatedCoordinate));

            } else if ((horizontal) && (generatedCoordinate <= 100) && ((String(generatedCoordinate)[0] == coordData.tensDigit) || (generatedCoordinate === coordData.correspondingTens))) {
                generatedCoords.push(String(generatedCoordinate));
            }
        }
        return generatedCoords;
    }

    // COMPUTER STUFF
    let computerGenerateCoordinates = (shipSize) => {
        let shipPlacement = [];
        while(true) {
            let randomNumber100 = String(Math.floor(Math.random()*100) + 1);  // base coordinate is now in numerical form
            // let randomNumber2 = Math.floor(Math.random() * 2);
            if (parseInt(randomNumber100) < 10) {
                randomNumber100 = '0' + randomNumber100;
            }

            let coordData = {
                baseCoordinate: randomNumber100,
                tensDigit: randomNumber100[0],
                correspondingTens: String(parseInt(randomNumber100[0] + '9') + 1),
            }


            if (coordData.baseCoordinate == '100') {
                continue;
            }
            
            for(let i=0; i < shipSize; i++) {
                let coordinate = String(parseInt(coordData.baseCoordinate) + i);
        
                // 01-10
                // 11-20
                // ...
                // 91-100

                // if (!coordData.horizontal && coordinate <= 100) { // FOR VERTICAL 
                //     shipPlacement.push(coordinate < 10 ? '0' + coordinate : String(coordinate));

                console.log(coordData.correspondingTens);
                
                if ((parseInt(coordinate) <= 100) && ((coordinate)[0] == coordData.tensDigit && (coordinate)[1] != '0') || (coordinate == coordData.correspondingTens)) {
                    shipPlacement.push(coordinate < 10 ? '0' + coordinate : String(coordinate));
                }
            }


            if (checkIfCanPlaceDownShip(shipPlacement, computer, true)) {
                break; // breaks out of while loop IF can place down ship
            } else {
                shipPlacement = [];
                continue;
            }

        }
        return shipPlacement;
    } 

    // PLACE DOWN STAGE FOR COMPUTER
    let computerPlaceStage = () => {

        while(computerShipsToBePlaced.length > 0) {
            let ship = Ship(computerShipsToBePlaced[0].name, computerShipsToBePlaced[0].size);
            let shipPlacement = computerGenerateCoordinates(computerShipsToBePlaced[0].size);

            console.log("Computer Ship Placement: ", shipPlacement)

            computer.getGameboard().placeShip(shipPlacement, ship);
            computerShipsToBePlaced.shift();
        }
        
        // console.log("Player: ");
        // console.log(player.getGameboard().getBoard());
        console.log("Computer: ");
        computer.getGameboard().printBoard();
    }

    let hitAround = (shipPlacement, nameOfPlayer) => {
        let horizontal = parseInt(shipPlacement[1]) == parseInt(shipPlacement[0]) + 1 ? true : false;
        
        let surroundingCoordinates = getSurroundingCoordinates(shipPlacement, horizontal);

        // surrounding shipplacement
        console.log("Sunk surrounding coordinates: " + nameOfPlayer + " " + surroundingCoordinates);
    } 

    // 58, 59, 60 => 48 49 50

    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 0

    let getSurroundingCoordinates = (shipPlacement, horizontal) => {
        let originalPlacement = shipPlacement;
        shipPlacement = [];
        
        if (horizontal) {
            
            // UP
            if (originalPlacement[0][0] != '0') {
                let uppArr = originalPlacement.map((element) => {
                    return String(parseInt(element[0]) - 1) + String(element[1]);
                })

                shipPlacement.push(...uppArr);

                if (uppArr[0][1] != '1') {
                    let element = String(uppArr[0][0]) + String(parseInt(uppArr[0][1])-1); 
                    shipPlacement.push(element)
                }
                // 59
                if (uppArr[uppArr.length-1][1] != '0') {
                    // c

                    let tens = String(uppArr[uppArr.length-1][0]);
                    let ones = String(parseInt(uppArr[uppArr.length-1][1]) + 1);

                    if (parseInt(ones) % 10 == 0) {
                        ones = "0";
                        tens = String(parseInt(tens) + 1);
                    }
                    shipPlacement.push(tens + ones);
                }
            }
            

            if (originalPlacement[0][0] != '9') {
                let downArr = originalPlacement.map((element) => {
                    return String(parseInt(element[0]) + 1) + String(element[1]);
                })

                shipPlacement.push(...downArr);

                if (downArr[0][1] != '1') {
                    let element = String(downArr[0][0]) + String(parseInt(downArr[0][1])-1); 
                    shipPlacement.push(element)
                }
                // 59
                if (downArr[downArr.length-1][1] != '0') {
                    let tens = String(downArr[0][0]);
                    let ones = String(parseInt(downArr[downArr.length-1][1])+1)

                    if (parseInt(ones) % 10 == 0) {
                        ones = "0";
                        tens = String(parseInt(tens) + 1);
                    }
                    shipPlacement.push(tens + ones);
                }
            }

            if (originalPlacement[0][1] != '1') {
                let element = String(originalPlacement[0][0]) + String(parseInt(originalPlacement[0][1]) - 1);
                shipPlacement.push(element);
            }

            if (originalPlacement[originalPlacement.length-1][1] != '0') {
                let tens = String(originalPlacement[originalPlacement.length-1][0]);
                let ones = String(parseInt(originalPlacement[originalPlacement.length-1][1]) + 1);

                if (parseInt(ones) % 10 == 0) {
                    ones = "0";
                    tens = String(parseInt(tens) + 1);
                }
                shipPlacement.push(tens + ones);
            }

        } else if (!horizontal) {

            if (originalPlacement[0][0] != '0') {   
                let upElement = String(parseInt(originalPlacement[0][0]) - 1) + String(originalPlacement[0][1])

                shipPlacement.push(upElement);

                if (upElement[1] != '1') {
                    let element = String(upElement[0]) + String(parseInt(upElement[1])-1);
                    shipPlacement.push(element);
                }
                if (upElement[1] != '0') {
                    let tens = String(upElement[0]);
                    let ones = String(parseInt(upElement[1])+1);
    
                    if (parseInt(ones) % 10 == 0) {
                        ones = "0";
                        tens = String(parseInt(tens) + 1);
                    }
                    shipPlacement.push(tens + ones);
                }

            }

            if (originalPlacement[originalPlacement.length-1][0] != '9') {
                let downElement = String(parseInt(originalPlacement[0][0]) + 1) + String(originalPlacement[0][1]);
                shipPlacement.push(downElement);

                if (downElement[1] != '1') {
                    let element = String(downElement[0]) + String(parseInt(downElement[1])-1);
                    shipPlacement.push(element);
                }
                if (downElement[1] != '0') {
                    let tens = String(downElement[0])
                    let ones = String(parseInt(downElement[1])+1);
    
                    if (parseInt(ones) % 10 == 0) {
                        ones = "0";
                        tens = String(parseInt(tens) + 1);
                    }
                    shipPlacement.push(tens + ones);
                }

            }

            if (originalPlacement[0][1] != '1') {
                let leftElement = String(originalPlacement[0][0]) + String(parseInt(originalPlacement[0][1]) - 1);
                
                for(let i=0; i < originalPlacement.length; i++) {
                    shipPlacement.push(String(parseInt(leftElement[0]) + i) + String(leftElement[1]));
                }

            }

            if (originalPlacement[0][1] != '0') {
                let rightElementTens = String(originalPlacement[0][0]);
                let rightElementOnes = String(parseInt(originalPlacement[0][1]) + 1);

                if (parseInt(rightElementOnes) % 10 == 0) {
                    rightElementOnes = "0";
                    rightElementTens = String(parseInt(rightElementTens) + 1);
                }

                for(let i=0; i < originalPlacement.length; i++) {
                    shipPlacement.push(String(parseInt(rightElementTens) + i) + String(rightElementOnes));
                }

            }
            
        }

        let sortedShipPlacement = shipPlacement.map(coordinate => parseInt(coordinate)).sort().map((coordinate) => {
            if (coordinate < 10) {
                return "0" + coordinate;
            } 
            return String(coordinate);
        })

        return sortedShipPlacement;
    }

    return {
        getHorizontal,
        getPlayer,
        getTurn,
        getShipsToBePlaced,
        initialization,
        beginPlaceDownStage,
        playerGenerateCoordinates,
        attackForComputer,
        toggleTurn,
        toggleHorizontal,
        beginCombatStage,
        computerPlaceStage,
        playerPlaceShip,
        checkIfCanPlaceDownShip,
        hitAround,
    }

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM