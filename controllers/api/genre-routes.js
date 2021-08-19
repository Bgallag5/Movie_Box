const router = require('express').Router();
const { User, Post, Genre, Movie } = require('../../models');

router.get('/', (req, res) => {
    
    Genre.findAll({
        attributes: ["id", "genre_name"],
        include: [
            {
                model: Movie,
                attributes: ["id", "title", "rating", "viewed", "genre_id"]
            }
        ]
    })
        .then(dbGenreData => res.json(dbGenreData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/:id', (req, res) => {
    // find one genre by its `id` value
  
    Genre.findOne({
        where: {
            id: req.params.id 
        },
        include: [
            {
                model: Movie,
                attributes: ["id", "title", "rating", "viewed", "genre_id"]
            }
        ]
    })
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: "We couldn't find a genre with this id. 😥" });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


router.get('/:title', (req, res) => {
    // find one genre by its `id` value
  
    Genre.findOne({
        where: {
            genre_name: req.params.genre_name 
        },
        include: [
            {
                model: Movie,
                attributes: ["id", "title", "rating", "viewed", "genre_id"]
            }
        ]
    })
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: "We couldn't find a genre called this. 😥" });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});