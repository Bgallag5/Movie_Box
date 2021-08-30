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
  method: 'GET'
});
if (response.ok) {
  document.location.replace(`/movies/filter/${genre}`);
} else {
  alert(response.statusText);
}
}

//FILTER BEST
var bestBtn = document.querySelector('#bestBtn')

bestBtn.onclick = async function(){

 const response = await fetch(`/api/movies/filter/best`, {
  method: 'GET'
});
if (response.ok) {
  document.location.replace(`/movies/best`);
} else {
  alert(response.statusText);
}
}

////index db search by title fetch 
async function searchMovies(event) { 
  event.preventDefault();

  const search = document.querySelector('#inputId').value;
  var title = search.trim();

  ///return all moveis that match search params 
  console.log(title); 
  const response = await fetch(`/api/movies/search/${title}`, {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  });
  if (response.ok) {
    // title = title.replace('_', ' ')
    document.location.replace(`/movies/search/${title}`);
  } else {
    alert(response.statusText);
  }
 };

document.querySelector('#buttonId').addEventListener('click', searchMovies);





















































