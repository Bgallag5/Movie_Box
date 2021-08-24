const withAuth = (req, res, next) => {
  console.log("checking session", req.session.user);
  if (!req.session.user.id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
