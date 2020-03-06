// Info constructor
function Info (name, title, status, location ) {
  this.name = name;
  this.title = title;
  this.status = status;
  this.location = location;
}

// UI constructor
function UI(){}

// Add info to list
UI.prototype.addInfoToList = function(info) {
  const list = document.getElementById('info-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${info.name}</td>
    <td>${info.title}</td>
    <td>${info.status}</td>
    <td>${info.location}</td>
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
  const form = document.querySelector('#info-form');
  // insert alert
  container.insertBefore(div, form)

  // Timeout afrer 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);
}

// Delete Info
UI.prototype.deleteInfo = function(target) {
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
document.getElementById('info-form').addEventListener('submit', function(e){
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value,
        title = document.getElementById('title').value,
        status = document.getElementById('status').value,
        location = document.getElementById('location').value

  // Instantiate info    
  const Info = new Info(name, title, status, location);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(name === '', title === '', status === '', location === ''){
    // Eroor alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add info to list
    ui.addInfoToList(info);
    // Show alert
    ui.showAlert('Employee Added!', 'success');
    // Clear fields
    ui.clearFields();
  }
});

// Even Listener for delete
document.getElementById('info-list').addEventListener('click', function(e){
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete info
  ui.deleteInfo(e.target);

  // Show msg
  ui.showAlert('Employee Removed!', 'error');

  //console.log(123);
})

document.querySelector("#info-list > tr > td:nth-child(1)")
