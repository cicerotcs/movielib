const axios = require("axios");
const db = require("../db/connect");
require("dotenv").config();

class Movies {
  static nowPlaying = async () => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    );

    return data.results;
  };
  static getMovie = async (movieId) => {
    const {
      data: { results: similar },
    } = await axios.get(
      `${process.env.BASE_URL}/3/movie/${movieId}/similar?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    );
    const {
      data: { results },
    } = await axios.get(
      `${process.env.BASE_URL}/3/movie/${movieId}/recommendations?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    );
    const {
      data: { crew },
    } = await axios.get(
      `${process.env.BASE_URL}/3/movie/${movieId}/credits?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    );
    const { data } = await axios.get(
      `${process.env.BASE_URL}/3/movie/${movieId}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    );

    return { data, crew, recommendations: results, similar };
  };

  static getMoviesByGenre = async (genreId, page) => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_genres=${genreId}&page=${page}`
    );

    return data;
  };

  static getMoviesByCriteria = async (page, url) => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/3/movie/${url}?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`
    );

    return data;
  };

  static searchMovie = async (input, page) => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false&page=${page}`
    );

    return data;
  };

  static saveMovie = async (title, poster_path, overview, movie_id, userId) => {
    if (!userId) return;

    let sql =
      "insert into watchlist(user_id, title, poster_path, overview, movie_id) values($1, $2, $3, $4, $5);";

    await db.query(sql, [userId, title, poster_path, overview, movie_id]);
  };

  static getWatchlist = async (id) => {
    if (!id) return;

    let sql = "select * from watchlist where user_id=$1";
    const res = await db.query(sql, [id]);
    return res;
  };
}

module.exports = Movies;
