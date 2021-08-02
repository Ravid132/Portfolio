'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver();
        // renderCell(gPacman.location, EMPTY)
        return;
    } else if (!gPacman.isSuper && nextCell === POWER_FOOD) { //eat POWER_FOOD
        gPacman.isSuper = true;
        changeGhostsColor();
        setTimeout(bringBackToLife, 5000, gPacman);

    } else if (nextCell === POWER_FOOD && gPacman.isSuper) return; //if you already ate POWER_FOOD and you try another one
    else if (gPacman.isSuper && nextCell === GHOST) { //eat a GHOST
        killGhost(nextLocation.i, nextLocation.j);
    } else if (nextCell === CHERRY) updateScore(10); //eat CHERRY

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}