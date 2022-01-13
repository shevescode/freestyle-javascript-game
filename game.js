const polykSound = new Audio("polykSound.mp3");
let direction = "d";
var intervalId;

initGame();

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    intervalId = setInterval(moveSneak, 500);
    window.addEventListener('keydown', (edge)=>{
        console.log(edge.key)
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

function startGame() {
    let startDiv = document.getElementById("start");
    startDiv.style.display = "none";
}

function moveSneak() {
    let sneak = document.getElementById('sneak');
    let y = getComputedStyle(sneak).getPropertyValue('grid-column-start');
    let x = getComputedStyle(sneak).getPropertyValue('grid-row-start');
   
    changeSnakeDirection(x, y);

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
    else if (direction === "w" &&  parseInt(x) != 1)  {
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
