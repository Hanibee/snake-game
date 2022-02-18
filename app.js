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
let timing = 1000/speed;


//cached element references
const resetBtn = document.querySelector("#reset-button")
//loop through divs using a queryselector
function idCells() {
const cells = document.querySelectorAll('.cell');
for (i=0; i < cells.length; i++) {
    idName = i.toString();
    cells[i].setAttribute('id', idName);
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
    if(event.code == 32 && event.target == document.body) {
            event.preventDefault();
    }
    document.getElementById('toHide').style.visibility = "hidden";
    document.getElementById('gameboard').scrollIntoView({behavior: "smooth", block: "center"});
    score = 0;
    document.getElementById("210").textContent = score.toString();
    spawnNewFood()
    snake = document.querySelectorAll(".snake");
    for (s=0; s<snake.length; s++){
        snake[s].classList.remove("snake");}
    document.getElementById('23').classList.add("snake");
    console.log('space bar pressed');
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


function moveRight(){
    if (gameover()){console.log("gameover"); return;}
    if (changedirection!=0){return}
    setTimeout(function onTick(){moveRight();}, timing)
    const snake = document.querySelectorAll(".snake");
    for (s=0;s<snake.length;s++){
        let current_segment_id = snake[s].getAttribute('id');
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
    if (current_food.classList.contains("snake")){
        current_food.classList.remove("food");
        spawnNewFood();
        score += 1;
        document.getElementById("210").textContent = score.toString();
        return true;        
    }else{return false};
}

function spawnNewFood(){
    if(document.querySelectorAll(".food")[0] != null){
        document.querySelectorAll(".food")[0].classList.remove("food");}
    foodlocation = document.getElementById((Math.floor(Math.random() * (224 - 0 + 1)) + 0).toString());
    if(foodlocation.classList.contains("rightBorder") || foodlocation.classList.contains("leftBorder") || foodlocation.classList.contains("leftBorder") || foodlocation.classList.contains("topBorder") || foodlocation.classList.contains("bottomBorder")){
        spawnNewFood();
    }else{
        foodlocation.classList.add("food");
    }
}

function gameover(){
    right_border = document.querySelectorAll(".rightBorder");
    left_border = document.querySelectorAll(".leftBorder");
    top_border = document.querySelectorAll(".topBorder");
    bottom_border = document.querySelectorAll(".bottomBorder");
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







