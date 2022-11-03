const Gameboard = require("../modules/Gameboard");
const Ship = require("../modules/ShipFactory");

describe("GAMEBOARD", () => {
    let testBoard;
    let testOne,testDestroyer;
    let testBoardArray = [];
    beforeEach(() => {
        testBoard = Gameboard();
        testBoard.initializeArray();

        testDestroyer = new Ship(3);
        testOne = new Ship(1);

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

    test("Receive Attack function", () => {
        testBoard.placeShip(11, testDestroyer);
        testBoard.receiveAttack(11); 
        expect(testBoard.getBoard()[11]).toEqual("HIT");

    })

})