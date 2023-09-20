const express = require("express");
const mongoose  = require("mongoose");
const router = express.Router();
const Messages = require("../../messages/messages");
const Team = require("../models/team");

router.get("/", (req, res, next) => {

Team.find({})
    .exec()
    .then((team) => {
      if (!team) {
        console.log(team);
        return res.status(404).json.json({
          message: Messages.team_not_found,
        });
      }
      res.status(201).json({
        country: team,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      })
    });

  });
router.post("/", (req, res, next) => {

  const newTeam = new team({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    country: req.body.country

  });

  // write to the db
  newTeam.save()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Team Saved",
      team: {
        name: result.name,
        country: result.country,
        id: result._id,
        metadata:{
          method: req.method,
          host: req.hostname
        }

      }

    })

  })
  .catch(err => {
     console.error(err.message);
     res.status(500).json({
       error:{
         message: err.message
       }
     })
      
    });

  });
      

router.get("/:teamId", (req, res, next) => {
  const teamId = req.params.teamId;
  Team.findById(teamId)
   
    .exec()
    .then((team) => {
      if (!team) {
        console.log(team);
        return res.status(404).json.json({
          message: Messages.team_not_found,
        });
      }
      res.status(201).json({
        author: team,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Message: "Teams - POST",
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:teamId", (req, res, next) => {
  const teamId = req.params.teamId;
  
  const updatedTeam = {
    name: req.body.name,
    country: req.body.country
  };

  Team.updateOne (
    {_id : teamId}, 
    {
    $set: updatedTeam
  }).then(result => {
    res.status(200).json({
      message: "Updated Team",
      team: {
        name: result.name,
        country: result.country,
        id: result._id
      },
      metadata: {
        host: req.hostname,
        method: req.method,
      }

      })
    })
    
    .catch(err => {
      res.status(500).json({
        error:{
          message: err.message
        },
      })
    });
});

router.delete("/:teamId", async(req, res) => {
  const team = await Team.findByIdAndRemove(req.body.id);

  Team.deleteOne({
    _id: team,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Team Deleted",
        request: {
          method: "GET",
          url: "http://localhost:3000/teams/" + team,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;