const express = require("express");
const router = express.Router();
const Messages = require("../../messages/messages");
const team = require("../models/team");

router.get("/", (req, res, next) => {
  console.log("this is get");

  team.find({})
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
        error: {
          message: err.message,
        },
      });
    });
});

router.post("/", (req, res, next) => {
  console.log('this is a post');
  
  team.clean(team)
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
      res.json({
        Message: "Teams - POST",
        error: {
          message: err.message,
        },
      });
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
  Team.updateOne(teamId)
    
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
        error: {
          message: err.message,
        },
      });
    });
});

router.delete("/:teamId", (req, res, next) => {
  const teamId = req.params.teamId;

  Team.deleteOne({
    _id: teamId,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Team Deleted",
        request: {
          method: "GET",
          url: "http://localhost:3000/teams/" + teamId,
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
