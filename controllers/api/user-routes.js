// Ani's Code //
const router = require("express").Router();
const { User , Movie, Fave} = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");


// get all users
router.get("/", withAuth, (req, res) => {
  console.log("review session", req.session);
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//leave commented
// async function checkPassword(password, hash) {
//   return await bcrypt.compare(password, hash);
// }

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Fave,
                attributes: ['id', 'movie_id', 'user_id']
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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

        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          // req.session.favorites = dbUserData.favorites;
          console.log(dbUserData);
          console.log(req.session);
          res.json(dbUserData);
        });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

////ANI I CHANGED THIS: 
router.post("/login", async (req, res) => {
  console.log("=======HIT LOGIN ROUTE======");
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
    console.log(req.body.password);
    console.log(dbUserData.password);
    ///THIS IS CORRECT --BUT ALSO MAYBE REDO THIS NOT AS ASYNC B/C MINE ISNT WORKING?
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password! 😐" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      console.log('SESSION DATA SAVED');
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error("failed login", error);
    res.status(500).json(error)
  }
});

// user can logout (should be connected to logout.js)
router.post("/logout", (req, res) => {
  console.log(req.session); 
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    console.log("You are NOT logged out");
  }
});

// delete a user by their id
router.delete("/delete/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
