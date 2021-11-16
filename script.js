console.log("Tic Tac Toe");

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;

const cellElements = document.querySelectorAll(['[data-text]']);
let winningMessageText = document.querySelector('.winning-message-text');
let winningMessage = document.querySelector('.winning-message');
let boardHoverMark = document.querySelector('.board');
let restartButton = document.querySelector('#restartButton')

const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    boardHoverMark.classList.remove(CIRCLE_CLASS);
    boardHoverMark.classList.remove(X_CLASS);
    circleTurn = false;
    placeMark(boardHoverMark, X_CLASS);
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })
    winningMessage.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currClass);
    let win = false, draw = false;
    if(didWon(currClass)) win = true;
    if(hadADraw()) draw = true;
    if(win){
        const whoWon = circleTurn ? "O's" : "X's";
        winningMessageText.innerHTML = `${whoWon} WIN!`
        winningMessage.classList.add("show");
    }
    else if(draw) {
        winningMessageText.innerHTML = "DRAW!";
        winningMessage.classList.add("show");
    }
    else {
        circleTurn = !circleTurn;
        circleTurn ? boardHoverMark.classList.replace(X_CLASS, CIRCLE_CLASS) : boardHoverMark.classList.replace(CIRCLE_CLASS, X_CLASS);
    }
}

function placeMark(cell, currClass){
    cell.classList.add(currClass);
}

function didWon(currClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currClass);
        })
    })
}

function hadADraw(){
    draw = true;
    cellElements.forEach(cell => {
        if(!(cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))) draw = false;
    })
    return draw;
}
