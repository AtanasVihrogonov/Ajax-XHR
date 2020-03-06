class Info {
  constructor(name, title, status, location) {
    this.name = name;
    this.title = title;
    this.status = status;
    this.location = location;
  }
}

class UI {
  addInfoToList(info) {
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

  showAlert(msg, className) {
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

  deleteInfo(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('title').value = '';
    document.getElementById('status').value = '';
    document.getElementById('location').value = '';
  }
}

// Local Starage Class
class Store {
  static getInfo() {
    let names;
    if(localStorage.getItem('names') === null) {
      names = [];
    } else {
      names = JSON.parse(localStorage.getItem('names'));
    }

    return names;
  }

  static displayInfo() {
    const names = Store.getInfo();

    names.forEach(function(info) {
      const ui = new UI;

      // Add Info to UI
      ui.addInfoToList(Info);
    });
  }

  static addInfo(Info) {
    const names = Store.getInfo();

    names.push(Info);

    localStorage.setItem('names', JSON.stringify(names));
  }

  static removeInfo(name) {
    const names = Store.getInfo();

    names.forEach(function(info, index) {
      if(Info.name === name) {
        Info.splice(index, 1);
      }
    });

    localStorage.setItem('names', JSON.stringify(names));

  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayInfo);

// Event Listener for add info
document.getElementById('info-form').addEventListener('submit', function(e){
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value,
        title = document.getElementById('title').value,
        status = document.getElementById('status').value,
        location = document.getElementById('location').value

  // Instantiate info    
  const info = new Info(name, title, status, location);

  // Instantiate UI
  const ui = new UI();

  console.log(ui);

  // Validate
  if(name === '', title === '', status === '', location === ''){
    // Eroor alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add info to list
    ui.addInfoToList(info);

    // Add to LS
    Store.addInfo(info);

    // Show success
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

  // Remove from LS
  Store.removeInfo(e.target.parentElement.parentElement.firstElementChild.textContent);

  // Show msg
  ui.showAlert('Employee Removed!', 'error');

});
