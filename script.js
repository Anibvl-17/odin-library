function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${haveRead ? 'read' : 'not read yet'}`;
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
console.log(theHobbit.info());