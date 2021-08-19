const router = require('express').Router();
const { User, Post, Genre, Movie } = require('../../models');

//get all movies
router.get('/', (req, res) => {
    Movie.findAll({
        attributes: ['id', 'title', 'rating', 'viewed', 'genre_id'],
        include: [
            {
                model: Genre,
                attributes: ['id', 'genre_name'],
                
            },
        ]
    })
    .then(dbMovieData => res.json(dbMovieData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    // find a single movie product by its `id`
    
    Movie.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Genre,
                attributes: ["id", "category_name"]
            },
         
        ]
    })
        .then((dbMovieData) => {
            if (!dbMovieData) {
                res.status(404).json({ message: "We can't find a movie with this id. 🙁" });
                return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/:title', (req, res) => {
    // find a single movie product by its `title`
    
    Movie.findOne({
        where: {
            title: req.params.title
        },
        include: [
            {
                model: Genre,
                attributes: ["id", "genre_name"]
            },
         
        ]
    })
        .then((dbMovieData) => {
            if (!dbMovieData) {
                res.status(404).json({ message: "We can't find a movie called this. 🙁" });
                return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/// do we want to 'create' movies or should we 'create' the post which will contain the movie? 
