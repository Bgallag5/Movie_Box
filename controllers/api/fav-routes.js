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

    // console.log(fav.toJSON());
    //res.json(favs);
    //return count of updated element
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to retrieve favorites");
  }
});


// Ani's CREATE (using GET...I know it's weird but it works) a new favorite route - movie info not included bc user just clicks fav button on individual view page //
router.get("/upVote/:id", withAuth, async (req, res) => {
  // custom static method created in models/UserFav.js
  const movie_id = req.params.id;
  const user_id = req.session.user.id; //returns only that user's fave's
  //const poster_path = req.body.poster_path;
  const foundMovie = await Movie.findOne({
    where: { id: movie_id },
  });
  if (!foundMovie) {
    res.send({ message: "Could not find the movie you like." });
    return;
  }
  const isLiked = await Fave.findOne({
    // id: req.params.id,
    // user_id: req.session.user.id,
    // movie_id: req.body.movie_id,
    // poster_path: req.body.poster_path,
    where: { user_id, movie_id },
    attributes: ["id", "user_id", "movie_id"],
    include: {
      model: Movie,
      attributes: ["poster_path"],
    },
  });
  if (isLiked) {
    res.send({ message: "you already liked this" });
    return;
  }
  const fave = await Fave.create({ user_id, movie_id });
  res.send(fave);
});



// Ani's create a new favorite route //
router.post("/add/:id", withAuth, async (req, res) => {
  console.log('====HIT ADD ROUTE======');

  // custom static method created in models/UserFav.js
  console.log(req.params.id);
  console.log(req.session.user_id);
  const movie_id = req.params.id;
  const user_id = req.session.user_fid; //returns only that user's fave's


  const isFavorite = await Fave.findOne({

    where: { 
      user_id: user_id, 
      movie_id: movie_id,

    },
  });

  if (isFavorite) {
    res.send({ message: "you already favorited this" }); 
    return;
  }

  console.log('=====PRE CREATE======');
  const fave = await Fave.create({ user_id, movie_id });
  console.log('====FAV CREATED====');
  res.json(fave);
});



// Delete a favorite movie by id
router.delete("/delete/:id", withAuth, (req, res) => {
  // console.log('id', req.params.id);
  Fave.destroy({
    where: {
      id: req.params.id,
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
