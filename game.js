import * as util from './util.js';

const swallowSound = new Audio("polykSound.mp3");

let speed = 400;
let scoreMultiplier = 7
let levelMultiplier = 1
let score = 0;
let level = 1;
let snakeBodyCoordinates = [{x: 10, y: 8}, {x: 10, y: 9}]
let obstacleCoordinates = [{x: 4, y: 4}, {x: 5, y: 4}, {x: 4, y: 5}, {x: 17, y: 17}, {x: 16, y: 17}, {
    x: 17, y: 16
}, {x: 4, y: 17}, {x: 5, y: 17}, {x: 4, y: 16}, {x: 17, y: 4}, {x: 16, y: 4}, {x: 17, y: 5}, {x: 11, y: 4}, {
    x: 11, y: 5
}, {x: 11, y: 7}, {x: 11, y: 8}, {x: 11, y: 10}, {x: 11, y: 11}, {x: 11, y: 13}, {x: 11, y: 14}, {x: 11, y: 16}, {
    x: 11, y: 17
}];
let direction = "d";
let futureDirection = "d";
let intervalId;
let gameOver = document.getElementById("gameOver");
let snake = document.getElementById('snake');
let gameBoard = document.getElementById('game_board');
let snakeBodyElements = gameBoard.getElementsByClassName('snake_body');
let obstacleElements = gameBoard.getElementsByClassName('obstacle');


function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)

    intervalId = setInterval(moveSnake, speed);
    window.addEventListener('keydown', (edge) => {
        console.log(speed);
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

function displayObstacleElement() {
    if (level == 2) {
        for (let i = 0; i < 12; i++) {
            obstacleElements[i].style.gridColumnStart = obstacleCoordinates[i]['y'];
            obstacleElements[i].style.gridRowStart = obstacleCoordinates[i]['x'];
            obstacleElements[i].style.display = "block"
        }
    }
    if (level == 3) {
        for (let i = 0; i < 22; i++) {
            obstacleElements[i].style.gridColumnStart = obstacleCoordinates[i]['y'];
            obstacleElements[i].style.gridRowStart = obstacleCoordinates[i]['x'];
            obstacleElements[i].style.display = "block"
        }
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
    if (direction == "d" && futureDirection != "a") {
        direction = futureDirection;
    } else if (direction == "a" && futureDirection != "d") {
        direction = futureDirection;
    } else if (direction == "w" && futureDirection != "s") {
        direction = futureDirection;
    } else if (direction == "s" && futureDirection != "w") {
        direction = futureDirection;
    }
}

function changeSnakeDirection(x, y) {
    updateSnakeBodyCoordinates(x, y);
    displaySnakeBodyOnBoard();
    checkFutureDirection();

    if (direction === "d" && checkIfMoveRightIsValid(x, y)) {
        snake.style.gridColumnStart = (parseInt(y) + 1);
        document.querySelector("#snake").style.transform = "rotate(0deg)";
    } else if (direction === "a" && checkIfMoveLeftIsValid(x, y)) {
        snake.style.gridColumnStart = (parseInt(y) - 1);
        document.querySelector("#snake").style.transform = "rotate(180deg)";
    } else if (direction === "w" && checkIfMoveUpIsValid(x, y)) {
        snake.style.gridRowStart = (parseInt(x) - 1);
        document.querySelector("#snake").style.transform = "rotate(270deg)";
    } else if (direction === "s" && checkIfMoveDownIsValid(x, y)) {
        snake.style.gridRowStart = (parseInt(x) + 1);
        document.querySelector("#snake").style.transform = "rotate(90deg)";
    } else {

        clearInterval(intervalId);
        endgame();
    }
}

function endgame() {
    gameBoard.style.display = "none";
    gameOver.style.display = "block";
    finallScore.innerHTML = score;
    levelOutput.innerHTML = level;
    sessionStorage.setItem("input", score.toString())
    console.log(sessionStorage.getItem("input"))
}

function checkIfMoveRightIsValid(x, y) {

    return parseInt(y) !== 20 && !checkIfFieldIsTaken(x, parseInt(y) + 1) && !checkIfObstacle(x, parseInt(y) + 1);
}


function checkIfMoveLeftIsValid(x, y) {
    return parseInt(y) !== 1 && !checkIfFieldIsTaken(x, parseInt(y) - 1) && !checkIfObstacle(x, parseInt(y) - 1);
}

function checkIfMoveUpIsValid(x, y) {
    return parseInt(x) !== 1 && !checkIfFieldIsTaken(parseInt(x) - 1, y) && !checkIfObstacle(parseInt(x) - 1, y);
}

function checkIfMoveDownIsValid(x, y) {
    return parseInt(x) !== 20 && !checkIfFieldIsTaken(parseInt(x) + 1, y) && !checkIfObstacle(parseInt(x) + 1, y);
}


function checkIfFieldIsTaken(x, y) {
    for (let i = 0; i < snakeBodyCoordinates.length; i++) {
        if (snakeBodyCoordinates[i]['x'] == x && snakeBodyCoordinates[i]['y'] == y) {
            return true;
        }

    }
    return false;
}

function checkIfObstacle(x, y) {
    if (level == 2) {
        for (let i = 0; i < 12; i++) {
            if (obstacleCoordinates[i]['x'] == x && obstacleCoordinates[i]['y'] == y) {
                return true;
            }

        }
        return false;

    } else if (level == 3) {
        for (let i = 0; i < 22; i++) {
            console.log(i)
            if (obstacleCoordinates[i]['x'] == x && obstacleCoordinates[i]['y'] == y) {
                return true;
            }

        }
        return false;
    }
}


function displayAppleOnBoard(snakeY, snakeX) {
    let apple = document.getElementById('apple');
    let appleY = getComputedStyle(apple).getPropertyValue('grid-column-start');
    let appleX = getComputedStyle(apple).getPropertyValue('grid-row-start');

    if ((snakeY === appleY) && (snakeX === appleX)) {
        swallowSound.play();
        score += 1 * scoreMultiplier * levelMultiplier;
        myScore();
              
        let coordinates = isAppleCoordinatesValid()
            apple.style.gridColumnStart = coordinates[1];
            apple.style.gridRowStart = coordinates[0];
            createNewSnakeBodyElement();
        }

}

function isAppleCoordinatesValid() {
    let count = 1;
    while (count == 1){
    let x = util.getRandomInt(1, 20);
    let y = util.getRandomInt(1, 20);
    if (checkPossitionForApple(x, y)) {
        return [x, y];
    }
    
    }
}

function checkPossitionForApple(x, y) {
    for (let i = 0; i < snakeBodyElements.length; i++) {
        if (snakeBodyElements[i].style.gridColumnStart == y && snakeBodyElements[i].style.gridRowStart == x) {
            return false;
        }
    }
    if (level == 2) {
        for (let i = 0; i < 12; i++) {
            if (obstacleElements[i].style.gridColumnStart == y && obstacleElements[i].style.gridRowStart == x) {
                return false;
            }

        }
    }
    if (level == 3) {
        for (let i = 0; i < 22; i++) {
            if (obstacleElements[i].style.gridColumnStart == y && obstacleElements[i].style.gridRowStart == x) {
               return false;
            }
        }
        if (snake.style.gridColumnStart == y && snake.gridRowStart == x) {
            false;
        }

    }
    return true;
}

function createNewSnakeBodyElement() {
    let newElement = document.createElement('div');
    newElement.style.gridRowStart = snake.style.gridRowStart;
    newElement.style.gridColumnStart = snake.style.gridColumnStart;
    newElement.classList.add('snake_body');
    gameBoard.appendChild(newElement);
    snakeBodyCoordinates.unshift({x: snakeBodyCoordinates[0]['x'], y: snakeBodyCoordinates[0]['y']});
}

function myScore() {
    document.getElementById('myScore').innerHTML = " " + score;
}


let switchToGame = document.getElementById("switchToGame");

switchToGame.onclick = function switchBetweenMenuAndGame() {
    gameBoard.style.display = "grid";
    displayObstacleElement();
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
    gameOver = 0;
}


let backToMainMenuButtons = document.getElementsByClassName("backButton");

for (let i = 0; i < backToMainMenuButtons.length; i++) {
    backToMainMenuButtons[i].onclick = function backToMainMenu() {
        menu.style.display = "block";

        options.style.display = "none";
        credits.style.display = "none";
        scoreBoard.style.display = "none";
    }
}

let playAgain = document.getElementById('playAgain');
playAgain.onclick = function playAgain() {
    window.location.reload()
}

let logo = document.getElementsByClassName('header');
logo[0].onclick = function logo() {
    window.location.reload()
}

/*SLIDER 1*/
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
slider.oninput = function () {
    output.innerHTML = this.value;
    if (this.value == 1) {
        speed = 1000
    }
    if (this.value == 2) {
        speed = 900
    }
    if (this.value == 3) {
        speed = 800
    }
    if (this.value == 4) {
        speed = 700
    }
    if (this.value == 5) {
        speed = 600
    }
    if (this.value == 6) {
        speed = 500
    }
    if (this.value == 7) {
        speed = 400
    }
    if (this.value == 8) {
        speed = 300
    }
    if (this.value == 9) {
        speed = 100
    }
    if (this.value == 10) {
        speed = 50
    }
    scoreMultiplier = this.value
}

/*SLIDER 2*/
let sliderLevel = document.getElementById("chosenLevel");
let levelOutput = document.getElementById("level");
levelOutput.innerHTML = sliderLevel.value; // Display the default slider value
sliderLevel.oninput = function () {
    levelOutput.innerHTML = this.value;

    if (levelOutput.innerHTML == 1) {
        level = 1;
    } else if (levelOutput.innerHTML == 2) {
        level = 2;
    } else if (levelOutput.innerHTML == 3) {
        level = 3;
    }
    levelMultiplier = this.value;
}