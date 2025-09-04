function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();  // user is logged in
  } else {
    res.redirect("/login");  // not logged in, send to login
  }
}

module.exports = isAuthenticated;
