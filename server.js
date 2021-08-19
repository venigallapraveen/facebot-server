const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./router/index");

const port = process.env.PORT || 3000;

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, () => {
  console.log("app is running on port " + port);
});
