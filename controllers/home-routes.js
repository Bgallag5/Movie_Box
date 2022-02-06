const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Post, User, Comment, Movie, UserReview } = require("../models");
const withAuth = require("../utils/auth");
const lodash = require("lodash");

router.get("/", withAuth, (req, res) => {
  Movie.findAll({
    order: [["title", "ASC"]],
  })
    .then((dbData) => {
      const movies = dbData.map((movie) => movie.get({ plain: true }));
      res.render("index", { movies, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// filter index db by genre
router.get("/filter/:genre", withAuth, (req, res) => {
  Movie.findAll({
    where: {
      genre: req.params.genre,
    },
    order: [["title", "ASC"]],
  })
    .then((dbData) => {
      const movies = dbData.map((movie) => movie.get({ plain: true }));
      res.render("index", { movies, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get best movies route 
router.get("/best", withAuth, (req, res) => {
  Movie.findAll({
    where: {
      rating: {
        [Op.between]: [8, 10],
      },
    },
    order: [["title", "ASC"]],
  })
    .then((dbData) => {
      const movies = dbData.map((movie) => movie.get({ plain: true }));
      res.render("index", { movies, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// search movies by matching title sting  
router.get("/search/:title", withAuth, (req, res) => {
  let title = req.params.title;

  Movie.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
    order: [["title", "ASC"]],
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: "We can't find a movie called this. 🙁" });
      }

      const movData = lodash.dropRight(dbData);
      const movies = dbData.map((movie) => movie.get({ plain: true }));

      res.render("index", { movies, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/movies");
    return;
  }
  res.render("login");
});

// render register page
router.get("/register", (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    res.redirect("/movies");
    return;
  }
  res.render("register");
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
    .then((dbData) => {
      const data = [dbData];
      const movies = data.map((movie) => movie.get({ plain: true }));
      const reviews = movies[0].userreviews;

      res.render("single-view", { movies, reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//RENDER EDIT REVIEW PAGE
router.get("/edit/:id", withAuth, (req, res) => {

  UserReview.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content"],
  })
    .then((dbData) => {
      if (dbData) {
        const review = dbData.get({ plain: true });

        res.render("edit-review", { review });
      }
    })
    .catch((err) => res.status(500).json({ err }));
});

//EDIT REVIEW
router.put("/editReview/:id", withAuth, (req, res) => {

  UserReview.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => res.status(500).json({ err }));
});


///RENDER PROFILE PAGE
router.get("/profile", withAuth, (req, res) => {
User.findOne({
  where: {
    id: req.session.user_id
  }
}).then(dbData => {
  if (!dbData) {
    res.status(404).json({message: "No Profile found"})
  }
  const {id, username, email} = {...dbData.dataValues};

  res.render('profile-page', {username, id, email, loggedIn: true}) 
}).catch((err) => res.send('Bad Request'))
});












module.exports = router;
