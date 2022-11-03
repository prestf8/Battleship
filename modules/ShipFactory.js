const Ship = (length) => {
    let hits = 0;
    let coordinates = [];

    let getLength = () => length;

    let incrementHits = () => {
        hits++;
    }

    let setLocation = (coordinate) => {
        coordinates.push(coordinate);
    }

    let getHits = () => hits;

    let isSunk = () => length === hits;


    return {
        incrementHits,
        isSunk,
        getHits,
        getLength,
        setLocation
    }

}

module.exports = Ship;