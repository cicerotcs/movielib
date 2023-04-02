const Movies = require("../models/movies");

const nowPlaying = async (req, res) => {
  const movies = await Movies.nowPlaying();
  res.status(200).render("index", { movies });
};

const getMovie = async (req, res) => {
  const { movieId } = req.params;
  const { data, crew, recommendations, similar } = await Movies.getMovie(
    movieId
  );
  res.status(200).render("containers/movieInfo", {
    movie: data,
    crew,
    recommendations,
    similar,
  });
};

const getMoviesByGenre = async (req, res) => {
  const { genreId } = req.params;
  const { page } = req.query;

  if (!page || Number(page) > 500) {
    res.redirect("?page=1");
  }

  const movies = await Movies.getMoviesByGenre(genreId, page);
  res.render("containers/moviesResult", { movies, page });
};

const getMoviesByCriteria = async (req, res) => {
  const { page } = req.query;
  const url = req.url.split(/[/?]/)[1];
  if (!page || Number(page) > 500) {
    res.redirect("?page=1");
  }
  const movies = await Movies.getMoviesByCriteria(page, url);
  res.render("containers/moviesResult", { movies, page });
};

const searchMovie = async (req, res) => {
  const { q } = req.query;
  const { page } = req.query;
  const input = q.split(" ").join("%20");
  const movies = await Movies.searchMovie(input, page);
  res.render("containers/moviesResult", { movies, page, input });
};

const saveMovie = async (req, res) => {
  const { title, poster_path, overview, movie_id } = req.body;
  const { id } = res.locals.user;

  await Movies.saveMovie(title, poster_path, overview, movie_id, id);
};

const getWatchlist = async (req, res) => {
  const { id } = res.locals.user;
  const dbRes = await Movies.getWatchlist(id);

  if (req.url === "/watchlist") {
    res.render("containers/watchlist", { movies: dbRes.rows });
  } else {
    res.json(dbRes.rows);
  }
};

module.exports = {
  nowPlaying,
  getMovie,
  getMoviesByGenre,
  getMoviesByCriteria,
  searchMovie,
  saveMovie,
  getWatchlist,
};
