const express = require("express");
const mongoose = require("mongoose");
const { updateOne } = require("../models/princilia");
const router = express.Router();
const Princilia = require("../models/princilia");

router.get("/", (req, res, next) => {
  res.json({
    Message: "Princilias - GET",
    _id: Princilia,
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
  res.json({
    Message: "Princilias - GET",
    id: princiliaId,
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

router.patch("/:princiliaId", (req, res, next) => {
  const princiliaId = req.params.princiliaId;

  const updatePrincilia = {
    title: req.body.title,
    author: req.body.author,
  };

  Princilia.updateOne(
    {
      _id: princiliaId,
    },
    {
      $set: updatePrincilia,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Update Princilia",
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
  res.json({
    Message: "Princilias - DELETE",
    id: princiliaId,
  });
  Princilia.updateOne(
    {
      _id: princiliaId,
    },
    {
      $set: updatePrincilia,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Update Princilia",
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
