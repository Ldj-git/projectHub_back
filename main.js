const express = require("express");
const app = express();
const con = require('./lib/db.js');
const bodyParser = require('body-parser');
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const JWTSecret = require("./lib/secrets/jwt_secrets");

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.get('/', function (req, res) {
    let decoded = jwt.verify(req.cookies.user, JWTSecret.secret);

    res.send(decoded.id);
});


app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(8765 , () => console.log("con Success on port 8765."));