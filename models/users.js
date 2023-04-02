const db = require("../db/connect");
const BadRequestError = require("../errors/bad-request");

class Users {
  static removeWatchlist = async (movieId, userId) => {
    // check if the movie id and user id are valid ones

    let select = "select * from watchlist where movie_id=$1 and user_id=$2";

    const dbRes = await db.query(select, [movieId, userId]);

    if (dbRes.rows.length === 0) {
      throw new BadRequestError(
        "The movie you trying to remove does not exists!"
      );
    }

    let sql = "delete from watchlist where movie_id=$1 and user_id=$2;";

    await db.query(sql, [movieId, userId]);
  };
}

module.exports = Users;
