import Game from "./Game.js";

const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let placeShipLength = 5; // Length of ship to place
    let playerBoardDivs;
    let horizontal = true;

    let clickBoardUnit = (event) => {
        // console.log(event.target.getAttribute("data-coordinate"))
        let clickedBoardUnit = event.target;
        let clickedCoords = parseInt(event.target.getAttribute("data-coordinate"));
        let shipPlacement;
        
        if (horizontal) { 
            shipPlacement = getShipPlacementH(clickedBoardUnit, clickedCoords);
        } else {
            shipPlacement = getShipPlacementV(clickedBoardUnit, clickedCoords);
        }
        
        let canPlaceDownShip = Game.checkIfCanPlaceDownShip(shipPlacement);
        if (canPlaceDownShip) {
            for(let coords of shipPlacement) {
                let boardUnitDOM = playerBoardDOM.querySelector(`.player-board-div[data-coordinate='${coords}']`);
                boardUnitDOM.classList.add("board-div-selected");
            }

            Game.placeDownShip(shipPlacement);
        }

    }

    let getHorizontal = () => horizontal;

    let setPlaceShipLength = (length) => {
        placeShipLength = length;
    }

    let getPlaceShipLength = () => placeShipLength;

    let toggleHorizontal = () => {
        horizontal = !horizontal;
    }

    // hover ship placement for horizontal ship placement functionality
    let getShipPlacementH = (boardUnit, hoveredCoordinate) => {
        let selectedCoordinates = [];
        let row = boardUnit.getAttribute("data-row");
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            let selectedCoordinate = hoveredCoordinate + i; 

            if (selectedCoordinate < 10) {
                selectedCoordinate = '0' + selectedCoordinate;
            }

            let selectedCoordinateDOM = playerBoardDOM.querySelector(`.board-div[data-coordinate='${selectedCoordinate}']`)

            // selected coordinate shouldnt be off the board && should be on the same row
            if (selectedCoordinateDOM && row == selectedCoordinateDOM.getAttribute("data-row")) { 
                selectedCoordinates.push(String(selectedCoordinate));
            }
        }
        return selectedCoordinates;
    }
    // hover ship placement for vertical ship placement functionality
    let getShipPlacementV = (boardUnit, hoveredCoordinate) => {
        let hoveredCoordinateStr = String(hoveredCoordinate);

        let selectedCoordinates = [];
        let col = boardUnit.getAttribute("data-col");

        if (parseInt(hoveredCoordinate) < 10) {
            hoveredCoordinateStr = '0' + hoveredCoordinateStr;
        }

        let hoveredCoordinateCol = hoveredCoordinate % 10;

        if (hoveredCoordinate == 100) {
            selectedCoordinates.push(100);
            return selectedCoordinates;
        }

        // console.log(hoveredCoordinateStr);
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            // let selectedCoordinate = (parseInt(hoveredCoordinateStr[0]) + i) + hoveredCoordinateStr[1]; 
            let selectedCoordinate = String(parseInt(hoveredCoordinateStr[0])+i)+hoveredCoordinateCol;
            // console.log(selectedCoordinate);
            let selectedCoordinateDOM = playerBoardDOM.querySelector(`.board-div[data-coordinate='${selectedCoordinate}']`)

            // selected coordinate shouldnt be off the board && should be on the same row
            if (selectedCoordinateDOM && col == selectedCoordinateDOM.getAttribute("data-col")) { 
                selectedCoordinates.push(selectedCoordinate);
            }
        }
        return selectedCoordinates;
    }

    let hoverShipPlacement = (event) => {
        console.log(placeShipLength);
        let hoveredBoardUnit = event.target;
        let hoveredCoordinate = parseInt(hoveredBoardUnit.getAttribute("data-coordinate"));

        for(let boardUnit of playerBoardDivs) { 
            boardUnit.classList.remove("board-div-hovered");
        }

        let shipPlacement;

        if (horizontal) {
            shipPlacement = getShipPlacementH(hoveredBoardUnit, hoveredCoordinate);
        } else {
            shipPlacement = getShipPlacementV(hoveredBoardUnit, hoveredCoordinate);
        }

        for(const coord of shipPlacement) {
            let boardUnit = playerBoardDOM.querySelector(`[data-coordinate="${coord}"]`);
            boardUnit.classList.add("board-div-hovered");
        }
        // console.log(toBeSelectedCoordinates);
    }

    let initialization = () => {
        playerBoardDOM= document.querySelector(".player-board");
        // computerBoardDOM= document.querySelector(".computer-board");
        let rotateDirectionBtn = document.querySelector(".rotate-direction-ship");
        
        rotateDirectionBtn.addEventListener("click", toggleHorizontal);
        
        for (let i=0; i < 10; i++) {
            for(let j=0; j < 10; j++) {
                let playerBoardDiv = document.createElement("div");
                // let computerBoardDiv = document.createElement("div");
                playerBoardDiv.setAttribute("class", "board-div player-board-div");
                // computerBoardDiv.setAttribute("class", "board-div computer-board-div");
    
                let dataCoordinateValue = String((i*10)+(j+1));
                if (dataCoordinateValue < 10) {
                    dataCoordinateValue = '0' + dataCoordinateValue;
                }


                playerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
                // computerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
                playerBoardDiv.setAttribute("data-row", i+1);
                // computerBoardDiv.setAttribute("data-row", i+1);
                playerBoardDiv.setAttribute("data-col", j+1);
                // computerBoardDiv.setAttribute("data-col", j+1);
                playerBoardDOM.appendChild(playerBoardDiv);
                // computerBoardDOM.appendChild(computerBoardDiv);
            }
        }
        

        // store the newly generated board units 
        playerBoardDivs = document.querySelectorAll(".player-board-div");
        initializeHoverAndPlaceShips();
    }

    let initializeHoverAndPlaceShips = () => {
        for(let i=0; i < 100; i++) {            
            playerBoardDivs[i].addEventListener("mouseover", hoverShipPlacement);
            playerBoardDivs[i].addEventListener("click", clickBoardUnit);
        }        
    }
    return {
        initialization,
        toggleHorizontal,
        getHorizontal,
        getPlaceShipLength,
        setPlaceShipLength
    }
    
})()

export default DOM;