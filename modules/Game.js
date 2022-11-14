import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";
import DOM from "./DOM.js";

const Game = (() => {

    let player, computer;

    // stages
    let placeDownStage = true;
    let combatStage = false;
    
    let placeDownShip = (shipPlacement) => {

        // Conditions: Placement cannot be already occupied & Ship placement cannot be off the board
        for(let placement of shipPlacement) {
            if (player.getGameboard().checkIfOccupied(parseInt(placement))) {
                return;
            }
        }

        if (shipPlacement.length !== DOM.getPlaceShipLength()) {
            return;
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
    }

    

})();

export default Game;
// WHEN YOU ADD ATTRIBUTE type="module" TO HTML, YOU CAN USE "import" SYSTEM