const form = document.querySelector("#book-form");
const title = form.elements["form-title"];
const author = form.elements["form-author"];
const pages = form.elements["form-pages"];
const read = form.elements["form-read"];
const bookContainer = document.querySelector("#book-container");
const totalBooks = document.querySelector("#total-books");
const booksRead = document.querySelector("#books-read");
const booksToRead = document.querySelector("#books-to-read");

let myLibrary = JSON.parse(window.localStorage.getItem("arr")) || [];


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


const resetForm = () => [title.value, author.value, pages.value, read.checked] = ["", "", "", true];


function createBook() {
  const book = new Book(title.value, author.value, pages.value, read.checked)
  myLibrary.unshift(book);
  updateBookList();
}


function updateStats() {
  totalBooks.textContent = myLibrary.length;
  booksRead.textContent = myLibrary.filter(x => x.read).length;
  booksToRead.textContent = myLibrary.filter(x => !x.read).length;
}


const updateBookList = () => localStorage.setItem("arr", JSON.stringify(myLibrary));


function displayBook() {
  bookContainer.innerHTML = "";

  myLibrary.forEach(book => {
    let bookCard = document.createElement("div")
    bookCard.setAttribute("class", "book-card");
    bookCard.innerHTML = `
      <h3 class="book-title card-element">${book.title}</h3>
      <h4 class="book-author card-element">${book.author}</h4>
      <h4 class="book-pages card-element">${book.pages} Pages</h4>
      <div class="pages-and-read card-element">
        <h4 class=" book-pages">Read ?</h4>
        <label class="switch">
          <input class="checkbox card-read-btn" type="checkbox" checked">
          <span class="slider round"></span>
        </label>`;

    bookContainer.appendChild(bookCard);

    readBtn = bookCard.querySelector(".card-read-btn");
    readBtn.checked = book.read;
    readBtn.onclick = () => {
      book.read = book.read ? false : true;
      updateBookList();
      updateStats();
    }
    updateStats()
  })
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  createBook();
  resetForm();
  updateStats();
  displayBook();
});


const main = () => displayBook();
main();
