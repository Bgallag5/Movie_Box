const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, Fave, UserReview } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Fave.findAll({
    where: {
      user_id: req.session.user.id,
    },
    attributes: [
      "id",
      "user_id",
      "movie_id",
      // "poster_path",
      //   [
      //     sequelize.literal(
      //       "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
      //     ),
      //     "vote_count",
      //   ],
    ],
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "movie_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      //   {
      //     model: User,
      //     attributes: ["username"],
      //   },
    ],
  })
    .then((dbDashboard) => {
      const posts = dbDashboard.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
