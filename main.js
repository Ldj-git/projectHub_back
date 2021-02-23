const express = require("express");
const app = express();
const con = require("./lib/db.js");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const projectRouter = require("./routes/project");
const teamRouter = require("./routes/team");
const postingRouter = require("./routes/posting");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWTSecret = require("./lib/secrets/jwt_secrets");

app.set("view engine", "pug");
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/team", teamRouter);
app.use("/api/project", projectRouter);
app.use("/api/posting", postingRouter);
app.listen(8765, () => console.log("con Success on port 8765."));
