const axios = require("axios").default;
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const aniKey = "43934c9963msh721330f251ef6dep1dc772jsn1442ece51420";
const { User, Movie, Fave } = require("../../models");
const withAuth = require("../../utils/auth");

// Ani's get all user favorites - RETURNS all movie info //
router.get("/", withAuth, async (req, res) => {
  try {
    //insert a user movie pair into the database if it does not exists already
    const favs = await Fave.findAll({
      where: { user_id: req.session.user.id },
    });
    let movie_ids = favs.map((x) => x.movie_id);
    Movie.findAll({
      where: {
        id: {
          [Op.in]: movie_ids,
        },
      },
    }).then((result) => res.json(result));
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to retrieve favorites");
  }
});

// Ani's create a new favorite route //
router.post("/add/:id", withAuth, async (req, res) => {
  console.log("====HIT ADD ROUTE======");

  const user = req.session.user_id;
  const movie = req.params.id;
  console.log(req.params.id);
  console.log(req.session.user_id);

  const isFavorite = await Fave.findOne({
    where: {
      user_id: user,
      movie_id: movie,
    },
  });

  if (isFavorite) {
    res.send({ message: "you already favorited this" });
    return;
  }

  console.log("=====PRE CREATE======");
  const fave = await Fave.create({ user_id: user, movie_id: movie });
  console.log("====FAV CREATED====");
  res.json(fave);
});

// Delete a favorite movie by id
router.delete("/:id", withAuth, (req, res) => {
  console.log("====HIT DELETE====");
  // console.log('id', req.params.id);
  Fave.destroy({
    where: {
      movie_id: req.params.id,
    },
  })
    .then((dbdeletedata) => {
      if (!dbdeletedata) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbdeletedata);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
