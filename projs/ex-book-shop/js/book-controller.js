var gBooks;
var gRating = 0;
var gCurrentBook;

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = '';
    strHTML += `<tr>
                <th class="book-cell">Id</th>
                <th class="book-cell"><span onclick="onSortBooks('title')">Title</span></th>
                <th class="book-cell"><span  onclick="onSortBooks('price')">Price</span></th>
                <th class="book-cell">Actions</th>
                </tr>`;
    books.forEach(function (book) {
        strHTML += `<tr class="books-row">\n`;
        strHTML += `<td class="book-cell">${book.id}</td> 
        <td class="book-cell">${book.title}</td>
        <td class="book-cell">${book.price}</td>
        <td class="book-cell">
        <button onclick="onReadBook('${book.id}')">Read</button>
        <button onclick="onUpdateBook('${book.id}')">Update</button>
        <button onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
        var elTable = document.querySelector('.books-table');
        elTable.innerHTML = strHTML;
    })
    document.querySelector('.books-table').innerHTML = strHTML;

}

function onRemoveBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var price = prompt('Enter a NEW price for the book');

    updateBook(bookId, price)
    renderBooks()
}

function onAddBook() {
    var title = document.querySelector('[name=username]').value;
    var price = document.querySelector('[name=price]').value;

    addBook(title, price);
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    gCurrentBook = book;
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h5').innerText = book.price
    elModal.querySelector('img').innerText = book.imgURL;
    // updateRating(bookId);
    renderRating();
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onAdd() {
    if (gRating === 10) return;
    gRating++;
    renderRating();
}

function onDecrease() {
    if (gRating === 0) return;
    gRating--;
    renderRating();
}

function onConfirmRating() {
    var elRate = document.querySelector('.rating').innerText;
    console.log(gCurrentBook);
    confirmRating(gCurrentBook, elRate);

    renderRating();
}

function renderRating() {
    console.log(gRating);
    document.querySelector('.rating').innerText = gRating;
}

function onSortBooks(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}