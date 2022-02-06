const withAuth = (req, res, next) => {

  if (!req.session.user_id) {
    res.redirect("/movies/login");
  } else {
    next();
  }
};

module.exports = withAuth;
