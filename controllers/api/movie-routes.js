const router = require('express').Router();
const { User, Post, Genre, Movie } = require('../../models');
const imdb = require("imdb-api");

// const imdb = require('imdb-api');
const cli = new imdb.Client({apiKey: '63a211f6'});

//get all movies
// router.get('/', (req, res) => {
//     Movie.findAll({
//         attributes: ['id', 'title', 'rating', 'viewed', 'genre_id'],
//         include: [
//             {
//                 model: Genre,
//                 attributes: ['id', 'genre_name'],
                
//             },
//         ]
//     })
//     .then(dbMovieData => res.json(dbMovieData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

router.get('/title', (req, res) => {
 res.send(imdb.get({name: 'The Toxic Avenger'}, {apiKey: '63a211f6', timeout: 30000})
  .then(console.log).catch(console.log));
  res.send(movie);
});
// imdb.get({name: 'The Toxic Avenger'}, {apiKey: 'foo', timeout: 30000}).then(console.log).catch(console.log);

// router.get('/:title', (req, res) => {
//     // find a single movie product by its `title`
    
//     Movie.findOne({
//         where: {
//             title: req.params.title
//         },
//         include: [
//             {
//                 model: Genre,
//                 attributes: ["id", "genre_name"]
//             },
         
//         ]
//     })
//         .then((dbMovieData) => {
//             if (!dbMovieData) {
//                 res.status(404).json({ message: "We can't find a movie called this. 🙁" });
//                 return;
//             }
//             res.json(dbMovieData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

/// do we want to 'create' movies or should we 'create' the post which will contain the movie? 

module.exports = router;