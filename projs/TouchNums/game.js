'use strict'

var gCount = 1;
var gNums = [];
var gTimeBegan = 0;
var gTimerInterval;
var gSize = 16;

function init() {
    gNums = createNums();
    gNums = shuffle();
    console.log(gNums);
    renderBoard();
}

function toggleGame() {
    renderBoard();
    restart();
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gSize); i++) {
        strHTML += '<tr>'
        for (var j = 0; j < Math.sqrt(gSize); j++) {
            console.log(gNums);

            var num = gNums.pop();
            strHTML += `<td data-num="${num}"
            class="number"
            onclick="cellClicked(this)">
            ${num}</td>`
        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

    renderNextNum();
}

function renderNextNum() {
    var nextNumber = document.querySelector('.nextNum');
    nextNumber.innerText = gCount;
}

function renderNextTime() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - gTimeBegan);
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
    var timerHTML = (sec > 9 ? sec : '0' + sec) + '.' +
        (ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms);
    document.querySelector('.timer').innerHTML = timerHTML;

}

function renderTime() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - gTimeBegan);
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
    document.querySelector('.timer').innerHTML = (sec > 9 ? sec : '0' + sec) + '.' +
        (ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms);
}

function cellClicked(elNum) {
    var numClicked = elNum.getAttribute('data-num');
    if (gCount === +numClicked) {
        if (numClicked === '1') {
            gTimeBegan = new Date();
            gTimerInterval = setInterval(renderTime, 10);

        }
        else if (numClicked === (gSize + '')) {
            clearInterval(gTimerInterval);
            elNum.classList.add('occupied');
            openModal();
            return;
        }
        elNum.innerText = '❌';
        elNum.classList.add('occupied');
        gCount++;
        renderNextNum();
    }
}

function chooseLevel(level) {
    gSize = +level;
    gNums = [];
    restart();
}

function restart() {
    gCount = 1;
    document.querySelector('.timer').innerHTML = '00' + '.' + '000';
    clearInterval(gTimerInterval);
    init();
}

function openModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    setTimeout(function () { elModal.style.display = 'none'; }, 5000);

}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function createNums() {
    var numbers = [];
    for (var i = 1; i <= gSize; i++) {
        numbers.push(i);
    }
    return numbers;
}

function shuffle() {
    var nums = [];
    for (var i = 0; i < gSize; i++) {
        nums.push(drawNum2(gNums));
    }
    return nums;
}