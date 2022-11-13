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
        let row = boardUnit.getAttribute("data-row");
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            let selectedCoordinate = hoveredCoordinate + i; 
            let selectedCoordinateStr = (hoveredCoordinate+i).toString(); // string version
            let selectedCoordinateDOM = playerBoardDOM.querySelector(`.board-div[data-coordinate='${selectedCoordinate}']`)

            // selected coordinate shouldnt be off the board && should be on the same row
            if (selectedCoordinate <= 100 && row == selectedCoordinateDOM.getAttribute("data-row")) { 
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
        
        for (let i=0; i < 10; i++) {
            for(let j=0; j < 10; j++) {
                let playerBoardDiv = document.createElement("div");
                let computerBoardDiv = document.createElement("div");
                playerBoardDiv.setAttribute("class", "board-div player-board-div");
                computerBoardDiv.setAttribute("class", "board-div computer-board-div");
    
                let dataCoordinateValue = String((i*10)+(j+1));
                playerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
                computerBoardDiv.setAttribute("data-coordinate", dataCoordinateValue);
                playerBoardDiv.setAttribute("data-row", i+1);
                computerBoardDiv.setAttribute("data-row", i+1);
                playerBoardDiv.setAttribute("data-col", j+1);
                computerBoardDiv.setAttribute("data-col", j+1);
                playerBoardDOM.appendChild(playerBoardDiv);
                computerBoardDOM.appendChild(computerBoardDiv);
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
    }
    
})()

export default DOM;