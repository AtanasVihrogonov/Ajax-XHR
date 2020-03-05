// Book constructor
function Book (name, title, status, location ) {
  this.name = name;
  this.title = title;
  this.status = status;
  this.location = location;
}

// UI constructor
function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.title}</td>
    <td>${book.status}</td>
    <td>${book.location}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Show Alerts
UI.prototype.showAlert = function(msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add class name
  div.className = `alert ${className}`;
  // Add text note
  div.appendChild(document.createTextNode(msg));
  // Inser into the DOM
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form)

  // Timeout afrer 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('name').value = '';
  document.getElementById('title').value = '';
  document.getElementById('status').value = '';
  document.getElementById('location').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value,
        title = document.getElementById('title').value,
        status = document.getElementById('status').value,
        location = document.getElementById('location').value

  // Instantiate book    
  const book = new Book(name, title, status, location);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(name === '', title === '', status === '', location === ''){
    // Eroor alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show alert
    ui.showAlert('Book Added!', 'success');
    // Clear fields
    ui.clearFields();
  }
});

// Even Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show msg
  ui.showAlert('Book Removed!', 'error');

  console.log(123);
})
