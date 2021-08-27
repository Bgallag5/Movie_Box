// const movieRoute  = require('../../controllers/api/movie-routes')

///**  BUTTONS  **///

//BACK TO TOP
//Get the button:
topBtn = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
}

//SEARCH BTN
const searchBtn = document.getElementById('buttonId');
var searchTerm = document.getElementById('inputId');

searchBtn.onclick = function(){
  console.log(searchTerm.value); 
}

//SORT BY 
var sortBtn = document.getElementById('dropdown')

sortBtn.onchange = function(){
 console.log($('#dropdown').find('option:selected').text());
}



























































