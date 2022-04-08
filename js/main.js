// // book list constructor

// //js e5

// function BookList(title,author,isbn) {

//     this.title = title;

//     this.author = author;

//     this.isbn = isbn;


// }


// // UI constructor


// function UI() {}

//  // add book list

// UI.prototype.addBookToList = function(book) {


//     const list = document.querySelector('#book-list');


//     // create tr element
//       const row = document.createElement('tr');

//       // insert cols

//       row.innerHTML = `
      
//       <td>${book.title}</td>
//       <td>${book.author}</td>
//       <td>${book.isbn}</td>
//       <td><a href="#" class="delete">X</a></td>
      
//       `;

//       list.appendChild(row);


// }


// UI.prototype.showAlert = function(message, className) {


//     // create div 

//     const div = document.createElement('div');

//      // add class

//      div.className = `alert ${className} `;

//      // add text

//      div.appendChild(document.createTextNode(message));

//      // get parent
//      const container = document.querySelector('.container');


//      // get form
//      const form = document.querySelector('#book-form');


//      // insert alert
//      container.insertBefore(div, form);


//        setTimeout(() => {

//       document.querySelector('.alert').remove();

//        }, 3000);



// }



// // delete book

// UI.prototype.deleteBook = function(target){

//     if(target.className === 'delete'){

//         target.parentElement.parentElement.remove();

//     }


// }


// // clear clearField
// UI.prototype.clearField = function () {


//     document.querySelector('#title').value = '';

//     document.querySelector('#author').value = '';

//     document.querySelector('#isbn').value = '';

// }



// const bookList = document.querySelector('#book-form');

// // event listener for add book
// bookList.addEventListener('submit', (e) => {

//     e.preventDefault();


//     // get form value
     
//     const title = document.querySelector('#title').value;

//     const author = document.querySelector('#author').value;

//     const isbn = document.querySelector('#isbn').value;

       
//     const book = new BookList(title, author, isbn);


//      //Instantiate Uint

//      const ui = new UI();


//      // validate 


//      if((title === '') || (author === '') || (isbn === '')){

//         // error alert

//         ui.showAlert('Please fill in all the fields', 'error');


//      }else{


//      // add book to list
//      ui.addBookToList(book);

//      ui.showAlert('Book Add!', 'success');

//      // clear field

//      ui.clearField();

//      }
    
// });

// // event  listener for delete book


// const deleteBook = document.querySelector('#book-list');

// deleteBook.addEventListener('click', (e) => {

//     e.preventDefault();

//     //Instantiate Uint

//     const ui = new UI();


//     // delete book
//     ui.deleteBook(e.target);

//     ui.showAlert('Book Reoves!', 'error');


// });







// e6

class BookList {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

  
  
  class UI {
    addBookToList(book) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }

  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#book-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(()=>{
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteBook(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
    }
  }

  
  // Local Storage Class
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach(function(book){
        const ui  = new UI;
  
        // Add book to UI
        ui.addBookToList(book);
      });
    }
  
    static addBook(book) {
      const books = Store.getBooks();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach(function(book, index){
       if(book.isbn === isbn) {
        books.splice(index, 1);
       }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


  
  // Event Listener for add book
  document.getElementById('book-form').addEventListener('submit', (e) => {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    // Instantiate book
    const book = new BookList(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add book to list
      ui.addBookToList(book);
  
    // Add to Localstorage
    Store.addBook(book);


      // Show success
      ui.showAlert('Book Added!', 'success');
    
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('book-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteBook(e.target);
  

     // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    // Show message
    ui.showAlert('Book Removed!', 'error');
  
    e.preventDefault();
  });


   




