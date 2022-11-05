const Ship = (type, length) => {
    let hits = 0;
    let coordinates = [];

    let getLength = () => length;

    let getType = () => type;

    let incrementHits = () => {
        hits++;
    }

    let getCoordinates = () => coordinates;

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
        setLocation,
        getCoordinates,
    }

}

module.exports = Ship;