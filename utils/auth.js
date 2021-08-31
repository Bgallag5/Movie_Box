const withAuth = (req, res, next) => {
  console.log('WITHAUTH');
  console.log(this);
  console.log(req.session);
  console.log(req.session.user);
  console.log(req.session.user_id);
  if (!req.session.user_id) {
    res.redirect("/movies/login");
  } else {
    console.log('NEXT');
    next();
  }
};

module.exports = withAuth;





// Session {
//   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
// }