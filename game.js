const polykSound = new Audio("polykSound.mp3");

let direction = "d"
initGame();

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    setInterval(moveSneak, 500)
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
    
    if (direction === "d") {
        sneak.style.gridColumnStart = (parseInt(y) + 1);
        document.querySelector("#sneak").style.transform = "rotate(0deg)";
    }
    if (direction === "a") {
        sneak.style.gridColumnStart = (parseInt(y) - 1);
        document.querySelector("#sneak").style.transform = "rotate(180deg)";
    }
    if (direction === "w") {
        sneak.style.gridRowStart = (parseInt(x) - 1);
        document.querySelector("#sneak").style.transform = "rotate(270deg)";
    }
    if (direction === "s") {
        sneak.style.gridRowStart = (parseInt(x) + 1);
        document.querySelector("#sneak").style.transform = "rotate(90deg)";
    }
}