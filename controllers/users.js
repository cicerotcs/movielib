const Users = require("../models/users");

const removeWatchlist = async (req, res) => {
  const { movieId } = req.params;
  const { userId } = req.body;

  await Users.removeWatchlist(movieId, userId);
  res.status(200).json({ msg: "Movie has been deleted from your watchlist" });
};

const getDashboard = (req, res) => {
  res.render("containers/dashboard");
};

module.exports = { removeWatchlist, getDashboard };
