const router = require('express').Router();
const { Movie } = require('../../models');

//get all movies
router.get('/', (req, res) => {
    Movie.findAll({
        attributes: ['id', 'title', 'rating', 'viewed', 'genre_id']
    })
})