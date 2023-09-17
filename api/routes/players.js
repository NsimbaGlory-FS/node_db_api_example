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
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
  });

  newPlayer
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Player Saved",
        team: {
          name: result.name,
          number: result.number,
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
          name: result.name,
          number: result.number,
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
  const playerId = req.params.playerId;
  
  const updatedPlayer = {
    name: req.body.name,
    number: req.body.number
  };
  

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
          name: result.name,
          number: result.number,
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
          name: result.name,
          number: result.number,
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
