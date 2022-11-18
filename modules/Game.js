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

    // PLACE DOWN STAGE FOR COMPUTER
    let computerPlaceStage = () => {
        for(let ship of computerShipsToBePlaced) {
            let direction = Math.floor(Math.random() * 2); // random 0 or 1
            console.log("ship-dir", direction);
            console.log("computer: ", ship.name, ship.size);
        }
    }

    return {
        computerPlaceStage,
        placeDownShip,
        initialization,
        checkIfCanPlaceDownShip
    }

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM