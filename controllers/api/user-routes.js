// Ani's Code //
const router = require("express").Router();
const { User } = require("../../models");
const Post = require("../../models/UserReview");
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

router.post("/login", async (req, res) => {
  try {
    let dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "We can't find a user with that email address 🤨" });
      return;
    }

    let validPassword = await checkPassword(
      req.body.password,
      dbUserData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password! 😐" });
      return;
    }

    req.session.user = dbUserData; //store user data in session
    console.log("session.user", req.session.user);
    res.json({ user: dbUserData, message: "You are now logged in!" });

    // req.session.save(() => {
    //   req.session.user_id = dbUserData.id;
    //   req.session.username = dbUserData.username;
    //   req.session.loggedIn = true;
    //   req.session.favorites = dbUserData.favorites;

    // });
  } catch (error) {
    console.error("failed login", error);
    res.status(500).json(error);
  }
});

module.exports = router;
