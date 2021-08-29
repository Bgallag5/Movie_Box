const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, Fave } = require("../../models");
const withAuth = require("../../utils/auth");

//  get all user favorites
router.get("/", withAuth, async (req, res) => {
  try {
    //insert a user movie pair into the database if it does not exists already
    const favs = await Fave.findAll({
      where: { user_id: req.session.user.id },
    });
    // console.log(fav.toJSON());
    res.json(favs);
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
router.post("/upVote/:id", withAuth, async (req, res) => {
  // custom static method created in models/UserFav.js
  const movie_id = req.params.id;
  const user_id = req.session.user.id; //returns only that user's fave's
  //   const poster_path = req.body.poster_path;
  const isLiked = await Fave.findOne({
    // id: req.params.id,
    // user_id: req.session.user.id,
    // movie_id: req.body.movie_id,
    // poster_path: req.body.poster_path,
    where: { user_id, movie_id },
    // attributes: ["id", "user_id", "movie_id", "poster_path"],
  });

  if (isLiked) {
    res.send({ message: "you already liked this" });
    return;
  }

  const fave = await Fave.create({ user_id, movie_id });

  res.send(fave);
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
