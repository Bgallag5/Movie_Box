// const movieRoute  = require('../../controllers/api/movie-routes')
// const { Movie } = require("../../models");
// const router = require('express').Router()
// const homeRoutes = require('../../controllers/home-routes');
// const { response } = require("express");

// const searchMovies = require("../../controllers/api/movie-routes");

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

// SEARCH BTN
// const searchBtn = document.getElementById('buttonId');


// searchBtn.onclick = async function(){
//   console.log(searchTerm.value); 
//   searchMovies(searchTerm.value);
// }

//FILTER GENRE
var sortBtn = document.querySelector('.dropdown')

sortBtn.onchange = async function(){

 const genre = $('#dropdown').find('option:selected').text()
 console.log(genre);

 const response = await fetch(`/api/movies/filter/${genre}`, {
  method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});
if (response.ok) {
  document.location.replace(`/movies/filter/${genre}`);
} else {
  alert(response.statusText);
}
}

////index db search by title fetch 
async function searchMovies(event) { 
  event.preventDefault();

  const title = document.querySelector('#inputId').value;

  ///return all moveis that match search params 
  console.log(title); 
  const response = await fetch(`/movies/search/${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
 };

document.querySelector('#buttonId').addEventListener('click', searchMovies);




















































