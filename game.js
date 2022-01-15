const polykSound = new Audio("polykSound.mp3");
let direction = "d";
var intervalId;
var snakeLength = 2
var gameBoard = document.getElementById('game_board');
var snakeElements = [{x: 9, y: 10}]

initGame();

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    intervalId = setInterval(moveSnake, 1000);
    window.addEventListener('keydown', (edge)=>{
        if (edge.key === "d") {
            direction = "d"
        }
        if (edge.key === "a") {
            direction = "a"
        }
        if (edge.key === "w") {
            direction = "w"
        }
        if (edge.key === "s") {
            direction = "s"
        }       
    })
}

function play(){
    polykSound.play();
}

// function startGame() {
//     let startDiv = document.getElementById("start");
//     startDiv.style.display = "none";
// }

function moveSnake() {
    let snake = document.getElementById('snake');
    let snakeY = getComputedStyle(snake).getPropertyValue('grid-column-start');
    let snakeX = getComputedStyle(snake).getPropertyValue('grid-row-start');
    
    appleOnBoard(snakeY, snakeX);
    changeSnakeDirection(snakeX, snakeY);

}

function appleOnBoard(snakeY, snakeX) {
    let apple = document.getElementById('apple');
    let appleY = getComputedStyle(apple).getPropertyValue('grid-column-start');
    let appleX = getComputedStyle(apple).getPropertyValue('grid-row-start');
    
    if ((snakeY == appleY) && (snakeX == appleX)) {
        play();
        snakeLength += 1;
        console.log(snakeLength)
        apple.style.gridColumnStart = (getRandomInt(1, 20));
        apple.style.gridRowStart = (getRandomInt(1, 20));

        var newElement = document.createElement('div');
        newElement.style.gridRowStart = snake.style.gridRowStart
        newElement.style.gridColumnStart = snake.style.gridColumnStart
        newElement.classList.add('snake_body')
        gameBoard.appendChild(newElement)
        
    }
}

function changeSnakeDirection(x, y){

    if (direction === "d" && parseInt(y) != 20) { 
        snake.style.gridColumnStart = (parseInt(y) + 1);
        document.querySelector("#snake").style.transform = "rotate(0deg)";
    }
    else if (direction === "a" && parseInt(y) != 1)  {
        snake.style.gridColumnStart = (parseInt(y) - 1);
        document.querySelector("#snake").style.transform = "rotate(180deg)";
    }
    else if (direction === "w" && parseInt(x) != 1)  {
        snake.style.gridRowStart = (parseInt(x) - 1);
        document.querySelector("#snake").style.transform = "rotate(270deg)";
    }
    else if (direction === "s" && parseInt(x) != 20) {
        snake.style.gridRowStart = (parseInt(x) + 1);
        document.querySelector("#snake").style.transform = "rotate(90deg)";
    } 


    else {
        clearInterval(intervalId);
    }  
          
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


