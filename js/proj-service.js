'use strict'
var gId = 0;
var gProjs = [];

function createProjects() {
    gProjs.push(createProject(
        'MineSweeper',
        'MineSweeper',
        'MineSweeper game with extra features',
        'projs/MineSweeper',
        ['Game', 'Board'],
        'img/portfolio/MineSweeper.png'
    ));

    gProjs.push(createProject(
        'BookShop',
        'BookShop',
        'BookShop with CRUDL implementing MVC',
        'projs/ex-book-shop',
        ['Shop', 'New'],
        'img/portfolio/BookShop.png'
    ));

    gProjs.push(createProject(
        'GuessWho',
        'GuessWho',
        'GuessWho Game',
        'projs/GuessMe',
        ['Game', 'New'],
        'img/portfolio/GuessWho.png'
    ));

    gProjs.push(createProject(
        'Pacman',
        'Pacman',
        'Pacman Game',
        'projs/Pacman',
        ['Game', 'Fun'],
        'img/portfolio/Pacman.png'
    ));

    gProjs.push(createProject(
        'Todo',
        'Todo',
        'Todo app',
        'projs/Todo',
        ['App', 'Todo'],
        'img/portfolio/Todo.png'

    ));

    gProjs.push(createProject(
        'TouchNums',
        'TouchNums',
        'TouchNums Game',
        'projs/TouchNums',
        ['Game', 'Numbers'],
        'img/portfolio/Touch-Nums.png'
    ));

    return gProjs;
}

function createProject(name, title, desc, url, labels, img) {
    return {
        id: gId++,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: 1448693940000,
        labels: labels,
        img: img,
    }
}

function getProjById(id) {
    return gProjs.find(function (proj) {
        return proj.id === id;
    })
}

function getRandomId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
