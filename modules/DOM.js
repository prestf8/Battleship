const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let placeShipLength = 5; // Length of ship to place
    let playerBoardDivs;
    let horizontal = true;

    let clickBoardUnit = (event) => {
        // console.log(event.target.getAttribute("data-coordinate"))
    }

    let getHorizontal = () => horizontal;

    let toggleHorizontal = () => {
        horizontal = !horizontal;
    }

    let storeShipPlacementH = (boardUnit, hoveredCoordinate) => {
        let selectedCoordinates = [];
        let row = boardUnit.getAttribute("data-coordinate")[0];
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            let selectedCoordinate = hoveredCoordinate + i; 
            let selectedCoordinateStr = (hoveredCoordinate+i).toString(); // string version

            if (selectedCoordinate < 10) {
                selectedCoordinateStr = '0' + selectedCoordinateStr;
            }

            // selected coordinate shouldnt be off the board && should be on the same row
            if (selectedCoordinate <= 100 && selectedCoordinateStr.toString()[0] === row) { 
                selectedCoordinates.push(selectedCoordinateStr);
            }
        }
        return selectedCoordinates;
    }

    let storeShipPlacementV = (boardUnit, hoveredCoordinate) => {
        let selectedCoordinates = [];
        let column = boardUnit.getAttribute("data-coordinate")[0];
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            let selectedCoordinate = hoveredCoordinate + i; 

            // selected coordinate shouldnt be off the board && should be on the same row
            if (selectedCoordinate <= 100 && selectedCoordinate.toString()[0] === row) { 
                selectedCoordinates.push(selectedCoordinate);
            }
        }
        return selectedCoordinates;
    }

    let hoverShipPlacement = (event) => {
        let hoveredBoardUnit = event.target;
        let hoveredCoordinate = parseInt(hoveredBoardUnit.getAttribute("data-coordinate"));

        for(let boardUnit of playerBoardDivs) { 
            boardUnit.classList.remove("board-div-selected");
        }

        let shipPlacement;

        shipPlacement = storeShipPlacementH(hoveredBoardUnit, hoveredCoordinate);

        for(const coord of shipPlacement) {
            let boardUnit = playerBoardDOM.querySelector(`[data-coordinate="${coord}"]`);
            boardUnit.classList.add("board-div-selected");
        }
        // console.log(toBeSelectedCoordinates);
    }

    let initialization = () => {
        playerBoardDOM= document.querySelector(".player-board");
        computerBoardDOM= document.querySelector(".computer-board");
        let rotateDirectionBtn = document.querySelector(".rotate-direction-ship");
        
        rotateDirectionBtn.addEventListener("click", toggleHorizontal);
        
        for(let i=0; i < 100; i++) {
            let playerBoardDiv = document.createElement("div");
            let computerBoardDiv = document.createElement("div");
            playerBoardDiv.setAttribute("class", "board-div player-board-div");
            computerBoardDiv.setAttribute("class", "board-div computer-board-div");

            let dataCoordinateValue = String(i+1);
            if (parseInt(dataCoordinateValue) < 10) {
                dataCoordinateValue = '0' + dataCoordinateValue;
            }
            playerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
            computerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
            playerBoardDOM.appendChild(playerBoardDiv);
            computerBoardDOM.appendChild(computerBoardDiv);
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
    }
    
})()

export default DOM;