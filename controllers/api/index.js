const router = require("express").Router();

const movie = require("./movie-routes");
// const genre = require("./genre-routes");
const reviews = require("./review-routes");
const user = require("./user-routes");
const fave = require("./fav-routes");
// const upvote = require("../../models/UpVote");

const dashboardRoutes = require("../dashboard-routes");

router.use("/movies", movie);
router.use("/user", user);
router.use("/reviews", reviews);
router.use("/fav", fave);
// router.use("/upvote", UpVote);

// router.use("/genres", genre);

router.use("/dashboard", dashboardRoutes);

module.exports = router;
