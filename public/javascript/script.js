const omdb = require('omdb');
const needle = require('needle');   //omdb dependency
const Stream = require("stream");   //omdb dependency
const durableJsonLint = require('durable-json-lint'); //omdb dependency 
const express = require('express');
// const request = require('request');
const app = express();

app.set('view engine', 'ejs');

//testing duburablejsonlint package // 
console.log(durableJsonLint('{name:"value", \'array\':[call(), 0x11]}'))

let src = new Stream();
src.readable = true;
 
let dest = new Stream();
dest.writable = true;
dest.write = function(data) {
  return(data == 'test');
};
 
src.pipe(dest);
 
src.emit('data', 'test');

// needle.get('http://www.omdbapi.com/?apikey=[63a211f6]&', function(error, response) {
//   if (!error && response.statusCode == 200)
//     console.log(response.body);
// });


app.get('/', function(req, res){
    res.render('search');
});

app.get('/results', function(req, res){
    var query = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=YOUR_API_KEY';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render('results', {data: data});
        }
    });
});

 app.listen(3000, function(){
     console.log('Movie app started on port: 3000');
 });

// const HOST = `http://www.omdbapi.com/`


 //testing npm example code 
// omdb.search('saw', function(err, movies) {
//     if(err) {
//         return console.error(err);
//     }
 
//     if(movies.length < 1) {
//         return console.log('No movies were found!');
//     }
 
//     movies.forEach(function(movie) {
//         console.log('%s (%d)', movie.title, movie.year);
//     });
 
    // Saw (2004)
    // Saw II (2005)
    // Saw III (2006)
    // Saw IV (2007)
    // ...
// });
 
// omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
//     if(err) {
//         return console.error(err);
//     }
 
//     if(!movie) {
//         return console.log('Movie not found!');
//     }
 
//     console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
//     console.log(movie.plot);
 
//     // Saw (2004) 7.6/10
//     // Two men wake up at opposite sides of a dirty, disused bathroom, chained
//     // by their ankles to pipes. Between them lies...
// });

// "http://www.omdbapi.com/?apikey=a12345b2&s=the glass house"

