const express = require("express");

const router = express.Router();

const {
  getMovie,
  getMoviesByGenre,
  getMoviesByCriteria,
  searchMovie,
  saveMovie,
  getWatchlist,
} = require("../controllers/movies");

router.get("/movie/:movieId", getMovie);
router.get("/genre/:genreId", getMoviesByGenre);

router.get("/popular", getMoviesByCriteria);
router.get("/top_rated", getMoviesByCriteria);
router.get("/upcoming", getMoviesByCriteria);

router.get("/search", searchMovie);

router.post("/save", saveMovie);
router.get("/save", getWatchlist);

module.exports = router;
