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
let isWinner, lengthAdded, changedirection

var score = 0;
let speed = 7;
//timing is the amount of time it takes for the snake to move to the next cell
let timing = 1000/speed;


//cached element references
const resetBtn = document.querySelector("#reset-button")
//loop through divs using a queryselector
function idCells() {
const cells = document.querySelectorAll('.cell');
//asign cells ids
for (i=0; i < cells.length; i++) {
    idName = i.toString();
    cells[i].setAttribute('id', idName);
    //add classes defining whether it's a border cell
    //grid is 15x15
    if((i+1)%15==0){cells[i].classList.add("rightBorder"); console.log(cells[i]);}
    if((i)%15==0){cells[i].classList.add("leftBorder"); console.log(cells[i]);}
    if(i<15){cells[i].classList.add("topBorder"); console.log(cells[i]);}
    if(i>=(15*15-15)){cells[i].classList.add("bottomBorder"); console.log(cells[i]);}
}
}

//event listeners
//when spacebar is pressed, snake starts moving in the direction of right
document.addEventListener('keyup', event => {
if (event.code === 'Space') {
    //prevent it from randomizing
    if(event.code == 32 && event.target == document.body) {
            event.preventDefault();
    }
    //hide instructions
    document.getElementById('toHide').style.visibility = "hidden";
    //scroll into view when pressing spacebar
    document.getElementById('gameboard').scrollIntoView({behavior: "smooth", block: "center"});
    //score box - space bar is reset button so score resets
    score = 0;
    document.getElementById("210").textContent = score.toString();
    //spawnnewfood initiatied when space bar is pressed
    spawnNewFood()
    //grab anything on the gameboard that says snake so that it can be cleared
    snake = document.querySelectorAll(".snake");
    //clears gameboard to start the snake at cell 23 every time the game is restarted
    for (s=0; s<snake.length; s++){
        snake[s].classList.remove("snake");}
    document.getElementById('23').classList.add("snake");
    console.log('space bar pressed');
    //going in the right direction at the start
    changedirection = 0;
    moveRight();
    }
});

//change direction 
document.addEventListener('keyup', event => {
    if (event.code === 'ArrowDown') {
        changedirection = 3;
        moveDown();
    } if (event.code === 'ArrowUp') {
        changedirection = 2;
        moveUp();
    } if (event.code === 'ArrowLeft') {
        changedirection = 1;
        moveLeft();
    } if (event.code === 'ArrowRight') {
        changedirection = 0;
        moveRight();
    }
});


//function to move in the right direction
function moveRight(){
    //check to see if game is over
    if (gameover()){console.log("gameover"); return;}
    //leave the recursive function because another starts by going in a different direction
    if (changedirection!=0){return}
    //recursive function to call moveRight to continue moving right after a certain number of miliseconds
    setTimeout(function onTick(){moveRight();}, timing)
    const snake = document.querySelectorAll(".snake");
    //for loop doesn't completely work because it doesn't add length
    for (s=0;s<snake.length;s++){
        //get id of each segment
        let current_segment_id = snake[s].getAttribute('id');
        //turn it into an integer to add it and then turn it back into a string
        let next_segment_id = (parseInt(current_segment_id) + 1).toString();
        next_segment = document.getElementById(next_segment_id);
        next_segment.classList.add("snake");
        if (snakeyEat() != true){snake[s].classList.remove("snake");}
    }
}

function moveLeft(){
    if (gameover()){console.log("gameover"); return;}
    if (changedirection!=1){return}
    setTimeout(function onTick(){moveLeft();}, timing)
    const snake = document.querySelectorAll(".snake");
    for (s=0;s<snake.length;s++){
        let current_segment_id = snake[s].getAttribute('id');
        let next_segment_id = (parseInt(current_segment_id)-1).toString();
        next_segment = document.getElementById(next_segment_id);
        next_segment.classList.add("snake");
        if (snakeyEat()!= true){snake[s].classList.remove("snake");}
    }
}


function moveDown(){
    if (gameover()){console.log("gameover"); return;}
    if (changedirection!=3){return}
    setTimeout(function onTick(){moveDown();}, timing)
    const snake = document.querySelectorAll(".snake");
    for (s=0;s<snake.length;s++){
        let current_segment_id = snake[s].getAttribute('id');
        let next_segment_id = (parseInt(current_segment_id) + 15).toString();
        next_segment = document.getElementById(next_segment_id);
        next_segment.classList.add("snake");
        if (snakeyEat()!= true){snake[s].classList.remove("snake");}
    }
}

function moveUp(){
    if (gameover()){console.log("gameover"); return;}
    if (changedirection!=2){return}
    setTimeout(function onTick(){moveUp();}, timing)
    const snake = document.querySelectorAll(".snake");
    for (s=0;s<snake.length;s++){
        let current_segment_id = snake[s].getAttribute('id');
        let next_segment_id = (parseInt(current_segment_id) - 15).toString();
        next_segment = document.getElementById(next_segment_id);
        next_segment.classList.add("snake");
        if (snakeyEat()!= true){snake[s].classList.remove("snake");}
    }
}

function snakeyEat(){
    current_food = document.querySelectorAll(".food")[0]
    //if snake and food are in the same box, add 1 to the score, 
    // spawn new food, and update the score indicator in the bottom left corner.
    // Then return true so that everyone knows snakey ate.
    if (current_food.classList.contains("snake")){
        current_food.classList.remove("food");
        spawnNewFood();
        score += 1;
        document.getElementById("210").textContent = score.toString();
        return true;        
    // Otherwise return false.
    }else{return false};
}

function spawnNewFood(){
    //if there is food on the screen, then remove to spawn new food.
    if(document.querySelectorAll(".food")[0] != null){
        document.querySelectorAll(".food")[0].classList.remove("food");}
        //math.random to randomize food.
    foodlocation = document.getElementById((Math.floor(Math.random() * (224 - 0 + 1)) + 0).toString());
    //make sure the food doesn't touch the border, and if so spawn new food
    if(foodlocation.classList.contains("rightBorder") || foodlocation.classList.contains("leftBorder") || foodlocation.classList.contains("topBorder") || foodlocation.classList.contains("bottomBorder")){
        spawnNewFood();
    }else{
        foodlocation.classList.add("food");
    }
}

function gameover(){
    //select all the borders
    right_border = document.querySelectorAll(".rightBorder");
    left_border = document.querySelectorAll(".leftBorder");
    top_border = document.querySelectorAll(".topBorder");
    bottom_border = document.querySelectorAll(".bottomBorder");
    //see if any of the borders contain snake, and if they do then the game is over
    for (element=0; element<right_border.length; element++){
        if(right_border[element].classList.contains("snake")){return true}};
    for (element=0; element<left_border.length; element++){
        if(left_border[element].classList.contains("snake")){return true}};
    for (element=0; element<top_border.length; element++){
        if(top_border[element].classList.contains("snake")){return true}};
    for (element=0; element<bottom_border.length; element++){
        if(bottom_border[element].classList.contains("snake")){return true}};
    return false;
    
}


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







