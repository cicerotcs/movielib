const db = require("../db/connect");

const getUserInfo = async (req, res, next) => {
  const { userId, authorized } = req.session;
  res.locals.user = {};
  if (authorized && userId) {
    let sql = "select id, username, email from users where id=$1;";
    const dbRes = await db.query(sql, [userId]);
    res.locals.user = dbRes.rows[0];
    next();
  } else {
    next();
  }
};

module.exports = getUserInfo;
