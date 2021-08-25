const axios = require("axios").default;
const router = require("express").Router();
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, UserFav } = require("../../models"); //  add a favorite entry into the db for the the user

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

module.exports = router;
