const display = document.querySelector('.display-container');
const addBookBtn = document.querySelector('.add-book-btn');
addBookBtn.addEventListener('click', () => {
  // Append form to add a book
  addBook('The Hobbit', 'J.R.R. Tolkien', 295, true);
  addBook('The Martian', 'Andy Weir', 369, true);
});

const library = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBook(title, author, pages, haveRead) {
  const book = new Book(title, author, pages, haveRead);
  library.push(book);
  updateDisplay();
}

function removeBook(index) {

}

function toggleRead() {

}

function updateDisplay() {
  display.innerHTML = "";

  // Function to update the books in the display contianer
  library.forEach((book, index) => {
    const bookCard = createBookCard(book);
    display.appendChild(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';

  const bookTitle = document.createElement('h2');
  bookTitle.className = 'book-title';
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement('h3');
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = book.author
  const bookPages = document.createElement('p');
  bookPages.className = 'book-pages';
  bookPages.textContent = book.pages;
  const bookRead = document.createElement('p');
  bookRead.className = 'book-read';
  bookRead.textContent = book.haveRead ? 'Read' : 'Not read yet';

  bookCard.append(bookTitle, bookAuthor, bookPages, bookRead);

  return bookCard;
}