import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";

const Game = (() => {

    let player, computer;

    // stages
    let placeDownStage = true;
    let combatStage = false;

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
    ]

    let checkIfCanPlaceDownShip = (shipPlacement) => {
        // Conditions: Placement cannot be already occupied & Ship placement cannot be off the board
        for(let placement of shipPlacement) {
            if (player.getGameboard().checkIfOccupied(parseInt(placement))) {
                return;
            }
        }
        if (shipPlacement.length !== DOM.getPlaceShipLength()) {
            return;
        }
        return true;
    }
    
    let placeDownShip = (shipPlacement) => {
        
        if (!placeDownStage) {
            return;
        }
        
        let shipData = shipsToBePlaced.shift();
        let playerGameboard = player.getGameboard();
        let shipToBePlaced = Ship(shipData.name, shipData.size);

        
        for(let coords of shipPlacement) {
            playerGameboard.placeShip(parseInt(coords), shipToBePlaced);
        }
        
        if (shipsToBePlaced.length > 0) {
            DOM.setCurrentPlaceShipLabelDOM(shipsToBePlaced[0].name);
            DOM.setPlaceShipLength(shipsToBePlaced[0].size);
        } else {
            placeDownStage = false;
            combatStage = true;
            DOM.beginCombatStage();
        }

    }

    let initialization = () => {
        DOM.initialization();
        player = Player();
        player.initialization();
    }

    return {
        placeDownShip,
        initialization,
        checkIfCanPlaceDownShip
    }

    

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM