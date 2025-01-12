const library = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${haveRead ? 'read' : 'not read yet'}`;
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  const book = new Book(title, author, pages, haveRead);
  library.push(book);
}

