const TEXT_HAVE_READ = "Have read";
const TEXT_NOT_READ_YET = "Not read yet";
const TEXT_PLACEHOLDER = "Press the \"Add Book\" button to add a new book!";

const ICON_EYE_PLUS = "./icons/eye-plus.svg";
const ICON_EYE_PLUS_GREEN = "./icons/eye-plus-green.svg";
const ICON_DELETE = "./icons/delete.svg";
const ICON_DELETE_RED = "./icons/delete-red.svg";
const ICON_EYE_REMOVE_RED = "./icons/eye-remove-red.svg";
const ICON_EYE_CHECK = "./icons/eye-check.svg";

let bookIndex = 0;
const library = [];
const display = document.querySelector(".display-container");

// Handle "Add book" button click
document.querySelector(".add-book-btn").addEventListener("click", () => {
  dialog.showModal();
});

// Get dialog element. Note: the dialog will appear on page load, 
// because there are no books to show
const dialog = document.querySelector("dialog");
dialog.showModal();

// Handle form submit
const newBookForm = document.forms.NewBookForm;
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBookData = new FormData(newBookForm);

  const bookTitle = newBookData.get("title");
  const bookAuthor = newBookData.get("author");
  const bookPages = newBookData.get("pages");
  const bookReadStatus = newBookData.get("have-read") === "on" ? true : false;

  addBook(bookTitle, bookAuthor, bookPages, bookReadStatus);

  newBookForm.reset();
  dialog.close();
});

// Handle form cancel
document.querySelector("#cancel-new-book").addEventListener("click", () => {
  newBookForm.reset();
  dialog.close();
});

class Book {
  constructor(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  toggleReadStatus() {
    this.haveRead = !this.haveRead;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }
}

function addBook(title, author, pages, haveRead) {
  const book = new Book(bookIndex, title, author, pages, haveRead);
  library.push(book);
  bookIndex++;
  updateDisplay();
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.dataset.id = book.id;

  const bookTitle = document.createElement("h2");
  bookTitle.className = "book-title";
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("h3");
  bookAuthor.className = "book-author";
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.className = "book-pages";
  bookPages.textContent = `${book.pages} pages`;

  const bookRead = document.createElement("p");
  bookRead.className = "book-read";
  bookRead.textContent = book.haveRead ? TEXT_HAVE_READ : TEXT_NOT_READ_YET;

  const readBtn = document.createElement("span");
  readBtn.classList.add("btn-read", "icon-btn");
  readBtn.addEventListener("mouseover", mouseOverRead);
  readBtn.addEventListener("mouseout", mouseOutRead);
  readBtn.addEventListener("click", clickRead);

  const readIcon = document.createElement("img");
  readIcon.setAttribute(
    "src",
    book.haveRead ? ICON_EYE_CHECK : ICON_EYE_PLUS
  );
  readIcon.className = "icon-read";

  readBtn.appendChild(readIcon);

  const removeBtn = document.createElement("span");
  removeBtn.classList.add("btn-remove", "icon-btn");
  removeBtn.addEventListener("mouseover", mouseOverRemove);
  removeBtn.addEventListener("mouseout", mouseOutRemove);
  removeBtn.addEventListener("click", clickRemove);

  const removeIcon = document.createElement("img");
  removeIcon.setAttribute("src", ICON_DELETE);
  removeIcon.className = "icon-remove";

  removeBtn.appendChild(removeIcon);

  bookCard.append(
    bookTitle,
    bookAuthor,
    bookPages,
    bookRead,
    readBtn,
    removeBtn
  );

  return bookCard;
}

function createPlaceholderBookCard() {
  const placeholder = document.createElement("div");
  placeholder.className = "book-card-placeholder";

  const textElement = document.createElement("p");
  textElement.textContent = TEXT_PLACEHOLDER;
  placeholder.appendChild(textElement);

  return placeholder;
}

function updateDisplay() {
  display.innerHTML = "";

  // Function to update the books in the display container
  if (library.length === 0) {
    const placeholderCard = createPlaceholderBookCard();
    display.appendChild(placeholderCard);
    return;
  }

  library.forEach((book) => {
    const bookCard = createBookCard(book);
    display.appendChild(bookCard);
  });
}

// --- Handle read button events ---
function mouseOverRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  this.children[0].setAttribute(
    "src",
    book.haveRead ? ICON_EYE_REMOVE_RED : ICON_EYE_PLUS_GREEN
  );
}

function mouseOutRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  this.children[0].setAttribute(
    "src",
    book.haveRead ? ICON_EYE_CHECK : ICON_EYE_PLUS
  );
}

function clickRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  book.toggleReadStatus();
  updateDisplay();
}

// --- Handle remove button events ---
function mouseOverRemove() {
  this.children[0].setAttribute("src", ICON_DELETE_RED);
}

function mouseOutRemove() {
  this.children[0].setAttribute("src", ICON_DELETE);
}

function clickRemove() {
  const bookId = this.parentElement.dataset.id;
  const bookIndex = library.findIndex((book) => book.id == bookId);

  library.splice(bookIndex, 1);
  updateDisplay();
}