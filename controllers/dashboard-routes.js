const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, Fave, UserReview } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    // attributes: [
    //   "username",
    //   //   [
    //   //     sequelize.literal(
    //   //       "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
    //   //     ),
    //   //     "vote_count",
    //   //   ],
    // ],
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "movie_id", "user_id"],
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
      console.log(dbDashboard);
      // res.json({dbDashboard})
      // const movies = user.movies;
      // const user = user.dataValues.username;
      // console.log(movies);
      const movies = dbDashboard.movies;
      const user = dbDashboard.dataValues.username;
      console.log('=====MOVIES======');
      console.log(movies);
      console.log('=====User======');
      console.log(user);
      const posts = movies.map((post) => post.get({ plain: true }));
      console.log('====POSTS======');
      console.log(posts);
      res.render("dashboard", { posts, user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
