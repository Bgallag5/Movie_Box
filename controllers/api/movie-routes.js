// ani
const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const withAuth = require("../../utils/auth");

const { User, Movie, UserFav, UserReview } = require("../../models");

////START Bens Routes

router.get("/", (req, res) => {
  Movie.findAll({}).then((dbData) => {
    const movies = dbData.map((movie) => movie.get({ plain: true }));
    console.log(movies);
    res.render("index", { movies });
  });
});

//// END Bens Routes

// Ani's get by id route for NON LOGGED IN in users //
router.get("/singleMovie/:id", (req, res) => {
  Movie.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Ani's get by title route for NON LOGGED IN in users //
// router.get("/gettitle/:title", (req, res) => {
//   let title1 = req.params.title.split("_").join(" ");
//   console.log("LOOK HERE", title1);

//   Movie.findOne({
//     where: {
//       title: title1,
//     },
//   })
//     .then((dbMovieData) => {
//       if (!dbMovieData) {
//         res
//           .status(404)
//           .json({ message: "We can't find a movie called this. 🙁" });
//         return;
//       }
//       res.json(dbMovieData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Ani's get movie by title for LOGGED IN users //
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
        // include: {
        //   model: User,
        //   attributes: ["id", "username"],
        // },
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

// Ani's delete movie route //
// a user movie can be deleted although we likely won't use this
//tested on movie id 0 and got wanted response. (404 message below bc no movie 0)
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
