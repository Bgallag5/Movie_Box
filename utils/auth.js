const withAuth = (req, res, next) => {

  console.log('WITHAUTH');
  console.log(req.session.user_id);
  if (!req.session.user_id) {
    res.redirect("/movies/login");
  } else {
    console.log('NEXT');
    next();
  }
};

module.exports = withAuth;

//////THIS IS CORRECT IM 90% SURE