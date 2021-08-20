// const ky = require ('ky');
const express = require('express');
const imdb = require('imdb-api');
const cli = new imdb.Client({apiKey: '63a211f6'});  //ani's omdb key (imdb still uses the omdb key)
// const URLSearchParams = require('@ungap/url-search-params');
// const parsed = await ky('https://httpbin.org/json').json();
// this.onload = function () {
//     if (!this.USP)
//       loadScript('../min.js', function () {
//         loadTest(URLSearchParams, 'URLSearchParams!');
//       });
//     else {
//       loadTest(USP, 'URLSearchParams!');
//     }
//   };

const app = express();

cli.get({'name': 'The Glass House'}).then(console.log);
cli.get({'name': 'The Lion King' }).then(console.log);





app.listen(3001, function(){
    console.log('Movie app started on port: 3001');
});