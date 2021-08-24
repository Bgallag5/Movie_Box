const router = require("express").Router();
const { User, UserReview, Genre, Movie } = require("../../models");
const withAuth = require("../../utils/auth");

//user can get all of their reviews
router.get("/allReviews", (req, res) => {
  UserReview.findAll({
    attributes: ["id", "title", "post_content", "user_id"],
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "username"],
    //   },
    // ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user can get review by title
// router.get("/:reviewByTitle", (req, res) => {
// router.get("/findById/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "post_content", "user_id"],
//     include: [
//       {
//         model: User,
//         attributes: ["id", "username"],
//         include: {
//           model: Movie,
//           attributes: ["id", "title", "genre_id"],
//         },
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post("/createNew", withAuth, (req, res) => {
  console.log("review session", req.session);
  UserReview.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user.id, //previously session
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user can make changes to what they wrote in their review //
router.put("/update", withAuth, (req, res) => {
  UserReview.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
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

// user can delete reviews they no longer want
router.delete("/delete", withAuth, (req, res) => {
  console.log("id", req.params.id);
  UserReview.destroy({
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

module.exports = router;
