const db = require("../db/connect");
const bcrypt = require("bcrypt");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const emailValidation = require("../helpers/emailValidation");
const DuplicateEmailError = require("../errors/duplicate-email");
const DuplicateUsernameError = require("../errors/duplicate-username");

class Auth {
  static signin = async (username, password) => {
    if (!username || !password) {
      throw new BadRequestError("You need to provide username and password");
    }

    let sql = "select * from users where username=$1";

    const user = await db.query(sql, [username]);
    if (user.rowCount !== 1) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    return { userId: user.rows[0].id, authorized: true };
  };

  static signup = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new BadRequestError(
        "You need to provide a username, email and password!"
      );
    }
    if (!emailValidation(email)) {
      throw new BadRequestError("You need to provide a valid email!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let sql = "insert into users(username, email, password) values($1,$2,$3)";

    try {
      await db.query(sql, [username, email, hashedPassword]);
    } catch (err) {
      if (err.code === "23505") {
        if (err.constraint === "users_email_key") {
          throw new DuplicateEmailError("Email already exists!");
        }
        if (err.constraint === "users_username_key") {
          throw new DuplicateUsernameError("Username already exists!");
        }
      } else {
        throw err;
      }
    }
  };
}

module.exports = Auth;
