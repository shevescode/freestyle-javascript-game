const polykSound = new Audio("polykSound.mp3");
let direction = "d";
var intervalId;
var sneakLength = 0
var gameBoard = document.getElementById('game_board');

initGame();

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    intervalId = setInterval(moveSneak, 200);
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

function moveSneak() {
    let sneak = document.getElementById('sneak');
    let sneakY = getComputedStyle(sneak).getPropertyValue('grid-column-start');
    let sneakX = getComputedStyle(sneak).getPropertyValue('grid-row-start');
    
    appleOnBoard(sneakY, sneakX);
    changeSnakeDirection(sneakX, sneakY);

}

function appleOnBoard(sneakY, sneakX) {
    let apple = document.getElementById('apple');
    let appleY = getComputedStyle(apple).getPropertyValue('grid-column-start');
    let appleX = getComputedStyle(apple).getPropertyValue('grid-row-start');
    
    if ((sneakY == appleY) && (sneakX == appleX)) {
        play();
        sneakLength += 1;
        console.log(sneakLength)
        apple.style.gridColumnStart = (getRandomInt(1, 20));
        apple.style.gridRowStart = (getRandomInt(1, 20));

        var newElement = document.createElement('div');
        newElement.style.gridRowStart = sneak.style.gridRowStart
        newElement.style.gridColumnStart = sneak.style.gridColumnStart
        newElement.classList.add('sneak_body')
        gameBoard.appendChild(newElement)
        
    }
}

function changeSnakeDirection(x, y){

    if (direction === "d" && parseInt(y) != 20) { 
        sneak.style.gridColumnStart = (parseInt(y) + 1);

        document.querySelector("#sneak").style.transform = "rotate(0deg)";
    }
    else if (direction === "a" && parseInt(y) != 1)  {
        sneak.style.gridColumnStart = (parseInt(y) - 1);
        document.querySelector("#sneak").style.transform = "rotate(180deg)";
    }
    else if (direction === "w" && parseInt(x) != 1)  {
        sneak.style.gridRowStart = (parseInt(x) - 1);
        document.querySelector("#sneak").style.transform = "rotate(270deg)";
    }
    else if (direction === "s" && parseInt(x) != 20) {
        sneak.style.gridRowStart = (parseInt(x) + 1);
        document.querySelector("#sneak").style.transform = "rotate(90deg)";
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


