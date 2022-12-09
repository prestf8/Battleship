import Game from "./Game.js";

const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;

    let initialization = () => {
        playerBoardDOM = document.querySelector(".player-board");
        computerBoardDOM= document.querySelector(".computer-board");
        let rotatePlacementBtn = document.querySelector(".rotate-direction-ship");
        
        // Event "click" on button for rotating ship placement 
        rotatePlacementBtn.addEventListener("click", Game.toggleHorizontal);
        
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
        let shipPlacement = Game.playerGenerateCoordinates(hoveredBoardUnit);

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
        let shipPlacement = Game.playerGenerateCoordinates(clickedBoardUnit);
        
        // Check if place down ship is allowed 
        let canPlaceDownShip = Game.checkIfCanPlaceDownShip(shipPlacement, Game.getPlayer());

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
        // if not in middle of a computer's turn, then player can attack
        if (!Game.getProcessingComputerAttack()) {
            Game.playerAttack(event.target);
        }
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

    // DOM for board units that are attacked and have a ship
    function attackShip(coordinate) {
        coordinate = coordinate < 10 ? ('0' + coordinate) : coordinate;
        // ATTACK HITS SHIP DOM
        if (Game.getTurn() === "player") {
            document.querySelector(`.computer-board > [data-coordinate="${coordinate}"]`).textContent = "SHIP HIT";
            document.querySelector(`.computer-board > [data-coordinate="${coordinate}"]`).classList.add("hit");
        } else if (Game.getTurn() === "computer") {

            // Game.sleep(2000).then(() => {
                document.querySelector(`.player-board > [data-coordinate="${coordinate}"]`).textContent = "SHIP HIT";
                document.querySelector(`.player-board > [data-coordinate="${coordinate}"]`).classList.add("hit");            
            // })
        }

    }

    // DOM for board units that are attacked and have nothing
    function attackNothing (coordinate) {
        coordinate = coordinate < 10 ? ('0' + coordinate) : coordinate;


        // ATTACK HITS SHIP DOM
        if (Game.getTurn() === "player") {
            document.querySelector(`.computer-board > [data-coordinate="${coordinate}"]`).classList.add("missed");
        } else if (Game.getTurn() === "computer") {

            // Game.sleep(2000).then(() => {
                document.querySelector(`.player-board > [data-coordinate="${coordinate}"]`).classList.add("missed");
            // })
        }
    }
    
    return {
        attackShip,
        attackNothing,
        setPlaceShipLabel,
        beginCombatStage,
        initialization,
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