const router = require("express").Router();

const apiRoutes = require("./api/");
// const homeRoutes = require('./home-routes.js');
const userRoutes = require("./api/user-routes");

// const dashboardRoutes = require('./dashboard-routes.js');

// router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/user", userRoutes);

module.exports = router;
