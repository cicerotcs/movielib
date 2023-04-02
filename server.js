const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const client = require("./db/connect");
require("express-async-errors");
const session = require("express-session");
require("dotenv").config();
const getUserInfo = require("./middleware/getUserInfo");
const MemoryStore = require("memorystore")(session);
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { nowPlaying } = require("./controllers/movies");
const moviesRouter = require("./routes/movies");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, //hour
  },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(getUserInfo);

//index page
app.get("/", nowPlaying);

//movie routes
app.use("/movies", moviesRouter);

//auth routes
app.use("/", authRouter);

//user routes
app.use("/", userRouter);

// 404
app.get("*", (req, res) => {
  res.status(404).render("containers/404");
});

app.use(errorHandler);

async function init() {
  try {
    await client.connect();
    app.listen(5000, () => {
      console.log("server running on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

init();
