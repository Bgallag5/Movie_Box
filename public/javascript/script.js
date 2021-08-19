// const { response } = require("express");

// const { search } = require("../../controllers");

var aniKey = "63a211f6";



// fetch api 

 fetch(
     'https://www.omdbapi.com/?s=' + '&apikey=' + aniKey
 )
 .then(function (response) {
     return response.json();
 })
