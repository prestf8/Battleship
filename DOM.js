const DOM = (() => {
    let playerBoardDOM, computerBoardDOM;
    let initialization = () => {
        playerBoardDOM= document.querySelector(".player-board");
        computerBoardDOM= document.querySelector(".computer-board");

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
    return {
        initialization
    }
    
})()

DOM.initialization();