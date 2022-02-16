//make a board with specific squares that represent where the snake can travel to
    //sorted by divs(cells)

//add a light-up snake
    //determine length of snake

//make snake enter each cell as it moves along the board - food makes it gain length
    
//game over
    //if snake touches border
    //if snake touches itself

//enable snake mobility
    //make a continuous loop for the snake to move around the board

//enable arrow keys to move the snake - right, left, up, and down
//make the snake move a certain number of cells - 10 for direction



//constants
//make points update h4
//hide h3 when spacebar is pressed
//when game is over, display game over message and show reset button


//variables
let isWinner, lengthAdded

var score = 0;


//cached element references
const resetBtn = document.querySelector("#reset-button")
//loop through divs using a queryselector
function idCells() {
const cells = document.querySelectorAll('.cell');
for (i=0; i < cells.length; i++) {
    idName = i.toString();
    cells[i].setAttribute('id', idName);
    console.log(cells[i]);
}
}

//event listeners
//when spacebar is pressed, snake starts moving in the direction of right

document.addEventListener('keyup', event => {
if (event.code === 'Space') {
    console.log('space bar pressed')
}
});

document.addEventListener('keyup', event => {
    if (event.code === 'ArrowDown') {
        updateYPosition('.cell')
    } if (event.code === 'ArrowUp') {
        updateYPosition('.cell')
    } if (event.code === 'ArrowLeft') {
        updateXPosition(-moveRate)
    } if (event.code === 'ArrowRight') {
        updateXPosition(-moveRate)
    }
});



//setinterval and settimeout

//functions
// form.addEventListener("reset", init)

// for (var i = 0, len = ____.length; i < len; i++) {
// }


function init() {
    resetBtn.setAttribute("hidden", true);
    document.getElementById("score");
    if (isWinner = "true") {
        messageEl.innerText = "Game Over";
        resetBtn.removeAttribute("hidden");
    }
}





//add a game-over message
    //once snake touches border(specific cells on the board), add game-over message
//add a reset button
    //event listener here that resets game when clicked

//add a points icon
//set points equal to 0 at start of game
//after light-up boxes are selected by snake, add points
//make light-up boxes appear randomly across the board







