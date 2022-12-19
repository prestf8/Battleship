import Game from "./Game.js";

const DOM = (() => {
    let playerBoardDOM = document.querySelector(".player-board");
    let computerBoardDOM = document.querySelector(".computer-board");

    let initialization = () => {
        // Rotate direction ship
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
                let boardCoordinate = String((i*10)+(j+1));

                // Prefix '0' for those under 10
                if (boardCoordinate < 10) {
                    boardCoordinate = '0' + boardCoordinate;
                }

                // set coordinates
                playerBoardUnit.setAttribute("data-coordinate", boardCoordinate);
                computerBoardUnit.setAttribute("data-coordinate", boardCoordinate);

                playerBoardDOM.appendChild(playerBoardUnit);
                computerBoardDOM.appendChild(computerBoardUnit);
            }
        }
        

        Game.beginPlaceDownStage();
    }

    // CLEANED
    let beginPlaceDownStage = () => {
        let playerBoardUnits = playerBoardDOM.querySelectorAll(".player-board-div");
        for(let i=0; i < 100; i++) {            
            playerBoardUnits[i].addEventListener("mouseover", hoverShipPlacement);
            playerBoardUnits[i].addEventListener("click", clickShipPlacement);
        }        
    }

    // CLEANED
    let hoverShipPlacement = (event) => {
        
        let playerBoardUnits = playerBoardDOM.querySelectorAll(".player-board-div");
        let hoveredBoardUnit = event.target;

        // Reset DOM Hover Styling for every unit
        for(let boardUnit of playerBoardUnits) { 
            boardUnit.classList.remove("board-div-hovered");
        }


        // Getting ship placement coordinates (based on whether placement is horizontal and based on hovered coordinate)
        let shipPlacement = Game.playerGenerateCoordinates(hoveredBoardUnit);

        // Styling ship placement 
        for(const coordinate of shipPlacement) {
            let boardUnit = playerBoardDOM.querySelector(`[data-coordinate="${coordinate}"]`);
            boardUnit.classList.add("board-div-hovered");
        }
        
    }

    let clickShipPlacement = (event) => {

        // Clicked Unit
        let clickedBoardUnit = event.target;

        // Getting ship placement coordinates (based on whether placement is horizontal and based on hovered coordinate)
        let shipPlacement = Game.playerGenerateCoordinates(clickedBoardUnit);

        // Check if place down ship is allowed 
        let canPlaceDownShip = Game.checkIfCanPlaceDownShip(shipPlacement, Game.getPlayer(), Game.getHorizontal());

        // Only run this block if place down ship is allowed
        if (canPlaceDownShip) {
            
            // DOM Styling for placing down ship 
            for(let coords of shipPlacement) {
                let boardUnitDOM = playerBoardDOM.querySelector(`.player-board-div[data-coordinate='${coords}']`);
                boardUnitDOM.classList.add("board-div-selected");
            }

            // Place Down Ship
            Game.playerPlaceShip(shipPlacement);
        }

    }

    let setPlaceShipLabel = (name) => {
        document.querySelector(".current-place-ship").textContent = name;
    }

    let attackForComputer = (event) => {
        // if not in middle of a computer's turn, then player can attack
        Game.attackForComputer(event.target);
    }

    let beginCombatStage = () => {
        // PLAYER BOARD UNITS & COMPUTER BOARD UNITS
        let playerBoardUnits = playerBoardDOM.querySelectorAll(".player-board-div");
        let computerBoardUnits = computerBoardDOM.querySelectorAll(".computer-board-div");


        // rotate ship button and the place your label are now off the DOM
        computerBoardDOM.classList.remove("invis");
        document.querySelector(".rotate-direction-ship-container").classList.add("invis");
        document.querySelector(".place-down-ship-elements").classList.add("invis");

        // Remove event listeners and add attack event listener for computer board
        for(let i=0; i < 100; i++) {
            playerBoardUnits[i].removeEventListener("mouseover", hoverShipPlacement);
            playerBoardUnits[i].removeEventListener("click", clickShipPlacement);  
            computerBoardUnits[i].addEventListener("click", attackForComputer);
        }

    }

    // DOM for board units that are attacked and have a ship
    function attackShip(coordinate) {
        coordinate = coordinate < 10 ? ('0' + coordinate) : coordinate;
        // ATTACK HITS SHIP DOM
        if (Game.getTurn() === "player") {
            computerBoardDOM.querySelector(`[data-coordinate="${coordinate}"]`).textContent = "SHIP HIT";
            computerBoardDOM.querySelector(`[data-coordinate="${coordinate}"]`).classList.add("hit");
        } else if (Game.getTurn() === "computer") {
            playerBoardDOM.querySelector(`[data-coordinate="${coordinate}"]`).textContent = "SHIP HIT";
            playerBoardDOM.querySelector(`[data-coordinate="${coordinate}"]`).classList.add("hit");
        }

    }

    // DOM for board units that are attacked and have nothing
    function attackNothing (coordinate) {
        coordinate = coordinate < 10 ? ('0' + coordinate) : coordinate;

        // ATTACK HITS SHIP DOM
        if (Game.getTurn() === "player") {
            document.querySelector(`.computer-board > [data-coordinate="${coordinate}"]`).classList.add("missed");
        } else if (Game.getTurn() === "computer") {
            document.querySelector(`.player-board > [data-coordinate="${coordinate}"]`).classList.add("missed");
        }
    }
    
    // surroundingcoordinates
    let hitAround = (shipPlacement, nameOfPlayer) => {
        let selectedDOM;
        if (nameOfPlayer == "computer") {
            selectedDOM = computerBoardDOM;
        } else if (nameOfPlayer == "player") {
            selectedDOM = playerBoardDOM;
        }

        for(let coordinate of shipPlacement) {
            selectedDOM.querySelector(`[data-coordinate="${coordinate}"]`).classList.add("missed");
        }

    }

    let endGame = (winner) => {
        let computerBoardUnits = computerBoardDOM.querySelectorAll(".computer-board-div");
        let result = document.querySelector(".result");
        let restartButton = document.querySelector(".restart");
        document.querySelector(".restart").classList.remove("invis");
        document.querySelector(".result").classList.remove("invis");
        computerBoardDOM.classList.remove("invis");


        for(let i=0; i < 100; i++) {
            computerBoardUnits[i].removeEventListener("click", attackForComputer);
        }

        if (winner == "player") {
            result.textContent = "L - W (Computer)";
        } else {
            result.textContent = "W (Player) - L";
        }

        restartButton.addEventListener("click", Game.restartGame);
    }

    let restartGame = () => {
            // coordinate = String(i);

            // if (coordinate < 10) {
            //     coordinate = '0' + coordinate;
            // }

            document.querySelector(".rotate-direction-ship-container").classList.remove("invis");
            document.querySelector(".place-down-ship-elements").classList.remove("invis");
            computerBoardDOM.classList.add("invis");
            document.querySelector(".restart").classList.add("invis");
            document.querySelector(".result").classList.add("invis");

            for(let playerBoardUnit of playerBoardDOM.querySelectorAll(`[data-coordinate]`)) {
                playerBoardUnit.classList.remove("board-div-selected");
                playerBoardUnit.classList.remove("hit");
                playerBoardUnit.classList.remove("missed");
                playerBoardUnit.textContent = "";

            }
            for(let computerBoardUnit of computerBoardDOM.querySelectorAll(`[data-coordinate]`)) {
                computerBoardUnit.classList.remove("board-div-selected");
                computerBoardUnit.classList.remove("hit");
                computerBoardUnit.classList.remove("missed");
                computerBoardUnit.textContent = "";
                computerBoardUnit.removeEventListener("click", attackForComputer);
            }

            playerBoardDOM.innerHTML = "";
            computerBoardDOM.innerHTML = "";

            // data is resetted
            Game.resetGameState();

            // starts new game
            Game.initialization();

    }

    return {
        beginPlaceDownStage,
        attackShip,
        attackNothing,
        setPlaceShipLabel,
        beginCombatStage,
        initialization,
        hitAround,
        endGame,
        restartGame
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