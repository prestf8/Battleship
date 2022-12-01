import Game from "./Game.js";

const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let horizontal = true;

    let initialization = () => {
        playerBoardDOM = document.querySelector(".player-board");
        computerBoardDOM= document.querySelector(".computer-board");
        let rotatePlacementBtn = document.querySelector(".rotate-direction-ship");
        
        // Event "click" on button for rotating ship placement 
        rotatePlacementBtn.addEventListener("click", toggleHorizontal);
        
        for (let i=0; i < 10; i++) {
            for(let j=0; j < 10; j++) {
                let playerBoardUnit = document.createElement("div");
                let computerBoardUnit = document.createElement("div");
                playerBoardUnit.setAttribute("class", "board-div player-board-div");
                computerBoardUnit.setAttribute("class", "board-div computer-board-div");
    
                // coordinate for the board unit
                let dataCoordinateValue = String((i*10)+(j+1));

                // Prefix '0' for those under 10
                if (dataCoordinateValue < 10) {
                    dataCoordinateValue = '0' + dataCoordinateValue;
                }

                // set coordinates
                playerBoardUnit.setAttribute("data-coordinate", dataCoordinateValue);
                computerBoardUnit.setAttribute("data-coordinate", dataCoordinateValue);

                playerBoardDOM.appendChild(playerBoardUnit);
                computerBoardDOM.appendChild(computerBoardUnit);
            }
        }
        

        beginPlaceDownStage();
    }

    let getHorizontal = () => horizontal;

    // 

    let setPlaceShipLabel = (name) => {
        document.querySelector(".current-place-ship").textContent = name;
    }

    let hoverShipPlacement = (event) => {
        
        let playerBoardUnits = document.querySelectorAll(".player-board-div");
        // Hovered Unit
        let hoveredBoardUnit = event.target;

        // Reset DOM Hover Styling for every unit
        for(let boardUnit of playerBoardUnits) { 
            boardUnit.classList.remove("board-div-hovered");
        }


        // Getting ship placement coordinates (based on whether placement is horizontal and based on hovered coordinate)
        let shipPlacement = playerGenerateCoordinates(hoveredBoardUnit);

        console.log(shipPlacement);

        // Styling ship placement 
        for(const coord of shipPlacement) {
            let boardUnit = playerBoardDOM.querySelector(`[data-coordinate="${coord}"]`);
            // console.log(boardUnit);
            boardUnit.classList.add("board-div-hovered");
        }
    }

    let clickShipPlacement = (event) => {

        // Clicked Unit
        let clickedBoardUnit = event.target;

        // Getting ship placement coordinates (based on whether placement is horizontal and based on hovered coordinate)
        let shipPlacement = playerGenerateCoordinates(clickedBoardUnit);
        
        // Check if place down ship is allowed 
        let canPlaceDownShip = Game.checkIfCanPlaceDownShip(shipPlacement);

        // Only run this block if place down ship is allowed
        if (canPlaceDownShip) {
            // Add styling for coordinates where ships were placed down
            for(let coords of shipPlacement) {
                let boardUnitDOM = playerBoardDOM.querySelector(`.player-board-div[data-coordinate='${coords}']`);
                boardUnitDOM.classList.add("board-div-selected");
            }

            // Place Down Ship
            Game.placeDownShip(shipPlacement);
        }

    }

    let clickAttack = (event) => {
        event.target.classList.add("attacked");

        Game.playerAttack(event.target);
    }

    // toggle direction of place ship 
    let toggleHorizontal = () => {
        horizontal = !horizontal;
    }

    // IN THE WORKS (COMBINED getShipPlacementH AND getShipPlacementV)
    let playerGenerateCoordinates = (boardUnit) => {
        let generatedCoords = [];
        let placeShipLength = (Game.getShipsToBePlaced()[0]).size; // Length of current ship to place 
        let baseCoordinate = boardUnit.getAttribute("data-coordinate");
        let tensDigit = baseCoordinate[0];
        let onesDigit = baseCoordinate[1];
        let correspondingTens = parseInt(tensDigit + '9') + 1; // 10, 20..., 100 can be on the same rows as 08, 19, 95, respectively...
        
        // MODULUS % 10 == 0
        if (parseInt(baseCoordinate) % 10 === 0 && horizontal) {
            return [parseInt(baseCoordinate)];
        }

        for(let i=0; i < placeShipLength; i++) {
            let generatedCoordinate = horizontal ?  (parseInt(baseCoordinate) + i) : (parseInt((parseInt(tensDigit) + i) + onesDigit));

            // FOR COORD EQUAL or UNDER 10 and HORIZONTAL PLACEMENT
            if (parseInt(baseCoordinate) <= 10 && horizontal) {
                for(let i=0; i < placeShipLength; i++) {
                    // placement must be on the same row
                    if (parseInt(baseCoordinate)+i < 10) { // for generated coordinates under 10
                        generatedCoords.push('0'+(parseInt(baseCoordinate)+i));
                    } else if (parseInt(baseCoordinate)+i == 10) { // for generated coordinate 10
                        generatedCoords.push(parseInt(baseCoordinate)+i);
                    }
                }
                return generatedCoords;
            }


            if (generatedCoordinate <= 100 && !horizontal) { // FOR VERTICAL 
                generatedCoords.push(generatedCoordinate);
            } else if ((generatedCoordinate <= 100) && (horizontal) && ((String(generatedCoordinate)[0] == tensDigit) || (generatedCoordinate === correspondingTens))) {
                generatedCoords.push(generatedCoordinate);
            }
        }
        return generatedCoords;
    }

    let beginPlaceDownStage = () => {
        let playerBoardUnits = playerBoardDOM.querySelectorAll(".player-board-div");
        for(let i=0; i < 100; i++) {            
            playerBoardUnits[i].addEventListener("mouseover", hoverShipPlacement);
            playerBoardUnits[i].addEventListener("click", clickShipPlacement);
        }        
    }

    let beginCombatStage = () => {

        let playerBoardUnits = playerBoardDOM.querySelectorAll(".player-board-div");
        let computerBoardUnits = computerBoardDOM.querySelectorAll(".computer-board-div");

        // computer board is now visible
        document.querySelector(".computer-board").classList.remove("invis");

        // rotate ship button and the place your label are now off the DOM
        document.querySelector(".place-down-ship-elements").classList.add("invis");
        for(let i=0; i < 100; i++) {
            playerBoardUnits[i].removeEventListener("mouseover", hoverShipPlacement);
            playerBoardUnits[i].removeEventListener("click", clickShipPlacement);  
            computerBoardUnits[i].addEventListener("click", clickAttack);
        }

    }
    
    return {
        setPlaceShipLabel,
        beginCombatStage,
        initialization,
        toggleHorizontal,
        getHorizontal,
    }

    // JUNK OUTDATED CODE

        // // hover ship placement for horizontal ship placement functionality
    // let getShipPlacementH = (boardUnit, hoveredCoordinate) => {
    //     let selectedCoordinates = [];
    //     let row = boardUnit.getAttribute("data-row");
    //     for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
    //         let selectedCoordinate = hoveredCoordinate + i; 

    //         if (selectedCoordinate < 10) {
    //             selectedCoordinate = '0' + selectedCoordinate;
    //         }

    //         let selectedCoordinateDOM = playerBoardDOM.querySelector(`.board-div[data-coordinate='${selectedCoordinate}']`)

    //         // selected coordinate shouldnt be off the board && should be on the same row
    //         if (selectedCoordinateDOM && row == selectedCoordinateDOM.getAttribute("data-row")) { 
    //             selectedCoordinates.push(String(selectedCoordinate));
    //         }
    //     }
    //     return selectedCoordinates;
    // }
    // // hover ship placement for vertical ship placement functionality
    // let getShipPlacementV = (boardUnit, hoveredCoordinate) => {
    //     let hoveredCoordinateStr = String(hoveredCoordinate);

    //     let selectedCoordinates = [];

    //     if (parseInt(hoveredCoordinate) < 10) {
    //         hoveredCoordinateStr = '0' + hoveredCoordinateStr;
    //     }

    //     let hoveredCoordinateCol = hoveredCoordinate % 10;

    //     if (hoveredCoordinate == 100) {
    //         selectedCoordinates.push(100);
    //         return selectedCoordinates;
    //     }

    //     // console.log(hoveredCoordinateStr);
    //     for(let i=0; i < placeShipLength; i++) { // placeShipLength - 1 not including hoveredCoordinate
    //         // let selectedCoordinate = (parseInt(hoveredCoordinateStr[0]) + i) + hoveredCoordinateStr[1]; 
    //         let selectedCoordinate = String(parseInt(hoveredCoordinateStr[0])+i)+hoveredCoordinateCol;
    //         // console.log(selectedCoordinate);
    //         let selectedCoordinateDOM = playerBoardDOM.querySelector(`.board-div[data-coordinate='${selectedCoordinate}']`)

    //         // selected coordinate shouldnt be off the board && should be on the same row
    //         if (selectedCoordinateDOM && col == selectedCoordinateDOM.getAttribute("data-col")) { 
    //             selectedCoordinates.push(selectedCoordinate);
    //         }
    //     }
    //     return selectedCoordinates;
    // }
    
})()

export default DOM;