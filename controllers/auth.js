const Auth = require("../models/auth");

const signin = (req, res) => {
  if (req.session.authorized) {
    res.redirect("/dashboard");
  }
  res.render("containers/signin");
};

const userSignin = async (req, res, next) => {
  const { username, password } = req.body;
  const { userId, authorized } = await Auth.signin(username, password);

  req.session.userId = userId;
  req.session.authorized = authorized;

  res.status(200).json({ msg: "You have been successfully sign in" });
};

const signup = (req, res) => {
  res.render("containers/signup");
};

const userSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    await Auth.signup(username, email, password);
    res.status(200).json({ msg: "You have been successfully registered" });
  } catch (err) {
    next(err);
  }
};

module.exports = { signin, signup, userSignup, userSignin };
