// let omdb = require('omdb');
const needle = require('needle');   //omdb dependency
const Stream = require("stream");   //omdb dependency
const durableJsonLint = require('durable-json-lint'); //omdb dependency 
const express = require('express');
// const request = require('request');
const app = express();
const imdb = require('imdb-api')
// const omdbWrapper = require('omdb-wrapper').default;
const cli = new imdb.Client({apiKey: '63a211f6'});
cli.get({'name': 'The Glass House'}).then(console.log);
 
// omdb = new omdbWrapper({
//   apiKEY: '63a211f6'
// });

app.set('view engine', 'ejs');

//testing duburablejsonlint package // prints funny json //
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

// const dev = process.env.NODE_ENV !== 'production';

// export const server = dev ? 'http://localhost:3000' : 'http://www.omdbapi.com/?apikey=[63a211f6]&';

// imdb.search({
//     name: 'Toxic Avenger'
//   }, {
//     apiKey: '63a211f6'
//   }).then(console.log).catch(console.log);



imdb.get({name: 'How I Met Your Mother'}, {apiKey: '63a211f6'}).then((things) => {
    return things.episodes()
}).then((eps) => {
    if (err) {
    console.log(err)  

    } else {
    console.log(eps);
    }  
    
   
});

// app.get('/', function(req, res){
//     res.render('search');
// });

// app.get('/results', function(req, res){
//     var query = req.query.search(searcher);
//     var url = 'https://www.omdbapi.com/?s=' + query + '&apikey= 63a211f6';
//     request(url, function(error, response, body){
//         if(!error && response.statusCode == 200){
//             var data = JSON.parse(body)
//             res.render('results', {data: data});
//             console.log(data);
//             console.log("=================")
            
//         }
//     });
// });
































































