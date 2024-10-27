console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to change turns
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check win conditions
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    // Define winning positions for 5x5 grid
    let wins = [
        // Horizontal wins (rows)
        [0, 1, 2, 3, 4, 0, 20, 0],   // First row
        [5, 6, 7, 8, 9, 0, 50, 0],   // Second row
        [10, 11, 12, 13, 14, 0, 80, 0], // Third row
        [15, 16, 17, 18, 19, 0, 110, 0], // Fourth row
        [20, 21, 22, 23, 24, 0, 140, 0], // Fifth row

        // Vertical wins (columns)
        [0, 5, 10, 15, 20, -10, 50, 90],  // First column
        [1, 6, 11, 16, 21, 10, 50, 90],   // Second column
        [2, 7, 12, 17, 22, 30, 50, 90],   // Third column
        [3, 8, 13, 18, 23, 50, 50, 90],   // Fourth column
        [4, 9, 14, 19, 24, 70, 50, 90],   // Fifth column

        // Diagonal wins
        [0, 6, 12, 18, 24, 0, 50, 45],   // Top-left to bottom-right
        [4, 8, 12, 16, 20, 0, 50, 135]   // Top-right to bottom-left
    ];

    // Check all winning conditions
    wins.forEach(e => {
        if (
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[3]].innerText) &&
            (boxtext[e[3]].innerText === boxtext[e[4]].innerText) &&
            (boxtext[e[0]].innerText !== "")
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";

            // Correctly set line position based on the winning condition
            document.querySelector(".line").style.transform = `translate(${e[5]}vw, ${e[6]}vw) rotate(${e[7]}deg)`;
            document.querySelector(".line").style.width = "40vw"; // Adjust line length for 5x5
        }
    });
};

// Game logic for boxes
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset game
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
