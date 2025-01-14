const library = [];
let bookIndex = 0;
const display = document.querySelector('.display-container');

const addBookBtn = document.querySelector('.add-book-btn');
addBookBtn.addEventListener('click', () => {
  // Append form to add a book
  const randomIndex = Math.floor(Math.random() * 23);
  const books = [
    ['The Hobbit', 'J.R.R. Tolkien', 295, true],
    ['A Game of Thrones', 'George R.R. Martin', 694, true],
    ['The Fellowship of the Ring', 'J.R.R. Tolkien', 398, false],
    ['The Two Towers', 'J.R.R. Tolkien', 327, true],
    ['The Return of the King', 'J.R.R. Tolkien', 347, false],
    ['Kafka on the Shore', 'Haruki Murakami', 467, true],
    ['Norwegian Wood', 'Haruki Murakami', 296, true],
    ['The Wind-Up Bird Chronicle', 'Haruki Murakami', 607, false],
    ['1Q84', 'Haruki Murakami', 925, true],
    ['The Stand', 'Stephen King', 1153, true],
    ['The Shining', 'Stephen King', 447, false],
    ['Misery', 'Stephen King', 310, false],
    ['The Gunslinger', 'Stephen King', 231, true],
    ['The Drawing of the Three', 'Stephen King', 463, true],
    ['The Waste Lands', 'Stephen King', 422, false],
    ['Wizard and Glass', 'Stephen King', 845, true],
    ['Wolves of the Calla', 'Stephen King', 714, false],
    ['Pride and Prejudice', 'Jane Austen', 279, true],
    ['Sense and Sensibility', 'Jane Austen', 409, false],
    ['Emma', 'Jane Austen', 474, true],
    ['Xenocide', 'Orson Scott Card', 592, false],
    ['Children of the Mind', 'Orson Scott Card', 358, true],
    ['Kings of the Wyld', 'Nicholas Eames', 502, true]
  ];
  const selectedBook = books[randomIndex];
  addBook(selectedBook[0], selectedBook[1], selectedBook[2], selectedBook[3]);
});


function Book(id, title, author, pages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBook(title, author, pages, haveRead) {
  const book = new Book(bookIndex, title, author, pages, haveRead);
  library.push(book);
  bookIndex++;
  updateDisplay();
}

function removeBook(index) {

}

function toggleRead() {

}

function updateDisplay() {
  display.innerHTML = "";

  // Function to update the books in the display container
  library.forEach((book, index) => {
    const bookCard = createBookCard(book);
    display.appendChild(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  bookCard.dataset.id = book.id;

  const bookTitle = document.createElement('h2');
  bookTitle.className = 'book-title';
  bookTitle.textContent = book.title;
  
  const bookAuthor = document.createElement('h3');
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = book.author
  
  const bookPages = document.createElement('p');
  bookPages.className = 'book-pages';
  bookPages.textContent = `${book.pages} pages`;

  const bookRead = document.createElement('p');
  bookRead.className = 'book-read';
  bookRead.textContent = book.haveRead ? 'Read' : 'Not read yet';

  const readBtn = document.createElement('span');
  readBtn.classList.add('btn-read', 'icon-btn');
  readBtn.addEventListener('mouseover', mouseOverRead);
  readBtn.addEventListener('mouseout', mouseOutRead);
  readBtn.addEventListener('click', clickRead);

  const readIcon = document.createElement('img');
  readIcon.setAttribute(
    'src',
    book.haveRead ? './icons/eye-check.svg' : './icons/eye-plus.svg'
  );
  readIcon.className = 'icon-read';
  
  readBtn.appendChild(readIcon);

  const removeBtn = document.createElement('span');
  removeBtn.classList.add('btn-remove', 'icon-btn');
  removeBtn.addEventListener('mouseover', mouseOverRemove);
  removeBtn.addEventListener('mouseout', mouseOutRemove);
  removeBtn.addEventListener('click', clickRemove);

  const removeIcon = document.createElement('img');
  removeIcon.setAttribute('src', './icons/delete.svg');
  removeIcon.className = 'icon-remove';

  removeBtn.appendChild(removeIcon);

  bookCard.append(bookTitle, bookAuthor, bookPages, bookRead, readBtn, removeBtn);

  return bookCard;
}

// --- Handle btnRead events ---
function mouseOverRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find(book => book.id == bookId);

  if (book.haveRead) {
    // If read state is true
    this.children[0].setAttribute('src', './icons/eye-remove-red.svg');
  } else {
    // If read state is false
    this.children[0].setAttribute('src', './icons/eye-plus-green.svg');
  }
}

function mouseOutRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find(book => book.id == bookId);

  if (book.haveRead) {
    // If read state is true
    this.children[0].setAttribute('src', './icons/eye-check.svg');
  } else {
    // If read state is false
    this.children[0].setAttribute('src', './icons/eye-plus.svg');
  }
}

function clickRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find(book => book.id == bookId);

  book.haveRead = !book.haveRead;
  updateDisplay();
}

function mouseOverRemove() {
  this.children[0].setAttribute('src', './icons/delete-red.svg');
}

function mouseOutRemove() {
  this.children[0].setAttribute('src', './icons/delete.svg');
}

function clickRemove() {
  const bookId = this.parentElement.dataset.id;
  const bookIndex = library.findIndex(book => book.id == bookId);

  library.splice(bookIndex, 1);
  updateDisplay();
}