const Gameboard = require("../modules/Gameboard");
const Ship = require("../modules/ShipFactory");

describe("GAMEBOARD", () => {
    let testBoard;
    let testOne,testDestroyer;
    let testBoardArray = [];
    beforeEach(() => {
        testBoard = Gameboard();
        testBoard.initializeArray();

        testDestroyer = new Ship("Destroyer", 3);

        for(let i=0; i < 100; i++) {
            testBoardArray[i] = null;
        }
    })

    test("Initialize test gameboard", () => {
        expect(testBoard.getBoard()).toEqual(testBoardArray);
    })

    test("Place Ship function Test 1", () => {
        testBoard.placeShip(11, testDestroyer);
        testBoard.placeShip(12, testDestroyer);
        testBoard.placeShip(13, testDestroyer);

        testBoardArray[11] = testDestroyer;
        testBoardArray[12] = testDestroyer;
        testBoardArray[13] = testDestroyer;

        expect(testBoard.getBoard()).toEqual(testBoardArray);
    })

    test("Receive Attack Function", () => {
        testBoard.placeShip(11, testDestroyer);
        testBoard.placeShip(21, testDestroyer);
        testBoard.placeShip(31, testDestroyer);
        testBoard.receiveAttack(11); 
        expect(testBoard.getBoard()[11]).toBe("HIT");
    })

    test("Receive Attack function 2", () => {
        testBoard.placeShip(11, testDestroyer);
        testBoard.placeShip(21, testDestroyer);
        testBoard.placeShip(31, testDestroyer);

        testBoard.receiveAttack(11);
        testBoard.receiveAttack(21);
        testBoard.receiveAttack(31);
        expect(testBoard.getRemainingShips()).toEqual(["Carrier", "Battleship", "Submarine", "Patrol Boat"]);
    });

})