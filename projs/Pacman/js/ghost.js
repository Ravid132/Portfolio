'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;
var colors = ['red', 'yellow', 'green', 'purple', 'white', 'orange', 'pink'];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: colors[getRandomIntInt(0, colors.length)],
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color: ${ghost.color}">${GHOST}</span>`
}

function changeGhostsColor() {
    var tempColors = [];
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        tempColors.push(ghost.color);
        ghost.color = 'blue';

        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, GHOST);
    }

    setTimeout(function () {
        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i];
            ghost.color = tempColors[i];
            gBoard[ghost.location.i][ghost.location.j] = GHOST;
            renderCell(ghost.location, GHOST);
        }
    }, 5000);
}

function killGhost(i, j) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.location.i === i && ghost.location.j === j) gGhosts.splice(i, 1);
    }
}

function bringBackToLife(pacman) {
    for (var i = 0; i < 3 - gGhosts.length; i++) {
        createGhost(gBoard);
    }
    pacman.isSuper = false;
}