const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
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

  router.get('/best', (req, res) => {
    console.log('==========HIT BEST ROUTE============');
    Movie.findAll({ 
      where: {
        rating: {
         [Op.between]: [8, 10],
        }
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
  
  
  // search index db by title
  router.get('/search/:title', (req, res) => {
    console.log("HIT HOME TITLE SEARCH ROUTES") 
    let title = req.params.title
   console.log(title);
  
    Movie.findAll({ 
        where: {
          title: {
            [Op.like]: `%${title}%`,
          }
        }
    }).then(dbData => {
      console.log(dbData);
      if (!dbData){
        res.status(404).json({ message: "We can't find a movie called this. 🙁" })
      }
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