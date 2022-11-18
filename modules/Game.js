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
        
        if (stage !== "place") {
            return;
        }
        
        let currentShipData = shipsToBePlaced.shift();
        let playerGameboard = player.getGameboard();

        // ship object to be placed
        let shipToBePlaced = Ship(currentShipData.name, currentShipData.size);

        
        for(let coords of shipPlacement) {
            playerGameboard.placeShip(parseInt(coords), shipToBePlaced);
        }
        
        if (shipsToBePlaced.length > 0) {
            DOM.setCurrentPlaceShipLabelDOM(shipsToBePlaced[0].name);
            DOM.setPlaceShipLength(shipsToBePlaced[0].size);
        } else {
            stage = "combat"
            DOM.beginCombatStage();
        }

    }

    return {
        placeDownShip,
        initialization,
        checkIfCanPlaceDownShip
    }

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM