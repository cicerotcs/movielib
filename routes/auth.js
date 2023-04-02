const express = require("express");

const router = express.Router();

const {
  signin,
  signup,
  userSignup,
  userSignin,
} = require("../controllers/auth");

router.get("/signin", signin);
router.post("/signin", userSignin);

router.get("/signup", signup);
router.post("/signup", userSignup);

module.exports = router;
