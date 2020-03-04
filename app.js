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
UI.prototype.addBookToList = function(book){
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

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('name').value = '';
  document.getElementById('title').value = '';
  document.getElementById('status').value = '';
  document.getElementById('location').value = '';
}

// Event Listeners
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

    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();


    console.log('name, title, status, location');
});
