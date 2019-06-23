const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//connect a db
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ApiAuthentication", {
  useNewUrlParser: true
});

const app = express();

app.use(cors());

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => res.send("Hello"));
app.use("/users", require("./routes/users"));

module.exports = app;
