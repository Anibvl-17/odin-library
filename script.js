const library = [];
let bookIndex = 0;
const display = document.querySelector(".display-container");

const addBookBtn = document.querySelector(".add-book-btn");
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
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
  bookRead.textContent = book.haveRead ? "Read" : "Not read yet";

  const readBtn = document.createElement("span");
  readBtn.classList.add("btn-read", "icon-btn");
  readBtn.addEventListener("mouseover", mouseOverRead);
  readBtn.addEventListener("mouseout", mouseOutRead);
  readBtn.addEventListener("click", clickRead);

  const readIcon = document.createElement("img");
  readIcon.setAttribute(
    "src",
    book.haveRead ? "./icons/eye-check.svg" : "./icons/eye-plus.svg"
  );
  readIcon.className = "icon-read";

  readBtn.appendChild(readIcon);

  const removeBtn = document.createElement("span");
  removeBtn.classList.add("btn-remove", "icon-btn");
  removeBtn.addEventListener("mouseover", mouseOverRemove);
  removeBtn.addEventListener("mouseout", mouseOutRemove);
  removeBtn.addEventListener("click", clickRemove);

  const removeIcon = document.createElement("img");
  removeIcon.setAttribute("src", "./icons/delete.svg");
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

function updateDisplay() {
  display.innerHTML = "";

  // Function to update the books in the display container
  library.forEach((book, index) => {
    const bookCard = createBookCard(book);
    display.appendChild(bookCard);
  });
}

// --- Handle read button events ---
function mouseOverRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  if (book.haveRead) {
    // If read state is true
    this.children[0].setAttribute("src", "./icons/eye-remove-red.svg");
  } else {
    // If read state is false
    this.children[0].setAttribute("src", "./icons/eye-plus-green.svg");
  }
}

function mouseOutRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  if (book.haveRead) {
    // If read state is true
    this.children[0].setAttribute("src", "./icons/eye-check.svg");
  } else {
    // If read state is false
    this.children[0].setAttribute("src", "./icons/eye-plus.svg");
  }
}

function clickRead() {
  const bookId = this.parentElement.dataset.id;
  const book = library.find((book) => book.id == bookId);

  book.haveRead = !book.haveRead;
  updateDisplay();
}

// --- Handle remove button events ---
function mouseOverRemove() {
  this.children[0].setAttribute("src", "./icons/delete-red.svg");
}

function mouseOutRemove() {
  this.children[0].setAttribute("src", "./icons/delete.svg");
}

function clickRemove() {
  const bookId = this.parentElement.dataset.id;
  const bookIndex = library.findIndex((book) => book.id == bookId);

  library.splice(bookIndex, 1);
  updateDisplay();
}

// --- Handle dialog and dialog form ---
// Dialog will appear on page load, because there are no books to show
const dialog = document.querySelector("dialog");
dialog.showModal();

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

const cancelFormBtn = document.querySelector("#cancel-new-book");
cancelFormBtn.addEventListener("click", () => {
  dialog.close();
});
