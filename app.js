// Book constructor
function Book (name, title, status, location ) {
  this.name = name;
  this.title = title;
  this.status = status;
  this.location = location;
}

// UI constructor
function UI(){

}

// Event Listeners
  document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value,
          title = document.getElementById('title').value,
          status = document.getElementById('status').value,
          location = document.getElementById('location').value

    


    console.log('name, title, status, location');
});
