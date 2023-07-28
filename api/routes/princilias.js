const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const { updatedOne } = require("../models/princilia");
const router = express.Router();
const Princilia = require("../models/princilia");

router.get("/", (req, res, next) => {
  Princilia.find({})
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

router.post("/", (req, res, next) => {
  const newPrincilia = new Princilia({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
  });

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

  Princilia.findById(princiliaId)
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

router.patch("/:princiliaId", (req, res, next) => {
  const updatedPrincilia = req.body;
  console.log("test", updatedPrincilia);

  const princiliaId = req.params.princiliaId;
  console.log("id", princiliaId);

  Princilia.updateOne(
    {
      _id: princiliaId,
    },
    {
      $set: updatedPrincilia,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Updated Princilia",
        Princilia: {
          title: result.title,
          author: result.author,
          id: result._id,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.delete("/:princiliaId", (req, res, next) => {
  const princiliaId = req.params.princiliaId;

  Princilia.findByIdAndDelete(princiliaId)
    .then((result) => {
      res.status(200).json({
        message: "Updated Princilia",
        Princilia: {
          title: result.title,
          author: result.author,
          id: result._id,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = router;
