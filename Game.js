import Player from "/factories/Player.js";
import Ship from "/factories/ShipFactory.js";

const Game = (() => {

    let player, computer;

    let initialization = () => {
        player = Player();
        // Later we will create a computer class
        computer = Player();
        player.initialization();
        computer.initialization();

        // delete this later;
        autoGeneratedCoordinates();
    }

    // delete this later
    let autoGeneratedCoordinates = () => {
        let playerCarrier = Ship("Carrier", 5);
        let playerBattleship = Ship("Battleship", 4);
        let playerDestroyer = Ship("Destroyer", 3);
        let playerSubmarine = Ship("Submarine", 3);
        let playerPatrolBoat = Ship("Patrol Boat", 2);
        let computerCarrier = Ship("Carrier", 5);
        let computerBattleship = Ship("Battleship", 4);
        let computerDestroyer = Ship("Destroyer", 3);
        let computerSubmarine = Ship("Submarine", 3);
        let computerPatrolBoat = Ship("Patrol Boat", 2);

        

        // Carrier
        player.getGameboard().playerShip(60, playerCarrier);
        player.getGameboard().playerShip(61, playerCarrier);
        player.getGameboard().playerShip(62, playerCarrier);
        player.getGameboard().playerShip(63, playerCarrier);
        player.getGameboard().playerShip(64, playerCarrier);

        // Battleship
        player.getGameboard().playerShip(50, playerBattleship);
        player.getGameboard().playerShip(51, playerBattleship);
        player.getGameboard().playerShip(52, playerBattleship);
        player.getGameboard().playerShip(53, playerBattleship);

        // Destroyer
        player.getGameboard().placeShip(5, playerDestroyer);
        player.getGameboard().placeShip(15, playerDestroyer);
        player.getGameboard().placeShip(25, playerDestroyer);
        // Submarine
        player.getGameboard().placeShip(10, playerSubmarine);
        player.getGameboard().placeShip(20, playerSubmarine);
        player.getGameboard().placeShip(30, playerSubmarine);

        // Patrol Boat
        player.getGameboard().placeShip(1, playerPatrolBoat);
        player.getGameboard().placeShip(2, playerPatrolBoat);

        /////////

        // Carrier
        computer.getGameboard().playerShip(60, computerCarrier);
        computer.getGameboard().playerShip(61, computerCarrier);
        computer.getGameboard().playerShip(62, computerCarrier);
        computer.getGameboard().playerShip(63, computerCarrier);
        computer.getGameboard().playerShip(64, computerCarrier);

        // Battleship
        computer.getGameboard().playerShip(50, computerBattleship);
        computer.getGameboard().playerShip(51, computerBattleship);
        computer.getGameboard().playerShip(52, computerBattleship);
        computer.getGameboard().playerShip(53, computerBattleship);

        // Destroyer
        computer.getGameboard().placeShip(5, computerDestroyer);
        computer.getGameboard().placeShip(15, computerDestroyer);
        computer.getGameboard().placeShip(25, computerDestroyer);
        // Submarine
        computer.getGameboard().placeShip(10, computerSubmarine);
        computer.getGameboard().placeShip(20, computerSubmarine);
        computer.getGameboard().placeShip(30, computerSubmarine);

        // Patrol Boat
        computer.getGameboard().placeShip(1, computerPatrolBoat);
        computer.getGameboard().placeShip(2, computerPatrolBoat);
    }


    // let play = () => {
    //     while(!(player.getGameboard().isAllSunk() || computer.getGameboard().isAllSunk())) {

    //     }

    // }

    return {
        initialization,
        play,
    }

    

})();

Game.initialization();

