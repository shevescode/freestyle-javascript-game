import * as util from './util.js';
const swallowSound = new Audio("polykSound.mp3");


let speed = 600;
let score = 0;
let snakeBodyCoordinates = [{x: 10, y: 8}, {x: 10, y: 9}]
let direction = "d";
let futureDirection = "d";
let intervalId;
let mainMenu = document.getElementById('menu');
let snake = document.getElementById('snake');
let gameBoard = document.getElementById('game_board');
let snakeBodyElements = gameBoard.getElementsByClassName('snake_body');


function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    intervalId = setInterval(moveSnake, speed);
    window.addEventListener('keydown', (edge)=>{
        console.log("Wciśnięty klawisz" + edge.key);
        if (edge.key === "d") {
            futureDirection = "d"
        }
        if (edge.key === "a") {
            futureDirection = "a"
        }
        if (edge.key === "w") {
            futureDirection = "w"
        }
        if (edge.key === "s") {
            futureDirection = "s"
        }     
          
    })

}

function displaySnakeBodyOnBoard() {
    for (let i = 0; i < snakeBodyElements.length; i++) {
        snakeBodyElements[i].style.gridColumnStart = snakeBodyCoordinates[i]['y'];
        snakeBodyElements[i].style.gridRowStart = snakeBodyCoordinates[i]['x'];
    }

}

function updateSnakeBodyCoordinates(x, y) {
    snakeBodyCoordinates[0]['x'] = x;
    snakeBodyCoordinates[0]['y'] = y;
    snakeBodyCoordinates.push(snakeBodyCoordinates.splice(0, 1)[0]);
}


function moveSnake() {
    let snakeY = getComputedStyle(snake).getPropertyValue('grid-column-start');
    let snakeX = getComputedStyle(snake).getPropertyValue('grid-row-start');

    displayAppleOnBoard(snakeY, snakeX);
    changeSnakeDirection(snakeX, snakeY);

}
function checkFutureDirection() {
    if (direction == "d" && futureDirection != "a"){
        direction = futureDirection;
    }
    else if (direction == "a" && futureDirection != "d") {
        direction = futureDirection;
    }
    else if (direction == "w" && futureDirection != "s") {
        direction = futureDirection;
    }
    else if (direction == "s" && futureDirection != "w") {
        direction = futureDirection;
    }
}
function changeSnakeDirection(x, y){
    updateSnakeBodyCoordinates(x, y);
    displaySnakeBodyOnBoard();
    checkFutureDirection();

    if (direction === "d" && checkIfMoveRightIsValid(x,y)) {
        snake.style.gridColumnStart = (parseInt(y) + 1);
        document.querySelector("#snake").style.transform = "rotate(0deg)";
    }
    else if (direction === "a" && checkIfMoveLeftIsValid(x,y))  {
        snake.style.gridColumnStart = (parseInt(y) - 1);
        document.querySelector("#snake").style.transform = "rotate(180deg)";
    }
    else if (direction === "w" && checkIfMoveUpIsValid(x,y))  {
        snake.style.gridRowStart = (parseInt(x) - 1);
        document.querySelector("#snake").style.transform = "rotate(270deg)";
    }
    else if (direction === "s" && checkIfMoveDownIsValid(x,y)) {
        snake.style.gridRowStart = (parseInt(x) + 1);
        document.querySelector("#snake").style.transform = "rotate(90deg)";
    }

    else {
        clearInterval(intervalId);
    }
}


function checkIfMoveRightIsValid(x,y){

    return parseInt(y) !== 20 && !checkIfFieldIsTaken(x, parseInt(y) + 1);
}


function checkIfMoveLeftIsValid(x,y){
    return parseInt(y) !== 1 && !checkIfFieldIsTaken(x, parseInt(y) - 1);
}

function checkIfMoveUpIsValid(x,y){
    return parseInt(x) !== 1 && !checkIfFieldIsTaken(parseInt(x) - 1,y);
}

function checkIfMoveDownIsValid(x,y){
    return parseInt(x) !== 20 && !checkIfFieldIsTaken(parseInt(x) + 1, y);
}


function checkIfFieldIsTaken(x,y){
    for(let i = 0; i < snakeBodyCoordinates.length; i++){
        if (snakeBodyCoordinates[i]['x'] == x && snakeBodyCoordinates[i]['y'] == y ){
           return true;
        }
        
    }
    return false;
}


function displayAppleOnBoard(snakeY, snakeX) {
    let apple = document.getElementById('apple');
    let appleY = getComputedStyle(apple).getPropertyValue('grid-column-start');
    let appleX = getComputedStyle(apple).getPropertyValue('grid-row-start');

    if ((snakeY === appleY) && (snakeX === appleX)) {
        swallowSound.play();
        score += 1;
        myScore();

        document.getElementById("")
        apple.style.gridColumnStart = (util.getRandomInt(1, 20));
        apple.style.gridRowStart = (util.getRandomInt(1, 20));

        createNewSnakeBodyElement();

    }
}

function createNewSnakeBodyElement(){
        let newElement = document.createElement('div');
        newElement.style.gridRowStart = snake.style.gridRowStart;
        newElement.style.gridColumnStart = snake.style.gridColumnStart;
        newElement.classList.add('snake_body');
        gameBoard.appendChild(newElement);
        snakeBodyCoordinates.unshift({x: snakeBodyCoordinates[0]['x'], y: snakeBodyCoordinates[0]['y']});
}

function myScore(){
    document.getElementById('myScore').innerHTML = " " + score;
}


let switchToGame = document.getElementById("switchToGame");

switchToGame.onclick = function switchBetweenMenuAndGame(){
    game_board.style.display = "grid";
    initGame();

    menu.style.display = "none";
}


let switchToOptions = document.getElementById("switchToOption");

switchToOptions.onclick = function switchBetweenMenuAndOptions() {
    options.style.display = "block";

    menu.style.display = "none";
}

let switchToScoreBoard = document.getElementById("switchToScoreBoard");
 switchToScoreBoard.onclick = function switchBetweenMenuAndScoreBoard() {
    scoreBoard.style.display = "block";

    menu.style.display = "none";
       
 }

 let switchCredits = document.getElementById("switchToCredits");
 switchCredits.onclick = function switchBetweenMenuAndCredits() {
    credits.style.display = "block";

    menu.style.display = "none";
    
    }


    
let backToMainMenuButtons = document.getElementsByClassName("backButton");

for(let i=0; i < backToMainMenuButtons.length; i++){
backToMainMenuButtons[i].onclick = function backToMainMenu() {
    menu.style.display = "block";

    options.style.display = "none";
    credits.style.display = "none";
    scoreBoard.style.display = "none";
    gameOver.style.display = "none";
}
}



let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}