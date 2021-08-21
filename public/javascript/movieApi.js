const imdb = require('imdb-api')
const cli = new imdb.Client({apiKey: '63a211f6'});

 
 
 //ani's omdb key (imdb still uses the omdb key)
// const URLSearchParams = require('@ungap/url-search-params');


// const sequelize = require("../../config/connection");
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// /// LODASH REQUIRE STATEMENTS ////////////////
// // Load the full build.
// var _ = require('lodash');
// // Load the core build.
// var _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// const fp = require('lodash/fp');

// // Load method categories.
// const array = require('lodash/array');
// const object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
// const at = require('lodash/at');
// const curryN = require('lodash/fp/curryN');

///// END LODASH REQUIRE STATEMENTS ////////////////




console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
cli.get({'name': 'The Lion King' }).then(console.log);

// async function newFormHandler(event) {
//     event.preventDefault();
  
//     const title = document.getElementById('inputId').value;
//     // const post_url = document.querySelector('input[name="post-url"]').value;
//     cli.get({'name': title}).then(console.log);
//     const response = await fetch(`/getMovie`, {
//         method: 'POST',               //will want to post here because we're in the front end, right? 
//         body: JSON.stringify({
//           title
          
//         //   post_url
//         }),
   
//       });
    
//       if (response.ok) {
//         console.log(response)
//       } else {
//         alert(response.statusText);
//       }
//     }     
  
  



// (async function() {
// 	const movie = await imdb.get({name: "Toxic Avenger"}, {apiKey: "63a211f6", baseURL: "http://localhost:3001"});
// 	console.log(movie);
// })




// app.listen(3001, function(){
//     console.log('Movie app started on port: 3001');
// });

