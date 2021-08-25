// Ani's Code //
const router = require("express").Router();
const { User } = require("../../models");
const Post = require("../../models/Post");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// router.get('/:id', (req, res) => {
//     User.findOne({
//         attributes: { exclude: ['password'] },
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//                 model: Post,
//                 attributes: ['id', 'title', 'post_url', 'user_id', 'post_id', 'created_at']
//             }
//         ]
//     })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: "No user found with this id" });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// user can sign up //
// BOTH USERNAME AND PASSWORD MUST BE UNIQUE IN DB
router.post("/register", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // favorites: req.body.favorites
  })
    .then((dbUserData) => {
      //   req.session.save(() => {
      //     req.session.user_id = dbUserData.id;
      //     req.session.username = dbUserData.username;
      //     req.session.loggedIn = true;
      //     // req.session.favorites = dbUserData.favorites;
      //     console.log(dbUserData);
      //     res.json(dbUserData);
      //   });
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "We can't find a user with that email address 🤨" });
      return;
    }

    checkPassword(req.body.password, dbUserData.password).then(
      (validPassword) => {
        if (!validPassword) {
          res.status(400).json({ message: "Incorrect password! 😐" });
          return;
        }
        res.json({ user: dbUserData, message: "You are now logged in!" });
      }
    );

    // req.session.save(() => {
    //   req.session.user_id = dbUserData.id;
    //   req.session.username = dbUserData.username;
    //   req.session.loggedIn = true;
    //   req.session.favorites = dbUserData.favorites;

    // });
  });
});

// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// router.put("/:id", (req, res) => {
//   // pass in req.body to only update what's passed through
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: "No user was found with this id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: "No user was found with this id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
