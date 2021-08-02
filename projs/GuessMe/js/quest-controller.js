'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
  $('.win-msg').hide();
}

function onStartGuessing() {
  $('.game-start').hide();
  $('.win-msg').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  var el = $('.quest').children('h2')[0];
  el.innerText = getCurrQuest().txt;
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      onRestartGame();
      $('.win-msg').show();

    } else {
      $('.modal-container').modal('show');
      $('.no-add-guess').click(onRestartGame);
      $('.add-guess').click(onShowNewQuest);
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onShowNewQuest() {
  $('.modal-container').modal('hide');
  $('.quest').hide();
  $('.new-quest').show();
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest, newGuess, 'no');

  onRestartGame();
}

function onRestartGame() {
  $('.modal-container').modal('hide');
  $('.quest').hide();
  $('.new-quest').hide();
  $('.game-start').show();

  gLastRes = null;
  initGame();
}
