const Ship = require("../modules/ShipFactory");



// so
// methods, JEST, and factory functions work
// BUT STATE IN FACTORY FUNCTIONS ARE NOT SAVED

describe("SHIP", () => {
    let testShip;
    beforeEach(() => {
        testShip= Ship(3);
    });

    test("Initialization1", () => {
        testShip.incrementHits();
        testShip.incrementHits();
        testShip.incrementHits();
    
        expect(testShip.getHits()).toBe(3);
    });

    test("Initialization length", () => {
        expect(testShip.getLength()).toBe(3);
    })
})
