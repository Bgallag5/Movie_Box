const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, Fave, UserReview } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "movie_id", "user_id", "movie_title"],
        include: {
          model: Movie,
          attributes: ['poster_path']
        }
      },
      {
        model: Fave,
        attributes: ['movie_id'],
      },
      {
        model: Movie,
        attributes: ["poster_path", 'id'],
      },

    ],
  })
    .then((dbDashboard) => {
      const movies = dbDashboard.movies;
      const user = dbDashboard.dataValues.username;
      const reviewText = dbDashboard.userreviews;
      const reviews = reviewText.map((review) => review.get({plain: true}))
      const posts = movies.map((post) => post.get({ plain: true }));

      res.render("dashboard", { posts, user, reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
