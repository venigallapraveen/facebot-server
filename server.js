const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./router/index");

const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "https://praveen-facebot.herokuapp.com",
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, () => {
  console.log("app is running on port " + port);
});
