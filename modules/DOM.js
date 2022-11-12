const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let placeShipLength = 5; // Length of ship to place
    // let horizontal = true;

    let clickBoardUnit = (event) => {
        // console.log(event.target.getAttribute("data-coordinate"))
    }

    let hoverShip = (event) => {
        for(let boardUnitDOM of playerBoardDOM.querySelectorAll(".player-board-div")) {
            boardUnitDOM.classList.remove("board-div-selected");
        }

        let hoveredCoordinate = parseInt(event.target.getAttribute("data-coordinate"));
        let row = event.target.getAttribute("data-coordinate")[0];
        console.log(row);
        let toBeSelectedCoordinates = [];
        for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
            let newHoveredCoordinate = hoveredCoordinate + i; 
            // hovered coordinate shouldnt be off the board && should be on the same row
            if (newHoveredCoordinate <= 100 && newHoveredCoordinate.toString()[0] === row) { 
                toBeSelectedCoordinates.push(hoveredCoordinate + i);
            }
        }

        for(let coord of toBeSelectedCoordinates) {
            let boardUnit = playerBoardDOM.querySelector(`[data-coordinate="${coord}"]`);
            boardUnit.classList.add("board-div-selected");
        }
        // console.log(toBeSelectedCoordinates);
    }

    let getHorizontal = () => horizontal;

    let toggleHorizontal = () => {
        horizontal = !horizontal;
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
            playerBoardDiv.setAttribute("data-coordinate", i+1);
            computerBoardDiv.setAttribute("data-coordinate", i+1);
            playerBoardDOM.appendChild(playerBoardDiv);
            computerBoardDOM.appendChild(computerBoardDiv);
        }
        initializeHoverAndPlaceShips();
    }

    let initializeHoverAndPlaceShips = () => {
        let playerBoardDivs = document.querySelectorAll(".player-board-div");
        let computerBoardDivs = document.querySelectorAll(".computer-board-div");
        for(let i=0; i < 100; i++) {            
            playerBoardDivs[i].addEventListener("mouseover", hoverShip);
            // computerBoardDivs[i].addEventListener("mouseover", hoverShip);
            playerBoardDivs[i].addEventListener("click", clickBoardUnit);
            // computerBoardDivs[i].addEventListener("click", clickBoardUnit);
        }        
    }
    return {
        initialization,
        toggleHorizontal,
        getHorizontal,
    }
    
})()

export default DOM;