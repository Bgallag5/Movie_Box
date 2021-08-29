const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, UserFav, Vote } = require("../../models");
const withAuth = require("../../utils/auth");

//  get all favorites
router.get("/:user_id/:movie_id", async (req, res) => {
  try {
    //insert a user movie pair into the database if it does not exists already
    const fav = await UserFav.findAll({
      where: { user_id: req.params.user_id, movie_id: req.params.movie_id },
    });
    // console.log(fav.toJSON());
    res.json(fav);
    //return count of updated element
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to retrieve favorites");
  }
});

// get favorites
// router.get("/:id", withAuth, async (req, res) => {
//   const favMovies = await UserFav.find({ user: req.user.id });
//   res.status(200).send(favMovies);
// });

// router.post("/newFav/:id", withAuth, async (req, res) => {
//   const {
//     user_id,
//     movie_id,
//     title,
//     genre,
//     rating,
//     release_year,
//     plot,
//     poster_path,
//     viewed,
//   } = req.body;
//   const thisMovie = await UserFav.findOne({ movie_id });

//   const user = await User.findOne({ _id: req.user.id });
//   if (thisMovie) {
//     return;
//   }
//   const faveMovie = new UserFav({
//     user_id,
//     movie_id,
//     title,
//     genre,
//     rating,
//     release_year,
//     plot,
//     poster_path,
//     viewed,
//     // user: req.user.id,
//   });
//   try {
//     await faveMovie.save();
//     user.liked.push(movie_id);
//     await user.save();
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// Ani's create a new favorite route //
router.post("/upvote/:id", withAuth, async (req, res) => {
  // custom static method created in models/UserFav.js
  const movie_id = req.params.id;
  const user_id = req.session.user.id;
  const isLiked = await Vote.findOne({ where: { user_id, movie_id } });

  if (isLiked) {
    res.send({ message: "you already liked this" });
    return;
  }

  const vote = await Vote.create({ user_id, movie_id });

  res.send(vote);
});

module.exports = router;

//create a new favorite
// router.post("/addFav", withAuth, (req, res) => {
//   UserFav.create({
//     title: req.body.title,
//     genre: req.body.genre,
//     rating: req.session.rating,
//     release_year: req.session.release_year,
//     plot: req.body.session.plot,
//     poster_path: req.body.poster_path,
//     viewed: req.body.viewed,
//   })
//     .then((dbfavdata) => res.json(dbfavdata))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// router.get("/:id");
