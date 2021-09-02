const withAuth = (req, res, next) => {

  console.log("withAuth ******************");
  console.log("checking session", req.session.user);

  if (!req.session.user.id) {
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