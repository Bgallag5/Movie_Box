const router = require("express").Router();

const movie = require("./movie-routes");
const reviews = require("./review-routes");
const user = require("./user-routes");
const fave = require("./fav-routes");
const dashboardRoutes = require("../dashboard-routes");

router.use("/movies", movie);
router.use("/user", user);
router.use("/reviews", reviews);
router.use("/fav", fave);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
