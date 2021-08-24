const router = require("express").Router();

const movie = require("./movie-routes");
const genre = require("./genre-routes");
const reviews = require("./review-routes");
const user = require("./user-routes");

// const dashboardRoutes = require('./dashboard-routes.js');

router.use("/movies", movie);
router.use("/user", user);
router.use("/reviews", reviews);
// router.use("/genres", genre);

// router.use('/dashboard', dashboardRoutes);

module.exports = router;
