// ani
const axios = require("axios").default;
const router = require("express").Router();

const withAuth = require("../../utils/auth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Movie, UserFav, UserReview, Rating } = require("../../models");

//Ani's routes - get movie by id for LOGGED IN USERS ////
router.get("/:id", withAuth, (req, res) => {
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
      console.log(dbData);
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get movie by title for LOGGED IN users 
router.get("/title/:title", withAuth, (req, res) => {
  let title = req.params.title.split("_").join(" ");
  console.log("LOOK HERE", title);

  Movie.findOne({
    where: {
      title: title,
    },
    include: [
      {
        model: UserReview,
        attributes: ["id", "title", "post_content", "user_id"],
      },
    ],
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res
          .status(404)
          .json({ message: "We can't find a movie called this. 🙁" });
        return;
      }
      res.json(dbMovieData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete movie from db 
router.delete("/delete/:id", (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res
          .status(404)
          .json({ message: "No movie found with this id for us to delete" });
        return;
      }
      res.json(dbMovieData);
      console.log("movie deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
