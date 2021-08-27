const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, UserFav } = require("../../models"); //  add a favorite entry into the db for the the user
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

//create a new favorite
router.post("/addFav", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  UserFav.create({
    title: req.body.title,
    genre: req.body.genre,
    rating: req.session.rating,
    release_year: req.session.release_year,
    plot: req.body.session.plot,
    poster_path: req.body.poster_path,
    viewed: req.body.viewed,
  })
    .then((dbfavdata) => res.json(dbfavdata))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// router.get("/:id");

module.exports = router;
