const router = require("express").Router();
const { User, UserReview, Movie } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcrypt");

// get all of their reviews
router.get("/", withAuth, (req, res) => {

  UserReview.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_content", "movie_id", "user_id"],
  })
    .then((dbAllReviews) => res.json(dbAllReviews))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post review 
router.post("/", withAuth, (req, res) => {
  UserReview.create({
    movie_title: req.body.movie_title,
    title: req.body.title,
    post_content: req.body.post_content,
    movie_id: req.body.movie_id,
    user_id: req.session.user_id, 
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// make changes to what they wrote in their review //
router.put("/update/:id", withAuth, (req, res) => {
  UserReview.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err);
    });
});

// delete review by ID
router.delete("/:id", withAuth, (req, res) => {

  UserReview.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((messageToDelete) => {
      if (!messageToDelete) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(messageToDelete);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
