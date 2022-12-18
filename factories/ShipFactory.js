const Ship = (type, length) => {
    let hits = 0;
    let coordinates = [];

    let getLength = () => length;

    let getType = () => type;

    let incrementHits = () => {
        hits++;
    }

    let getCoordinates = () => coordinates;

    let setCoordinates = (shipPlacement) => {
        coordinates = shipPlacement;
    }

    let getHits = () => hits;

    let isSunk = () => length === hits;


    return {
        incrementHits,
        isSunk,
        getHits,
        getType,
        getLength,
        setCoordinates,
        getCoordinates,
    }

}

export default Ship;