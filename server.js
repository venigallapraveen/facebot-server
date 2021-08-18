const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require("./controllers/authorization");
const port = process.env.PORT || 3000;

//Database Setup
const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true
});

const app = express();

app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});  

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});
app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(port, () => {
  console.log("app is running on port " + port);
});
