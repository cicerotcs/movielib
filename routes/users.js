const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

const { getWatchlist } = require("../controllers/movies");
const { removeWatchlist, getDashboard } = require("../controllers/users");

router.get("/watchlist", isAuthenticated, getWatchlist);
router.get("/dashboard", isAuthenticated, getDashboard);
router.delete("/watchlist/:movieId", isAuthenticated, removeWatchlist);

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
