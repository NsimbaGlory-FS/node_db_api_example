const {request}  = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Messages = require("../../messages/messages");
const updatedOne  = require("../models/player");
const router = express.Router();
const Player = require("../models/player");

router.get("/", (req, res, next) => {
  
  Player.find({})
  .select("name_id")
  .populate("team", "name player")
  .exec()
    .then((player) => {
      if(!player) {
        console.log(player);
        return res.status(404).json.json({
          message: Messages.team_not_found,
  
          
        })
      }
      res.status(201).json({
        player: player
      })

    })
    
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.post("/", (req, res, next) => {

const newPlayer =  new Player({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number

  });

 newPlayer.updateOne()
  .select("name_id")
   .populate("team", "name player")
  .exec()
    .then(player => {
      if(!player) {
        console.log(player);
        return res.status(404).json({
          message: "Messages.player_not_found"
          })
        }
        // res.status(201).json({
        //   player: player

          res.json({
            message: "Player - Saved",
            id: player
     

  
        })

      })
      .catch(err => {
        res.status(500).json({
          error:{
            message: err.message
          }
        })
      });
  });
  

router.get("/:playerId", (req, res, next) => {
  const playerId = req.params.playerId;
  
  Player.findById(playerId)
  .select("name_id")
  .populate("team", "name player")
  .exec()
    .then(player => {
      if(!player) {
        console.log(player);
        return res.status(404).json({
          message: Messages.player_not_found
        })
        
      }
      res.status(201).json({
        player: player

      })

    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err.message,
        }
      })
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

  Player.deleteOne({
    _id: playerId
  })
  .select("name_id")
  .populate("team", "name player")
  .exec()
    .then(result => {
      res.status(200).json({
        message: "Team Deleted",
        request: {
          method: "GET",
          url: "http://localhost:3000/players/" + playerId,
    }
  
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
        });
      });
    });


module.exports = router;
