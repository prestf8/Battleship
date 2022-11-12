const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let horizontal = true;

    let clickBoardUnit = (event) => {
        console.log(event.target);
        // TWO CASES

        // PLACING DOWN SHIPS
        // OR
        // ATTACKING 
    }

    let hoverShip = () => {
        
    }

    let placeShipDOM = () => {

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
    }

    let initializeHoverAndPlaceShips = () => {
        for(let i=0; i < 100; i++) {            
            playerBoardDiv.addEventListener("hover", hoverShip);
            computerBoardDiv.addEventListener("hover", hoverShip);
            playerBoardDiv.addEventListener("click", clickBoardUnit);
            computerBoardDiv.addEventListener("click", clickBoardUnit);
        }        
    }
    return {
        initialization,
        toggleHorizontal,
        getHorizontal,
    }
    
})()

export default DOM;