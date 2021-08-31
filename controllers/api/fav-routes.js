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

// Ani's create a new favorite route //
router.post("/upVote/:id", withAuth, async (req, res) => {
  // custom static method created in models/UserFav.js
  const movie_id = req.params.id;
  const user_id = req.session.user.id; //returns only that user's fave's
  // const poster_path = req.body.poster_path;
  //   const poster_path = req.body.poster_path;
  const isLiked = await Fave.findOne({
    // id: req.params.id,
    // user_id: req.session.user.id,
    // movie_id: req.body.movie_id,
    // poster_path: req.body.poster_path,
    where: { user_id, movie_id },
    attributes: ["id", "user_id", "movie_id"],
    // include: [
    //   {
    //     model: Movie,
    //     attributes: ["poster_path"],
    //   },
    // ],
  });

  if (isLiked) {
    res.send({ message: "you already liked this" });
    return;
  }

  const fave = await Fave.create({ user_id, movie_id });

  res.send(fave);
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

// delete a Fave by title
// router.delete("/destroy/:title", withAuth, (req, res) => {
//   // console.log('id', req.params.id);
//   Fave.destroy({
//     where: {
//       title: req.params.title,
//     },
//   })
//     .then((dbdeletedata) => {
//       if (!dbdeletedata) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       res.json(dbdeletedata);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
