const Gameboard = require("../factories/Gameboard");
const Ship = require("../factories/ShipFactory");

describe("GAMEBOARD", () => {
  let testBoard;
  let testOne,
    testCarrier,
    testBattleship,
    testDestroyer,
    testSubmarine,
    testPatrolBoat;
  let testBoardArray = [];

  beforeEach(() => {
    testBoard = Gameboard();
    testBoard.initializeArray();

    testCarrier = new Ship("Carrier", 5);
    testBattleship = new Ship("Battleship", 4);
    testDestroyer = new Ship("Destroyer", 3);
    testSubmarine = new Ship("Submarine", 3);
    testPatrolBoat = new Ship("Patrol Boat", 2);

    for (let i = 0; i < 100; i++) {
      testBoardArray[i] = null;
    }
  });

  test("Initialize test gameboard", () => {
    expect(testBoard.getBoard()).toEqual(testBoardArray);
  });

  test("Place Ship function Test 1", () => {
    testBoard.placeShip(11, testDestroyer);
    testBoard.placeShip(12, testDestroyer);
    testBoard.placeShip(13, testDestroyer);

    testBoardArray[11] = testDestroyer;
    testBoardArray[12] = testDestroyer;
    testBoardArray[13] = testDestroyer;

    expect(testBoard.getBoard()).toEqual(testBoardArray);
  });

  test("Receive Attack Function", () => {
    testBoard.placeShip(11, testDestroyer);
    testBoard.placeShip(21, testDestroyer);
    testBoard.placeShip(31, testDestroyer);
    testBoard.receiveAttack(11);
    expect(testBoard.getBoard()[11]).toBe("HIT");
  });

  test("Receive Attack function 2", () => {
    // destroyer
    testBoard.placeShip(11, testDestroyer);
    testBoard.placeShip(21, testDestroyer);
    testBoard.placeShip(31, testDestroyer);

    testBoard.receiveAttack(11);
    testBoard.receiveAttack(21);
    testBoard.receiveAttack(31);

    expect(testBoard.getRemainingShips()).toEqual([
      "Carrier",
      "Battleship",
      "Submarine",
      "Patrol Boat",
    ]);
  });

  test("Check if all ships are sunk", () => {
    //carrier
    testBoard.placeShip(91, testCarrier);
    testBoard.placeShip(92, testCarrier);
    testBoard.placeShip(93, testCarrier);
    testBoard.placeShip(94, testCarrier);
    testBoard.placeShip(95, testCarrier);

    //battleship
    testBoard.placeShip(13, testBattleship);
    testBoard.placeShip(23, testBattleship);
    testBoard.placeShip(33, testBattleship);
    testBoard.placeShip(43, testBattleship);

    // destroyer
    testBoard.placeShip(11, testDestroyer);
    testBoard.placeShip(21, testDestroyer);
    testBoard.placeShip(31, testDestroyer);

    // submarine
    testBoard.placeShip(77, testSubmarine);
    testBoard.placeShip(78, testSubmarine);
    testBoard.placeShip(79, testSubmarine);

    // patrol boat
    testBoard.placeShip(50, testPatrolBoat);
    testBoard.placeShip(51, testPatrolBoat);

    // .........................
    testBoard.receiveAttack(91);
    testBoard.receiveAttack(92);
    testBoard.receiveAttack(93);
    testBoard.receiveAttack(94);
    testBoard.receiveAttack(95);
    testBoard.receiveAttack(13);
    testBoard.receiveAttack(23);
    testBoard.receiveAttack(33);
    testBoard.receiveAttack(43);
    testBoard.receiveAttack(11);
    testBoard.receiveAttack(21);
    testBoard.receiveAttack(31);
    testBoard.receiveAttack(77);
    testBoard.receiveAttack(78);
    testBoard.receiveAttack(79);
    testBoard.receiveAttack(50);
    testBoard.receiveAttack(51);

    expect(testBoard.isAllSunk()).toBe(true);
  });

  test("Check If Hit Already", () => {
    testBoard.placeShip(11, testPatrolBoat);
    testBoard.placeShip(12, testPatrolBoat);

    // expect(testBoard.getBoard()[11]).toEqual(testPatrolBoat);
    // expect(testBoard.getBoard()[12]).toEqual(testPatrolBoat);

    testBoard.receiveAttack(11);
    testBoard.receiveAttack(12);
    expect(testBoard.checkIfHitAlready(11)).toBe(true);
  })
});
