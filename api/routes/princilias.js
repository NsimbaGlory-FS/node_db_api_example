const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Princilia = require("../models/princilia");

router.get("/", (req, res, next) => {
  res.json({
    Message: "Princilias - GET",
  });
});

router.post("/", (req, res, next) => {
  const newPrincilia = new Princilia({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
  });

  //write to the db
  newPrincilia
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Princilia Saved",
        book: {
          title: result.title,
          author: result.author,
          id: result._id,
          metadata: {
            method: req.method,
            host: req.hostname,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.get("/:princiliaId", (req, res, next) => {
  const princiliaId = req.params.princiliaId;
  res.json({
    Message: "Princilias - GET",
    id: princiliaId,
  });
});

router.patch("/:princiliaId", (req, res, next) => {
  const princiliaId = req.params.princiliaId;
  res.json({
    Message: "Princilias - PATCH",
    id: princiliaId,
  });
});

router.delete("/:princiliaId", (req, res, next) => {
  const princiliaId = req.params.princiliaId;
  res.json({
    Message: "Princilias - DELETE",
    id: princiliaId,
  });
});

module.exports = router;
