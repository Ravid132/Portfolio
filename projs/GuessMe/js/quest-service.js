var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const KEY = 'treeDB';

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
        _saveTreeToStorage();

    }
    initGame();
    gQuestsTree = gQuestsTree;
}

function initGame() {
    gPrevQuest = null;
    gCurrQuest = gQuestsTree;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    // if (res === 'yes') gCurrQuest = gCurrQuest.yes;
    // else gCurrQuest = gCurrQuest.no;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest.no = newQuest;
    gCurrQuest = gQuestsTree;
    _saveTreeToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveTreeToStorage() {
    saveToStorage(KEY, gQuestsTree);
}