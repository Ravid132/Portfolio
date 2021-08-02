'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = 'P';
const CHERRY = '🍒';

var gBoard;
var gCountFood = 0;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gCountFood = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    setInterval(randomCherry, (15000));
    printMat(gBoard, '.board-container')
    gGame.isOn = true;

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j == 1 || i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2 || i === 1 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gCountFood++;
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';
    if (gCountFood !== 56) {
        console.log('you lost');
        init();
        return;
    }

    // alert('Game is over');
}

function hideBtn() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
}


function randomCherry() {
    var emptySpaces = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard.length - 1; j++) {
            if (gBoard[i][j] !== PACMAN && gBoard[i][j] !== GHOST && gBoard[i][j] !== POWER_FOOD &&
                gBoard[i][j] !== WALL) emptySpaces.push({ i: i, j: j });
        }
    }

    var idx = getRandomIntInt(0, emptySpaces.length);
    var emptyCell = emptySpaces[idx];

    // model
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    // dom
    renderCell(emptyCell, CHERRY);
    // console.log(emptyCell);
}