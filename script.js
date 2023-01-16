/* eslint-disable max-classes-per-file */
const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library');
const listLink = document.querySelector('.nav-list');
const addLink = document.querySelector('.nav-add');
const contactLink = document.querySelector('.nav-contact');
const listSection = document.querySelector('.list-section');
const addSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');
const dateToday = document.querySelector('.date-display');
let newId = 0;
// NAVBAR INTERACTIONS
listLink.addEventListener('click', () => {
  listSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});
addLink.addEventListener('click', () => {
  addSection.style.display = 'flex';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});
contactLink.addEventListener('click', () => {
  contactSection.style.display = 'flex';
  listSection.style.display = 'none';
  addSection.style.display = 'none';
});
// class constructor of the book object
class Book {
  constructor(title, author, id) {
    this.author = author;
    this.title = title;
    this.id = id;
  }
}
// Class for Local Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));//
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Class for interaction with UI
class UI {
  static displayBook() {
    const books = Storage.getBooks();
    books.forEach((newBook) => {
      UI.addBooktoLibrary(newBook);
    });
  }

  static addBooktoLibrary(newBook) {
    newBook.id = newId;
    const html = `
    <div class="book-wrapper" id ="${newBook.id}">
      <p class="book-position">"${newBook.title}" by ${newBook.author}</p>
      <button id="${newBook.id}" class="remove-btn">Remove</button>
      <div class="line-bottom"></div>
    </div>
  `;
    libraryContainer.innerHTML += html;
    newId += 1;
  }

  static clearFields() {
    newTitleInput.value = '';
    newAuthorInput.value = '';
  }
}
const addBookPressed = function (e) {
  e.preventDefault();
  const books = Storage.getBooks();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  let newId;
  const len = books.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = books[len - 1].id + 1;
  }
  if (newTitle && newAuthor) {
    const newBook = new Book(newTitle, newAuthor, newId); //
    Storage.addBook(newBook);
    UI.addBooktoLibrary(newBook);
    UI.clearFields();
  }
};
// Function to remove new Book
const removeBook = function (e) {
  if (e.target.classList.contains('remove-btn')) {
    let library = Storage.getBooks();
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('books', JSON.stringify(library));
    e.target.parentElement.remove();
  }
};
/// // EVENT LISTENERS
addBtn.addEventListener('click', addBookPressed);
libraryContainer.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', UI.displayBook);
// Display date
const dateDisplay = function () {
  const date = new Date();
  const dateString = date.toDateString().split(' ');
  const day = dateString[2];
  const month = dateString[1];

  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  let amOrPm = '';

  if (hour > 12) {
    amOrPm = 'PM';
  } else {
    amOrPm = 'AM';
  }

  dateToday.textContent = ` ${month} ${day} ${year}, ${hour}:${min}:${sec} ${amOrPm}`;
  setTimeout(dateDisplay, 1000);
};

document.addEventListener('DOMContentLoaded', dateDisplay);

// Jan 12th 2023, 11:18:11 am