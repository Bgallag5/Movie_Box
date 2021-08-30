const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Movie } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Movie.findAll({}).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movies);
      res.render('index', {movies});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// search index db by title
router.get('/search/:title', (req, res) => {
    Movie.findAll({ 
        where: {
            title: req.params.title
        }
    }).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movies);
      res.render('index', {movies});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// filter index db by genre   
router.get('/filter/:genre', (req, res) => {
    Movie.findAll({ 
        where: {
            genre: req.params.genre
        }
    }).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movies);
      res.render('index', {movies});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });



  module.exports = router;