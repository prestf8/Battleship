import Player from "../modules/Player.js";
import Ship from "../modules/ShipFactory.js"
 
describe("PLAYER: ", () => {
    let player1, player2;

    let player1PatrolBoat;
    beforeEach(() => {
        player1 = Player();
        player2 = Player();
        player1.initialization();
        player2.initialization();

        player1PatrolBoat = Ship("Patrol Boat", 2);
    })

    test("Player attack function (case: Coordinate already attacked before", () => {

        player1.playerAttack(15, player2);

        // player 1 is attacking player2
        expect(player1.playerAttack(15, player2)).toBe("Already hit. Try a different spot.");
    })
})