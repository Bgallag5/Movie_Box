const router = require("express").Router();
const { User, UserReview, Movie } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcrypt");

//a user can get all of their reviews
router.get("/", withAuth, (req, res) => {
  console.log("review session", req.session);
  // const user_id = req.session.user.id;
  UserReview.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_content", "movie_id", "user_id"],
//     include: [
//       {
//         model: User,
//         attributes: ["id", "username"],
//       },
//     ],
  })
    .then((dbAllReviews) => res.json(dbAllReviews))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////leave commented
// router.get("/:id",  (req, res) => {
//   console.log("review session", req.session);
//   // const user_id = req.session.user.id;
//   UserReview.findAll({
//     where: {
//       user_id: req.session.user.id,
//     },
//     attributes: ["id", "title", "post_content", "user_id"],
//     include: [
//       {
//         model: User,
//         attributes: ["id", "username"],
//       },
//     ],
//   })
//     .then((dbAllReviews) => res.json(dbAllReviews))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// user can create a new review/note (must be at least 2 characters long and no more than 200)

router.post("/", withAuth, (req, res) => {
  console.log("====ADD REVIEW ROUTE HIT======");
  console.log(req.session.user_id);
  console.log(req.body.title);
  console.log(req.body.post_content);
  console.log(req.body.movie_id);

  UserReview.create({
    title: req.body.title,
    post_content: req.body.post_content,
    movie_id: req.body.movie_id,
    user_id: req.session.user_id, //previously session
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user can make changes to what they wrote in their review //
router.put("/updateReview/:id", withAuth, (req, res) => {
  // res.json({ id: req.params.id });
  UserReview.update(req.body, {
    individualHooks: true,
    where: {
      id: +req.params.id,
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

// user can delete reviews BY ID they no longer want
router.delete("/:id", withAuth, (req, res) => {
  // console.log("review session", req.session);
  console.log("id", req.params.id);
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
