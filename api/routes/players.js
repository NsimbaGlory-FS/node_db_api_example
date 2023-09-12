const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const { updatedOne } = require("../models/player");
const router = express.Router();
const Player = require("../models/player");

router.get("/", (req, res, next) => {
  Player.find({})
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Player Saved",
        team: {
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
  const newPlayer = new Player({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
  });

  newPlayer
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Player Saved",
        team: {
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

router.get("/:playerId", (req, res, next) => {
  const playerId = req.params.playerId;

  Player.findById(playerId)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Player Saved",
        team: {
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

router.patch("/:playerId", (req, res, next) => {
  const updatedPlayer = req.body;
  console.log("test", updatedPlayer);

  const playerId = req.params.playerId;
  console.log("id", playerId);

  Player.updateOne(
    {
      _id: playerId,
    },
    {
      $set: updatedPlayer,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Updated Player",
        Player: {
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

router.delete("/:playerId", (req, res, next) => {
  const playerId = req.params.playerId;

  Player.findByIdAndDelete(playerId)
    .then((result) => {
      res.status(200).json({
        message: "Updated Player",
        Player: {
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
