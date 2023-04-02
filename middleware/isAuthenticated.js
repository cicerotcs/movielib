const isAuthenticated = (req, res, next) => {
  if (req.session.authorized) {
    next();
  } else {
    res.redirect("/signin");
  }
};

module.exports = isAuthenticated;
