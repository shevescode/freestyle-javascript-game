const polykSound = new Audio("polykSound.mp3");

initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
}

function play(){
    polykSound;
    polykSound.play();
}

function startGame() {
    let startDiv = document.getElementById("start");
    startDiv.style.display = "none";

    start();
}