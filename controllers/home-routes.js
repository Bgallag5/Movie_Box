const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Post, User, Comment, Movie, UserReview } = require('../models');
const withAuth = require('../utils/auth');
const lodash = require('lodash');

router.get('/', withAuth, (req, res) => { 
    Movie.findAll({
      order: [["title", 'ASC']]
    }).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      res.render('index', {movies, loggedIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  
  // filter index db by genre   
  router.get('/filter/:genre', withAuth, (req, res) => {
    Movie.findAll({ 
      where: {
        genre: req.params.genre
      },
      order: [["title", 'ASC']],
    }).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movies);
      res.render('index', {movies, loggedIn: true});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/best', withAuth, (req, res) => {
    console.log('==========HIT BEST ROUTE============');
    Movie.findAll({ 
      where: {
        rating: {
         [Op.between]: [8, 10],
        }
      },
      order: [["title", 'ASC']],
    }).then(dbData => {
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movies);
      res.render('index', {movies, loggedIn: true});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  
  // search index db by title
  router.get('/search/:title', withAuth, (req, res) => {
    console.log("HIT HOME TITLE SEARCH ROUTES") 
    let title = req.params.title
   console.log(title);
  
    Movie.findAll({ 
        where: {
          title: {
            [Op.like]: `%${title}%`,
          }
        },
        order: [ ['title', 'ASC'] ],
    }).then(dbData => {
      console.log(dbData);
      if (!dbData){
        res.status(404).json({ message: "We can't find a movie called this. 🙁" })
      }
      console.log('===dbDATA====');
      console.log(dbData);
      console.log('====movData=====');
      const movData = lodash.dropRight(dbData);
      const movies = dbData.map(movie => movie.get({plain: true}));
      console.log(movData);
      // const movieData = lodash.movies.drop
      console.log('====MOVIES====');
      console.log(movies);
      res.render('index', {movies, loggedIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

  ////render login page
router.get('/login', (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    res.redirect("/movies");
    return;
  }
  res.render('login')
});

// render register page
router.get('/register', (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    res.redirect("/movies");
    return;
  }
  res.render('register')
});


////GET AND RENDER SINGLE MOVIE 
router.get("/single/:id", withAuth, (req, res) => {

  Movie.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "movie_id", "user_id"],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
    ],

  })
    .then(dbData => {
      const data = [dbData];
      const movies = data.map(movie => movie.get({plain: true}));
      console.log('=========MOVIES=========');
      console.log(movies);
      console.log('=========REVIEWS======');
      console.log(movies[0].userreviews);
      const reviews = (movies[0].userreviews)
      res.render('single-view', {movies, reviews, loggedIn: true})
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
});

module.exports = router;

