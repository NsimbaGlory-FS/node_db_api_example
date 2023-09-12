const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const teamRoutes = require("../api/routes/teams");
//const princiliaRoutes = require("../api/routes/princilias");

//middleawre for logging
app.use(morgan("dev"));
// parsing middleawre
app.use(
  express.urlencoded({
    extended: true,
  })
);
//middleawre that all reqquest are json
app.use(express.json());

//middleware to handle the CORS Policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Oring, X-Requested-With Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH.DELETE");
  }
  next();
});

app.get("/", (req, res, next) => {
  res.status(201).json({
    message: "Servece is UP!",
    method: req.method,
  });
});

app.use("/team", teamRoutes);
//app.use("/princilias", princiliaRoutes);

// add middleware to handle error and bad url paths
app.use((req, res, next) => {
  const error = new Error("NOT FOUND !!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

//connect to mongodb

mongoose.connect(process.env.mongoDBURL);

const db = mongoose.connection;
db.on("error", () => console.log("connection:"));
db.once("open", () => {
  console.log("Connected successfully to MongoDB!");
});

module.exports = app;
