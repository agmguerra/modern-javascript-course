// Book constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {
  addBookToList(book) {
    const listUI = document.getElementById('book-list');
  
    //Create a tr element
    const rowUI = document.createElement('tr');
  
    //Insert cols
    rowUI.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `
    listUI.appendChild(rowUI);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    //Create div
    const divUI = document.createElement('div');
    //Add classes
    divUI.className = `alert ${className}`;
    //Add text
    divUI.appendChild(document.createTextNode(message));
  
    //Get parent
    const containerUI = document.querySelector('.container');
    const formUI = document.querySelector('#book-form');
    // set alert
    containerUI.insertBefore(divUI, formUI);
    //Timeout after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000)
  }
}

//Local storage class
class Store {

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();

      //add book to ui
      ui.addBookToList(book);
    }) 
  }
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    for (let index = 0; index < books.length; index++) {
     
      if (books[index].isbn === isbn) {
        books.splice(index, 1);
        break;
      }
      
    }
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners for add a book
document.getElementById('book-form').addEventListener('submit', function (e) {

  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate fields
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //store book on localstorage
    Store.addBook(book);

    //Clear fields
    ui.clearFields();

    //Show success alert
    ui.showAlert('Book inserted.', 'success');
  }

  e.preventDefault();
})

//Event listener for delete a book from the list
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  //Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  //show message
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
})
