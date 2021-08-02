'use strict'

const KEY = 'bookDB';
const PAGE_SIZE = 4;
var gPageIdx = 0;
var gBooks;


_createBooks();
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function _createBooks() {
    var books = loadFromStorage(KEY)

    if (!books || !books.length) {
        books = [];
        books.push(_createBook('Lord of the Rings'));
        books.push(_createBook('Harry Potter'));
        books.push(_createBook('Alice Adventures in Wonderland'));
        books.push(_createBook('The lion, the Witch and the Wardrobe'));
        books.push(_createBook('Dracula'));
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(title, price) {
    price = (!price) ? getRandomIntInclusive(1, 200) : price;
    return {
        id: makeId(),
        title: title,
        price: price,
        imgURL: "test",
        rate: 0
    }
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(title, price) {
    var book = _createBook(title, price);
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    });
    book.price = price;
    _saveBooksToStorage();
}

function updateRating(bookId, rating) {
    var book = getBookById(bookId);
    console.log(book);
    book.rate = rating;
    _saveBooksToStorage();
}

function confirmRating(book, newRating) {
    book.rate = newRating;
    _saveBooksToStorage();
}

function sortBooks(sortBy) {
    console.log(gBooks);
    if (sortBy === 'title') {
        gBooks.sort(function (a, b) {
            if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
            else if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
            return 0;
        })
    }
    else if (sortBy === 'price') {
        gBooks.sort(function (a, b) {
            return a.price - b.price;
        })
    }
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE < 0) {
        gPageIdx = gBooks.length - 1 - PAGE_SIZE;
    }
}