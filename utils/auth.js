const withAuth = (req, res, next) => {
  console.log("checking session", req.session.user);
  if (!req.session.user.id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;

// const withAuth = (req, res, next) => {
//   console.log("WITHAUTH");
//   console.log(req.session);
//   console.log(req.session.user_id);
//   if (!req.session.user_id) {
//     res.redirect("/movies/login");
//   } else {
//     console.log("NEXT");
//     next();
//   }
// };

// module.exports = withAuth;
